import { useCallback } from "react";
import L from "leaflet";
import { useAICopilot, MapContextData, MapType } from "@/contexts/AICopilotContext";

/**
 * useMapContext — Serializes current Leaflet map state into a MapContextData object
 * and sends it to the AI Copilot context. Use this hook to sync map state changes
 * (zoom, layer switch, year change, parcel click) with the AI service.
 */
export function useMapContext(mapRef: React.RefObject<L.Map | null>) {
  const { updateMapContext, mapContext } = useAICopilot();

  const syncMapContext = useCallback(
    (
      overrides: {
        map_type?: MapType;
        year?: string;
        kecamatan?: string | null;
        last_clicked_nop?: string | null;
        active_region?: string | null;
      } = {}
    ) => {
      const map = mapRef.current;
      if (!map) return;

      const bounds = map.getBounds();

      const ctx: MapContextData = {
        map_type: overrides.map_type ?? mapContext?.map_type ?? "payment_status",
        year: overrides.year ?? mapContext?.year ?? new Date().getFullYear().toString(),
        zoom_level: map.getZoom(),
        bounds: {
          north: bounds.getNorth(),
          south: bounds.getSouth(),
          east: bounds.getEast(),
          west: bounds.getWest(),
        },
        active_region: overrides.active_region ?? mapContext?.active_region ?? null,
        kecamatan: overrides.kecamatan ?? mapContext?.kecamatan ?? null,
        last_clicked_nop: overrides.last_clicked_nop ?? mapContext?.last_clicked_nop ?? null,
      };

      updateMapContext(ctx);
      return ctx;
    },
    [mapRef, mapContext, updateMapContext]
  );

  const setLastClickedNop = useCallback(
    (nop: string) => {
      syncMapContext({ last_clicked_nop: nop });
    },
    [syncMapContext]
  );

  const setActiveRegion = useCallback(
    (region: string | null) => {
      syncMapContext({ active_region: region });
    },
    [syncMapContext]
  );

  return {
    syncMapContext,
    setLastClickedNop,
    setActiveRegion,
    currentMapContext: mapContext,
  };
}
