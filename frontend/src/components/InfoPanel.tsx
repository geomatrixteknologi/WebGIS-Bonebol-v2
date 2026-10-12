/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DollarSign, ChevronLeft, Search, X, Settings, TrendingUp, CheckCircle2, XCircle, ChevronRight, BarChart3, Clock } from "lucide-react";
import axios from "axios";
import { formatRupiah } from "@/utility/FormatRupiah";
import { formatRibuan } from "@/utility/FormatRibuan";
import { formatRupiahShort } from "@/utility/FormatRupiahShort";
import { getPolygonCenter } from "@/utility/GetPolygonCenter";
import toast from "react-hot-toast";
import UploadGISSection from "./UploadGISSection";
import AddPbjtTool from "./AddPbjtTool";
import SettingsPanel from "./SettingsPanel";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import RegionalPerformance from "./dashboard/RegionalPerformance";
import PaymentAnalysis from "./dashboard/PaymentAnalysis";
// import CollectionEfficiency from "./dashboard/CollectionEfficiency";
import OverdueTracking from "./dashboard/OverdueTracking";
import { useAuth } from "@/contexts/AuthContext";
import { useMapConfigContext } from "@/contexts/MapConfigContext";
import { Upload, Image as ImageIcon } from "lucide-react";
import { PbbSpptData } from "@/interface/Backend_PBB_Interface/interfaces_PBB";
import { toWgs84 } from "@/utility/ToWGS84";

interface InfoPanelProps {
  isOpen: boolean;
  panelType: string;
  onClose: () => void;
  onSearch?: (nop: string) => void;
  selectedNop?: string;
  geomData?: unknown;
  fotoPersil?: string[] | null;
  onReset?: () => void;
  isAdmin?: boolean;
  // Removed: onStartPointSelection, onCancelPointSelection - use MapConfigContext instead
  onPanelSwitch?: (panelType: string) => void;
}

