/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-namespace */
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.vectorgrid";

interface KelurahanVectorTilesProps {
  layers: string[];
  pointCallback: any;
}

export const KelurahanVectorTiles = ({ layers, pointCallback }: KelurahanVectorTilesProps) => {
  const map = useMap();
  const vectorGridRef = useRef<any>(null);
  const activeTooltipRef = useRef<L.Tooltip | null>(null);

  useEffect(() => {
    // Hanya render jika layer "Batas Persil" aktif
    if (!layers.includes("Batas Kelurahan")) {
      if (vectorGridRef.current) {
        map.removeLayer(vectorGridRef.current);
        vectorGridRef.current = null;
      }
      return;
    }

    const vectorTileOptions = {
      pane: "batas-kelurahan",
      interactive: true,
      minZoom: 7,
      maxZoom: 17,
      getFeatureId: (f: any) => {
        const p = f.properties;
        return `${p.KD_PROV}${p.KD_KAB}${p.KD_KEC}${p.KD_KEL}${p.NM_KEL}`;
      },
      vectorTileLayerStyles: {
        kelurahan_layer: () => {
          // Style Default
          const style = {
            fill: true,
            fillColor: "#8b5cf6",
            fillOpacity: 0,
            color: "#8b5cf6",
            weight: 2.5,
            opacity: 1,
          };

          return style;
        },
      },
    };

    const url = `${process.env.NEXT_PUBLIC_GIS_API_URL}/api/retrieve/tile/kelurahan/{z}/{x}/{y}`;
    const vectorGrid = (L as any).vectorGrid.protobuf(url, vectorTileOptions);

    // --- EVENT HANDLERS ---

    // --- MOUSEOVER (Tooltip) ---
    vectorGrid.on("mouseover", (e: any) => {
      if (pointCallback) return;
      if (activeTooltipRef.current) activeTooltipRef.current.remove();

      const p = e.layer.properties;
      const KELURAHAN = `${p.NM_KEL}`;

      activeTooltipRef.current = L.tooltip({
        className: "kelurahan-tooltip",
        direction: "top",
        offset: [0, -10],
        opacity: 0.95,
        sticky: true,
      })
        .setLatLng(e.latlng)
        .setContent(
          `
        <div style="
                background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%);
                border: 1px solid #a78bfa;
                border-radius: 6px;
                padding: 8px 12px;
                color: white;
                font-family: 'Sora', sans-serif;
                font-size: 13px;
                font-weight: 600;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
                ">
                    Kelurahan: ${KELURAHAN}
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

    vectorGrid.addTo(map);
    vectorGridRef.current = vectorGrid;

    return () => {
      if (vectorGridRef.current) {
        map.removeLayer(vectorGridRef.current);
      }
    };
  }, [layers, map, pointCallback]);

  return null;
};
