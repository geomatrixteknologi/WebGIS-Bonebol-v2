/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-namespace */
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.vectorgrid";

interface PersilVectorTilesProps {
  layers: string[];
  pointCallback: any;
  onParcelClick?: (nop: string, geomData: any, fotoPersil: string[]) => void;
  tunggakanActive?: boolean;
  tunggakanColorMap?: Record<string, string>;
  paymentStatusActive?: boolean;
  paymentColorMap?: Record<string, string>;
  pendaftaranActive?: boolean;
  sebaranZNTActive?: boolean;
  kelasTanahColorMap?: Record<string, string>;
  selectedNop?: string | null;
}

export const PersilVectorTiles = ({
  layers,
  pointCallback,
  onParcelClick,
  tunggakanActive,
  tunggakanColorMap = {},
  paymentStatusActive,
  paymentColorMap = {},
  pendaftaranActive,
  sebaranZNTActive,
  kelasTanahColorMap = {},
  selectedNop,
}: PersilVectorTilesProps) => {
  const map = useMap();
  const lastClickRef = useRef({ time: 0, nop: "" });
  const vectorGridRef = useRef<any>(null);
  const activeTooltipRef = useRef<L.Tooltip | null>(null);
  const lastHighlightedNopRef = useRef<string | null>(null);

  useEffect(() => {
    // Hanya render jika layer "Batas Persil" aktif
    if (!layers.includes("Batas Persil")) {
      if (vectorGridRef.current) {
        map.removeLayer(vectorGridRef.current);
        vectorGridRef.current = null;
      }
      return;
    }

    const vectorTileOptions = {
      pane: "batas-persil",
      interactive: true,
      minZoom: 7,
      maxZoom: 17,
      getFeatureId: (f: any) => {
        const p = f.properties;
        return `${p.KD_PROV}${p.KD_KAB}${p.KD_KEC}${p.KD_KEL}${p.KD_BLOK}${p.NO_URUT}${p.KD_JNS_OP}`;
      },
      vectorTileLayerStyles: {
        persil_layer: (properties: any) => {
          const NOP = `${properties.KD_PROV}${properties.KD_KAB}${properties.KD_KEC}${properties.KD_KEL}${properties.KD_BLOK}${properties.NO_URUT}${properties.KD_JNS_OP}`;

          // Highlight selected parcel (from search, EWS, or click)
          const cleanSelectedNop = selectedNop?.replace(/\./g, "");
          if (cleanSelectedNop && NOP === cleanSelectedNop) {
            return {
              fill: true,
              fillColor: "#B32113",
              fillOpacity: 0.5,
              color: "#B32113",
              weight: 2,
              opacity: 1,
            };
          }

          // Style Default
          const style = {
            fill: true,
            fillColor: "#FFCC00",
            fillOpacity: 0.3,
            color: "#FFCC00",
            weight: 1,
            opacity: 1,
          };

          // Override style berdasarkan thematic
          if (tunggakanActive && tunggakanColorMap[NOP]) {
            style.fillColor = tunggakanColorMap[NOP];
            style.fillOpacity = 0.7;
          } else if (paymentStatusActive && paymentColorMap[NOP]) {
            style.fillColor = paymentColorMap[NOP] === "paid" ? "#22c55e" : "#ef4444";
            style.fillOpacity = 0.6;
          } else if (pendaftaranActive) {
            style.fillColor = properties.NO_URUT !== "0000" ? "#22c55e" : "#ef4444";
            style.fillOpacity = 0.6;
          } else if (sebaranZNTActive && kelasTanahColorMap[NOP]) {
            style.fillColor = kelasTanahColorMap[NOP];
            style.fillOpacity = 0.7;
          }

          return style;
        },
      },
    };

    const url = `${process.env.NEXT_PUBLIC_GIS_API_URL}/api/retrieve/tile/persil/{z}/{x}/{y}`;
    const vectorGrid = (L as any).vectorGrid.protobuf(url, vectorTileOptions);

    // --- EVENT HANDLERS ---

    // --- MOUSEOVER (Tooltip) ---
    vectorGrid.on("mouseover", (e: any) => {
      if (pointCallback) return;
      if (activeTooltipRef.current) activeTooltipRef.current.remove();

      const p = e.layer.properties;
      const NOP_DOT = `${p.KD_PROV}.${p.KD_KAB}.${p.KD_KEC}.${p.KD_KEL}.${p.KD_BLOK}.${p.NO_URUT}.${p.KD_JNS_OP}`;

      activeTooltipRef.current = L.tooltip({
        className: "custom-parcel-tooltip",
        direction: "top",
        offset: [0, -10],
        opacity: 0.95,
        sticky: true,
      })
        .setLatLng(e.latlng)
        .setContent(
          `
        <div class="custom-tooltip">
          <div class="tooltip-header"><span class="tooltip-title">NOP: ${NOP_DOT}</span></div>
          <div class="tooltip-content"><p>Klik untuk detail</p></div>
        </div>
      `,
        )
        .addTo(map);
    });

    vectorGrid.on("mouseout", () => {
      if (activeTooltipRef.current) {
        activeTooltipRef.current.remove();
        activeTooltipRef.current = null;
      }
    });

    // --- CLICK (Highlight & Detail) ---
    vectorGrid.on("click", (e: any) => {
      if (pointCallback) return;
      if (activeTooltipRef.current) {
        activeTooltipRef.current.remove();
        activeTooltipRef.current = null;
      }

      const p = e.layer.properties;
      if (!p.NO_URUT) return;

      const NOP = `${p.KD_PROV}${p.KD_KAB}${p.KD_KEC}${p.KD_KEL}${p.KD_BLOK}${p.NO_URUT}${p.KD_JNS_OP}`;

      // 1. Reset highlight sebelumnya (jika ada)
      if (lastHighlightedNopRef.current) {
        vectorGrid.resetFeatureStyle(lastHighlightedNopRef.current);
      }

      // 2. Terapkan highlight merah pada NOP yang diklik
      vectorGrid.setFeatureStyle(NOP, {
        fill: true,
        fillColor: "#B32113",
        fillOpacity: 0.5,
        color: "#B32113",
        weight: 2,
        opacity: 1,
      });
      lastHighlightedNopRef.current = NOP;

      // 3. Debounce & Propagation
      const now = Date.now();
      if (now - lastClickRef.current.time < 300 && lastClickRef.current.nop === NOP) return;
      lastClickRef.current = { time: now, nop: NOP };

      if (e.originalEvent) L.DomEvent.stopPropagation(e.originalEvent);

      // 4. Kirim LatLng ke Parent untuk menggantikan polygon geometry (untuk fitBounds)
      if (onParcelClick) {
        const p = e.layer.properties;
        const NOP = `${p.KD_PROV}${p.KD_KAB}${p.KD_KEC}${p.KD_KEL}${p.KD_BLOK}${p.NO_URUT}${p.KD_JNS_OP}`;

        // Buat dummy geometry standar GeoJSON dari latlng klik
        const dummyGeom = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [e.latlng.lng, e.latlng.lat], // GeoJSON format [lng, lat]
          },
          properties: p,
        };
        onParcelClick(NOP, dummyGeom, p.FOTO_PERSIL || []);
      }
    });

    vectorGrid.addTo(map);
    vectorGridRef.current = vectorGrid;

    return () => {
      if (vectorGridRef.current) {
        map.removeLayer(vectorGridRef.current);
      }
    };
    // Update layer saat ada perubahan state thematic atau filter
  }, [map, layers, pointCallback, tunggakanActive, tunggakanColorMap, paymentStatusActive, paymentColorMap, pendaftaranActive, sebaranZNTActive, kelasTanahColorMap, onParcelClick, selectedNop]);

  useEffect(() => {
    if (!selectedNop && lastHighlightedNopRef.current && vectorGridRef.current) {
      vectorGridRef.current.resetFeatureStyle(lastHighlightedNopRef.current);
      lastHighlightedNopRef.current = null;
    }
  }, [selectedNop]);

  return null;
};