interface ApiResponse {
  code: number;
  data: PbbSpptData;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ isOpen, panelType, onClose, onSearch, selectedNop, geomData, onReset, isAdmin = false, onPanelSwitch }) => {
  const { isAdmin: isAdminAuth } = useAuth();
  const { startPointSelection, cancelPointSelection, setFocusedKecamatanCode } = useMapConfigContext();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [animationClass, setAnimationClass] = useState<string>("");
  const [contentAnimationClass, setContentAnimationClass] = useState<string>("");
  const [currentPanelType, setCurrentPanelType] = useState<string>("");

  // Search-related states
  const [searchType, setSearchType] = useState<"nop" | "npwpd" | "name">("nop");
  const [searchNop, setSearchNop] = useState("");
  const [searchNpwpd, setSearchNpwpd] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchError, setSearchError] = useState("");
  const [searchResults, setSearchResults] = useState<
    Array<{
      nop: string;
      nmWp: string;
      alamat: string;
    }>
  >([]);
  const [nameSearchPage, setNameSearchPage] = useState(1);
  const [nameSearchTotalPages, setNameSearchTotalPages] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  // Property details states
  const [propertyData, setPropertyData] = useState<PbbSpptData | null>(null);
  const [loadingProperty, setLoadingProperty] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [fotoPersilUrls, setFotoPersilUrls] = useState<string[]>([]);
  const [loadingFotos, setLoadingFotos] = useState<boolean>(false);
  const [uploadingPhoto, setUploadingPhoto] = useState<boolean>(false);

  // Generate years from 2010 to current year
  const availableYears = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years: string[] = [];
    for (let year = currentYear; year >= 2010; year--) {
      years.push(year.toString());
    }
    return years;
  }, []);

  // Dashboard states
  const [dashboardData, setDashboardData] = useState<
    Array<{
      year: string;
      target: number;
      realization: number;
      paidCount: number;
      unpaidCount: number;
    }>
  >([]);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [dashboardTab, setDashboardTab] = useState<"overview" | "regional" | "payment" | "efficiency">("overview");
  const [kecamatanList, setKecamatanList] = useState<string[]>([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>("all");

  useEffect(() => {
    if (isOpen) {
      const isSwitchingPanels = isVisible && currentPanelType !== panelType;

      if (!isVisible) {
        setIsVisible(true);
        setCurrentPanelType(panelType);
        setAnimationClass("info-panel-enter");
        setContentAnimationClass("info-panel-content-entering");

        setTimeout(() => {
          setContentAnimationClass("info-panel-content-entered");
        }, 150);
      } else if (isSwitchingPanels) {
        // Switching panels - just change content instantly
        setCurrentPanelType(panelType);
        setAnimationClass("info-panel-instant");
        setContentAnimationClass("info-panel-content-entered");
      }
    } else if (isVisible) {
      setAnimationClass("info-panel-exit");
      setContentAnimationClass("info-panel-content-entering");

      setTimeout(() => {
        setIsVisible(false);
        setAnimationClass("");
        setContentAnimationClass("");
        setCurrentPanelType("");
      }, 300);
    }
  }, [isOpen, panelType, isVisible, currentPanelType]);

  // Fetch property data when selectedNop or selectedYear changes
  useEffect(() => {
    if (selectedNop && panelType === "info") {
      // Create AbortController for cancellation
      const abortController = new AbortController();

      // Fetch immediately without artificial delay
      fetchPropertyData(selectedNop, selectedYear);

      // Cleanup: abort ongoing request if component unmounts or deps change
      return () => {
        abortController.abort();
      };
    } else if (!selectedNop && panelType === "info") {
      // Clear property data when selectedNop is empty
      setPropertyData(null);
      setLoadingProperty(false);
    }
  }, [selectedNop, panelType, selectedYear]);

  // Fetch photos when selectedNop changes
  useEffect(() => {
    if (selectedNop && panelType === "info") {
      // Create AbortController for cancellation
      const abortController = new AbortController();

      // Fetch immediately without artificial delay
      fetchFotoPersilUrls(selectedNop);

      // Cleanup: abort ongoing request if component unmounts or deps change
      return () => {
        abortController.abort();
      };
    } else if (!selectedNop && panelType === "info") {
      setFotoPersilUrls([]);
      setLoadingFotos(false);
    }
  }, [selectedNop, panelType]);

  const fetchPropertyData = async (nop: string, year: string) => {
    if (!nop) return;

    setLoadingProperty(true);
    try {
      // Remove dots from NOP for API call (same as Navbar does)
      const cleanNop = nop.replace(/\./g, "");
      // console.log("Fetching property data for NOP:", cleanNop, "Year:", year);

      const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_PBB_API_URL}/api/retrieve/detailnop?nop=${cleanNop}&tahun=${year}`, { withCredentials: true });

      // console.log("Property data response:", response.data);

      if (response.data.code === 200 && response.data.data) {
        setPropertyData(response.data.data);
        // console.log("Property data set successfully");
      } else {
        setPropertyData(null);
        // console.log("No property data found for NOP:", cleanNop, "Year:", year);
        toast.error(`Data pajak tidak ditemukan untuk NOP ini pada tahun ${year}`);
      }
    } catch (error) {
      console.error("Error fetching property data:", error);
      setPropertyData(null);
      toast.error("Terjadi kesalahan saat mengambil data properti");
    } finally {
      setLoadingProperty(false);
    }
  };

  const fetchFotoPersilUrls = async (nop: string) => {
    if (!nop) return;

    setLoadingFotos(true);
    try {
      const cleanNop = nop.replace(/\./g, "");
      // console.log("Fetching photos for NOP:", cleanNop);

      const response = await axios.get<{
        code: number;
        message: string;
        isEmpty?: boolean;
        imageUrls: string[];
      }>(`${process.env.NEXT_PUBLIC_GIS_API_URL}/api/retrieve/fotopersil/${cleanNop}`, {
        withCredentials: true,
      });

      // console.log("Photo response:", response.data);

      if (response.data.code === 200) {
        setFotoPersilUrls(response.data.imageUrls || []);
      } else {
        setFotoPersilUrls([]);
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
      setFotoPersilUrls([]);
    } finally {
      setLoadingFotos(false);
    }
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0 || !selectedNop) return;

    // Convert FileList to array
    const filesArray = Array.from(files);

    // Validate file count
    if (filesArray.length > 10) {
      toast.error("Maksimal 10 foto dapat diupload sekaligus");
      return;
    }

    // Validate each file
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/bmp", "image/gif"];
    for (const file of filesArray) {
      if (!allowedTypes.includes(file.type)) {
        toast.error(`File ${file.name}: Format tidak didukung. Gunakan: JPG, PNG, WEBP, BMP, atau GIF`);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`File ${file.name}: Ukuran maksimal 5MB`);
        return;
      }
    }

    // Confirm replacement if there are existing photos
    if (fotoPersilUrls.length > 0) {
      const confirmReplace = window.confirm(`Anda akan mengganti ${fotoPersilUrls.length} foto yang sudah ada dengan ${filesArray.length} foto baru. Lanjutkan?`);
      if (!confirmReplace) {
        event.target.value = "";
        return;
      }
    }

    setUploadingPhoto(true);
    try {
      const cleanNop = selectedNop.replace(/\./g, "");
      const formData = new FormData();

      // Append all files
      filesArray.forEach((file) => {
        formData.append("fotopersil", file);
      });

      const response = await axios.post<{
        message: string;
        imageUrls: string[];
      }>(`${process.env.NEXT_PUBLIC_GIS_API_URL}/api/upload/fotopersil/${cleanNop}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message || "Foto berhasil diunggah!");
      // Refresh photo list
      fetchFotoPersilUrls(selectedNop);

      // Reset input
      event.target.value = "";
    } catch (error: unknown) {
      console.error("Error uploading photo:", error);
      if (typeof error === "object" && error !== null && "response" in error && typeof error.response === "object" && error.response !== null && "data" in error.response) {
        const errorData = error.response.data as { message?: string };
        toast.error(errorData.message || "Gagal mengunggah foto");
      } else {
        toast.error("Terjadi kesalahan saat mengunggah foto");
      }
    } finally {
      setUploadingPhoto(false);
    }
  };

  // Fetch dashboard data
  const fetchDashboardData = async (kecamatan: string = "all") => {
    setLoadingDashboard(true);
    try {
      const response = await axios.get<{
        code: number;
        data: Array<{
          year: string;
          target: number;
          realization: number;
          paidCount: number;
          unpaidCount: number;
        }>;
        message: string;
      }>(`${process.env.NEXT_PUBLIC_PBB_API_URL}/api/retrieve/tax-summary`, {
        params: { kecamatan },
        withCredentials: true,
      });

      if (response.data.code === 200) {
        setDashboardData(response.data.data);
        setScrollOffset(Math.max(0, response.data.data.length - 5)); // Start at latest 5 years
      } else {
        setDashboardData([]);
        toast.error("Gagal mengambil data dashboard");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setDashboardData([]);
      toast.error("Terjadi kesalahan saat mengambil data dashboard");
    } finally {
      setLoadingDashboard(false);
    }
  };

  // Fetch kecamatan list when dashboard panel opens
  useEffect(() => {
    const fetchKecamatanList = async () => {
      try {
        const response = await axios.get<{
          code: number;
          data: string[];
          message: string;
        }>(`${process.env.NEXT_PUBLIC_PBB_API_URL}/api/retrieve/kecamatan-list`, {
          withCredentials: true,
        });

        if (response.data.code === 200 && response.data.data.length > 0) {
          setKecamatanList(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching kecamatan list:", error);
      }
    };

    if (panelType === "dashboard" && isOpen && kecamatanList.length === 0) {
      fetchKecamatanList();
    }
  }, [panelType, isOpen, kecamatanList.length]);

  // Fetch dashboard data only when kecamatan changes or on initial load
  useEffect(() => {
    if (panelType === "dashboard" && isOpen && (dashboardData.length === 0 || selectedKecamatan)) {
      // Only fetch if no data exists OR if filter changed
      const shouldFetch = dashboardData.length === 0;
      if (shouldFetch) {
        fetchDashboardData(selectedKecamatan);
      }
    }
  }, [panelType, isOpen, selectedKecamatan, dashboardData.length]);

  // Separate effect for filter changes only (after initial load)
  useEffect(() => {
    if (dashboardData.length > 0 && panelType === "dashboard") {
      fetchDashboardData(selectedKecamatan);
    }
  }, [selectedKecamatan, dashboardData.length, panelType]);

  // Search functions
  const formatNop = (value: string) => {
    let numbersOnly = value.replace(/\D/g, "");

    numbersOnly = numbersOnly.slice(0, 18);

    // Format according to pattern "XX.XX.XXX.XXX.XXX.XXXX.X"
    let formatted = "";

    if (numbersOnly.length > 0) {
      formatted = numbersOnly.slice(0, 2);
    }
    if (numbersOnly.length >= 3) {
      formatted += "." + numbersOnly.slice(2, 4);
    }
    if (numbersOnly.length >= 5) {
      formatted += "." + numbersOnly.slice(4, 7);
    }
    if (numbersOnly.length >= 8) {
      formatted += "." + numbersOnly.slice(7, 10);
    }
    if (numbersOnly.length >= 11) {
      formatted += "." + numbersOnly.slice(10, 13);
    }
    if (numbersOnly.length >= 14) {
      formatted += "." + numbersOnly.slice(13, 17);
    }
    if (numbersOnly.length >= 18) {
      formatted += "." + numbersOnly.slice(17, 18);
    }

    return formatted;
  };

  const validateNop = (nop: string) => {
    return /^\d{2}\.\d{2}\.\d{3}\.\d{3}\.\d{3}\.\d{4}\.\d{1}$/.test(nop);
  };

  const handleNopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNop = formatNop(e.target.value);
    setSearchNop(formattedNop);

    // Only show error while typing if user has entered enough characters and format is still invalid
    if (formattedNop.length > 0 && formattedNop.length < 24) {
      // Don't set error while typing, wait until they try to search
      setSearchError("");
    } else if (formattedNop.length === 0) {
      setSearchError("");
    }
  };

  // NPWPD validation
  const validateNpwpd = (npwpd: string) => {
    // NPWPD format validation - adjust based on your requirements
    return npwpd.length >= 10 && /^[A-Z0-9]+$/.test(npwpd);
  };

  // Name search with debounce
  const searchByName = useCallback(async (name: string, page: number = 1) => {
    if (name.length < 3) {
      setSearchResults([]);
      setNameSearchTotalPages(1);
      return;
    }

    setIsSearching(true);
    try {
      const response = await axios.get<{
        code: number;
        data: Array<{
          nop: string;
          nmWp: string;
          alamat: string;
        }>;
        pagination?: {
          page: number;
          limit: number;
          totalData: number;
          totalPage: number;
        };
      }>(`${process.env.NEXT_PUBLIC_PBB_API_URL}/api/retrieve/carinama?namawp=${encodeURIComponent(name)}&limit=10&page=${page}`, {
        withCredentials: true,
      });

      if (response.data.code === 200) {
        setSearchResults(response.data.data || []);
        if (response.data.pagination) {
          setNameSearchPage(response.data.pagination.page);
          setNameSearchTotalPages(response.data.pagination.totalPage);
        }
      } else {
        setSearchResults([]);
        setNameSearchTotalPages(1);
      }
    } catch (error) {
      console.error("Error searching by name:", error);
      setSearchResults([]);
      setNameSearchTotalPages(1);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounced name search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchType === "name" && searchName.length >= 3) {
        searchByName(searchName);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchName, searchType, searchByName]);

  const handleSearch = async () => {
    if (searchType === "nop") {
      if (!validateNop(searchNop)) {
        toast.error("Format NOP tidak valid (XX.XX.XXX.XXX.XXX.XXXX.X)");
        setSearchError("Format NOP tidak valid");
        setTimeout(() => setSearchError(""), 2000);
        return;
      }

      // Clear error before searching
      setSearchError("");

      if (onSearch) {
        // Call parent search function which will handle the API calls
        // The parent (Navbar) will handle panel switching only on success
        onSearch(searchNop);
        // Don't switch panels here - let the parent handle it on success
      }
    } else if (searchType === "npwpd") {
      if (!validateNpwpd(searchNpwpd)) {
        toast.error("Format NPWPD tidak valid");
        setSearchError("Format NPWPD tidak valid");
        setTimeout(() => setSearchError(""), 2000);
        return;
      }

      setSearchError("");
      setIsSearching(true);
      try {
        // Get NOP from NPWPD
        const response = await axios.get<{
          code: number;
          data: {
            nop: string;
            wpNama: string;
            wpNpwpd: string;
          };
        }>(`${process.env.NEXT_PUBLIC_GIS_API_URL}/api/retrieve/nopbynpwpd?npwpd=${encodeURIComponent(searchNpwpd)}`, {
          withCredentials: true,
        });

        if (response.data.code === 200 && response.data.data) {
          if (onSearch) {
            onSearch(response.data.data.nop);
            // Switch to info panel after successful search
            if (onPanelSwitch) {
              setTimeout(() => onPanelSwitch("info"), 300);
            }
          }
        } else {
          toast.error("NPWPD tidak ditemukan");
          setSearchError("NPWPD tidak ditemukan");
          setTimeout(() => setSearchError(""), 2000);
        }
      } catch (error) {
        console.error("Error searching by NPWPD:", error);
        toast.error("NPWPD tidak ditemukan");
        setSearchError("NPWPD tidak ditemukan");
        setTimeout(() => setSearchError(""), 2000);
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handleNameResultClick = (result: { nop: string; nmWp: string; alamat: string }) => {
    if (onSearch) {
      // Format the NOP before passing it to the search function
      const formattedNop = formatNop(result.nop);
      onSearch(formattedNop);
      // Don't switch panels here - let the parent (Navbar) handle it on success
    }
  };

  const handleReset = () => {
    // Clear all property-related states
    setPropertyData(null);
    setLoadingProperty(false);

    // Clear all search states
    setSearchNop("");
    setSearchNpwpd("");
    setSearchName("");
    setSearchError("");
    setSearchResults([]);
    setNameSearchPage(1);
    setNameSearchTotalPages(1);
    setIsSearching(false);

    // Call the parent reset function
    if (onReset) {
      onReset();
    }
  };

  // Open Google Street View
  const openStreetView = () => {
    if (!geomData) {
      toast.error("Data geometri tidak tersedia");
      return;
    }

    try {
      const geom = geomData as {
        type: string;
        coordinates: any;
      };

      let center = { lat: 0, lng: 0 };

      if (geom.type === "Point") {
        const [lng, lat] = geom.coordinates;
        center = toWgs84(lng, lat);
      } else if (geom.type === "Polygon") {
        const coords = geom.coordinates[0];
        center = getPolygonCenter(coords);
        center = toWgs84(center.lng, center.lat);
      } else if (geom.type === "MultiPolygon") {
        const flattenedCoords = geom.coordinates.flat(2);
        center = getPolygonCenter(flattenedCoords);
        center = toWgs84(center.lng, center.lat);
      }

      const googleStreetViewURL = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${center.lat},${center.lng}`;
      window.open(googleStreetViewURL, "_blank");
    } catch (error) {
      console.error("Error opening Street View:", error);
      toast.error("Gagal membuka Google Street View");
    }
  };

  if (!isVisible) return null;

  const getPanelContent = () => {
    switch (panelType) {
      case "dashboard":
        return {
          title: "Dashboard",
          description: "Analisis komprehensif pajak daerah",
          content: (
            <div className="space-y-4">
              {/* Tab Navigation */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDashboardTab("overview")}
                  className={`flex items-center gap-2 whitespace-nowrap transition-colors ${
                    dashboardTab === "overview" ? "bg-slate-700 text-accent-500 border-accent-500 hover:bg-slate-600" : "border-slate-600 text-slate-500 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  Ringkasan
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDashboardTab("regional")}
                  className={`flex items-center gap-2 whitespace-nowrap transition-colors ${
                    dashboardTab === "regional" ? "bg-slate-700 text-accent-500 border-accent-500 hover:bg-slate-600" : "border-slate-600 text-slate-500 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  Regional
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDashboardTab("payment")}
                  className={`flex items-center gap-2 whitespace-nowrap transition-colors ${
                    dashboardTab === "payment" ? "bg-slate-700 text-accent-500 border-accent-500 hover:bg-slate-600" : "border-slate-600 text-slate-500 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  Pembayaran
                </Button>
                {/* <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDashboardTab("efficiency")}
                  className={`flex items-center gap-2 whitespace-nowrap transition-colors ${
                    dashboardTab === "efficiency"
                      ? "bg-slate-700 text-accent-500 border-accent-500 hover:bg-slate-600"
                      : "border-slate-600 text-slate-500 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <Target className="w-4 h-4" />
                  Efisiensi
                </Button> */}
              </div>

              {/* Tab Content */}
              {dashboardTab === "overview" &&
                (() => {
                  // Calculate visible window data (5 years at a time)
                  const visibleData = dashboardData.slice(scrollOffset, scrollOffset + 5);

                  // Calculate KPIs for visible window
                  const totalTarget = visibleData.reduce((sum, item) => sum + item.target, 0);
                  const totalRealization = visibleData.reduce((sum, item) => sum + item.realization, 0);
                  const achievementRate = totalTarget > 0 ? (totalRealization / totalTarget) * 100 : 0;
                  const totalPaid = visibleData.reduce((sum, item) => sum + item.paidCount, 0);
                  const totalUnpaid = visibleData.reduce((sum, item) => sum + item.unpaidCount, 0);

                  return loadingDashboard ? (
                    <div className="flex items-center justify-center py-20">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500"></div>
                    </div>
                  ) : dashboardData.length === 0 ? (
                    <div className="text-center py-20">
                      <p className="text-slate-400">Tidak ada data dashboard tersedia</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Kecamatan Filter */}
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <label htmlFor="dashboard-kecamatan-select" className="text-xs text-slate-400 mb-1 block">
                            Kecamatan
                          </label>
                          <select
                            id="dashboard-kecamatan-select"
                            value={selectedKecamatan}
                            onChange={(e) => {
                              const newKecamatan = e.target.value;
                              setSelectedKecamatan(newKecamatan);
                              // Trigger fly-to if not "all"
                              if (newKecamatan !== "all") {
                                setFocusedKecamatanCode(newKecamatan);
                              } else {
                                setFocusedKecamatanCode(null);
                              }
                            }}
                            className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm border border-slate-600 focus:border-primary-500 focus:outline-none"
                          >
                            <option value="all">Semua Kecamatan</option>
                            {kecamatanList.map((kec) => (
                              <option key={kec} value={kec}>
                                {kec}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* KPI Cards */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-4 rounded-lg shadow-lg">
                          <div className="flex items-center justify-between mb-2">
                            <DollarSign className="w-5 h-5 text-white opacity-80" />
                            <TrendingUp className="w-4 h-4 text-white opacity-60" />
                          </div>
                          <p className="text-2xl font-bold text-white">{formatRupiahShort(totalTarget)}</p>
                          <p className="text-xs text-white opacity-90">Total Target</p>
                        </div>

                        <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-lg shadow-lg">
                          <div className="flex items-center justify-between mb-2">
                            <CheckCircle2 className="w-5 h-5 text-white opacity-80" />
                            <TrendingUp className="w-4 h-4 text-white opacity-60" />
                          </div>
                          <p className="text-2xl font-bold text-white">{formatRupiahShort(totalRealization)}</p>
                          <p className="text-xs text-white opacity-90">Total Realisasi</p>
                        </div>

                        <div className="bg-gradient-to-br from-accent-500 to-accent-600 p-4 rounded-lg shadow-lg">
                          <div className="flex items-center justify-between mb-2">
                            <TrendingUp className="w-5 h-5 text-white opacity-80" />
                          </div>
                          <p className="text-2xl font-bold text-white">{achievementRate.toFixed(1)}%</p>
                          <p className="text-xs text-white opacity-90">Tingkat Penerimaan</p>
                        </div>

                        <div className="bg-gradient-to-br from-slate-600 to-slate-700 p-4 rounded-lg shadow-lg">
                          <div className="flex items-center justify-between mb-2">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                            <XCircle className="w-4 h-4 text-red-400" />
                          </div>
                          <p className="text-lg font-bold text-white">
                            {totalPaid.toLocaleString()} / {totalUnpaid.toLocaleString()}
                          </p>
                          <p className="text-xs text-white opacity-90">Lunas / Belum Lunas</p>
                        </div>
                      </div>

                      {/* Year Navigation */}
                      <div className="flex items-center justify-between bg-slate-700 px-4 py-2 rounded-lg">
                        <Button variant="ghost" size="sm" onClick={() => setScrollOffset(Math.max(0, scrollOffset - 5))} disabled={scrollOffset === 0} className="text-white hover:bg-slate-600 disabled:opacity-30">
                          <ChevronLeft className="w-4 h-4 mr-1" />
                          Sebelumnya
                        </Button>
                        <span className="text-sm text-slate-300 font-medium">
                          {visibleData[0]?.year} - {visibleData[visibleData.length - 1]?.year}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setScrollOffset(Math.min(dashboardData.length - 5, scrollOffset + 5))}
                          disabled={scrollOffset + 5 >= dashboardData.length}
                          className="text-white hover:bg-slate-600 disabled:opacity-30"
                        >
                          Selanjutnya
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>

                      {/* Line Chart */}
                      <div className="bg-slate-700 p-4 rounded-lg">
                        <h3 className="text-sm font-semibold text-white mb-4">Target vs Realisasi Pajak</h3>
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={visibleData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                            <XAxis dataKey="year" stroke="#94a3b8" style={{ fontSize: "12px" }} />
                            <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} tickFormatter={(value) => formatRupiahShort(value)} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#1e293b",
                                border: "1px solid #475569",
                                borderRadius: "8px",
                                color: "#fff",
                              }}
                              formatter={(value: number) => formatRupiah(value)}
                              labelStyle={{ color: "#94a3b8" }}
                              itemSorter={(item) => {
                                return (item.value as number) * -1;
                              }}
                            />
                            <Legend
                              wrapperStyle={{ fontSize: "12px" }}
                              iconType="line"
                              itemSorter={(item) => {
                                return (typeof item.value === "number" ? item.value : 0) * -1;
                              }}
                            />
                            <Line type="monotone" dataKey="target" stroke="#0066FF" strokeWidth={2} name="Target" dot={{ fill: "#0066FF", r: 4 }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="realization" stroke="#10b981" strokeWidth={2} name="Realisasi" dot={{ fill: "#10b981", r: 4 }} activeDot={{ r: 6 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  );
                })()}

              {dashboardTab === "regional" && <RegionalPerformance isOpen={isOpen} />}

              {dashboardTab === "payment" && <PaymentAnalysis isOpen={isOpen} />}

              {/* {dashboardTab === "efficiency" && <CollectionEfficiency isOpen={isOpen} />} */}
            </div>
          ),
        };

      case "search":
        return {
          title: "Pencarian",
          description: "Cari properti berdasarkan NOP atau kriteria lainnya",
          content: (
            <Accordion type="multiple" defaultValue={["quick-search", "advanced-filters"]} className="w-full">
              <AccordionItem value="quick-search" className="border-slate-600">
                <AccordionTrigger className="hover:no-underline bg-slate-700 hover:bg-slate-600 px-4 py-3 text-white font-medium border-b border-slate-600">Pencarian</AccordionTrigger>
                <AccordionContent className="p-4 bg-slate-800 border-t border-slate-600">
                  <div className="space-y-4">
                    {/* Search Type Selector */}
                    <div className="flex space-x-2">
                      <Button
                        variant={searchType === "nop" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSearchType("nop")}
                        className={`text-xs ${searchType === "nop" ? "bg-accent-500 hover:bg-accent-600" : "border-slate-600 text-slate-300 hover:bg-slate-700"}`}
                      >
                        NOP
                      </Button>
                      <Button
                        variant={searchType === "npwpd" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSearchType("npwpd")}
                        className={`text-xs ${searchType === "npwpd" ? "bg-accent-500 hover:bg-accent-600" : "border-slate-600 text-slate-300 hover:bg-slate-700"}`}
                      >
                        NPWPD
                      </Button>
                      <Button
                        variant={searchType === "name" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSearchType("name")}
                        className={`text-xs ${searchType === "name" ? "bg-accent-500 hover:bg-accent-600" : "border-slate-600 text-slate-300 hover:bg-slate-700"}`}
                      >
                        Nama
                      </Button>
                    </div>

                    {/* Search Input */}
                    <div className="relative">
                      {searchType === "nop" && (
                        <input
                          type="text"
                          placeholder="Masukkan NOP (contoh: 64.07.001.001.001.0001.0)"
                          value={searchNop}
                          onChange={handleNopChange}
                          className="w-full px-3 py-2 text-sm bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-accent-500"
                          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                        />
                      )}

                      {searchType === "npwpd" && (
                        <input
                          type="text"
                          placeholder="Masukkan NPWPD"
                          value={searchNpwpd}
                          onChange={(e) => setSearchNpwpd(e.target.value.toUpperCase())}
                          className="w-full px-3 py-2 text-sm bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-accent-500"
                          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                        />
                      )}

                      {searchType === "name" && (
                        <input
                          type="text"
                          placeholder="Masukkan nama wajib pajak (min 3 karakter)"
                          value={searchName}
                          onChange={(e) => setSearchName(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-accent-500"
                        />
                      )}

                      {(searchType === "nop" || searchType === "npwpd") && (
                        <Button variant="ghost" size="icon" onClick={handleSearch} disabled={isSearching} className="absolute right-0 top-0 h-full w-10 p-0 hover:bg-slate-600">
                          <Search className="w-4 h-4 text-accent-500" />
                        </Button>
                      )}
                    </div>

                    {/* Search Error */}
                    {searchError && <p className="text-red-400 text-xs mt-1">{searchError}</p>}

                    {/* Name Search Results */}
                    {searchType === "name" && (
                      <div className="space-y-2">
                        {isSearching && (
                          <div className="text-center py-2">
                            <p className="text-slate-400 text-xs">Mencari...</p>
                          </div>
                        )}

                        {searchResults.length > 0 && (
                          <div className="space-y-2">
                          <div className="max-h-80 overflow-y-auto space-y-1">
                            {searchResults.map((result, index) => (
                              <div key={index} onClick={() => handleNameResultClick(result)} className="p-2 bg-slate-700 hover:bg-slate-600 rounded cursor-pointer transition-colors">
                                <div className="text-sm font-medium text-white">{result.nmWp}</div>
                                <div className="text-xs text-slate-400">NOP: {result.nop}</div>
                                {result.alamat && <div className="text-xs text-slate-500 truncate">{result.alamat}</div>}
                              </div>
                            ))}
                            </div>
                            
                            {/* Pagination Controls */}
                            {nameSearchTotalPages > 1 && (
                              <div className="flex items-center justify-between pt-2 border-t border-slate-600">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => searchByName(searchName, nameSearchPage - 1)}
                                  disabled={nameSearchPage <= 1 || isSearching}
                                  className="h-8 px-2 text-xs text-slate-300 hover:text-white hover:bg-slate-600 disabled:opacity-50"
                                >
                                  <ChevronLeft className="w-4 h-4 mr-1" />
                                  Prev
                                </Button>
                                <span className="text-xs text-slate-400">
                                  Halaman {nameSearchPage} dari {nameSearchTotalPages}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => searchByName(searchName, nameSearchPage + 1)}
                                  disabled={nameSearchPage >= nameSearchTotalPages || isSearching}
                                  className="h-8 px-2 text-xs text-slate-300 hover:text-white hover:bg-slate-600 disabled:opacity-50"
                                >
                                  Next
                                  <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                              </div>
                            )}
                          </div>
                        )}

                        {searchName.length > 0 && searchName.length < 3 && <p className="text-slate-500 text-xs">Masukkan minimal 3 karakter</p>}
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
        };

      case "info":
        const yearSelector: React.ReactNode = selectedNop ? (
          <div className="px-4 py-3 bg-slate-700 rounded-lg border border-slate-600">
            <label htmlFor="info-year-select" className="text-xs text-slate-400 mb-2 block">
              Tahun Pajak
            </label>
            <select
              id="info-year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-slate-800 text-white px-3 py-2 rounded-lg text-sm border border-slate-600 focus:border-accent-500 focus:outline-none"
            >
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        ) : null;

        const streetViewButton: React.ReactNode =
          selectedNop && geomData ? (
            <div className="flex justify-center">
              <button
                onClick={openStreetView}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                title="Buka Google Street View"
              >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48" className="flex-shrink-0">
                  <path fill="#43a047" d="M39.25,8.25l-12,12L8.1,39.4c-0.36-0.4-0.69-0.83-0.96-1.3C6.41,36.9,6,35.5,6,34V14	c0-4.42,3.58-8,8-8h19.5c1.64,0,3.17,0.47,4.47,1.27C38.43,7.56,38.86,7.88,39.25,8.25z"></path>
                  <path fill="#cfd8dc" d="M42,14.5V34c0,4.42-3.58,8-8,8H14c-1.64,0-3.16-0.49-4.42-1.34c-0.54-0.35-1.04-0.78-1.48-1.26	l19.15-19.15l12-12c0.48,0.44,0.91,0.93,1.27,1.47C41.46,11.08,42,12.73,42,14.5z"></path>
                  <path
                    fill="#eceff1"
                    d="M20,14.048h-5.048v1.835h2.446c-0.202,0.422-0.491,0.789-0.844,1.087l0.001,0.001h-0.001	c-0.558,0.467-1.277,0.747-2.06,0.747c-1.361,0-2.524-0.846-2.992-2.041c-0.142-0.364-0.22-0.759-0.22-1.172	c0-0.666,0.202-1.283,0.549-1.796l0.061-0.079c0.58-0.811,1.529-1.337,2.603-1.337c0.858,0,1.637,0.335,2.212,0.886l1.532-1.712	C17.257,9.56,15.939,9,14.494,9c-1.9,0-3.575,0.964-4.566,2.428c-0.594,0.88-0.941,1.939-0.941,3.079	c0,0.904,0.217,1.757,0.604,2.51c0.913,1.779,2.765,2.997,4.903,2.997c1.466,0,2.799-0.573,3.787-1.509l-0.001-0.001	C19.34,17.504,20,16.081,20,14.508V14.048z"
                  ></path>
                  <path fill="#eceff1" d="M40.52,9.72l-11.8,11.8L9.58,40.66c-0.54-0.35-1.04-0.78-1.48-1.26c-0.36-0.4-0.69-0.83-0.96-1.3	l19.13-19.13l11.7-11.7c0.46,0.29,0.89,0.61,1.28,0.98C39.73,8.69,40.16,9.18,40.52,9.72z"></path>
                  <path
                    fill="#ffb300"
                    d="M42,14.5c0,4.69-3.81,8.5-8.5,8.5c-1.77,0-3.42-0.54-4.78-1.48c-0.54-0.36-1.03-0.79-1.47-1.27	c-0.37-0.39-0.69-0.82-0.98-1.28c-0.8-1.3-1.27-2.83-1.27-4.47C25,9.81,28.81,6,33.5,6c1.64,0,3.17,0.47,4.47,1.27	c0.46,0.29,0.89,0.61,1.28,0.98c0.48,0.44,0.91,0.93,1.27,1.47C41.46,11.08,42,12.73,42,14.5z"
                  ></path>
                  <path fill="#ffb300" d="M42,27.46v6.8c0,4.42-3.58,8-8,8H22V31.22c0-0.84,0.34-1.64,0.96-2.21c0.75-0.69,1.95-1.61,3.56-2.4	c1.8-0.89,4.14-1.61,6.98-1.61s5.18,0.72,6.98,1.61C41.04,26.88,41.54,27.17,42,27.46z"></path>
                  <path fill="#f57c00" d="M40.48,26.61L33.5,34l-6.98-7.39c1.8-0.89,4.14-1.61,6.98-1.61S38.68,25.72,40.48,26.61z"></path>
                </svg>
                <span className="font-semibold">Google Street View</span>
              </button>
            </div>
          ) : null;

        return {
          title: "Detail Objek Pajak",
          description: selectedNop ? `Informasi detail untuk NOP: ${selectedNop}` : "Pilih properti untuk melihat detail",
          content: (
            <div className="space-y-4">
              {/* Year Selector */}
              {yearSelector}

              {/* Google Street View Button */}
              {streetViewButton}

              <Accordion type="multiple" defaultValue={["property-photos", "tax-info", "building-info"]} className="w-full">
                {/* Foto Bangunan - Moved to top */}
                <AccordionItem value="property-photos" className="border-slate-600">
                  <AccordionTrigger className="hover:no-underline bg-slate-700 hover:bg-slate-600 px-4 py-3 text-white font-medium border-b border-slate-600">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      <span>Foto Bangunan</span>
                      {fotoPersilUrls.length > 0 && <Badge className="bg-accent-500 text-white ml-2">{fotoPersilUrls.length}</Badge>}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 bg-slate-800 border-t border-slate-600">
                    {loadingFotos ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-500"></div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Photo Gallery */}
                        {fotoPersilUrls.length > 0 ? (
                          <div className="grid grid-cols-2 gap-3">
                            {fotoPersilUrls.map((url, index) => (
                              <div key={index} className="relative group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={url}
                                  alt={`Foto ${index + 1}`}
                                  className="w-full h-auto object-cover rounded-lg border-2 border-slate-600 hover:border-accent-500 transition-all cursor-pointer"
                                  onClick={() => window.open(url, "_blank")}
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/placeholder.png";
                                  }}
                                />
                                <div className="absolute top-1 left-1 bg-slate-900/80 text-white text-xs px-2 py-1 rounded">{index + 1}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6">
                            <ImageIcon className="w-12 h-12 text-slate-500 mx-auto mb-2" />
                            <p className="text-slate-400 text-sm">Belum ada foto untuk properti ini</p>
                          </div>
                        )}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tax-info" className="border-slate-600">
                  <AccordionTrigger className="hover:no-underline bg-slate-700 hover:bg-slate-600 px-4 py-3 text-white font-medium border-b border-slate-600">Informasi Pajak</AccordionTrigger>
                  <AccordionContent className="p-4 bg-slate-800 border-t border-slate-600">
                    {loadingProperty ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-500"></div>
                      </div>
                    ) : propertyData ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm font-medium text-slate-400">Nomor Objek Pajak</span>
                            <p className="text-md font-semibold text-white">{`${propertyData.kdPropinsi}${propertyData.kdDati2}${propertyData.kdKecamatan}${propertyData.kdKelurahan}${propertyData.kdBlok}${propertyData.noUrut}${propertyData.kdJnsOp}`}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-slate-400">Jumlah Pajak</span>
                            <p className="text-lg font-semibold text-white">{formatRupiah(propertyData.pbbYgHarusDibayarSppt || 0)}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-slate-400">Tanggal Jatuh Tempo</span>
                            <p className="text-lg font-semibold text-white">{propertyData.tglJatuhTempoSppt ? new Date(propertyData.tglJatuhTempoSppt).toLocaleDateString("id-ID") : "N/A"}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-slate-400">Status Pembayaran</span>
                            <Badge className={propertyData.statusPembayaranSppt === "1" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>{propertyData.statusPembayaranSppt === "1" ? "Lunas" : "Belum Lunas"}</Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <span className="text-sm font-medium text-slate-400">Total NJOP</span>
                            <p className="text-lg font-semibold text-white">{formatRupiah(propertyData.njopSppt || 0)}</p>
                          </div>
                        </div>
                      </div>
                    ) : selectedNop ? (
                      <div className="text-center py-8 space-y-2">
                        <XCircle className="w-12 h-12 text-red-400 mx-auto" />
                        <p className="text-slate-300 font-semibold">Data Tidak Ditemukan</p>
                        <p className="text-slate-400 text-sm">Tidak ada data pajak untuk NOP ini pada tahun {selectedYear}</p>
                        <p className="text-slate-500 text-xs">Silakan pilih tahun lain dari dropdown di atas</p>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-slate-400">Pilih properti untuk melihat detail</p>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="building-info" className="border-slate-600">
                  <AccordionTrigger className="hover:no-underline bg-slate-700 hover:bg-slate-600 px-4 py-3 text-white font-medium border-b border-slate-600">Informasi Bangunan</AccordionTrigger>
                  <AccordionContent className="p-4 bg-slate-800 border-t border-slate-600">
                    {propertyData ? (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-2 bg-slate-700 rounded">
                          <span className="text-sm text-slate-300">Luas Tanah</span>
                          <span className="font-semibold text-white">{formatRibuan(propertyData.luasBumiSppt || 0)} m²</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-slate-700 rounded">
                          <span className="text-sm text-slate-300">Luas Bangunan</span>
                          <span className="font-semibold text-white">{formatRibuan(propertyData.luasBngSppt || 0)} m²</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-slate-700 rounded">
                          <span className="text-sm text-slate-300">Kelas Tanah</span>
                          <span className="font-semibold text-white">{propertyData.kdKlsTanah || "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-slate-700 rounded">
                          <span className="text-sm text-slate-300">Kelas Bangunan</span>
                          <span className="font-semibold text-white">{propertyData.kdKlsBng || "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-slate-700 rounded">
                          <span className="text-sm text-slate-300">NJOP Tanah</span>
                          <span className="font-semibold text-white">{formatRupiah(propertyData.njopBumiSppt || 0)}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-slate-700 rounded">
                          <span className="text-sm text-slate-300">NJOP Bangunan</span>
                          <span className="font-semibold text-white">{formatRupiah(propertyData.njopBngSppt || 0)}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-slate-400">Data bangunan tidak tersedia</p>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="owner-info" className="border-slate-600">
                  <AccordionTrigger className="hover:no-underline bg-slate-700 hover:bg-slate-600 px-4 py-3 text-white font-medium border-b border-slate-600">Informasi Pemilik</AccordionTrigger>
                  <AccordionContent className="p-4 bg-slate-800 border-t border-slate-600">
                    {propertyData ? (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-2 bg-slate-700 rounded">
                          <span className="text-sm text-slate-300">Nama Pemilik</span>
                          <span className="font-semibold text-white">{propertyData.nmWpSppt || "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-slate-700 rounded">
                          <span className="text-sm text-slate-300">Alamat</span>
                          <span className="font-semibold text-white">{propertyData.jlnWpSppt || "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-slate-700 rounded">
                          <span className="text-sm text-slate-300">RT/RW</span>
                          <span className="font-semibold text-white">
                            {propertyData.rtWpSppt || "N/A"} / {propertyData.rwWpSppt || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-slate-700 rounded">
                          <span className="text-sm text-slate-300">Kelurahan</span>
                          <span className="font-semibold text-white">{propertyData.kelurahanWpSppt || "N/A"}</span>
                        </div>
                        {/* <div className="flex justify-between items-center p-2 bg-slate-700 rounded">
                          <span className="text-sm text-slate-300">Kecamatan</span>
                          <span className="font-semibold text-white">{propertyData.wpKecamatan || "N/A"}</span>
                        </div> */}
                        <div className="flex justify-between items-center p-2 bg-slate-700 rounded">
                          <span className="text-sm text-slate-300">Kota/Kabupaten</span>
                          <span className="font-semibold text-white">{propertyData.kotaWpSppt || "N/A"}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-slate-400">Data pemilik tidak tersedia</p>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Upload Photo Section - Outside accordion, below all sections */}
              {isAdminAuth && selectedNop && (
                <div className="mt-4 px-4 py-3 bg-slate-700 rounded-lg border border-slate-600">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">Upload Foto{fotoPersilUrls.length > 0 ? ` (${fotoPersilUrls.length} foto saat ini)` : ""}</span>
                    </div>
                    {fotoPersilUrls.length > 0 && <p className="text-xs text-yellow-400">⚠️ Upload foto baru akan mengganti semua foto yang ada</p>}

                    <label
                      htmlFor="photo-upload"
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed transition-all cursor-pointer ${
                        uploadingPhoto ? "border-slate-600 bg-slate-800 cursor-not-allowed opacity-50" : "border-accent-500 bg-slate-800 hover:bg-slate-600 hover:border-accent-400"
                      }`}
                    >
                      {uploadingPhoto ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span className="text-sm text-white">Mengunggah...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 text-accent-400" />
                          <span className="text-sm text-white">Pilih Foto</span>
                        </>
                      )}
                    </label>
                    <input id="photo-upload" type="file" accept="image/jpeg,image/jpg,image/png,image/webp,image/bmp,image/gif" multiple onChange={handlePhotoUpload} disabled={uploadingPhoto} className="hidden" />
                    <p className="text-xs text-slate-500 text-center">Format: JPG, PNG, WEBP, BMP, GIF • Maksimal: 5MB per file</p>
                  </div>
                </div>
              )}
            </div>
          ),
        };

      case "warning":
        return {
          title: "Sistem Peringatan",
          description: "Pantau objek pajak terlambat dan kasus prioritas",
          content: <OverdueTracking isOpen={isOpen} onShowOnMap={onSearch} />,
        };

      case "settings":
        if (!isAdmin) {
          return {
            title: "Akses Ditolak",
            description: "Anda tidak memiliki izin untuk mengakses halaman ini",
            content: (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Settings className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <p className="text-red-400 text-lg font-semibold">Akses Ditolak</p>
                  <p className="text-slate-400 text-sm mt-2">Hanya administrator yang dapat mengakses pengaturan</p>
                </div>
              </div>
            ),
          };
        }
        return {
          title: "Pengaturan",
          description: "Konfigurasi pengaturan peta (Hanya Admin)",
          content: (
            <SettingsPanel
              onPointSelect={startPointSelection}
              onCancelPointSelect={cancelPointSelection}
              onSettingsUpdate={() => {
                toast.success("Silakan muat ulang halaman untuk melihat perubahan");
              }}
            />
          ),
        };

      case "management":
        if (!isAdmin) {
          return {
            title: "Akses Ditolak",
            description: "Anda tidak memiliki izin untuk mengakses halaman ini",
            content: (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Upload className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <p className="text-red-400 text-lg font-semibold">Akses Ditolak</p>
                  <p className="text-slate-400 text-sm mt-2">Hanya administrator yang dapat mengakses upload data</p>
                </div>
              </div>
            ),
          };
        }
        return {
          title: "Upload Data",
          description: "Unggah data GIS dan tambah titik pendataan (Hanya Admin)",
          content: (
            <Accordion type="multiple" defaultValue={["upload-gis", "add-pbjt-point"]} className="w-full">
              <AccordionItem value="upload-gis" className="border-slate-600">
                <AccordionTrigger className="hover:no-underline bg-slate-700 hover:bg-slate-600 px-4 py-3 text-white font-medium border-b border-slate-600">Upload Data GIS</AccordionTrigger>
                <AccordionContent className="p-4 bg-slate-800 border-t border-slate-600">
                  <UploadGISSection />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="add-pbjt-point" className="border-slate-600">
                <AccordionTrigger className="hover:no-underline bg-slate-700 hover:bg-slate-600 px-4 py-3 text-white font-medium border-b border-slate-600">Tambah Titik Pendataan</AccordionTrigger>
                <AccordionContent className="p-4 bg-slate-800 border-t border-slate-600">
                  <AddPbjtTool onPointSelect={startPointSelection} onCancelPointSelect={cancelPointSelection} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
        };

      default:
        return {
          title: "",
          description: "",
          content: (
            <div className="flex items-center justify-center h-64">
              <p className="text-slate-500">Tidak ada panel yang dipilih</p>
            </div>
          ),
        };
    }
  };

  const { title, description, content } = getPanelContent();

  return (
    <div className={`fixed left-16 top-0 h-screen w-1/3 bg-slate-800 border-r border-slate-700 z-[25] shadow-xl rounded-r-lg ${animationClass} flex flex-col`}>
      {/* Panel Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-700 flex-shrink-0">
        <div>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <p className="text-sm text-slate-400 mt-1">{description}</p>
        </div>
        <div className="flex items-center space-x-2">
          {panelType === "info" && (selectedNop || propertyData) && onReset && (
            <Button variant="ghost" size="icon" onClick={handleReset} className="text-slate-400 hover:text-white hover:bg-slate-700 w-10 h-10" title="Reset selection">
              <X className="w-5 h-5" />
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white hover:bg-slate-700 w-12 h-12">
            <ChevronLeft className="w-7 h-7" />
          </Button>
        </div>
      </div>

      {/* Panel Content - Scrollable */}
      <div className={`flex-1 overflow-y-auto p-6 pb-20 info-panel-content ${contentAnimationClass}`}>{content}</div>
    </div>
  );
};

export default InfoPanel;
