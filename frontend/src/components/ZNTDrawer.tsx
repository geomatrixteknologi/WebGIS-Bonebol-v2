"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Map, 
  ChevronLeft, 
  ChevronRight, 
  BarChart3,
  ToggleLeft,
  ToggleRight
} from "lucide-react";

interface ZNTDrawerProps {
  onPetaZNTToggle?: (active: boolean) => void;
  onSebaranZNTToggle?: (active: boolean, year?: number) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ZNTDrawer: React.FC<ZNTDrawerProps> = ({
  onPetaZNTToggle,
  onSebaranZNTToggle,
  isOpen: controlledIsOpen,
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const drawerIsOpen = controlledIsOpen !== undefined ? controlledIsOpen : isOpen;
  const [petaZNTActive, setPetaZNTActive] = useState(false);
  const [sebaranZNTActive, setSebaranZNTActive] = useState(false);
  const [sebaranYear, setSebaranYear] = useState<number>(new Date().getFullYear() - 1);

  const toggleDrawer = () => {
    const newState = !drawerIsOpen;
    if (onOpenChange) {
      onOpenChange(newState);
    } else {
      setIsOpen(newState);
    }
  };

  const handlePetaZNTToggle = () => {
    const newActive = !petaZNTActive;
    setPetaZNTActive(newActive);

    // Deactivate Sebaran ZNT when Peta ZNT is activated
    if (newActive) {
      setSebaranZNTActive(false);
      onSebaranZNTToggle?.(false);
    }

    onPetaZNTToggle?.(newActive);
  };

  const handleSebaranZNTToggle = () => {
    const newActive = !sebaranZNTActive;
    setSebaranZNTActive(newActive);

    // Deactivate Peta ZNT when Sebaran ZNT is activated
    if (newActive) {
      setPetaZNTActive(false);
      onPetaZNTToggle?.(false);
    }

    onSebaranZNTToggle?.(newActive, sebaranYear);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value, 10);
    setSebaranYear(year);
    if (sebaranZNTActive) {
      onSebaranZNTToggle?.(true, year);
    }
  };

  return (
    <>
      <style jsx>{`
        .writing-mode-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
      
      {/* Unified Drawer Container */}
      <div
        className={`fixed right-0 top-48 transform -translate-y-1/2 transition-all duration-300 ease-in-out ${
          drawerIsOpen ? '-translate-x-80 z-[45]' : 'translate-x-0 z-[35]'
        }`}
      >
        {/* Drawer Handle */}
        <div className="relative z-[35]">
          <Button
            onClick={toggleDrawer}
            className="h-32 w-12 bg-slate-800 hover:bg-slate-700 border-l border-slate-600 rounded-l-lg rounded-r-none shadow-xl flex flex-col items-center justify-center gap-2 p-2"
          >
            {drawerIsOpen ? (
              <ChevronRight className="w-4 h-4 text-white" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-white" />
            )}
            <div className="text-white text-xs font-medium writing-mode-vertical text-center leading-tight">
              ZNT
            </div>
            <Map className="w-4 h-4 text-accent-500" />
          </Button>
        </div>

        {/* Drawer Panel */}
        <div
          className={`absolute left-12 top-0 w-80 max-h-[40vh] bg-slate-800 border border-slate-700 rounded-bl-lg shadow-2xl transition-all duration-300 ease-in-out ${
            drawerIsOpen ? 'opacity-100 z-[50]' : 'opacity-0 pointer-events-none z-0'
          }`}
        >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
              <Map className="w-4 h-4 text-black" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Zona Nilai Tanah</h2>
              <p className="text-xs text-slate-400">Peta & Sebaran ZNT</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {/* Peta ZNT Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-accent-500" />
              <h3 className="text-sm font-medium text-white">Peta ZNT</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePetaZNTToggle}
              className="p-0 h-auto"
            >
              {petaZNTActive ? (
                <ToggleRight className="w-6 h-6 text-accent-500" />
              ) : (
                <ToggleLeft className="w-6 h-6 text-slate-400" />
              )}
            </Button>
          </div>

          {/* Sebaran ZNT Section */}
          <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-accent-500" />
              <h3 className="text-sm font-medium text-white">Sebaran ZNT</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSebaranZNTToggle}
              className="p-0 h-auto"
            >
              {sebaranZNTActive ? (
                <ToggleRight className="w-6 h-6 text-accent-500" />
              ) : (
                <ToggleLeft className="w-6 h-6 text-slate-400" />
              )}
            </Button>
            </div>
            {sebaranZNTActive && (
              <div className="flex items-center justify-between pl-6 mt-1">
                <span className="text-xs text-slate-400">Tahun Data</span>
                <select
                  value={sebaranYear}
                  onChange={handleYearChange}
                  className="bg-slate-700 text-white text-xs rounded border border-slate-600 px-2 py-1 focus:outline-none focus:border-accent-500"
                >
                  <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                  <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
                </select>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default ZNTDrawer;
