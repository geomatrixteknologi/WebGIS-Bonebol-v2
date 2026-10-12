/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, forwardRef, useImperativeHandle } from "react";
import Sidebar from "./Sidebar";
import InfoPanel from "./InfoPanel";
import { useAuth } from "@/contexts/AuthContext";
import { usePropertyContext } from "@/contexts/PropertyContext";
import { usePanelContext } from "@/contexts/PanelContext";
import { useMapConfigContext } from "@/contexts/MapConfigContext";

const Navbar = forwardRef<
  {
    handleParcelClick: (clickNop: string, clickGeomData: any, clickFotoPersil: string[]) => void;
    handleResetSelection: () => void;
  },
  unknown
>((props, ref) => {
  const { isAdmin } = useAuth();

  // Use contexts instead of local state
  const { nop, geomData, fotoPersil, loadProperty, clearProperty } = usePropertyContext();
  const { activePanel, isPanelOpen, togglePanel, switchPanel, closePanel } = usePanelContext();
  const { setSearchedPolygon } = useMapConfigContext();

  const handleInfoPanelSearch = async (searchNop: string) => {
    // Use context's loadProperty function
    const success = await loadProperty(searchNop);

    if (success) {
      // Need to fetch the property data again to get the updated geomData
      // This is a workaround because context state update is async
      // We'll fetch it directly here for the searched polygon
      try {
        const cleanNop = searchNop.replace(/\./g, "");
        const response = await fetch(`${process.env.NEXT_PUBLIC_GIS_API_URL}/api/retrieve/bataspersilbyNOP?nop=${cleanNop}`, { credentials: "include" });
        const data = await response.json();
        const geom = data.data.geom;

        // Update searched polygon in context
        setSearchedPolygon(geom);

        // Switch to info panel after successful search
        switchPanel("info");
      } catch (error) {
        console.error("Error fetching geometry for searched polygon:", error);
        // Still switch panel even if highlight fails
        switchPanel("info");
      }
    }
  };

  const handleIconClick = (panelType: string) => {
    togglePanel(panelType as any);
  };

  const handlePanelSwitch = (panelType: string) => {
    switchPanel(panelType as any);
  };

  const handleClosePanel = () => {
    if (activePanel === "info" && nop) {
      handleResetSelection(); // Clears property, polygon, AND closes panel
    } else {
      closePanel();
    }
  };

  const handleParcelClick = useCallback(
    (clickNop: string, clickGeomData: any) => {
      // For parcel clicks from map, we have the geometry already, so set it immediately
      setSearchedPolygon(clickGeomData);

      // Load the property data
      loadProperty(clickNop).then((success) => {
        if (success) {
          switchPanel("info");
        }
      });
    },
    [loadProperty, switchPanel, setSearchedPolygon],
  );

  const handleResetSelection = useCallback(() => {
    // Clear property data using context
    clearProperty();

    // Clear the searched polygon highlight
    setSearchedPolygon(null);

    // Close the panel if it's showing parcel info
    if (activePanel === "info") {
      closePanel();
    }
  }, [activePanel, clearProperty, setSearchedPolygon, closePanel]);

  // Expose the functions to parent components
  useImperativeHandle(
    ref,
    () => ({
      handleParcelClick,
      handleResetSelection,
    }),
    [handleParcelClick, handleResetSelection],
  );

  return (
    <>
      {/* Sidebar - Always visible */}
      <Sidebar onIconClick={handleIconClick} activePanel={activePanel as string} onClosePanel={handleClosePanel} isAdmin={isAdmin} />

      <InfoPanel
        isOpen={isPanelOpen}
        panelType={activePanel as string}
        onClose={handleClosePanel}
        onSearch={handleInfoPanelSearch}
        selectedNop={nop}
        geomData={geomData}
        fotoPersil={fotoPersil}
        onReset={handleResetSelection}
        isAdmin={isAdmin}
        onPanelSwitch={handlePanelSwitch}
        // Removed: onStartPointSelection, onCancelPointSelection - InfoPanel should use MapConfigContext
      />
    </>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
