"use client";
import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";

export type PanelType = "dashboard" | "search" | "info" | "warning" | "management" | "settings";

interface PanelContextValue {
  // Panel state
  activePanel: PanelType | null;
  isPanelOpen: boolean;

  // Actions
  setActivePanel: (panel: PanelType | null) => void;
  openPanel: (panel: PanelType) => void;
  closePanel: () => void;
  togglePanel: (panel: PanelType) => void;
  switchPanel: (panel: PanelType) => void;
}

const PanelContext = createContext<PanelContextValue | undefined>(undefined);

interface PanelProviderProps {
  children: ReactNode;
  defaultPanel?: PanelType;
  defaultOpen?: boolean;
}

/**
 * Provider for panel (sidebar) state management
 * Manages which panel is open and provides toggle/switch functionality
 *
 * @param defaultPanel - Initial panel to show (default: "dashboard")
 * @param defaultOpen - Whether panel is open initially (default: true)
 *
 * @example
 * <PanelProvider defaultPanel="dashboard" defaultOpen={true}>
 *   <YourComponent />
 * </PanelProvider>
 */
export function PanelProvider({
  children,
  defaultPanel = "dashboard",
  defaultOpen = true,
}: PanelProviderProps) {
  const [activePanel, setActivePanel] = useState<PanelType | null>(defaultPanel);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(defaultOpen);

  /**
   * Open a specific panel
   */
  const openPanel = useCallback((panel: PanelType) => {
    setActivePanel(panel);
    setIsPanelOpen(true);
  }, []);

  /**
   * Close the current panel
   */
  const closePanel = useCallback(() => {
    setIsPanelOpen(false);
  }, []);

  /**
   * Toggle a panel - if it's already active, close it; otherwise, open it
   */
  const togglePanel = useCallback((panel: PanelType) => {
    setActivePanel((currentPanel) => {
      if (currentPanel === panel) {
        setIsPanelOpen(false);
        return currentPanel;
      } else {
        setIsPanelOpen(true);
        return panel;
      }
    });
  }, []);

  /**
   * Switch to a different panel (always opens, even if panel was closed)
   */
  const switchPanel = useCallback((panel: PanelType) => {
    setActivePanel(panel);
    setIsPanelOpen(true);
  }, []);

  // Reset activePanel when panel is fully closed (after animation)
  useEffect(() => {
    if (!isPanelOpen && activePanel) {
      const timer = setTimeout(() => {
        setActivePanel(null);
      }, 400); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [isPanelOpen, activePanel]);

  const value: PanelContextValue = {
    activePanel,
    isPanelOpen,
    setActivePanel,
    openPanel,
    closePanel,
    togglePanel,
    switchPanel,
  };

  return <PanelContext.Provider value={value}>{children}</PanelContext.Provider>;
}

/**
 * Hook to access panel context
 * Must be used within PanelProvider
 *
 * @throws Error if used outside PanelProvider
 *
 * @example
 * const { activePanel, openPanel } = usePanelContext();
 * openPanel("search");
 */
export function usePanelContext(): PanelContextValue {
  const context = useContext(PanelContext);
  if (context === undefined) {
    throw new Error("usePanelContext must be used within a PanelProvider");
  }
  return context;
}
