"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { formatRupiah } from "@/utility/FormatRupiah";
import { formatRupiahShort } from "@/utility/FormatRupiahShort";
import { Button } from "@/components/ui/button";

interface RegionalData {
  region: string;
  target: number;
  realization: number;
  paidCount: number;
  unpaidCount: number;
  totalCount: number;
  achievementRate: number;
}

interface RegionalPerformanceProps {
  isOpen: boolean;
}

export default function RegionalPerformance({ isOpen }: RegionalPerformanceProps) {
  const [regionalData, setRegionalData] = useState<RegionalData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [regionType, setRegionType] = useState<"kecamatan" | "kelurahan">("kecamatan");
  const [kecamatanList, setKecamatanList] = useState<string[]>([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>("");

  // Fetch available years
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await axios.get<{
          code: number;
          data: string[];
          message: string;
        }>(`${process.env.NEXT_PUBLIC_PBB_API_URL}/api/retrieve/available-years`, {
          withCredentials: true,
        });

        if (response.data.code === 200 && response.data.data.length > 0) {
          setAvailableYears(response.data.data);
          setSelectedYear(response.data.data[0]); // Latest year
        }
      } catch (error) {
        console.error("Error fetching years:", error);
      }
    };

    if (isOpen && availableYears.length === 0) {
      fetchYears();
    }
  }, [isOpen, availableYears.length]);

  // Fetch kecamatan list
  useEffect(() => {
    const fetchKecamatanList = async () => {
      try {
        const response = await axios.get<{
          code: number;
          data: string[];
          message: string;
        }>(`${process.env.NEXT_PUBLIC_PBB_API_URL}/api/retrieve/kecamatan-list`, {
          withCredentials: true,
        });

        if (response.data.code === 200) {
          setKecamatanList(response.data.data);
          if (response.data.data.length > 0) {
            setSelectedKecamatan(response.data.data[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching kecamatan list:", error);
      }
    };

    if (isOpen && regionType === "kelurahan" && kecamatanList.length === 0) {
      fetchKecamatanList();
    }
  }, [isOpen, regionType, kecamatanList.length]);

  // Fetch regional data
  useEffect(() => {
    const fetchRegionalData = async () => {
      if (!selectedYear) return;

      // If kelurahan is selected but no kecamatan is selected, don't fetch
      if (regionType === "kelurahan" && !selectedKecamatan) return;

      setLoading(true);
      try {
        const params: Record<string, string> = {
          year: selectedYear,
          type: regionType,
        };

        // Add kecamatan filter for kelurahan view
        if (regionType === "kelurahan" && selectedKecamatan) {
          params.kecamatan = selectedKecamatan;
        }

        const response = await axios.get<{
          code: number;
          data: RegionalData[];
          message: string;
        }>(`${process.env.NEXT_PUBLIC_PBB_API_URL}/api/retrieve/regional-breakdown`, {
          params,
          withCredentials: true,
        });

        if (response.data.code === 200) {
          // // Filter out low-value and invalid regions
          // const filteredData = response.data.data.filter((region) => {
          //   // Exclude regions with value less than 100 million
          //   if (region.target < 100_000_000) return false;

          //   // Exclude specific invalid region names
          //   const regionName = region.region?.toLowerCase().trim();
          //   const invalidRegions = ["kota mataram", "0", "mtr", "cakranegra"];
          //   if (invalidRegions.includes(regionName)) return false;

          //   return true;
          // });
          const finalData = response.data.data;
          setRegionalData(finalData);
        } else {
          setRegionalData([]);
          toast.error("Gagal mengambil data regional");
        }
      } catch (error) {
        console.error("Error fetching regional data:", error);
        setRegionalData([]);
        toast.error("Terjadi kesalahan saat mengambil data regional");
      } finally {
        setLoading(false);
      }
    };

    if (selectedYear) {
      fetchRegionalData();
    }
  }, [selectedYear, regionType, selectedKecamatan]);

  // Calculate summary
  const totalTarget = regionalData.reduce((sum, item) => sum + item.target, 0);
  const totalRealization = regionalData.reduce((sum, item) => sum + item.realization, 0);
  const overallAchievement = totalTarget > 0 ? (totalRealization / totalTarget) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs text-slate-400 mb-1 block">Tahun Pajak</label>
          <select
            title="Tahun Pajak"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm border border-slate-600 focus:border-primary-500 focus:outline-none"
          >
            <option value="" disabled style={{ display: selectedYear ? "none" : "block" }}>
              {availableYears.length === 0 ? "Memuat tahun..." : "Pilih Tahun..."}
            </option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="text-xs text-slate-400 mb-1 block">Tipe Regional</label>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRegionType("kecamatan")}
              className={`flex-1 transition-colors ${regionType === "kecamatan" ? "bg-slate-700 text-accent-500 border-accent-500 hover:bg-slate-600" : "border-slate-600 text-slate-500 hover:bg-slate-700 hover:text-white"}`}
            >
              Kecamatan
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRegionType("kelurahan")}
              className={`flex-1 transition-colors ${regionType === "kelurahan" ? "bg-slate-700 text-accent-500 border-accent-500 hover:bg-slate-600" : "border-slate-600 text-slate-500 hover:bg-slate-700 hover:text-white"}`}
            >
              Kelurahan
            </Button>
          </div>
        </div>

        {regionType === "kelurahan" && (
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs text-slate-400 mb-1 block">Kecamatan</label>
            <select
              title="Kecamatan"
              value={selectedKecamatan}
              onChange={(e) => setSelectedKecamatan(e.target.value)}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm border border-slate-600 focus:border-primary-500 focus:outline-none"
            >
              {kecamatanList.map((kecamatan) => (
                <option key={kecamatan} value={kecamatan}>
                  {kecamatan}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500"></div>
        </div>
      ) : regionalData.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-400">Tidak ada data regional tersedia</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-4 rounded-lg shadow-lg">
              <p className="text-xs text-white opacity-90 mb-1">Total Target</p>
              <p className="text-xl font-bold text-white">{formatRupiahShort(totalTarget)}</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-lg shadow-lg">
              <p className="text-xs text-white opacity-90 mb-1">Total Realisasi</p>
              <p className="text-xl font-bold text-white">{formatRupiahShort(totalRealization)}</p>
            </div>
            <div className="bg-gradient-to-br from-accent-500 to-accent-600 p-4 rounded-lg shadow-lg">
              <p className="text-xs text-white opacity-90 mb-1">Penerimaan</p>
              <p className="text-xl font-bold text-white">{overallAchievement.toFixed(1)}%</p>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-slate-700 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-4">Performa Regional - {regionType === "kecamatan" ? "Kecamatan" : `Kelurahan (${selectedKecamatan})`}</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={regionalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="region" stroke="#94a3b8" style={{ fontSize: "10px" }} angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} tickFormatter={(value) => formatRupiahShort(value)} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value: number) => formatRupiah(value)}
                  labelStyle={{ color: "#94a3b8" }}
                  itemSorter={(item) => {
                    return (item.value as number) * -1;
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "12px" }}
                  itemSorter={(item) => {
                    return (typeof item.value === "number" ? item.value : 0) * -1;
                  }}
                />
                <Bar dataKey="target" fill="#0066FF" name="Target" />
                <Bar dataKey="realization" fill="#10b981" name="Realisasi" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
