"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Globe,
  Layers,
  Satellite,
  Sun,
  Moon,
  Square,
  Building2,
  MapPinIcon,
  Map,
  Check,
  X
} from "lucide-react";

const basemapOptions = [
  {
    id: "Light",
    name: "Light",
    icon: Sun,
    description: "Peta Dasar Terang"
  },
  {
    id: "Dark",
    name: "Dark",
    icon: Moon,
    description: "Peta Dasar Gelap"
  },
  {
    id: "Google",
    name: "Google",
    icon: Map,
    description: "Google Maps"
  },
  {
    id: "Satellite",
    name: "Satellite",
    icon: Satellite,
    description: "Citra Satelit"
  }
];

const batasOptions = [
  {
    id: "Batas Persil",
    name: "Batas Persil",
    icon: Square,
    description: "Batas Tanah/Bangunan"
  },
  {
    id: "Batas Blok", 
    name: "Batas Blok",
    icon: Building2,
    description: "Batas Blok Perumahan"
  },
  {
    id: "Batas Kelurahan",
    name: "Batas Kelurahan", 
    icon: MapPinIcon,
    description: "Batas Wilayah Kelurahan"
  },
    {
    id: "Batas Kecamatan",
    name: "Batas Kecamatan", 
    icon: MapPinIcon,
    description: "Batas Wilayah Kecamatan"
  }
];

interface MapToolControlProps {
  selectedLayerBasemap: string;
  setSelectedLayerBasemap: (layer: string) => void;
  selectedLayerBatas: string;
  setSelectedLayerBatas: (layer: string) => void;
  setIsZNT: (value: boolean) => void;
  selectedLayers?: string[];
  setSelectedLayers?: (layers: string[]) => void;
}

const MapToolControl: React.FC<MapToolControlProps> = ({
  selectedLayerBasemap,
  setSelectedLayerBasemap,
  setSelectedLayerBatas,
  setIsZNT,
  selectedLayers = [],
  setSelectedLayers = () => {}
}) => {
  const [basemapOpen, setBasemapOpen] = useState(false);
  const [batasOpen, setBatasOpen] = useState(false);
  const [internalSelectedLayers, setInternalSelectedLayers] = useState<string[]>(() => selectedLayers);

  const handleBasemapChange = useCallback((basemapId: string) => {
    setSelectedLayerBasemap(basemapId);
  }, [setSelectedLayerBasemap]);

  const handleLayerToggle = useCallback((layerId: string) => {
    const newLayers = internalSelectedLayers.includes(layerId) 
      ? internalSelectedLayers.filter(id => id !== layerId)
      : [...internalSelectedLayers, layerId];
    
    setInternalSelectedLayers(newLayers);
    setSelectedLayers(newLayers);
    
    if (newLayers.length > 0) {
      setSelectedLayerBatas(newLayers[0]);
    }
    
    setIsZNT(false);
  }, [internalSelectedLayers, setSelectedLayers, setSelectedLayerBatas, setIsZNT]);

  // Sync internal state with external selectedLayers
  useEffect(() => {
    setInternalSelectedLayers(selectedLayers);
  }, [selectedLayers]);

  return (
    <div className="absolute bottom-36 right-2.5 flex flex-col gap-2 z-[35]">
      {/* Basemap Control */}
      <Popover open={basemapOpen} onOpenChange={setBasemapOpen}>
        <TooltipProvider delayDuration={10}>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-slate-900 border-primary-500/50 hover:bg-slate-800 hover:border-primary-400/70 text-white backdrop-blur-sm shadow-xl"
                >
                  {basemapOpen ? (
                    <X className="w-4 h-4 text-accent-500" />
                  ) : (
                    <Globe className="w-4 h-4 text-accent-500" />
                  )}
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              className="bg-slate-900 text-white border-primary-500/30 z-[50]"
            >
              {basemapOpen ? "Tutup Peta Dasar" : "Peta Dasar"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <PopoverContent
          className="w-80 p-0 bg-slate-900 border-primary-500/50 backdrop-blur-sm z-[40] shadow-2xl animate-in zoom-in-95 duration-200"
          align="start"
          side="left"
        >
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-accent-500" />
              <h3 className="font-semibold text-white">Peta Dasar</h3>
            </div>
            <Separator className="bg-slate-500 mb-4" />
            <div className="space-y-2">
              {basemapOptions.map((basemap) => {
                const Icon = basemap.icon;
                const isSelected = selectedLayerBasemap === basemap.id;

                return (
                  <Button
                    key={basemap.id}
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start h-auto p-3 ${
                      isSelected
                        ? "bg-primary-500/30 text-accent-500 border border-primary-400/50"
                        : "text-slate-200 hover:bg-slate-700 hover:text-white"
                    }`}
                    onClick={() => handleBasemapChange(basemap.id)}
                  >
                    <Icon className="w-4 h-4 mr-3 flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">{basemap.name}</div>
                      <div className="text-xs text-slate-400">
                        {basemap.description}
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-primary-400 ml-2" />
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Batas Control */}
      <Popover open={batasOpen} onOpenChange={setBatasOpen}>
        <TooltipProvider delayDuration={10}>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 bg-slate-900 rounded-full border-primary-500/50 hover:bg-slate-800 hover:border-primary-400/70 text-white backdrop-blur-sm shadow-xl relative"
                >
                  {batasOpen ? (
                    <X className="w-4 h-4 text-accent-500" />
                  ) : (
                    <Layers className="w-4 h-4 text-accent-500" />
                  )}
                  {!batasOpen && internalSelectedLayers.length > 1 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary-500 text-white border-0">
                      {internalSelectedLayers.length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              className="bg-slate-900 text-white border-primary-500/30 z-[50]"
            >
              {batasOpen ? "Tutup Layer Batas" : "Layer Batas"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <PopoverContent
          className="w-72 p-0 bg-slate-900 border-primary-500/50 backdrop-blur-sm z-[40] shadow-2xl animate-in zoom-in-95 duration-200"
          align="start"
          side="left"
        >
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-accent-500" />
              <h3 className="font-semibold text-white">Layer Batas</h3>
            </div>
            <Separator className="bg-slate-500 mb-4" />
            <div className="space-y-2">
              {batasOptions.map((batas) => {
                const Icon = batas.icon;
                const isSelected = internalSelectedLayers.includes(batas.id);

                return (
                  <Button
                    key={batas.id}
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start h-auto p-3 ${
                      isSelected
                        ? "bg-primary-500/30 text-accent-500 border border-primary-400/50"
                        : "text-slate-200 hover:bg-slate-700 hover:text-white"
                    }`}
                    onClick={() => handleLayerToggle(batas.id)}
                  >
                    <Icon className="w-4 h-4 mr-3 flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">{batas.name}</div>
                      <div className="text-xs text-slate-400">
                        {batas.description}
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-primary-400 ml-2" />
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MapToolControl;
