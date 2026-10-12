"use client";
import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus, Minus } from "lucide-react";
import L from "leaflet";
import { createRoot } from "react-dom/client";

const CustomZoomControl: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    const CustomZoomControl = L.Control.extend({
      options: {
        position: "bottomright"
      },
      onAdd: function () {
        const container = L.DomUtil.create("div", "leaflet-bar leaflet-control");
        container.style.background = "transparent";
        container.style.border = "none";
        container.style.boxShadow = "none";
        
        const buttonGroup = document.createElement("div");
        const root = createRoot(buttonGroup);

        root.render(
          <div className="flex flex-col rounded-3xl mb-10 overflow-hidden border-0 shadow-none">
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-none border-0 bg-gradient-to-b from-primary-800 to-slate-950 hover:from-primary-600 hover:to-slate-800 text-white transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                    onClick={() => map.zoomIn()}
                  >
                    <Plus className="h-5 w-5 text-accent-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="bg-slate-900 text-white border-primary-500/30 z-[50]">
                  Perbesar
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="h-[1px] bg-gradient-to-r from-transparent via-primary-300/40 to-transparent"></div>
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-none border-0 bg-gradient-to-b from-primary-800 to-slate-950 hover:from-primary-600 hover:to-slate-800 text-white transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                    onClick={() => map.zoomOut()}
                  >
                    <Minus className="h-5 w-5 text-accent-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="bg-slate-900 text-white border-primary-500/30 z-[50]">
                  Perkecil
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );

        // Disable event propagation
        L.DomEvent.disableClickPropagation(container);
        L.DomEvent.disableScrollPropagation(container);
        
        container.appendChild(buttonGroup);
        return container;
      }
    });

    const customZoomControl = new CustomZoomControl();
    map.addControl(customZoomControl);

    return () => {
      map.removeControl(customZoomControl);
    };
  }, [map]);

  return null;
};

export default CustomZoomControl;
