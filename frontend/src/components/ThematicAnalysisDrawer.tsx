"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  ToggleLeft,
  ToggleRight
} from "lucide-react";

interface ThematicAnalysisDrawerProps {
  onStatusPembayaranChange?: (year: string, active: boolean) => void;
  onStatusPendaftaranToggle?: (active: boolean) => void;
  onStatusTunggakanToggle?: (active: boolean) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ThematicAnalysisDrawer: React.FC<ThematicAnalysisDrawerProps> = ({
  onStatusPembayaranChange,
  onStatusPendaftaranToggle,
  onStatusTunggakanToggle,
  isOpen: controlledIsOpen,
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const drawerIsOpen = controlledIsOpen !== undefined ? controlledIsOpen : isOpen;

  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 10;
  const yearOptions = Array.from({ length: currentYear - startYear + 1 }, (_, i) => currentYear - i);

  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [statusPembayaranActive, setStatusPembayaranActive] = useState(false);
  const [statusPendaftaranActive, setStatusPendaftaranActive] = useState(false);
  const [statusTunggakanActive, setStatusTunggakanActive] = useState(false);

  const toggleDrawer = () => {
    const newState = !drawerIsOpen;
    if (onOpenChange) {
      onOpenChange(newState);
    } else {
      setIsOpen(newState);
    }
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    if (statusPembayaranActive) {
      onStatusPembayaranChange?.(year, true);
    }
  };

  const handleStatusPembayaranToggle = () => {
    const newActive = !statusPembayaranActive;
    setStatusPembayaranActive(newActive);

    if (newActive) {
      setStatusPendaftaranActive(false);
      setStatusTunggakanActive(false);
      onStatusPendaftaranToggle?.(false);
      onStatusTunggakanToggle?.(false);
    }

    onStatusPembayaranChange?.(selectedYear, newActive);
  };

  const handleStatusPendaftaranToggle = () => {
    const newActive = !statusPendaftaranActive;
    setStatusPendaftaranActive(newActive);

    if (newActive) {
      setStatusPembayaranActive(false);
      setStatusTunggakanActive(false);
      onStatusPembayaranChange?.(selectedYear, false);
      onStatusTunggakanToggle?.(false);
    }

    onStatusPendaftaranToggle?.(newActive);
  };

  const handleStatusTunggakanToggle = () => {
    const newActive = !statusTunggakanActive;
    setStatusTunggakanActive(newActive);

    if (newActive) {
      setStatusPembayaranActive(false);
      setStatusPendaftaranActive(false);
      onStatusPembayaranChange?.(selectedYear, false);
      onStatusPendaftaranToggle?.(false);
    }

    onStatusTunggakanToggle?.(newActive);
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
        className={`fixed right-0 top-16 transform -translate-y-1/2 transition-all duration-300 ease-in-out ${
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
              STATUS<br/>PBB
            </div>
            <BarChart3 className="w-4 h-4 text-accent-500" />
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
              <DollarSign className="w-4 h-4 text-black" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Analisis Tematik</h2>
              <p className="text-xs text-slate-400">Status Pajak & Pendaftaran</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {/* Status Pembayaran Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-accent-500" />
                <h3 className="text-sm font-medium text-white">Status Pembayaran</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleStatusPembayaranToggle}
                className="p-0 h-auto"
              >
                {statusPembayaranActive ? (
                  <ToggleRight className="w-6 h-6 text-accent-500" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-slate-400" />
                )}
              </Button>
            </div>
            <div className="space-y-1">
              <div className="relative">
                <Select value={selectedYear} onValueChange={handleYearChange}>
                  <SelectTrigger className="h-8 text-sm bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Pilih Tahun" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {yearOptions.map((year) => (
                      <SelectItem
                        key={year}
                        value={year.toString()}
                        className="text-white hover:bg-slate-600 focus:bg-slate-600"
                      >
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Status Pendaftaran Section */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-accent-500" />
                <h3 className="text-sm font-medium text-white">Status Pendaftaran</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleStatusPendaftaranToggle}
                className="p-0 h-auto"
              >
                {statusPendaftaranActive ? (
                  <ToggleRight className="w-6 h-6 text-accent-500" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-slate-400" />
                )}
              </Button>
            </div>
          </div>

          {/* Status Tunggakan Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-accent-500" />
              <h3 className="text-sm font-medium text-white">Status Tunggakan</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleStatusTunggakanToggle}
              className="p-0 h-auto"
            >
              {statusTunggakanActive ? (
                <ToggleRight className="w-6 h-6 text-accent-500" />
              ) : (
                <ToggleLeft className="w-6 h-6 text-slate-400" />
              )}
            </Button>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default ThematicAnalysisDrawer;
