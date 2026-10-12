import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface MapConfig {
  latitude: number;
  longitude: number;
  zoom: number;
}

interface UseMapConfigReturn {
  latitude: number;
  longitude: number;
  zoom: number;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch and manage map configuration (center point and zoom level)
 * Fetches initial values from API on mount
 *
 * @returns Map configuration state and refetch function
 *
 * @example
 * const { latitude, longitude, zoom, loading } = useMapConfig();
 */
export function useMapConfig(): UseMapConfigReturn {
  const [config, setConfig] = useState<MapConfig>({
    latitude: 0,
    longitude: 0,
    zoom: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchConfig = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch both center point and zoom in parallel
      const [centerResponse, zoomResponse] = await Promise.all([
        axios.get<{ data: { LATITUDE: string; LONGITUDE: string } }>(
          `${process.env.NEXT_PUBLIC_GIS_API_URL}/api/retrieve/centerpoint`,
          { withCredentials: true }
        ),
        axios.get<{ data: { zoom: number } }>(
          `${process.env.NEXT_PUBLIC_GIS_API_URL}/api/retrieve/zoom`,
          { withCredentials: true }
        ),
      ]);

      const latitude = parseFloat(centerResponse.data.data.LATITUDE);
      const longitude = parseFloat(centerResponse.data.data.LONGITUDE);
      const apiZoom = zoomResponse.data.data.zoom;

      // Ensure zoom is within acceptable range (3-20)
      const clampedZoom = Math.max(3, Math.min(20, apiZoom));

      setConfig({
        latitude,
        longitude,
        zoom: clampedZoom,
      });
    } catch (err) {
      const error = err as Error;
      setError(error);
      console.error("Error fetching map configuration:", error);
      toast.error("Gagal mengambil konfigurasi peta");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return {
    latitude: config.latitude,
    longitude: config.longitude,
    zoom: config.zoom,
    loading,
    error,
    refetch: fetchConfig,
  };
}
