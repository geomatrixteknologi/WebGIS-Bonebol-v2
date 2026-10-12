"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { MapPin, X, Plus, Minus } from "lucide-react";

interface SettingsPanelProps {
  onPointSelect: (callback: (lat: number, lng: number) => void) => void;
  onCancelPointSelect: () => void;
  onSettingsUpdate: () => void;
}

interface ApiResponse {
  code: number;
  message: string;
  data?: unknown;
}

export default function SettingsPanel({ onPointSelect, onCancelPointSelect, onSettingsUpdate }: SettingsPanelProps) {
  const [currentLatitude, setCurrentLatitude] = useState<number>(0);
  const [currentLongitude, setCurrentLongitude] = useState<number>(0);
  const [currentZoom, setCurrentZoom] = useState<number>(0);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(0);
  const [isSelectingPoint, setIsSelectingPoint] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<string | null>(null);
  const [isRefreshingCache, setIsRefreshingCache] = useState(false);

  // Track if values have been modified
  const [centerModified, setCenterModified] = useState(false);
  const [zoomModified, setZoomModified] = useState(false);

  // Fetch current settings on mount
  useEffect(() => {
    const fetchCurrentSettings = async () => {
      try {
        setIsLoading(true);
        const [centerResponse, zoomResponse] = await Promise.all([
          axios.get<{ code: number; data: { LATITUDE: string; LONGITUDE: string } }>(`${process.env.NEXT_PUBLIC_GIS_API_URL}/api/retrieve/centerpoint`, { withCredentials: true }),
          axios.get<{ code: number; data: { zoom: number } }>(`${process.env.NEXT_PUBLIC_GIS_API_URL}/api/retrieve/zoom`, { withCredentials: true }),
        ]);

        if (centerResponse.data.code === 200) {
          setCurrentLatitude(parseFloat(centerResponse.data.data.LATITUDE));
          setCurrentLongitude(parseFloat(centerResponse.data.data.LONGITUDE));
        }

        if (zoomResponse.data.code === 200) {
          const apiZoom = zoomResponse.data.data.zoom;
          const clampedZoom = Math.max(3, Math.min(20, apiZoom));
          setCurrentZoom(clampedZoom);
          setZoomLevel(clampedZoom);
        }
      } catch (error) {
        console.error("Error fetching current settings:", error);
        toast.error("Gagal mengambil pengaturan saat ini");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentSettings();
  }, []);

  const handleStartPointSelection = () => {
    setIsSelectingPoint(true);
    onPointSelect((lat: number, lng: number) => {
      setCoordinates({ lat, lng });
      setCenterModified(true);
      setIsSelectingPoint(false);
      toast.success("Titik center point berhasil dipilih");
    });
  };

  const handleCancelPointSelection = () => {
    setIsSelectingPoint(false);
    onCancelPointSelect();
  };

  const handleRemovePoint = () => {
    setCoordinates(null);
    setCenterModified(false);
    toast.success("Titik center point dihapus");
  };

  const handleZoomIncrement = () => {
    if (zoomLevel < 20) {
      setZoomLevel((prev) => prev + 1);
      setZoomModified(true);
    }
  };

  const handleZoomDecrement = () => {
    if (zoomLevel > 3) {
      setZoomLevel((prev) => prev - 1);
      setZoomModified(true);
    }
  };

  const handleSubmit = async () => {
    // Check if at least one value is modified
    if (!centerModified && !zoomModified) {
      toast.error("Tidak ada perubahan untuk disimpan");
      return;
    }

    setIsSubmitting(true);
    try {
      // Update center point if modified
      if (centerModified && coordinates) {
        const centerPayload = {
          latitude: coordinates.lat.toString(),
          longitude: coordinates.lng.toString(),
        };
        await axios.put<ApiResponse>(`${process.env.NEXT_PUBLIC_GIS_API_URL}/api/put/updatecenterpoint`, centerPayload, { withCredentials: true });
      }

      // Update zoom if modified
      if (zoomModified) {
        const zoomPayload = {
          zoomValue: zoomLevel,
        };
        await axios.put<ApiResponse>(`${process.env.NEXT_PUBLIC_GIS_API_URL}/api/put/updatezoom`, zoomPayload, { withCredentials: true });
      }

      // If we reach here, all updates were successful
      toast.success("Pengaturan berhasil disimpan!");

      // Reset modification flags
      setCenterModified(false);
      setZoomModified(false);
      setCoordinates(null);

      // Trigger settings update callback
      onSettingsUpdate();
    } catch (error: unknown) {
      console.error("Error updating settings:", error);
      if (typeof error === "object" && error !== null && "response" in error && typeof error.response === "object" && error.response !== null && "data" in error.response) {
        const errorData = error.response.data as ApiResponse;
        toast.error(errorData.message || "Gagal menyimpan pengaturan");
      } else {
        toast.error("Terjadi kesalahan saat menyimpan pengaturan");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add fetch cache status (in useEffect or separate function)
  const fetchCacheStatus = async () => {
    try {
      const response = await axios.get<{
        code: number;
        data: { lastRefreshed: string | null };
      }>(`${process.env.NEXT_PUBLIC_GIS_API_URL}/api/retrieve/cache/status`, {
        withCredentials: true,
      });
      if (response.data.code === 200) {
        setLastRefreshed(response.data.data.lastRefreshed);
      }
    } catch {
      setLastRefreshed(null);
    }
  };

  // Call fetchCacheStatus on mount - add to existing useEffect or new one:
  useEffect(() => {
    fetchCacheStatus();
  }, []);

  // Add handler for refresh button
  const handleRefreshMapData = async () => {
    setIsRefreshingCache(true);
    try {
      const response = await axios.post<{
        code: number;
        data: { invalidated: number; lastRefreshed: string };
      }>(
        `${process.env.NEXT_PUBLIC_GIS_API_URL}/api/upload/cache/invalidate`,
        {},
        {
          withCredentials: true,
        },
      );
      if (response.data.code === 200) {
        setLastRefreshed(response.data.data.lastRefreshed);
        toast.success("Data peta berhasil diperbarui!");
        onSettingsUpdate(); // Optional: trigger parent refresh
      }
    } catch (error: unknown) {
      console.error("Error refreshing cache:", error);
      toast.error("Gagal memperbarui cache peta");
    } finally {
      setIsRefreshingCache(false);
    }
  };

  // Helper to format date for display
  const formatLastRefreshed = (iso: string | null) => {
    if (!iso) return "Belum pernah";
    try {
      const d = new Date(iso);
      return d.toLocaleString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Tidak diketahui";
    }
  };

  const hasChanges = centerModified || zoomModified;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-700/30 p-3 rounded-lg border border-slate-600">
        <p className="text-xs text-slate-400">Konfigurasi titik center dan zoom level peta saat pertama kali dimuat</p>
      </div>

      {/* Current Values Display */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white">Nilai Saat Ini</h3>
        <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Center Point:</span>
            <div className="text-xs text-white font-mono">
              {currentLatitude.toFixed(6)}, {currentLongitude.toFixed(6)}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Zoom Level:</span>
            <div className="text-xs text-white font-mono">{currentZoom}</div>
          </div>
        </div>
      </div>

      {/* Center Point Configuration */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white">Titik Center Point</h3>

        {coordinates ? (
          <div className="bg-slate-700 p-3 rounded-lg border border-green-500">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <span className="text-xs font-semibold text-green-400">Titik Center Baru</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1 ml-6">
                  <div>
                    <span className="text-slate-400">Latitude:</span> <span className="font-mono text-white">{coordinates.lat.toFixed(6)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Longitude:</span> <span className="font-mono text-white">{coordinates.lng.toFixed(6)}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleRemovePoint} className="text-red-400 hover:text-red-300 hover:bg-slate-600 h-8 w-8" title="Hapus titik">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-700 p-3 rounded-lg border border-slate-600">
            <p className="text-xs text-slate-400">Klik tombol di bawah untuk memilih titik center baru pada peta</p>
          </div>
        )}

        {isSelectingPoint ? (
          <Button variant="outline" onClick={handleCancelPointSelection} className="w-full bg-red-600 hover:bg-red-700 border-red-500 text-white">
            <X className="w-4 h-4 mr-2" />
            Batal Pilih Titik
          </Button>
        ) : (
          <Button variant="outline" onClick={handleStartPointSelection} className="w-full border-accent-500 text-accent-400 hover:bg-accent-500 hover:text-white">
            <MapPin className="w-4 h-4 mr-2" />
            {coordinates ? "Ganti Titik Center" : "Pilih Titik Center"}
          </Button>
        )}
      </div>

      {/* Zoom Level Configuration */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white">Zoom Level</h3>
        <div className="bg-slate-700 p-4 rounded-lg border border-slate-600">
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomDecrement}
              disabled={zoomLevel <= 7}
              className="border-accent-500 text-accent-400 hover:bg-accent-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed h-10 w-10"
            >
              <Minus className="w-5 h-5" />
            </Button>

            <div className="flex flex-col items-center min-w-[80px]">
              <div className="text-3xl font-bold text-white">{zoomLevel}</div>
              <div className="text-xs text-slate-400">Level</div>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomIncrement}
              disabled={zoomLevel >= 17}
              className="border-accent-500 text-accent-400 hover:bg-accent-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed h-10 w-10"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
          <div className="mt-3 text-center text-xs text-slate-400">Range: 7 - 17</div>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-4 border-t border-slate-600">
        <Button onClick={handleSubmit} disabled={isSubmitting || !hasChanges} className="w-full bg-primary-500 hover:bg-primary-600 text-white disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Menyimpan...
            </>
          ) : (
            "Simpan Pengaturan"
          )}
        </Button>
        {!hasChanges && <p className="text-xs text-slate-500 mt-2 text-center">Ubah nilai untuk mengaktifkan tombol simpan</p>}
      </div>

      {/* Refresh Map Data - Cache Invalidation */}
      <div className="space-y-3 pt-4 border-t border-slate-600">
        <h3 className="text-sm font-semibold text-white">Data Peta (Cache)</h3>
        <div className="bg-slate-700 p-3 rounded-lg border border-slate-600">
          <p className="text-xs text-slate-400 mb-3">Jika Anda mengubah data polygon di QGIS, klik tombol di bawah untuk memuat ulang data peta.</p>
          <Button onClick={handleRefreshMapData} disabled={isRefreshingCache} className="w-full border-accent-500 text-accent-400 hover:bg-accent-500 hover:text-white">
            {isRefreshingCache ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Memperbarui...
              </>
            ) : (
              "Refresh Data Peta"
            )}
          </Button>
          <p className="text-xs text-slate-500 mt-2">Data terakhir diperbarui: {formatLastRefreshed(lastRefreshed)}</p>
        </div>
      </div>
    </div>
  );
}
