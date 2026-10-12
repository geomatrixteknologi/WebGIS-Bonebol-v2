"use client";
import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useMapConfig } from "@/hooks/useMapConfig";

interface MapConfigContextValue {
  // Map configuration
  latitude: number;
  longitude: number;
  zoom: number;
  loading: boolean;
  error: Error | null;

  // Layer management
  selectedLayers: string[];
  toggleLayer: (layerId: string) => void;
  setSelectedLayers: (layers: string[]) => void;

  // Polygon search state
  searchedPolygon: GeoJSON.FeatureCollection | null;
  setSearchedPolygon: (polygon: GeoJSON.FeatureCollection | null) => void;

  // Point selection for PBJT
  pointSelectionCallback: ((lat: number, lng: number) => void) | null;
  startPointSelection: (callback: (lat: number, lng: number) => void) => void;
  cancelPointSelection: () => void;

  // Fly to kecamatan
  focusedKecamatanCode: string | null;
  setFocusedKecamatanCode: (code: string | null) => void;

  // Refetch configuration
  refetchConfig: () => Promise<void>;
}

const MapConfigContext = createContext<MapConfigContextValue | undefined>(undefined);

interface MapConfigProviderProps {
  children: ReactNode;
}

/**
 * Provider for map configuration state
 * Manages map center, zoom, layers, and point selection
 *
 * @example
 * <MapConfigProvider>
 *   <YourComponent />
 * </MapConfigProvider>
 */
export function MapConfigProvider({ children }: MapConfigProviderProps) {
  // Use the useMapConfig hook for center point and zoom
  const { latitude, longitude, zoom, loading, error, refetch } = useMapConfig();

  // Layer state
  const [selectedLayers, setSelectedLayers] = useState<string[]>([]);

  // Polygon search state
  const [searchedPolygon, setSearchedPolygon] = useState<GeoJSON.FeatureCollection | null>(null);

  // Point selection state for PBJT tool
  const [pointSelectionCallback, setPointSelectionCallback] = useState<
    ((lat: number, lng: number) => void) | null
  >(null);

  // Focused kecamatan state - triggers map to fly to kecamatan bounds
  const [focusedKecamatanCode, setFocusedKecamatanCode] = useState<string | null>(null);

  /**
   * Toggle a layer on/off
   */
  const toggleLayer = useCallback((layerId: string) => {
    setSelectedLayers((prev) => {
      if (prev.includes(layerId)) {
        return prev.filter((id) => id !== layerId);
      } else {
        return [...prev, layerId];
      }
    });
  }, []);

  /**
   * Start point selection mode for PBJT tool
   * Wraps callback to auto-clear selection mode after point is selected
   */
  const startPointSelection = useCallback((callback: (lat: number, lng: number) => void) => {
    setPointSelectionCallback(() => (lat: number, lng: number) => {
      callback(lat, lng);
      // Clear the callback after execution to deactivate selection mode
      setPointSelectionCallback(null);
    });
  }, []);

  /**
   * Cancel point selection mode
   */
  const cancelPointSelection = useCallback(() => {
    setPointSelectionCallback(null);
  }, []);

  const value: MapConfigContextValue = {
    latitude,
    longitude,
    zoom,
    loading,
    error,
    selectedLayers,
    toggleLayer,
    setSelectedLayers,
    searchedPolygon,
    setSearchedPolygon,
    pointSelectionCallback,
    startPointSelection,
    cancelPointSelection,
    focusedKecamatanCode,
    setFocusedKecamatanCode,
    refetchConfig: refetch,
  };

  return <MapConfigContext.Provider value={value}>{children}</MapConfigContext.Provider>;
}

/**
 * Hook to access map configuration context
 * Must be used within MapConfigProvider
 *
 * @throws Error if used outside MapConfigProvider
 *
 * @example
 * const { latitude, longitude, zoom } = useMapConfigContext();
 */
export function useMapConfigContext(): MapConfigContextValue {
  const context = useContext(MapConfigContext);
  if (context === undefined) {
    throw new Error("useMapConfigContext must be used within a MapConfigProvider");
  }
  return context;
}
