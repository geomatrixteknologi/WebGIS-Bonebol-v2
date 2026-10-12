"use client";
import React from "react";

interface TunggakanLegendProps {
  isVisible: boolean;
}

const TunggakanLegend: React.FC<TunggakanLegendProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  const legendItems = [
    { label: "< 6 Bulan", color: "bg-red-300", desc: "Baru menunggak" },
    { label: "6 - 12 Bulan", color: "bg-red-500", desc: "Tunggakan sedang" },
    { label: "1 - 2 Tahun", color: "bg-red-700", desc: "Tunggakan tinggi" },
    { label: "2 - 5 Tahun", color: "bg-red-900", desc: "Tunggakan kritis" },
    { label: "> 5 Tahun", color: "bg-black", desc: "Tunggakan parah" },
  ];

  return (
    <div className="fixed bottom-10 right-18 z-[1000] bg-slate-800/95 backdrop-blur-sm border border-slate-700 rounded-lg shadow-2xl p-4 w-48">
      {/* Header
      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-700">
        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Status Tunggakan</h3>
          <p className="text-xs text-slate-400">Durasi Keterlambatan</p>
        </div>
      </div> */}

      {/* Legend Items */}
      <div className="space-y-2">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div
              className={`w-6 h-6 ${item.color} rounded border border-slate-600 flex-shrink-0`}
            />
            <div className="flex-1">
              <p className="text-xs font-medium text-white">{item.label}</p>
              <p className="text-[10px] text-slate-400">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      {/* <div className="mt-3 pt-3 border-t border-slate-700">
        <p className="text-[10px] text-slate-500 text-center">
          Warna lebih gelap = tunggakan lebih lama
        </p>
      </div> */}
    </div>
  );
};

export default TunggakanLegend;

