"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Receipt, 
  ChevronLeft, 
  ChevronRight, 
  BarChart3,
  ToggleLeft,
  ToggleRight,
  ChevronDown,
  ChevronUp,
  UtensilsCrossed,
  Building2,
  Zap,
  ParkingCircle,
  Music
} from "lucide-react";

interface PajakLainDrawerProps {
  onPBBP2Toggle?: (active: boolean) => void;
  onBPHTBToggle?: (active: boolean) => void;
  onPBJTToggle?: (active: boolean) => void;
  onPBJTRestoranToggle?: (active: boolean) => void;
  onPBJTHotelToggle?: (active: boolean) => void;
  onPBJTListrikToggle?: (active: boolean) => void;
  onPBJTParkirToggle?: (active: boolean) => void;
  onPBJTHiburanToggle?: (active: boolean) => void;
  onPajakReklameToggle?: (active: boolean) => void;
  onPajakAirTanahToggle?: (active: boolean) => void;
  onPajakMBLBToggle?: (active: boolean) => void;
  onPajakSarangWaletToggle?: (active: boolean) => void;
  onOpsenPKBToggle?: (active: boolean) => void;
  onOpsenBBNKBToggle?: (active: boolean) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const PajakLainDrawer: React.FC<PajakLainDrawerProps> = ({
  onPBBP2Toggle,
  onBPHTBToggle,
  onPBJTToggle,
  onPBJTRestoranToggle,
  onPBJTHotelToggle,
  onPBJTListrikToggle,
  onPBJTParkirToggle,
  onPBJTHiburanToggle,
  onPajakReklameToggle,
  onPajakAirTanahToggle,
  onPajakMBLBToggle,
  onPajakSarangWaletToggle,
  onOpsenPKBToggle,
  onOpsenBBNKBToggle,
  isOpen: controlledIsOpen,
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Use controlled state if provided, otherwise use local state
  const drawerIsOpen = controlledIsOpen !== undefined ? controlledIsOpen : isOpen;
  const [pbbP2Active, setPbbP2Active] = useState(false);
  const [bphtbActive, setBphtbActive] = useState(false);
  const [pbjtExpanded, setPbjtExpanded] = useState(false);
  
  // Individual PBJT type states
  const [pbjtRestoranActive, setPbjtRestoranActive] = useState(false);
  const [pbjtHotelActive, setPbjtHotelActive] = useState(false);
  const [pbjtListrikActive, setPbjtListrikActive] = useState(false);
  const [pbjtParkirActive, setPbjtParkirActive] = useState(false);
  const [pbjtHiburanActive, setPbjtHiburanActive] = useState(false);
  
  const [pajakReklameActive, setPajakReklameActive] = useState(false);
  const [pajakAirTanahActive, setPajakAirTanahActive] = useState(false);
  const [pajakMBLBActive, setPajakMBLBActive] = useState(false);
  const [pajakSarangWaletActive, setPajakSarangWaletActive] = useState(false);
  const [opsenPKBActive, setOpsenPKBActive] = useState(false);
  const [opsenBBNKBActive, setOpsenBBNKBActive] = useState(false);

  // Compute master PBJT state (on if any type is active)
  const pbjtMasterActive = pbjtRestoranActive || pbjtHotelActive || pbjtListrikActive || pbjtParkirActive || pbjtHiburanActive;
  
  // Count active PBJT types
  const pbjtActiveCount = [pbjtRestoranActive, pbjtHotelActive, pbjtListrikActive, pbjtParkirActive, pbjtHiburanActive].filter(Boolean).length;

  const toggleDrawer = () => {
    const newState = !drawerIsOpen;
    if (onOpenChange) {
      onOpenChange(newState);
    } else {
      setIsOpen(newState);
    }
  };

  // Handle master PBJT toggle - toggles all types
  const handlePbjtMasterToggle = () => {
    const newState = !pbjtMasterActive;
    setPbjtRestoranActive(newState);
    setPbjtHotelActive(newState);
    setPbjtListrikActive(newState);
    setPbjtParkirActive(newState);
    setPbjtHiburanActive(newState);
    
    onPBJTToggle?.(newState);
    onPBJTRestoranToggle?.(newState);
    onPBJTHotelToggle?.(newState);
    onPBJTListrikToggle?.(newState);
    onPBJTParkirToggle?.(newState);
    onPBJTHiburanToggle?.(newState);
  };

  // Handle individual PBJT type toggle
  const handlePbjtTypeToggle = (
    type: 'restoran' | 'hotel' | 'listrik' | 'parkir' | 'hiburan',
    currentState: boolean,
    setState: React.Dispatch<React.SetStateAction<boolean>>,
    callback?: (active: boolean) => void
  ) => {
    const newState = !currentState;
    setState(newState);
    callback?.(newState);
  };

  // Sync with parent PBJT toggle when any individual type changes
  useEffect(() => {
    onPBJTToggle?.(pbjtMasterActive);
  }, [pbjtMasterActive, onPBJTToggle]);

  const pbjtTypes = [
    { 
      key: 'restoran', 
      label: 'Restoran', 
      icon: UtensilsCrossed, 
      color: 'text-orange-400', 
      active: pbjtRestoranActive, 
      setActive: setPbjtRestoranActive, 
      callback: onPBJTRestoranToggle 
    },
    { 
      key: 'hotel', 
      label: 'Hotel', 
      icon: Building2, 
      color: 'text-blue-400', 
      active: pbjtHotelActive, 
      setActive: setPbjtHotelActive, 
      callback: onPBJTHotelToggle 
    },
    { 
      key: 'listrik', 
      label: 'Listrik', 
      icon: Zap, 
      color: 'text-yellow-400', 
      active: pbjtListrikActive, 
      setActive: setPbjtListrikActive, 
      callback: onPBJTListrikToggle 
    },
    { 
      key: 'parkir', 
      label: 'Parkir', 
      icon: ParkingCircle, 
      color: 'text-green-400', 
      active: pbjtParkirActive, 
      setActive: setPbjtParkirActive, 
      callback: onPBJTParkirToggle 
    },
    { 
      key: 'hiburan', 
      label: 'Kesenian & Hiburan', 
      icon: Music, 
      color: 'text-purple-400', 
      active: pbjtHiburanActive, 
      setActive: setPbjtHiburanActive, 
      callback: onPBJTHiburanToggle 
    },
  ];

  const taxTypes = [
    { key: 'pbbP2', label: 'PBB-P2', active: pbbP2Active, setActive: setPbbP2Active, callback: onPBBP2Toggle },
    { key: 'bphtb', label: 'BPHTB', active: bphtbActive, setActive: setBphtbActive, callback: onBPHTBToggle },
    { key: 'pajakReklame', label: 'Pajak Reklame', active: pajakReklameActive, setActive: setPajakReklameActive, callback: onPajakReklameToggle },
    { key: 'pajakAirTanah', label: 'Pajak Air Tanah', active: pajakAirTanahActive, setActive: setPajakAirTanahActive, callback: onPajakAirTanahToggle },
    { key: 'pajakMBLB', label: 'Pajak MBLB', active: pajakMBLBActive, setActive: setPajakMBLBActive, callback: onPajakMBLBToggle },
    { key: 'pajakSarangWalet', label: 'Pajak Sarang Walet', active: pajakSarangWaletActive, setActive: setPajakSarangWaletActive, callback: onPajakSarangWaletToggle },
    { key: 'opsenPKB', label: 'Opsen PKB', active: opsenPKBActive, setActive: setOpsenPKBActive, callback: onOpsenPKBToggle },
    { key: 'opsenBBNKB', label: 'Opsen BBNKB', active: opsenBBNKBActive, setActive: setOpsenBBNKBActive, callback: onOpsenBBNKBToggle },
  ];

  const handleToggle = (taxType: typeof taxTypes[0]) => {
    const newActive = !taxType.active;
    taxType.setActive(newActive);
    taxType.callback?.(newActive);
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
        className={`fixed right-0 top-80 transform -translate-y-1/2 transition-all duration-300 ease-in-out ${
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
              PAJAK<br/>LAIN
            </div>
            <Receipt className="w-4 h-4 text-accent-500" />
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
              <Receipt className="w-4 h-4 text-black" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Pajak Lain</h2>
              <p className="text-xs text-slate-400">Jenis Pajak Daerah</p>
            </div>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="overflow-y-auto p-4 space-y-2 max-h-[calc(40vh-80px)]">
          {taxTypes.map((taxType) => (
            <div key={taxType.key} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-accent-500" />
                <h3 className="text-sm font-medium text-white">{taxType.label}</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleToggle(taxType)}
                className="p-0 h-auto"
              >
                {taxType.active ? (
                  <ToggleRight className="w-6 h-6 text-accent-500" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-slate-400" />
                )}
              </Button>
            </div>
          ))}

          {/* PBJT Master Toggle with Expandable Dropdown */}
          <div className="border border-slate-600 rounded-lg overflow-hidden">
            {/* PBJT Master Row */}
            <div className="flex items-center justify-between bg-slate-700/50 p-2">
              <div className="flex items-center gap-2 flex-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPbjtExpanded(!pbjtExpanded)}
                  className="p-1 h-auto hover:bg-slate-600"
                >
                  {pbjtExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-300" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-300" />
                  )}
                </Button>
                <BarChart3 className="w-4 h-4 text-accent-500" />
                <h3 className="text-sm font-medium text-white">PBJT</h3>
                {pbjtActiveCount > 0 && !pbjtExpanded && (
                  <Badge className="bg-accent-500 text-white text-xs px-1.5 py-0.5 h-5">
                    {pbjtActiveCount}
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePbjtMasterToggle}
                className="p-0 h-auto"
              >
                {pbjtMasterActive ? (
                  <ToggleRight className="w-6 h-6 text-accent-500" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-slate-400" />
                )}
              </Button>
            </div>

            {/* PBJT Types Dropdown */}
            {pbjtExpanded && (
              <div className="bg-slate-800/50 border-t border-slate-600">
                {pbjtTypes.map((pbjtType) => {
                  const Icon = pbjtType.icon;
                  return (
                    <div 
                      key={pbjtType.key} 
                      className="flex items-center justify-between pl-8 pr-2 py-1.5 hover:bg-slate-700/30 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`w-3.5 h-3.5 ${pbjtType.color}`} />
                        <h4 className="text-xs font-medium text-slate-300">{pbjtType.label}</h4>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePbjtTypeToggle(
                          pbjtType.key as 'restoran' | 'hotel' | 'listrik' | 'parkir' | 'hiburan',
                          pbjtType.active,
                          pbjtType.setActive,
                          pbjtType.callback
                        )}
                        className="p-0 h-auto"
                      >
                        {pbjtType.active ? (
                          <ToggleRight className="w-5 h-5 text-accent-500" />
                        ) : (
                          <ToggleLeft className="w-5 h-5 text-slate-400" />
                        )}
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default PajakLainDrawer;
