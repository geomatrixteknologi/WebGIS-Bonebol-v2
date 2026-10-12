/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// import LegendaTematik from "@/components/LegendaTematik";
import Navbar from "@/components/Navbar";
// import SelectPetaTematik from "@/components/SelectPetaTematik";
import dynamic from "next/dynamic";
import { useMemo, useState, useRef } from "react";
import { Toaster } from "react-hot-toast";
import { MapConfigProvider } from "@/contexts/MapConfigContext";
import { PropertyProvider } from "@/contexts/PropertyContext";
import { PanelProvider } from "@/contexts/PanelContext";
import { AICopilotProvider } from "@/contexts/AICopilotContext";
import { useAuthGuard } from "@/hooks/useAuthGuard";

const CopilotPanel = dynamic(() => import("@/components/CopilotPanel"), { ssr: false });
const CopilotTriggerButton = dynamic(() => import("@/components/CopilotTriggerButton"), { ssr: false });

export default function MapsPage() {
  // const [selectedTematik, setSelectedTematik] = useState<string>("");
  // const [onChangeTematik, setOnChangeTematik] = useState<Record<string, { color: string; weight: number; opacity: number; fillColor: string; fillOpacity: number }> | null>(null); // REMOVED - Not used
  const [isZNT, setIsZNT] = useState<boolean>(false);
  // Removed: searchedPolygon, latitudeCP, longitudeCP, zoom, selectedLayers, pointSelectionCallback - now managed by MapConfigContext
  // const [searchedNOP, setSearchedNOPZoom] = useState(null);
  // const [warnaData, setWarnaData] = useState<WarnaData[]>([]);
  // const [kdKecZNT, setKdKecZNT] = useState<string>("");
  // const [kdKelZNT, setKdKelZNT] = useState<string>("");
  // const [tahunZNT, setTahunZNT] = useState<string>("");
  const [loading, setLoading] = useState(false);
  // const [geoJsonDataZNT, setGeoJsonDataZNT] = useState<GeoJSON.FeatureCollection | null>(null);
  const navbarRef = useRef<any>(null);

  useAuthGuard();

  // Removed: centerpoint and zoom fetch - now handled by useMapConfig hook in MapConfigContext

  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  // const handleResetPolygon = () => {
  //   setSearchedPolygon(null);
  //   setSearchedNOPZoom(null);
  // };

  // Callback function for parcel clicks - calls Navbar's handleParcelClick
  const handleParcelClick = (nop: string, geomData: any, fotoPersil: string[]) => {
    if (navbarRef.current?.handleParcelClick) {
      navbarRef.current.handleParcelClick(nop, geomData, fotoPersil);
    }
  };

  // Removed: Point selection handlers - now handled by MapConfigContext (startPointSelection, cancelPointSelection)

  return (
    <MapConfigProvider>
      <AICopilotProvider>
        <PropertyProvider>
          <PanelProvider defaultPanel="dashboard" defaultOpen={true}>
            <div>
              <Navbar
                ref={navbarRef}
              />
              {/* <SelectPetaTematik ... /> */}
              {/* <LegendaTematik ... /> */}
              <Map
                isZNT={isZNT}
                setIsZNT={setIsZNT}
                loading={loading}
                setLoading={setLoading}
                onParcelClick={handleParcelClick}
                onResetSelection={() => navbarRef.current?.handleResetSelection()}
              />
              <Toaster position="top-center" />
              <CopilotTriggerButton />
              <CopilotPanel />
            </div>
          </PanelProvider>
        </PropertyProvider>
      </AICopilotProvider>
    </MapConfigProvider>
  );
}
