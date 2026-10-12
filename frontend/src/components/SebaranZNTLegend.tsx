"use client";
import React from "react";
import { formatRupiah } from "@/utility/FormatRupiah";

interface KelasTanahItem {
  kode: string;
  color: string;
  nilaiPerM2: number | null;
  nilaiPerM2BatasBawah: number | null;
  nilaiPerM2BatasAtas: number | null;
}

interface SebaranZNTLegendProps {
  isVisible: boolean;
  kelasTanahData: KelasTanahItem[];
}

const SebaranZNTLegend: React.FC<SebaranZNTLegendProps> = ({
  isVisible,
  kelasTanahData,
}) => {
  if (!isVisible || kelasTanahData.length === 0) return null;

  return (
    <div
      className="fixed right-16 bottom-20 z-[40] bg-slate-800/95 backdrop-blur-sm border border-slate-600 rounded-t-lg shadow-2xl"
      style={{ maxHeight: "50vh", width: "320px" }}
    >
      {/* Legend Header */}
      <div className="sticky top-0 bg-slate-800 border-b border-slate-600 p-3 z-10 rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"></div>
          <h3 className="text-sm font-semibold text-white">Sebaran Kelas Tanah</h3>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          {kelasTanahData.length} kelas terdaftar
        </p>
      </div>

      {/* Scrollable Legend Content */}
      <div className="overflow-y-auto px-3 py-2" style={{ maxHeight: "calc(50vh - 65px)" }}>
        <div className="space-y-1.5">
          {kelasTanahData.map((item) => (
            <div
              key={item.kode}
              className="flex items-start gap-2 p-2 bg-slate-700/50 rounded border border-slate-600/50 hover:bg-slate-700 transition-colors"
            >
              {/* Color indicator */}
              <div
                className="w-5 h-5 rounded flex-shrink-0 mt-0.5 border border-slate-500"
                style={{ backgroundColor: item.color }}
                title={`Kelas ${item.kode}`}
              ></div>

              {/* Kelas info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-white">
                    Kelas {item.kode}
                  </span>
                </div>

                {/* Nilai per m2 */}
                {item.nilaiPerM2 !== null && item.nilaiPerM2 !== undefined ? (
                  <div className="text-xs text-slate-300 mt-0.5">
                    {formatRupiah(item.nilaiPerM2)}/m²
                  </div>
                ) : (
                  <>
                    {/* Show range if nilai_per_m2 is null */}
                    {(item.nilaiPerM2BatasBawah !== null || item.nilaiPerM2BatasAtas !== null) && (
                      <div className="text-xs text-slate-300 mt-0.5">
                        {item.nilaiPerM2BatasBawah !== null && item.nilaiPerM2BatasBawah !== undefined
                          ? formatRupiah(item.nilaiPerM2BatasBawah)
                          : "—"}
                        {" - "}
                        {item.nilaiPerM2BatasAtas !== null && item.nilaiPerM2BatasAtas !== undefined
                          ? formatRupiah(item.nilaiPerM2BatasAtas)
                          : "—"}
                        /m²
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer info */}
      <div className="sticky bottom-0 bg-slate-800 w-full border-t border-slate-600 p-2 text-center rounded-b-lg">
        <p className="text-xs text-slate-400">
          Warna dihasilkan berdasarkan kode kelas tanah
        </p>
      </div>
    </div>
  );
};

export default SebaranZNTLegend;
