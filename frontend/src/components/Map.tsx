/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { MapContainer, TileLayer, GeoJSON as LeafletGeoJSON, Pane } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import MapToolControl from "./MapToolControl";
import CustomZoomControl from "./CustomZoomControl";
import ThematicAnalysisDrawer from "./ThematicAnalysisDrawer";
import ZNTDrawer from "./ZNTDrawer";
import PajakLainDrawer from "./PajakLainDrawer";
import TunggakanLegend from "./TunggakanLegend";
import SebaranZNTLegend from "./SebaranZNTLegend";
import AxiosError from "axios";
import toast from "react-hot-toast";
import L from "leaflet";
import { getPolygonCenter } from "@/utility/GetPolygonCenter";
import { renderToString } from "react-dom/server";
import { Hotel, UtensilsCrossed } from "lucide-react";
// import { defaultGeoJsonStyle } from "@/utility/GeoJSONStyles";
import { Backdrop, CircularProgress } from "@mui/material";
import { useMapConfigContext } from "@/contexts/MapConfigContext";
import PembayaranLegend from "./PembayaranLegend";
import { ApiResponse } from "@/interface/generalInterface";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { usePropertyContext } from "@/contexts/PropertyContext";
import { useAICopilot } from "@/contexts/AICopilotContext";
import { useMapEventBridge } from "@/components/MapEventBridge";
import { PersilVectorTiles } from "./VectorTiles/PersilVectorTiles";
import { BlokVectorTiles } from "./VectorTiles/BlokVectorTiles";
import { KelurahanVectorTiles } from "./VectorTiles/KelurahanVectorTiles";

declare global {
  interface Window {
    resetSelectionCallback?: () => void;
  }
}

interface MapsProps {
  isZNT: boolean;
  setIsZNT: (value: boolean) => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<any>>;
  onParcelClick?: (nop: string, geomData: any, fotoPersil: string[]) => void;
  onResetSelection?: () => void;
  // Optional props for backward compatibility - will use context if not provided
  searchedPolygon?: any;
  latitudeCP?: any;
  longitudeCP?: any;
  zoom?: any;
  selectedLayers?: string[];
  setSelectedLayers?: (layers: string[]) => void;
  pointSelectionCallback?: ((lat: number, lng: number) => void) | null;
}

