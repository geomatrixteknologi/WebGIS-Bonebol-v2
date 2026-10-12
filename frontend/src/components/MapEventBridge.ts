import { useEffect, useRef } from "react";
import L from "leaflet";
import { useAICopilot, MapCommand } from "@/contexts/AICopilotContext";

type RegionFeatureCollection = GeoJSON.FeatureCollection | null;

// Proactive highlights (auto-generated from briefing) fade out after this
// delay so the map doesn't stay cluttered. User-explicit highlights persist.
const PROACTIVE_HIGHLIGHT_TTL_MS = 20_000;

const HIGHLIGHT_FIT_MAX_ZOOM = 15;

/**
 * MapEventBridge — Listens for AI Copilot MapCommands and executes them on the Leaflet map.
 * This hook should be used inside a component that has access to the Leaflet map instance.
 *
 * Pass `kecamatanGeoJson` so highlight commands referencing region codes/names
 * (without lat/lng) can resolve to actual kecamatan polygons.
 */
type ParcelDetailCallback = (
  nop: string,
  geomData: GeoJSON.Geometry | null,
  fotoPersil: string[],
) => void;

export function useMapEventBridge(
  mapRef: React.RefObject<L.Map | null>,
  kecamatanGeoJson?: RegionFeatureCollection,
  onParcelDetail?: ParcelDetailCallback,
) {
  const { pendingMapCommand, clearPendingMapCommand } = useAICopilot();
  const highlightLayerRef = useRef<L.LayerGroup | null>(null);
  const kecamatanGeoJsonRef = useRef<RegionFeatureCollection>(kecamatanGeoJson ?? null);
  const onParcelDetailRef = useRef<ParcelDetailCallback | null>(onParcelDetail ?? null);
  const proactiveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    kecamatanGeoJsonRef.current = kecamatanGeoJson ?? null;
  }, [kecamatanGeoJson]);

  useEffect(() => {
    onParcelDetailRef.current = onParcelDetail ?? null;
  }, [onParcelDetail]);

  useEffect(() => {
    if (!pendingMapCommand) return;
    if (!mapRef.current) {
      console.warn("[MapEventBridge] pendingMapCommand arrived before mapRef ready — will retry on next mount", pendingMapCommand);
      return;
    }

    const geo = kecamatanGeoJsonRef.current;
    console.log(
      "[MapEventBridge] executing map_command:",
      pendingMapCommand,
      "features:",
      geo?.features?.length ?? "none",
      "firstFeature:",
      geo?.features?.[0],
    );
    const map = mapRef.current;

    // Any incoming command cancels a pending proactive auto-clear — either the
    // user is about to replace the highlight, or clear it explicitly.
    if (proactiveTimerRef.current) {
      clearTimeout(proactiveTimerRef.current);
      proactiveTimerRef.current = null;
    }

    executeMapCommand(map, pendingMapCommand, highlightLayerRef, kecamatanGeoJsonRef.current);

    // If the command asks to open the NOP detail panel (same as clicking a
    // persil on the map), invoke the parent callback after the fly animation
    // starts so the panel opens alongside the zoom.
    const detailNop = pendingMapCommand.open_detail_nop;
    const detailCb = onParcelDetailRef.current;
    if (detailNop && detailCb) {
      const geom = pendingMapCommand.targets?.[0]?.geometry ?? null;
      detailCb(detailNop, geom, []);
    }

    // If this highlight was proactively generated from the briefing, schedule
    // it to auto-clear after a short delay so the map stays clean.
    const isProactiveHighlight =
      pendingMapCommand.source === "proactive" &&
      (pendingMapCommand.action === "highlight" ||
        pendingMapCommand.action === "navigate_and_highlight");
    if (isProactiveHighlight) {
      proactiveTimerRef.current = setTimeout(() => {
        clearHighlights(highlightLayerRef);
        proactiveTimerRef.current = null;
      }, PROACTIVE_HIGHLIGHT_TTL_MS);
    }

    clearPendingMapCommand();
  }, [pendingMapCommand, mapRef, clearPendingMapCommand]);

  // Clean up any pending timer on unmount.
  useEffect(() => {
    return () => {
      if (proactiveTimerRef.current) {
        clearTimeout(proactiveTimerRef.current);
        proactiveTimerRef.current = null;
      }
    };
  }, []);

  return { highlightLayerRef };
}

