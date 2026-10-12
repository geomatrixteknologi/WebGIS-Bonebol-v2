"use client";
import React, { useEffect, useState } from "react";
import { useAICopilot } from "@/contexts/AICopilotContext";
import { usePanelContext } from "@/contexts/PanelContext";
import { Bot, X, Sparkles } from "lucide-react";

const POPPER_OPEN_SELECTOR =
  '[data-radix-popper-content-wrapper] [data-state="open"]';

const CopilotTriggerButton: React.FC = () => {
  const { isCopilotOpen, toggleCopilot, isLoading } = useAICopilot();
  const { isPanelOpen } = usePanelContext();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const check = () => {
      setIsOverlayOpen(!!document.querySelector(POPPER_OPEN_SELECTOR));
    };

    check();
    const observer = new MutationObserver(check);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-state"],
    });

    return () => observer.disconnect();
  }, []);

  if (isOverlayOpen && !isCopilotOpen) return null;
  // Hide the floating trigger when the left side panel is open to avoid
  // overlapping its charts/content. If the user already opened Copilot on
  // top, keep the X button visible so they can still close it.
  if (isPanelOpen && !isCopilotOpen) return null;

  return (
    <div className="fixed bottom-8 left-24 z-[1050] flex flex-row-reverse items-center gap-4 pointer-events-none">
      {/* Tooltip hint when not open */}
      {!isCopilotOpen && (
        <div className="animate-in fade-in slide-in-from-left-2 duration-500 fill-mode-both delay-1000 bg-[#0f172a]/90 backdrop-blur-md border border-white/20 text-white text-xs px-4 py-2 rounded-full shadow-lg pointer-events-auto cursor-pointer hover:bg-white/20 transition-colors" onClick={toggleCopilot}>
          <span className="flex items-center gap-2 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Tanya AI Geotax
          </span>
        </div>
      )}

      <button
        onClick={toggleCopilot}
        className={`pointer-events-auto relative group w-14 h-14 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.3)] flex items-center justify-center transition-all duration-500 hover:scale-[1.05] hover:-translate-y-1 ${
          isCopilotOpen
            ? "bg-slate-800 hover:bg-slate-700 border border-slate-600/50"
            : "bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-600 border border-white/20"
        }`}
        title={isCopilotOpen ? "Tutup AI Copilot" : "Buka AI Copilot"}
      >
        {/* Glow effect for un-opened state */}
        {!isCopilotOpen && (
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[2rem] blur-xl opacity-40 group-hover:opacity-70 transition duration-500 -z-10"></div>
        )}

        {isCopilotOpen ? (
          <X className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors" />
        ) : (
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm scale-50 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <Bot className="w-7 h-7 text-white drop-shadow-md relative z-10" />
            {isLoading && (
              <span className="absolute -top-1 -right-2 w-3 h-3 bg-emerald-400 border-2 border-indigo-600 rounded-full animate-pulse z-20" />
            )}
          </div>
        )}
      </button>
    </div>
  );
};

export default CopilotTriggerButton;