const Maps = ({ isZNT, setIsZNT, searchedPolygon, latitudeCP, longitudeCP, loading, setLoading, zoom, onParcelClick, onResetSelection, selectedLayers, setSelectedLayers, pointSelectionCallback }: MapsProps) => {
  // Use MapConfigContext
  const {
    latitude: contextLatitude,
    longitude: contextLongitude,
    zoom: contextZoom,
    selectedLayers: contextSelectedLayers,
    setSelectedLayers: contextSetSelectedLayers,
    searchedPolygon: contextSearchedPolygon,
    pointSelectionCallback: contextPointSelectionCallback,
    focusedKecamatanCode,
  } = useMapConfigContext();

  const { nop } = usePropertyContext();
  const { updateMapContext } = useAICopilot();

  // Use context values with prop fallbacks for backward compatibility
  const latitude = latitudeCP ?? contextLatitude;
  const longitude = longitudeCP ?? contextLongitude;
  const zoomLevel = zoom ?? contextZoom;
  const layers = selectedLayers ?? contextSelectedLayers;
  const setLayers = setSelectedLayers ?? contextSetSelectedLayers;
  const polygon = searchedPolygon ?? contextSearchedPolygon;
  const pointCallback = pointSelectionCallback ?? contextPointSelectionCallback;

  const [geoJsonDataPersil, setGeoJsonDataPersil] = useState<GeoJSON.FeatureCollection | null>(null);
  const [geoJsonDataBlok, setGeoJsonDataBlok] = useState<GeoJSON.FeatureCollection | null>(null);
  const [geoJsonDataKelurahan, setGeoJsonDataKelurahan] = useState<GeoJSON.FeatureCollection | null>(null);
  const [geoJsonDataKecamatan, setGeoJsonDataKecamatan] = useState<GeoJSON.FeatureCollection | null>(null);
  const [selectedLayerBasemap, setSelectedLayerBasemap] = useState<string>("Dark");
  const [selectedLayerBatas, setSelectedLayerBatas] = useState<string>("Batas Persil");
  const [mouseCoords, setMouseCoords] = useState({ lat: "--.----", lng: "--.----" });

  // PBJT states
  const [pbjtActive, setPbjtActive] = useState(false);
  const [pbjtData, setPbjtData] = useState<any[]>([]);

  // Drawer state management - only one drawer can be open at a time
  const [openDrawer, setOpenDrawer] = useState<"thematic" | "znt" | "pajak" | null>(null);

  // Payment status visualization states
  const [paymentStatusActive, setPaymentStatusActive] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [paymentStatusYear, setPaymentStatusYear] = useState<string>("");
  const [paymentColorMap, setPaymentColorMap] = useState<Record<string, "paid" | "unpaid">>({});

  // Tunggakan status visualization states
  const [tunggakanActive, setTunggakanActive] = useState(false);
  const [tunggakanColorMap, setTunggakanColorMap] = useState<Record<string, string>>({});

  // Registration status visualization state
  const [pendaftaranActive, setPendaftaranActive] = useState(false);

  // Sebaran ZNT (Kelas Tanah) visualization states
  const [sebaranZNTActive, setSebaranZNTActive] = useState(false);
  const [kelasTanahColorMap, setKelasTanahColorMap] = useState<Record<string, string>>({});
  const [kelasTanahLegendData, setKelasTanahLegendData] = useState<
    Array<{
      kode: string;
      color: string;
      nilaiPerM2: number | null;
      nilaiPerM2BatasBawah: number | null;
      nilaiPerM2BatasAtas: number | null;
    }>
  >([]);

  // Set up global reset callback
  useEffect(() => {
    if (typeof window !== "undefined" && onResetSelection) {
      window.resetSelectionCallback = () => {
        // Close any open tooltips before resetting
        if (typeof window !== "undefined" && window.L && window.L.DomEvent) {
          // Close all tooltips by dispatching a click event on the map
          const mapContainer = document.querySelector(".leaflet-container") as HTMLElement;
          if (mapContainer) {
            mapContainer.click();
          }
        }

        // Clear the searched polygon highlight
        if (mapRef.current && searchRef.current) {
          mapRef.current.removeLayer(searchRef.current);
          searchRef.current = null;
        }

        onResetSelection();
      };
    }

    return () => {
      if (typeof window !== "undefined") {
        delete window.resetSelectionCallback;
      }
    };
  }, [onResetSelection]);

  useAuthGuard();

  // Fetch PBJT data
  const fetchPbjtData = async () => {
    try {
      const response = await axios.get<any>(`${process.env.NEXT_PUBLIC_GIS_API_URL}/api/retrieve/pbjt`, {
        withCredentials: true,
      });

      if (response.data.code === 200) {
        setPbjtData(response.data.data || []);
      } else {
        setPbjtData([]);
      }
    } catch (error) {
      console.error("Error fetching PBJT data:", error);
      setPbjtData([]);
    }
  };

  // Handle PBJT toggle
  const handlePbjtToggle = (active: boolean) => {
    setPbjtActive(active);
    if (active && pbjtData.length === 0) {
      fetchPbjtData();
    }
  };

  // Fetch payment status data
  const fetchPaymentStatus = async (year: string) => {
    try {
      setLoading(true);
      const response = await axios.get<{
        code: number;
        data: Record<string, "paid" | "unpaid">;
        message: string;
      }>(`${process.env.NEXT_PUBLIC_PBB_API_URL}/api/retrieve/paymentstatus?tahun=${year}`, {
        withCredentials: true,
      });

      if (response.data.code === 200) {
        setPaymentColorMap(response.data.data);
      } else {
        setPaymentColorMap({});
        toast.error("Gagal mengambil data status pembayaran");
      }
    } catch (error) {
      console.error("Error fetching payment status:", error);
      setPaymentColorMap({});
      toast.error("Terjadi kesalahan saat mengambil data status pembayaran");
    } finally {
      setLoading(false);
    }
  };

  // Handle payment status toggle
  const handlePaymentStatusChange = (year: string, active: boolean) => {
    setPaymentStatusActive(active);
    setPaymentStatusYear(year);

    if (active) {
      fetchPaymentStatus(year);
      // Deactivate tunggakan, pendaftaran, and sebaran ZNT when payment status is activated
      setTunggakanActive(false);
      setTunggakanColorMap({});
      setPendaftaranActive(false);
      setSebaranZNTActive(false);
      setKelasTanahColorMap({});

      // Update AI Copilot map context
      const map = mapRef.current;
      updateMapContext({
        map_type: "payment_status",
        year,
        zoom_level: map?.getZoom() ?? zoomLevel ?? 10,
        bounds: map ? {
          north: map.getBounds().getNorth(),
          south: map.getBounds().getSouth(),
          east: map.getBounds().getEast(),
          west: map.getBounds().getWest(),
        } : null,
      });
    } else {
      setPaymentColorMap({});
    }
  };

  // Function to get color based on days overdue
  const getTunggakanColor = (daysOverdue: number): string => {
    if (daysOverdue < 180) return "#fca5a5"; // < 6 months - light red
    if (daysOverdue < 365) return "#ef4444"; // 6-12 months - red
    if (daysOverdue < 730) return "#b91c1c"; // 1-2 years - dark red
    if (daysOverdue < 1825) return "#7f1d1d"; // 2-5 years - maroon
    return "#000000"; // > 5 years - black
  };

  // Fetch tunggakan status data
  const fetchTunggakanStatus = async () => {
    try {
      setLoading(true);
      const response = await axios.get<{
        code: number;
        data: Array<{ nop: string; daysOverdue: number }>;
        message: string;
      }>(`${process.env.NEXT_PUBLIC_PBB_API_URL}/api/retrieve/overdue-map-data`, {
        withCredentials: true,
      });

      if (response.data.code === 200) {
        // Convert array to color map
        const colorMap: Record<string, string> = {};
        response.data.data.forEach((item) => {
          colorMap[item.nop] = getTunggakanColor(item.daysOverdue);
        });
        setTunggakanColorMap(colorMap);
        toast.success(`Status tunggakan berhasil dimuat (${response.data.data.length} NOP)`);
      } else {
        setTunggakanColorMap({});
        toast.error("Gagal mengambil data status tunggakan");
      }
    } catch (error) {
      console.error("Error fetching tunggakan status:", error);
      setTunggakanColorMap({});
      toast.error("Terjadi kesalahan saat mengambil data status tunggakan");
    } finally {
      setLoading(false);
    }
  };

  // Handle tunggakan status toggle
  const handleTunggakanStatusToggle = (active: boolean) => {
    setTunggakanActive(active);

    if (active) {
      fetchTunggakanStatus();
      // Deactivate payment status, pendaftaran, and sebaran ZNT when tunggakan is activated
      setPaymentStatusActive(false);
      setPaymentColorMap({});
      setPendaftaranActive(false);
      setSebaranZNTActive(false);
      setKelasTanahColorMap({});

      // Update AI Copilot map context. The tunggakan map aggregates across
      // ALL tax years (via /overdue-map-data without a year filter), so pass
      // "all" to keep the briefing consistent with what the user sees.
      const map = mapRef.current;
      updateMapContext({
        map_type: "overdue_status",
        year: "all",
        zoom_level: map?.getZoom() ?? zoomLevel ?? 10,
        bounds: map ? {
          north: map.getBounds().getNorth(),
          south: map.getBounds().getSouth(),
          east: map.getBounds().getEast(),
          west: map.getBounds().getWest(),
        } : null,
      });
    } else {
      setTunggakanColorMap({});
    }
  };

  // Handle pendaftaran status toggle
  const handlePendaftaranStatusToggle = (active: boolean) => {
    setPendaftaranActive(active);

    if (active) {
      // Deactivate other status visualizations when pendaftaran is activated
      setPaymentStatusActive(false);
      setPaymentColorMap({});
      setTunggakanActive(false);
      setTunggakanColorMap({});
      setSebaranZNTActive(false);
      setKelasTanahColorMap({});
      toast.success("Status Pendaftaran aktif");
    }
    // No toast on deactivation to avoid notification spam
  };

  // Generate distinct colors for kelas tanah using HSL color space
  const generateKelasTanahColors = (count: number): string[] => {
    const colors: string[] = [];
    const hueStep = 360 / count;

    for (let i = 0; i < count; i++) {
      const hue = (i * hueStep) % 360;
      // Vary saturation and lightness to create more distinct colors
      const saturation = 70 + (i % 3) * 10; // 70%, 80%, 90%
      const lightness = 45 + (i % 4) * 5; // 45%, 50%, 55%, 60%
      colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }

    return colors;
  };

  // Fetch sebaran ZNT (kelas tanah) data
  const fetchSebaranZNTKelasTanah = async (year?: number) => {
    try {
      setLoading(true);
      const currentYear = year || new Date().getFullYear() - 1;
      const response = await axios.get<{
        code: number;
        data: {
          nopKelasMap: Record<string, string>;
          kelasTanahData: Array<{
            kode: string;
            nilaiPerM2: number | null;
            nilaiPerM2BatasBawah: number | null;
            nilaiPerM2BatasAtas: number | null;
          }>;
        };
        message: string;
      }>(`${process.env.NEXT_PUBLIC_PBB_API_URL}/api/retrieve/sebaranzntkelastanah?tahun=${currentYear}`, {
        withCredentials: true,
      });

      if (response.data.code === 200) {
        const { nopKelasMap, kelasTanahData } = response.data.data;

        // Generate colors for all kelas tanah
        const colors = generateKelasTanahColors(kelasTanahData.length);

        // Create kode -> color mapping
        const kodeColorMap: Record<string, string> = {};
        kelasTanahData.forEach((kt, index) => {
          kodeColorMap[kt.kode] = colors[index];
        });

        // Create NOP -> color mapping
        const nopColors: Record<string, string> = {};
        Object.entries(nopKelasMap).forEach(([nop, kode]) => {
          if (kodeColorMap[kode]) {
            nopColors[nop] = kodeColorMap[kode];
          }
        });

        // Prepare legend data
        const legendData = kelasTanahData.map((kt, index) => ({
          kode: kt.kode,
          color: colors[index],
          nilaiPerM2: kt.nilaiPerM2,
          nilaiPerM2BatasBawah: kt.nilaiPerM2BatasBawah,
          nilaiPerM2BatasAtas: kt.nilaiPerM2BatasAtas,
        }));

        setKelasTanahColorMap(nopColors);
        setKelasTanahLegendData(legendData);
        toast.success(`Sebaran ZNT berhasil dimuat (${kelasTanahData.length} kelas tanah)`);
      } else {
        setKelasTanahColorMap({});
        setKelasTanahLegendData([]);
        toast.error("Gagal mengambil data sebaran ZNT");
      }
    } catch (error) {
      console.error("Error fetching sebaran ZNT:", error);
      setKelasTanahColorMap({});
      setKelasTanahLegendData([]);
      toast.error("Terjadi kesalahan saat mengambil data sebaran ZNT");
    } finally {
      setLoading(false);
    }
  };

  // Handle sebaran ZNT toggle
  const handleSebaranZNTToggle = (active: boolean, year?: number) => {
    setSebaranZNTActive(active);

    if (active) {
      fetchSebaranZNTKelasTanah(year);
      // Deactivate other status visualizations when sebaran ZNT is activated
      setPaymentStatusActive(false);
      setPaymentColorMap({});
      setTunggakanActive(false);
      setTunggakanColorMap({});
      setPendaftaranActive(false);
    } else {
      setKelasTanahColorMap({});
      setKelasTanahLegendData([]);
    }
    // No toast on deactivation to avoid notification spam
  };

  // FETCH BATAS PERSIL
  useEffect(() => {
    // Fetch data persil dari API
    const fetchDataPersil = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse<GeoJSON.Feature>>(`${process.env.NEXT_PUBLIC_GIS_API_URL}/api/retrieve/bataspersil`, {
          withCredentials: true,
        });
        setGeoJsonDataPersil({
          type: "FeatureCollection",
          features: response.data.data,
        }); // Simpan data GeoJSON ke state
      } catch (error) {
        if (error instanceof AxiosError && (await error).status === 404) {
          toast.error("Data batas persil tidak ditemukan.");
          return { code: 404, data: [], message: "Data batas persil tidak tersedia" };
        }
        console.error("Error fetching data:", error);
        return { code: 500, data: [], message: "Terjadi kesalahan" };
      } finally {
        setLoading(false);
      }
    };

    fetchDataPersil();
  }, [setLoading]);

  // FETCH BATAS BLOK
  useEffect(() => {
    // Fetch data persil dari API
    const fetchDataBlok = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse<GeoJSON.Feature>>(`${process.env.NEXT_PUBLIC_GIS_API_URL}/api/retrieve/batasblok`, {
          withCredentials: true,
        });
        setGeoJsonDataBlok({
          type: "FeatureCollection",
          features: response.data.data,
        }); // Simpan data GeoJSON ke state
      } catch (error) {
        if (error instanceof AxiosError && (await error).status === 404) {
          toast.error("Data batas blok tidak ditemukan.");
          return { code: 404, data: [], message: "Data batas blok tidak tersedia" };
        }
        console.error("Error fetching data:", error);
        return { code: 500, data: [], message: "Terjadi kesalahan" };
      } finally {
        setLoading(false);
      }
    };

    fetchDataBlok();
  }, [setLoading]);

  // Fetch Batas Kelurahan data
  useEffect(() => {
    const fetchDataKelurahan = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse<GeoJSON.Feature>>(`${process.env.NEXT_PUBLIC_GIS_API_URL}/api/retrieve/bataskelurahan`, {
          withCredentials: true,
        });
        setGeoJsonDataKelurahan({
          type: "FeatureCollection",
          features: response.data.data,
        });
      } catch (error) {
        if (error instanceof AxiosError && (await error).status === 404) {
          toast.error("Data batas kelurahan tidak ditemukan.");
        }
        console.error("Error fetching batas kelurahan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataKelurahan();
  }, [setLoading]);

  // Fetch Batas Kecamatan data
  useEffect(() => {
    const fetchDataKecamatan = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_GIS_API_URL}/api/retrieve/bataskecamatan`, {
          withCredentials: true,
        });

        // The API returns { data: { type: "FeatureCollection", features: [...] } }
        const featureCollection = (response.data as any).data;

        if (featureCollection && featureCollection.type === "FeatureCollection") {
          setGeoJsonDataKecamatan(featureCollection);
        } else {
          console.error("Invalid kecamatan data format:", response.data);
        }
      } catch (error) {
        if (error instanceof AxiosError && (await error).status === 404) {
          toast.error("Data batas kecamatan tidak ditemukan.");
        }
        console.error("Error fetching batas kecamatan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataKecamatan();
  }, [setLoading]);

  // Fly to kecamatan when focused kecamatan code changes
  useEffect(() => {
    if (!focusedKecamatanCode || !mapRef.current || !geoJsonDataKecamatan) return;

    // Find the kecamatan feature by name (matching the selector value)
    const kecamatanFeature = geoJsonDataKecamatan.features.find((feature: any) => feature.properties.NM_KEC === focusedKecamatanCode);

    if (kecamatanFeature && kecamatanFeature.geometry) {
      // Create a temporary layer to get bounds
      const tempLayer = L.geoJSON(kecamatanFeature.geometry);
      const bounds = tempLayer.getBounds();

      // Fly to the bounds with animation
      mapRef.current.flyToBounds(bounds, {
        padding: [50, 50],
        maxZoom: 14,
        duration: 1.5,
      });
    }
  }, [focusedKecamatanCode, geoJsonDataKecamatan]);

  // const onEachFeaturePersil = (feature: any, layer: any) => {
  //   if (feature.properties) {
  //     const NOP = `${feature.properties.KD_PROV}.${feature.properties.KD_KAB}.${feature.properties.KD_KEC}.${feature.properties.KD_KEL}.${feature.properties.KD_BLOK}.${feature.properties.NO_URUT}.${feature.properties.KD_JNS_OP}`;

  //     // Create custom tooltip with brand colors and reset button
  //     const tooltipContent = `
  //       <div class="custom-tooltip">
  //         <div class="tooltip-header">
  //           <span class="tooltip-title">NOP: ${NOP}</span>
  //         </div>
  //         <div class="tooltip-content">
  //           <p>Klik untuk melihat detail properti</p>
  //         </div>
  //       </div>
  //     `;

  //     layer.bindTooltip(tooltipContent, {
  //       className: "custom-parcel-tooltip",
  //       direction: "top",
  //       offset: [0, -10],
  //       opacity: 0.95,
  //       permanent: false,
  //       interactive: true,
  //     });

  //     // Disable tooltip when point selection mode is active
  //     layer.on("mouseover", () => {
  //       if (pointCallback) {
  //         layer.closeTooltip();
  //       }
  //     });
  //   }

  //   const NOP = `${feature.properties.KD_PROV}${feature.properties.KD_KAB}${feature.properties.KD_KEC}${feature.properties.KD_KEL}${feature.properties.KD_BLOK}${feature.properties.NO_URUT}${feature.properties.KD_JNS_OP}`;

  //   // Track last click time and NOP to prevent rapid duplicate clicks
  //   let lastClickTime = 0;
  //   let lastClickedNOP = "";

  //   layer.on("click", (e: L.LeafletMouseEvent) => {
  //     // Priority check: If point selection mode is active, don't handle parcel clicks
  //     if (pointCallback) {
  //       // Let the point selection handler take priority
  //       return;
  //     }

  //     if (feature.properties.NO_URUT === null) {
  //       return; // Skip if no data
  //     }

  //     // Debounce rapid clicks (prevent double-click issues)
  //     const now = Date.now();
  //     if (now - lastClickTime < 300 && lastClickedNOP === NOP) {
  //       // Ignore clicks within 300ms on the same parcel
  //       return;
  //     }
  //     lastClickTime = now;
  //     lastClickedNOP = NOP;

  //     // Prevent event propagation to map
  //     if (e.originalEvent) {
  //       L.DomEvent.stopPropagation(e.originalEvent);
  //     }

  //     // Show tooltip on click
  //     layer.openTooltip();

  //     // Use callback to open Property Details panel instead of drawer
  //     if (onParcelClick) {
  //       onParcelClick(NOP, feature.geometry, feature.properties.FOTO_PERSIL || []);
  //     }
  //   });
  // };

  const mapRef = useRef<L.Map | null>(null);

  // Wire up AI Copilot MapCommand execution on the Leaflet map
  useMapEventBridge(
    mapRef,
    geoJsonDataKecamatan,
    onParcelClick
      ? (clickNop, clickGeom) => onParcelClick(clickNop, clickGeom, [])
      : undefined,
  );

  // useEffect(() => {
  //   if (polygon && mapRef.current) {
  //     const coords = polygon.coordinates.flat(2); // Assuming it's a Polygon
  //     const centroid = getPolygonCenter(coords);
  //     mapRef.current.setView(centroid, 20, { animate: true });
  //   }
  // }, [polygon]);

  useEffect(() => {
    if (polygon && mapRef.current) {
      let centroid: L.LatLngExpression | null = null;

      // 1. Cek jika data adalah FeatureCollection (Hasil Search)
      if (polygon.type === "FeatureCollection" && polygon.features.length > 0) {
        const feature = polygon.features[0];
        if (feature.geometry.type === "Polygon" || feature.geometry.type === "MultiPolygon") {
          const coords = (feature.geometry as any).coordinates.flat(feature.geometry.type === "MultiPolygon" ? 3 : 2);
          // Pastikan coords ada sebelum diproses
          if (coords && coords.length > 0) {
            centroid = getPolygonCenter(coords);
          }
        }
      }
      // 2. Cek jika data adalah Single Feature (Hasil Klik Vector Tile di langkah 1)
      else if (polygon.geometry) {
        const geom = polygon.geometry;
        if (geom.type === "Point") {
          centroid = [geom.coordinates[1], geom.coordinates[0]]; // Balik ke [lat, lng]
        } else if (geom.type === "Polygon") {
          const coords = geom.coordinates.flat(2);
          centroid = getPolygonCenter(coords);
        }
      }

      if (centroid) {
        mapRef.current.setView(centroid, 20, { animate: true });
      }
    }
  }, [polygon]);

  const searchRef = useRef<L.GeoJSON | null>(null); // Store previous polygon

  useEffect(() => {
    if (mapRef.current) {
      // Remove previous polygon before adding a new one
      if (searchRef.current) {
        mapRef.current.removeLayer(searchRef.current);
      }

      if (polygon) {
        // Create highlighted polygon with same yellow style as default parcel
        const newLayer = L.geoJSON(polygon, {
          style: {
            color: "#B32113", // Same yellow as default parcel border
            weight: 1, // Match default parcel weight
            opacity: 1,
            fillColor: "#B32113",
            fillOpacity: 0.5, // Match default parcel fillOpacity
          },
        });

        newLayer.addTo(mapRef.current); // Add the new polygon to the map
        mapRef.current.fitBounds(newLayer.getBounds(), {
          padding: [50, 50],
          maxZoom: 17, // Limit zoom when fitting bounds to prevent over-zooming
        }); // Zoom to new polygon

        searchRef.current = newLayer; // Store reference to the new polygon
      }
    }
  }, [polygon]);

  // Mouse coordinate handler - using Leaflet's built-in events
  useEffect(() => {
    const setupMouseHandler = () => {
      if (!mapRef.current) {
        // Retry after a short delay if map is not ready
        setTimeout(setupMouseHandler, 100);
        return;
      }

      const map = mapRef.current;

      const handleMouseMove = (e: any) => {
        try {
          let lat = e.latlng.lat;
          let lng = e.latlng.lng;
          // Detect EPSG:3857 (values outside geodetic range)
          if (Math.abs(lat) > 90 || Math.abs(lng) > 180) {
            const rad = Math.PI / 180;
            lng = (lng / 20037508.34) * 180;
            lat = (180 / Math.PI) * (2 * Math.atan(Math.exp((lat * rad) / 20037508.34)) - Math.PI / 2);
          }
          setMouseCoords({
            lat: lat.toFixed(4),
            lng: lng.toFixed(4),
          });
        } catch (error) {
          console.error("Mouse coordinate conversion error:", error);
        }
      };

      // Use Leaflet's built-in mousemove event
      map.on("mousemove", handleMouseMove);

      return () => {
        map.off("mousemove", handleMouseMove);
      };
    };

    const cleanup = setupMouseHandler();

    return cleanup;
  }, []); // Empty dependency array - runs once on mount

  // Point selection handler for PBJT tool
  useEffect(() => {
    if (!mapRef.current || !pointCallback) return;

    const map = mapRef.current;

    const handleMapClick = (e: L.LeafletMouseEvent) => {
      if (pointCallback) {
        const { lat, lng } = e.latlng;
        pointCallback(lat, lng);
      }
    };

    // Add click handler
    map.on("click", handleMapClick);

    // Change cursor to crosshair when in selection mode
    const container = map.getContainer();
    if (container) {
      container.style.cursor = "crosshair";
    }

    // Cleanup
    return () => {
      map.off("click", handleMapClick);
      if (container) {
        container.style.cursor = "";
      }
    };
  }, [pointCallback]);

  // PBJT Points Layer Effect
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Store reference to PBJT layer for cleanup
    let pbjtLayerRef: L.GeoJSON | null = null;

    // Remove existing PBJT layer if it exists
    const removeExistingPbjtLayer = () => {
      map.eachLayer((layer: any) => {
        // Check if this is a PBJT layer by looking for PBJT markers
        if (layer.eachLayer) {
          let hasPbjtMarkers = false;
          layer.eachLayer((sublayer: any) => {
            if (sublayer.options && sublayer.options.icon && sublayer.options.icon.options && sublayer.options.icon.options.className === "pbjt-marker") {
              hasPbjtMarkers = true;
            }
          });
          if (hasPbjtMarkers) {
            map.removeLayer(layer);
          }
        }
      });
    };

    if (pbjtActive && pbjtData.length > 0) {
      // Remove any existing PBJT layers first
      removeExistingPbjtLayer();

      // Create GeoJSON features from PBJT data
      const pbjtFeatures = pbjtData
        .map((point: any) => ({
          type: "Feature" as const,
          geometry: point.geom || null,
          properties: {
            npwpd: point.npwpd,
            nama: point.namaWp,
            koordinat: point.koordinat,
            keterangan: point.keterangan,
            tipeOp: point.tipeOp,
          },
        }))
        .filter((feature: any) => feature.geometry !== null);

      if (pbjtFeatures.length > 0) {
        const pbjtLayer = L.geoJSON(pbjtFeatures, {
          pointToLayer: (feature: any, latlng: any) => {
            const isHotel = feature.properties.tipeOp === "HOTEL";
            const iconColor = isHotel ? "#1e3a8a" : "#7c2d12"; // Navy for hotel, maroon for restaurant

            // Create Lucide React icon SVG
            const IconComponent = isHotel ? Hotel : UtensilsCrossed;
            const iconSvg = renderToString(<IconComponent size={14} color="white" strokeWidth={2.5} />);

            // Create custom icon with Lucide React icons
            const customIcon = L.divIcon({
              html: `<div style="
                width: 28px;
                height: 28px;
                background-color: ${iconColor};
                border: 2px solid white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 6px rgba(0,0,0,0.4);
                position: relative;
              ">
                ${iconSvg}
              </div>`,
              className: "pbjt-marker",
              iconSize: [28, 28],
              iconAnchor: [14, 14],
            });

            return L.marker(latlng, { icon: customIcon });
          },
          onEachFeature: (feature: any, layer: any) => {
            // Create icon for tooltip
            const isHotel = feature.properties.tipeOp === "HOTEL";
            const TooltipIcon = isHotel ? Hotel : UtensilsCrossed;
            const tooltipIconSvg = renderToString(<TooltipIcon size={16} color="white" strokeWidth={2.5} />);

            // Create custom tooltip content
            const tooltipContent = `
              <div style="
                background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
                border: 1px solid #475569;
                border-radius: 8px;
                padding: 12px;
                color: white;
                font-family: 'Sora', sans-serif;
                min-width: 200px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              ">
                <div style="
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  margin-bottom: 8px;
                  padding-bottom: 8px;
                  border-bottom: 1px solid #475569;
                ">
                  <div style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  ">
                    ${tooltipIconSvg}
                  </div>
                  <span style="
                    font-weight: 600;
                    font-size: 14px;
                    color: #f1f5f9;
                  ">${feature.properties.tipeOp}</span>
                </div>
                
                <div style="margin-bottom: 6px;">
                  <span style="
                    color: #94a3b8;
                    font-size: 12px;
                    font-weight: 500;
                  ">NPWPD:</span>
                  <span style="
                    color: #f1f5f9;
                    font-size: 12px;
                    margin-left: 8px;
                  ">${feature.properties.npwpd}</span>
                </div>
                
                <div style="margin-bottom: 6px;">
                  <span style="
                    color: #94a3b8;
                    font-size: 12px;
                    font-weight: 500;
                  ">Nama:</span>
                  <span style="
                    color: #f1f5f9;
                    font-size: 12px;
                    margin-left: 8px;
                  ">${feature.properties.nama || "N/A"}</span>
                </div>
                
                <div style="margin-bottom: 6px;">
                  <span style="
                    color: #94a3b8;
                    font-size: 12px;
                    font-weight: 500;
                  ">Koordinat:</span>
                  <span style="
                    color: #f1f5f9;
                    font-size: 12px;
                    margin-left: 8px;
                  ">${feature.properties.koordinat || "N/A"}</span>
                </div>
                
                ${
                  feature.properties.keterangan
                    ? `
                  <div style="margin-bottom: 6px;">
                    <span style="
                      color: #94a3b8;
                      font-size: 12px;
                      font-weight: 500;
                    ">Keterangan:</span>
                    <span style="
                      color: #f1f5f9;
                      font-size: 12px;
                      margin-left: 8px;
                    ">${feature.properties.keterangan}</span>
                  </div>
                `
                    : ""
                }
                
                <div style="
                  margin-top: 8px;
                  padding-top: 8px;
                  border-top: 1px solid #475569;
                  text-align: center;
                ">
                  <span style="
                    color: #94a3b8;
                    font-size: 11px;
                  ">Klik untuk menutup</span>
                </div>
              </div>
            `;

            // Bind tooltip that opens on click (not hover)
            layer.bindTooltip(tooltipContent, {
              permanent: false,
              direction: "top",
              offset: [0, -10],
              opacity: 1,
              className: "pbjt-tooltip",
              interactive: false, // Disable hover interaction
              sticky: false,
            });

            // ONLY respond to click events, not hover
            layer.off("mouseover mouseout"); // Remove any hover events

            layer.on("click", (e: any) => {
              e.originalEvent.stopPropagation();

              // Close any existing PBJT tooltips first
              if (map) {
                map.eachLayer((mapLayer: any) => {
                  if (mapLayer.eachLayer) {
                    mapLayer.eachLayer((sublayer: any) => {
                      if (sublayer.options && sublayer.options.icon && sublayer.options.icon.options && sublayer.options.icon.options.className === "pbjt-marker" && sublayer.closeTooltip && sublayer !== layer) {
                        sublayer.closeTooltip();
                      }
                    });
                  }
                });
              }

              layer.openTooltip();
            });
          },
        });

        pbjtLayerRef = pbjtLayer;
        pbjtLayer.addTo(map);
      }
    } else {
      // Remove PBJT layer when deactivated
      removeExistingPbjtLayer();
    }

    // Cleanup function
    return () => {
      if (pbjtLayerRef && map) {
        map.removeLayer(pbjtLayerRef);
      }
      removeExistingPbjtLayer();
    };
  }, [pbjtActive, pbjtData]);

  if (latitude === 0 || longitude === 0 || zoomLevel === 0) {
    return (
      <Backdrop open sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <>
      <style jsx global>{`
        .transparent-tooltip {
          background: none !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          margin: 0 !important;
          color: white !important;
          font-size: 14px !important;
          font-weight: bold !important;
          text-shadow:
            1px 1px 3px rgba(0, 0, 0, 0.7),
            -1px -1px 0 #000,
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000 !important;
          width: 50px; /* Set fixed width */
          height: 20px; /* Set fixed height */
          text-align: center;
          white-space: nowrap; /* Prevent text wrapping */
          overflow: hidden; /* Hide overflow text */
        }

        .custom-parcel-tooltip {
          background: #1e293b !important;
          border: 2px solid #3b82f6 !important;
          border-radius: 8px !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3) !important;
          padding: 0 !important;
          margin: 0 !important;
          font-family:
            "Sora",
            -apple-system,
            BlinkMacSystemFont,
            sans-serif !important;
          min-width: 200px !important;
        }

        .custom-parcel-tooltip .leaflet-tooltip-arrow {
          border-top-color: #3b82f6 !important;
        }

        .custom-tooltip {
          padding: 12px;
        }

        .tooltip-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          border-bottom: 1px solid #475569;
          padding-bottom: 6px;
        }

        .tooltip-title {
          font-weight: 600;
          font-size: 14px;
          color: #3b82f6;
          font-family:
            "Sora",
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
        }

        .tooltip-reset-btn {
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 14px;
          font-weight: bold;
          transition: background-color 0.2s;
        }

        .tooltip-reset-btn:hover {
          background: #dc2626;
        }

        .tooltip-content {
          color: #e2e8f0;
          font-size: 12px;
          font-family:
            "Sora",
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
        }

        .tooltip-content p {
          margin: 0;
          line-height: 1.4;
        }

        /* PBJT Tooltip Styles */
        .pbjt-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }

        .pbjt-tooltip::before {
          display: none !important;
        }

        .leaflet-tooltip-pane .pbjt-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }

        /* Kelurahan Tooltip Styles */
        .kelurahan-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          transition: opacity 0.2s ease-in-out;
        }

        .kelurahan-tooltip::before {
          display: none !important;
        }

        /* blok Tooltip Styles */
        .blok-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          transition: opacity 0.2s ease-in-out;
        }

        .blok-tooltip::before {
          display: none !important;
        }

        /* kecamatan Tooltip Styles */
        .kecamatan-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          transition: opacity 0.2s ease-in-out;
        }

        .kecamatan-tooltip::before {
          display: none !important;
        }
      `}</style>

      {/* Set up global reset function */}
      {typeof window !== "undefined" && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.resetSelection = function() {
                if (window.resetSelectionCallback) {
                  window.resetSelectionCallback();
                }
              };
            `,
          }}
        />
      )}

      {/* Map Tool Controls - Basemap and Batas */}
      <MapToolControl
        selectedLayerBasemap={selectedLayerBasemap}
        setSelectedLayerBasemap={setSelectedLayerBasemap}
        selectedLayerBatas={selectedLayerBatas}
        setSelectedLayerBatas={setSelectedLayerBatas}
        setIsZNT={setIsZNT}
        selectedLayers={layers}
        setSelectedLayers={setLayers}
      />

      <div className="relative">
        {/* LandDrawer removed - Using new sidebar system */}

        <MapContainer
          style={{
            height: "100vh",
            zIndex: 1,
          }}
          center={[latitude, longitude]}
          zoom={zoomLevel}
          minZoom={7}
          maxZoom={17}
          scrollWheelZoom={true}
          zoomControl={false}
          attributionControl={false}
          ref={mapRef}
        >
          {/* Atur zIndex batas */}
          <Pane name="popup" style={{ zIndex: 800 }} />
          <Pane name="titik-pendataan" style={{ zIndex: 700 }} />
          <Pane name="batas-persil" style={{ zIndex: 600 }} />
          <Pane name="batas-blok" style={{ zIndex: 500 }} />
          <Pane name="batas-kelurahan" style={{ zIndex: 400 }} />
          <Pane name="batas-kecamatan" style={{ zIndex: 300 }} />

          {/* Layer Peta */}
          {selectedLayerBasemap === "Light" && <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" className="osm-vibrant-style" />}
          {selectedLayerBasemap === "Dark" && <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" className="osm-dark-style" />}
          {selectedLayerBasemap === "Google" && <TileLayer url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}" className="google-map-style" />}
          {selectedLayerBasemap === "Satellite" && (
            <>
              <TileLayer url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}" className="google-satellite-style" />
              <TileLayer url="https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}" className="google-labels-style" />
            </>
          )}

          {/* Layer GeoJSON (Batas Persil) - Main parcels layer */}
          {!isZNT && layers.includes("Batas Persil") && geoJsonDataPersil && (
            // <LeafletGeoJSON
            //   data={geoJsonDataPersil}
            //   onEachFeature={onEachFeaturePersil}
            //   style={(feature) => {
            //     if (!feature || !feature.properties) return defaultGeoJsonStyle;

            //     // Build NOP from feature properties
            //     const NOP = `${feature.properties.KD_PROV}${feature.properties.KD_KAB}${feature.properties.KD_KEC}${feature.properties.KD_KEL}${feature.properties.KD_BLOK}${feature.properties.NO_URUT}${feature.properties.KD_JNS_OP}`;

            //     // If tunggakan status is active, apply color based on overdue duration
            //     if (tunggakanActive && tunggakanColorMap[NOP]) {
            //       return {
            //         color: "#000", // Black border
            //         weight: 1,
            //         opacity: 1,
            //         fillColor: tunggakanColorMap[NOP],
            //         fillOpacity: 0.7,
            //       };
            //     }

            //     // If payment status is active, apply color based on payment status
            //     if (paymentStatusActive && paymentColorMap[NOP]) {
            //       const isPaid = paymentColorMap[NOP] === "paid";
            //       return {
            //         color: "#000", // Black border
            //         weight: 1,
            //         opacity: 1,
            //         fillColor: isPaid ? "#22c55e" : "#ef4444", // Green for paid, Red for unpaid
            //         fillOpacity: 0.6,
            //       };
            //     }

            //     // If pendaftaran status is active, apply color based on NO_URUT
            //     if (pendaftaranActive) {
            //       const isRegistered = feature.properties.NO_URUT !== "0000";
            //       return {
            //         color: "#000", // Black border
            //         weight: 1,
            //         opacity: 1,
            //         fillColor: isRegistered ? "#22c55e" : "#ef4444", // Green for registered, Red for unregistered
            //         fillOpacity: 0.6,
            //       };
            //     }

            //     // If sebaran ZNT is active, apply color based on kelas tanah
            //     if (sebaranZNTActive && kelasTanahColorMap[NOP]) {
            //       return {
            //         color: "#000", // Black border
            //         weight: 1,
            //         opacity: 1,
            //         fillColor: kelasTanahColorMap[NOP],
            //         fillOpacity: 0.7,
            //       };
            //     }

            //     // Default parcel style (when no thematic layer is active)
            //     return {
            //       color: "#FFCC00", // accent-500 color
            //       weight: 1,
            //       opacity: 1,
            //       fillColor: "#FFCC00", // deep slate color
            //       fillOpacity: 0.3, // 20% opacity
            //     };
            //   }}
            //   pane="batas-persil"
            // />
            <PersilVectorTiles
              tunggakanActive={tunggakanActive}
              tunggakanColorMap={tunggakanColorMap}
              paymentStatusActive={paymentStatusActive}
              paymentColorMap={paymentColorMap}
              pendaftaranActive={pendaftaranActive}
              sebaranZNTActive={sebaranZNTActive}
              kelasTanahColorMap={kelasTanahColorMap}
              layers={layers}
              pointCallback={pointCallback}
              onParcelClick={onParcelClick}
              selectedNop={nop}
            />
          )}

          {/* TODO: Add more parcel layers here for future expansion */}
          {/* Example: Batas Persil Tambahan, Batas Persil Khusus, etc. */}
          {/* {selectedLayers.includes("Batas Persil Tambahan") && (
            <LeafletGeoJSON
              data={geoJsonDataPersilTambahan}
              onEachFeature={onEachFeaturePersilTambahan}
              style={(feature) => {
                return {
                  color: "#FFCC00",
                  weight: 1,
                  opacity: 1,
                  fillColor: "#FFCC00",
                  fillOpacity: 0.3,
                };
              }}
              pane="batas-persil"
            />
          )} */}

          {/* Layer Batas Blok - white outline */}
          {layers.includes("Batas Blok") && geoJsonDataBlok && (
            // <LeafletGeoJSON
            //   data={geoJsonDataBlok}
            //   style={() => ({
            //     color: "#f38f42", // Elegant violet color
            //     weight: 2.5, // Thick weight for visibility
            //     opacity: 1,
            //     fillColor: "#f38f42", // Violet fill
            //     fillOpacity: 0, // Very light fill - mostly transparent
            //   })}
            //   onEachFeature={(feature: any, layer: any) => {
            //     if (feature.properties && feature.properties.KD_BLOK) {
            //       // Create simple tooltip showing kelurahan name
            //       const tooltipContent = `
            //         <div style="
            //           background: linear-gradient(135deg, #fac49b 0%, #f38f42 100%);
            //           border: 1px solid #cf9970;
            //           border-radius: 6px;
            //           padding: 8px 12px;
            //           color: white;
            //           font-family: 'Sora', sans-serif;
            //           font-size: 13px;
            //           font-weight: 600;
            //           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
            //         ">
            //           ${feature.properties.KD_BLOK}
            //         </div>
            //       `;

            //       layer.bindTooltip(tooltipContent, {
            //         permanent: false,
            //         direction: "center",
            //         className: "blok-tooltip",
            //         opacity: 1,
            //       });
            //     }
            //   }}
            //   pane="batas-blok"
            // />
            <BlokVectorTiles layers={layers} pointCallback={pointCallback} />
          )}

          {/* Layer Batas Kelurahan - Elegant violet outline */}
          {layers.includes("Batas Kelurahan") && geoJsonDataKelurahan && (
            // <LeafletGeoJSON
            //   data={geoJsonDataKelurahan}
            //   style={() => ({
            //     color: "#8b5cf6", // Elegant violet color
            //     weight: 2.5, // Thick weight for visibility
            //     opacity: 1,
            //     fillColor: "#8b5cf6", // Violet fill
            //     fillOpacity: 0, // Very light fill - mostly transparent
            //   })}
            //   onEachFeature={(feature: any, layer: any) => {
            //     if (feature.properties && feature.properties.NM_KEL) {
            //       // Create simple tooltip showing kelurahan name
            //       const tooltipContent = `
            //         <div style="
            //           background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%);
            //           border: 1px solid #a78bfa;
            //           border-radius: 6px;
            //           padding: 8px 12px;
            //           color: white;
            //           font-family: 'Sora', sans-serif;
            //           font-size: 13px;
            //           font-weight: 600;
            //           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
            //         ">
            //           ${feature.properties.NM_KEL}
            //         </div>
            //       `;

            //       layer.bindTooltip(tooltipContent, {
            //         permanent: false,
            //         direction: "center",
            //         className: "kelurahan-tooltip",
            //         opacity: 1,
            //       });
            //     }
            //   }}
            //   pane="batas-kelurahan"
            // />
            <KelurahanVectorTiles layers={layers} pointCallback={pointCallback} />
          )}

          {/* Layer Batas Kecamatan - Orange thick outline */}
          {layers.includes("Batas Kecamatan") && geoJsonDataKecamatan && (
            <LeafletGeoJSON
              data={geoJsonDataKecamatan}
              style={() => ({
                color: "#f97316", // Orange color
                weight: 3.5, // Thicker than kelurahan (2.5)
                opacity: 1,
                fillColor: "#f97316", // Orange fill
                fillOpacity: 0, // No fill - outline only
              })}
              onEachFeature={(feature: any, layer: any) => {
                if (feature.properties && feature.properties.NM_KEC) {
                  // Create simple tooltip showing kecamatan name
                  const tooltipContent = `
                    <div style="
                      background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
                      border: 1px solid #fdba74;
                      border-radius: 6px;
                      padding: 8px 12px;
                      color: white;
                      font-family: 'Sora', sans-serif;
                      font-size: 13px;
                      font-weight: 600;
                      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
                    ">
                      ${feature.properties.NM_KEC}
                    </div>
                  `;

                  layer.bindTooltip(tooltipContent, {
                    permanent: false,
                    direction: "center",
                    className: "kecamatan-tooltip",
                    opacity: 1,
                  });
                }
              }}
              pane="batas-kecamatan"
            />
          )}

          {/* <VectorTileLayer /> */}

          {/* COMMENTED OUT - ZNT data not available yet */}
          {/* {isZNT && selectedTematik === "Peta ZNT" && geoJsonDataZNT && (
            <LeafletGeoJSON
              data={geoJsonDataZNT}
              onEachFeature={onEachFeatureZNT}
              style={(feature) => ({
                color: "#000", // outline (garis tepi)
                weight: 1, // ketebalan garis
                fillColor: feature?.properties?.WARNA_ANAL || "#CCCCCC", // pakai warna_anal
                fillOpacity: 0.6, // transparansi isi
              })}
            />
          )}

          {isZNT && selectedTematik === "Sebaran ZNT" && geoJsonDataPersil && (
            <LeafletGeoJSON
              data={geoJsonDataPersil}
              onEachFeature={onEachFeatureSebaranZNT}
              style={(feature) => {
                if (!feature || !feature.properties) return defaultGeoJsonStyle;

                const NOP = `${feature.properties.KD_PROV}${feature.properties.KD_KAB}${feature.properties.KD_KEC}${feature.properties.KD_KEL}${feature.properties.KD_BLOK}${feature.properties.NO_URUT}${feature.properties.KD_JNS_OP}`;

                return geoJsonStyles ? geoJsonStyles[NOP] : defaultGeoJsonStyle;
              }}
            />
          )} */}

          {/* COMMENTED OUT - Titik Pendataan data not available yet */}
          {/* {selectedLayerTtik.includes("Titik Pendataan" && (
            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={(cluster: any) => {
                const count = cluster.getChildCount();

                return L.divIcon({
                  html: `
        <div class="triangle-cluster">
          <span class="cluster-count">${count}</span>
        </div>
      `,
                  className: "triangle-cluster-wrapper", // agar styling default Leaflet tidak mengganggu
                  iconSize: L.point(40, 40, true),
                });
              }}
            >
              {dataTitik.map((item: any, index: number) => (
                <CircleMarker
                  key={index}
                  center={[item.datOpPajak.geom.coordinates[1], item.datOpPajak.geom.coordinates[0]]}
                  radius={8}
                  pathOptions={{
                    color: item.datOpPajak.kd_jns_pelayanan === "11" ? "#000" : item.datOpPajak.kd_jns_pelayanan === "12" ? "#000" : item.datOpPajak.kd_jns_pelayanan === "13" ? "#000" : "gray",
                    fillColor: item.datOpPajak.kd_jns_pelayanan === "11" ? "#1af513" : item.datOpPajak.kd_jns_pelayanan === "12" ? "#f2f513" : item.datOpPajak.kd_jns_pelayanan === "13" ? "#ff2525" : "gray",
                    fillOpacity: 0.8,
                  }}
                  pane="titik-pendataan"
                >
                  <Popup pane="popup">
                    {item.datOpPajak.foto_op && item.datOpPajak.foto_op.length !== 0 ? (
                      <Box sx={{ width: "100%", maxHeight: 250, position: "relative", borderRadius: 2, overflow: "hidden" }}>
                        <Swiper pagination={{ clickable: true }} navigation={true} modules={[Navigation, Pagination]} spaceBetween={10} slidesPerView={1}>
                          {item.datOpPajak.foto_op.map((url: any, index: number) => (
                            <SwiperSlide key={index}>
                              <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
                                <Image
                                  src={url}
                                  alt={`Foto Persil ${index + 1}`}
                                  width={720}
                                  height={400}
                                  quality={70}
                                  style={{
                                    objectFit: "cover",
                                  }}
                                />
                              </Box>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </Box>
                    ) : (
                      <Box sx={{ justifyItems: "center" }}>
                        <Image src="/placeholder.png" alt="No Image Available" width={0} height={0} sizes="100vw" style={{ objectFit: "cover", borderRadius: "10px", width: "80%" }} />
                      </Box>
                    )}
                    <br />
                    <strong>NOP:</strong> {item.datOpPajak.nop_join}
                    <br />
                    <strong>Nama WP:</strong> {item.wajibPajak?.nm_wp || "-"}
                    <br />
                    <strong>Jalan:</strong> {item.datOpPajak.jalan_op}
                    <br />
                    <strong>Luas Bumi:</strong> {item.datOpPajak.total_luas_bumi} m²
                    <br />
                    <strong>Luas Bangunan:</strong> {item.datOpPajak.total_luas_bng} m²
                    <br />
                    <strong>Jumlah Bangunan:</strong> {item.datOpBangunan.length}
                    <br />
                    <strong>Kode Pelayanan:</strong> {item.datOpPajak.kd_jns_pelayanan}
                  </Popup>
                </CircleMarker>
              ))}
            </MarkerClusterGroup>
          )} */}

          {/* <VectorTileLayer /> */}

          <CustomZoomControl />

          {/* Custom Attribution Control */}
          <div
            className="leaflet-control-attribution"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(30, 41, 59, 0.95)";
              e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.5)";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(15, 23, 42, 0.95)";
              e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.3)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
            }}
          >
            &copy;{" "}
            <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">
              OpenStreetMap
            </a>{" "}
            contributors |{" "}
            <a href="https://www.maptiler.com/copyright/" target="_blank" rel="noopener">
              MapTiler
            </a>
          </div>
        </MapContainer>

        {/* Coordinate Display */}
        <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 bg-slate-900/95 backdrop-blur-sm border border-primary-500/30 rounded px-2 py-1 text-xs text-white font-mono shadow-lg z-[60]">
          <span className="text-white">
            Lat: {mouseCoords.lat} | Lng: {mouseCoords.lng}
          </span>
        </div>
        {loading && (
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: 40,
              pointerEvents: "auto",
            }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}

        {/* Thematic Analysis Drawer */}
        <ThematicAnalysisDrawer
          isOpen={openDrawer === "thematic"}
          onOpenChange={(open) => setOpenDrawer(open ? "thematic" : null)}
          onStatusPembayaranChange={handlePaymentStatusChange}
          onStatusPendaftaranToggle={handlePendaftaranStatusToggle}
          onStatusTunggakanToggle={handleTunggakanStatusToggle}
        />

        {/* Tunggakan Legend */}
        <TunggakanLegend isVisible={tunggakanActive} />
        <PembayaranLegend isVisible={paymentStatusActive} />

        {/* Sebaran ZNT Legend */}
        <SebaranZNTLegend isVisible={sebaranZNTActive} kelasTanahData={kelasTanahLegendData} />

        {/* ZNT Drawer */}
        <ZNTDrawer
          isOpen={openDrawer === "znt"}
          onOpenChange={(open) => setOpenDrawer(open ? "znt" : null)}
          onPetaZNTToggle={(active) => {
            console.log("Peta ZNT Active:", active);
            // TODO: Implement peta ZNT layer logic
          }}
          onSebaranZNTToggle={handleSebaranZNTToggle}
        />

        {/* Pajak Lain Drawer */}
        <PajakLainDrawer
          isOpen={openDrawer === "pajak"}
          onOpenChange={(open) => setOpenDrawer(open ? "pajak" : null)}
          onPBBP2Toggle={(active) => {
            console.log("PBB-P2 Active:", active);
            // TODO: Implement PBB-P2 logic
          }}
          onBPHTBToggle={(active) => {
            console.log("BPHTB Active:", active);
            // TODO: Implement BPHTB logic
          }}
          onPBJTToggle={handlePbjtToggle}
          onPajakReklameToggle={(active) => {
            console.log("Pajak Reklame Active:", active);
            // TODO: Implement Pajak Reklame logic
          }}
          onPajakAirTanahToggle={(active) => {
            console.log("Pajak Air Tanah Active:", active);
            // TODO: Implement Pajak Air Tanah logic
          }}
          onPajakMBLBToggle={(active) => {
            console.log("Pajak MBLB Active:", active);
            // TODO: Implement Pajak MBLB logic
          }}
          onPajakSarangWaletToggle={(active) => {
            console.log("Pajak Sarang Walet Active:", active);
            // TODO: Implement Pajak Sarang Walet logic
          }}
          onOpsenPKBToggle={(active) => {
            console.log("Opsen PKB Active:", active);
            // TODO: Implement Opsen PKB logic
          }}
          onOpsenBBNKBToggle={(active) => {
            console.log("Opsen BBNKB Active:", active);
            // TODO: Implement Opsen BBNKB logic
          }}
        />
      </div>
    </>
  );
};

export default Maps;