function executeMapCommand(
  map: L.Map,
  command: MapCommand,
  highlightLayerRef: React.MutableRefObject<L.LayerGroup | null>,
  kecamatanGeoJson: RegionFeatureCollection,
) {
  switch (command.action) {
    case "navigate":
      handleNavigate(map, command, kecamatanGeoJson);
      break;

    case "highlight":
      handleHighlight(map, command, highlightLayerRef, kecamatanGeoJson);
      break;

    case "navigate_and_highlight":
      handleNavigate(map, command, kecamatanGeoJson);
      setTimeout(() => handleHighlight(map, command, highlightLayerRef, kecamatanGeoJson), 500);
      break;

    case "clear_highlights":
      clearHighlights(highlightLayerRef);
      break;
  }
}

function handleNavigate(map: L.Map, command: MapCommand, kecamatanGeoJson: RegionFeatureCollection) {
  const target = command.targets?.[0];
  const requestedZoom = command.zoom_level;

  // No target → treat as a zoom-only request on the current center.
  // This covers prompts like "zoom lebih dalam" where the LLM supplies only a zoom level.
  if (!target) {
    if (typeof requestedZoom === "number") {
      const clamped = clampZoom(map, requestedZoom);
      map.flyTo(map.getCenter(), clamped, { duration: 1.2 });
    } else {
      console.warn("[MapEventBridge] navigate command received without target or zoom_level");
    }
    return;
  }

  // Explicit coordinates take precedence.
  if (typeof target.lat === "number" && typeof target.lng === "number") {
    const zoom = clampZoom(map, requestedZoom ?? 14);
    map.flyTo([target.lat, target.lng], zoom, { duration: 1.5 });
    return;
  }

  // Embedded geometry (provided by backend resolver) takes precedence.
  if (target.geometry) {
    if (!geomInWgs84Range(target.geometry)) {
      console.warn("[MapEventBridge] navigate: geometry not in WGS84 range; skipping fly", target);
      return;
    }
    const bounds = L.geoJSON(target.geometry).getBounds();
    if (bounds.isValid()) {
      const zoom = clampZoom(map, requestedZoom ?? 14);
      map.flyTo(bounds.getCenter(), zoom, { duration: 1.5 });
    } else {
      console.warn("[MapEventBridge] navigate: geometry bounds invalid; skipping fly", target);
    }
    return;
  }

  // Region code → resolve via locally loaded kecamatan GeoJSON as a fallback.
  if (target.code && kecamatanGeoJson) {
    const feature = findKecamatanFeature(kecamatanGeoJson, target.code);
    if (feature && feature.geometry) {
      const bounds = L.geoJSON(feature.geometry as GeoJSON.GeometryObject).getBounds();
      if (bounds.isValid()) {
        const zoom = clampZoom(map, requestedZoom ?? 14);
        map.flyTo(bounds.getCenter(), zoom, { duration: 1.5 });
      } else {
        console.warn("[MapEventBridge] navigate: region geometry bounds invalid; skipping fly", target);
      }
    } else {
      console.warn(`[MapEventBridge] navigate: region code "${target.code}" not found in kecamatan GeoJSON`);
    }
    return;
  }

  console.warn("[MapEventBridge] navigate: target has no resolvable code or coordinates", target);
}

function clampZoom(map: L.Map, zoom: number): number {
  const min = map.getMinZoom();
  const max = map.getMaxZoom();
  return Math.min(Math.max(zoom, min), max);
}

// Guard against geometry that isn't in WGS84 (e.g. EPSG:3857 meters). Out-of-range
// coords make Leaflet clamp every vertex to the pole, collapsing polygons to a line
// and breaking the map view. WGS84 always stays within +/-180 lng / +/-90 lat.
function geomInWgs84Range(geom: GeoJSON.GeometryObject | null | undefined): boolean {
  let node: unknown = (geom as { coordinates?: unknown })?.coordinates;
  while (Array.isArray(node) && node.length && Array.isArray(node[0])) node = node[0];
  if (Array.isArray(node) && node.length >= 2 && typeof node[0] === "number" && typeof node[1] === "number") {
    return Math.abs(node[0]) <= 180 && Math.abs(node[1]) <= 90;
  }
  return true;
}

