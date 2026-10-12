"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { usePropertyData } from "@/hooks/usePropertyData";
import { GeomData } from "@/interface/generalInterface";

interface PropertyContextValue {
  // Property data
  nop: string;
  geomData: GeomData | null;
  fotoPersil: string[];
  loading: boolean;
  error: Error | null;

  // Actions
  loadProperty: (nop: string) => Promise<boolean>;
  clearProperty: () => void;
}

const PropertyContext = createContext<PropertyContextValue | undefined>(undefined);

interface PropertyProviderProps {
  children: ReactNode;
}

/**
 * Provider for property (parcel) data state
 * Manages NOP, geometry, and photos for the currently selected property
 *
 * @example
 * <PropertyProvider>
 *   <YourComponent />
 * </PropertyProvider>
 */
export function PropertyProvider({ children }: PropertyProviderProps) {
  const propertyData = usePropertyData();

  return <PropertyContext.Provider value={propertyData}>{children}</PropertyContext.Provider>;
}

/**
 * Hook to access property context
 * Must be used within PropertyProvider
 *
 * @throws Error if used outside PropertyProvider
 *
 * @example
 * const { nop, geomData, loadProperty } = usePropertyContext();
 * await loadProperty("52.71.030.001.001.0001.0");
 */
export function usePropertyContext(): PropertyContextValue {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error("usePropertyContext must be used within a PropertyProvider");
  }
  return context;
}
