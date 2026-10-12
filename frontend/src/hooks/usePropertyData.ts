import { useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AxiosError from "axios";
import { GeomData } from "../interface/generalInterface";

interface PersilData {
  geom: GeomData;
  KD_PROV: string;
  KD_KAB: string;
  KD_KEC: string;
  KD_KEL: string;
  KD_BLOK: string;
  NO_URUT: string;
  KD_JNS_OP: string;
  FOTO_PERSIL: string[];
}

interface ApiResponse<T> {
  data: T;
}

interface UsePropertyDataReturn {
  nop: string;
  geomData: GeomData | null;
  fotoPersil: string[];
  loading: boolean;
  error: Error | null;
  loadProperty: (nop: string) => Promise<boolean>;
  clearProperty: () => void;
}

/**
 * Custom hook to manage property (parcel) data including geometry and photos
 * Handles NOP search, geometry fetching, and photo loading
 *
 * @returns Property data state and loading functions
 *
 * @example
 * const { nop, geomData, fotoPersil, loading, loadProperty } = usePropertyData();
 * await loadProperty("52.71.030.001.001.0001.0");
 */
export function usePropertyData(): UsePropertyDataReturn {
  const [nop, setNop] = useState<string>("");
  const [geomData, setGeomData] = useState<GeomData | null>(null);
  const [fotoPersil, setFotoPersil] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Load property data by NOP
   * Fetches both geometry and photos in parallel
   * @param searchNop - The NOP to search for (can be formatted with dots or raw 18 digits)
   * @returns true if successful, false if failed
   */
  const loadProperty = useCallback(async (searchNop: string): Promise<boolean> => {
    // Remove dots if present to get clean NOP
    const cleanNop = searchNop.replace(/\./g, "");

    // Validate NOP format (should be 18 digits)
    const nopRegex = /^\d{18}$/;
    if (!nopRegex.test(cleanNop)) {
      toast.error("Format NOP tidak valid (harus 18 digit)");
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      // Execute both API calls in parallel for better performance
      const [persilResponse, fotoResponse] = await Promise.all([
        axios.get<ApiResponse<PersilData>>(`${process.env.NEXT_PUBLIC_GIS_API_URL}/api/retrieve/bataspersilbyNOP?nop=${cleanNop}`, { withCredentials: true }),
        axios.get<{ imageUrls: string[] }>(`${process.env.NEXT_PUBLIC_GIS_API_URL}/api/retrieve/fotopersil/${cleanNop}`, { withCredentials: true }).catch(() => ({ data: { imageUrls: [] } })), // Handle foto not found gracefully
      ]);

      const data = persilResponse.data.data;
      const geom = data.geom;
      const foto = fotoResponse.data.imageUrls || [];

      // Update all state together to avoid race conditions
      setNop(searchNop);
      setGeomData(geom);
      setFotoPersil(foto);

      toast.success("NOP ditemukan!");
      return true;
    } catch (err) {
      const error = err as typeof AxiosError;
      setError(error as unknown as Error);

      // Don't clear existing data on error - keep previous state
      if (error instanceof AxiosError && (await error).status === 404) {
        toast.error("NOP tidak ditemukan");
      } else {
        toast.error("Terjadi kesalahan saat mencari NOP");
      }
      console.error("Error fetching property data:", error);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Clear all property data
   */
  const clearProperty = useCallback(() => {
    setNop("");
    setGeomData(null);
    setFotoPersil([]);
    setError(null);
  }, []);

  return {
    nop,
    geomData,
    fotoPersil,
    loading,
    error,
    loadProperty,
    clearProperty,
  };
}