function handleHighlight(
  map: L.Map,
  command: MapCommand,
  highlightLayerRef: React.MutableRefObject<L.LayerGroup | null>,
  kecamatanGeoJson: RegionFeatureCollection,
) {
  // Clear existing highlights
  clearHighlights(highlightLayerRef);

  const targets = command.targets;
  if (!targets || targets.length === 0) return;

  const color = command.highlight_color || "#FF0000";

  // Create a layer group for highlights
  const layerGroup = L.layerGroup().addTo(map);
  highlightLayerRef.current = layerGroup;

  const polygonBoundsList: L.LatLngBounds[] = [];

  const polygonStyle = {
    color,
    weight: 3,
    opacity: 1,
    fillColor: color,
    fillOpacity: 0.25,
  };

  for (const target of targets) {
    // Embedded geometry (from backend resolver) is the preferred path.
    if (target.geometry) {
      if (!geomInWgs84Range(target.geometry)) {
        console.warn("[MapEventBridge] highlight: geometry not in WGS84 range; skipping", target);
        continue;
      }
      const polygon = L.geoJSON(target.geometry, { style: polygonStyle });
      polygon.addTo(layerGroup);
      polygonBoundsList.push(polygon.getBounds());
      continue;
    }

    if (target.code && kecamatanGeoJson) {
      const feature = findKecamatanFeature(kecamatanGeoJson, target.code);
      if (feature && feature.geometry) {
        const polygon = L.geoJSON(feature.geometry as GeoJSON.GeometryObject, {
          style: polygonStyle,
        });
        polygon.addTo(layerGroup);
        polygonBoundsList.push(polygon.getBounds());
        continue;
      }
    }

    if (target.lat && target.lng) {
      L.circleMarker([target.lat, target.lng], {
        radius: 20,
        color,
        fillColor: color,
        fillOpacity: 0.3,
        weight: 3,
      }).addTo(layerGroup);
    }
  }

  if (polygonBoundsList.length > 0) {
    const combined = polygonBoundsList.reduce(
      (acc, b) => (acc ? acc.extend(b) : b),
      null as L.LatLngBounds | null,
    );
    if (combined && combined.isValid()) {
      map.flyToBounds(combined, {
        padding: [60, 60],
        maxZoom: HIGHLIGHT_FIT_MAX_ZOOM,
        duration: 1.5,
      });
    } else if (combined) {
      console.warn("[MapEventBridge] highlight bounds invalid; skipping fly", combined);
    }
  }
}

function normalizeRegionName(value: string | number): string {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/^kec(amatan)?\.?\s+/i, "")
    .replace(/[_\-./]+/g, " ")
    .replace(/\s+/g, " ");
}

function findKecamatanFeature(
  geoJson: GeoJSON.FeatureCollection,
  codeOrName: string,
): GeoJSON.Feature | null {
  const needle = normalizeRegionName(codeOrName);
  const propKeysSeen = new Set<string>();
  const sampleProps: unknown[] = [];
  for (const f of geoJson.features) {
    const props = (f.properties ?? {}) as Record<string, unknown>;
    for (const k of Object.keys(props)) propKeysSeen.add(k);
    if (sampleProps.length < 3) sampleProps.push(props);
    // Check every string/number property for a normalized match (schema-agnostic)
    for (const v of Object.values(props)) {
      if (typeof v !== "string" && typeof v !== "number") continue;
      if (normalizeRegionName(v) === needle) return f;
    }
  }
  // Fallback: substring match across all string/number properties
  for (const f of geoJson.features) {
    const props = (f.properties ?? {}) as Record<string, unknown>;
    for (const v of Object.values(props)) {
      if (typeof v !== "string" && typeof v !== "number") continue;
      const norm = normalizeRegionName(v);
      if (norm && (norm.includes(needle) || needle.includes(norm))) return f;
    }
  }
  console.warn(
    `[MapEventBridge] findKecamatanFeature: no match for "${codeOrName}" (normalized "${needle}"). Feature count: ${geoJson.features.length}. Property keys seen:`,
    Array.from(propKeysSeen),
    "Sample properties:",
    sampleProps,
  );
  return null;
}

function clearHighlights(
  highlightLayerRef: React.MutableRefObject<L.LayerGroup | null>
) {
  if (highlightLayerRef.current) {
    highlightLayerRef.current.clearLayers();
    highlightLayerRef.current = null;
  }
}
