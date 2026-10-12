"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { formatRupiahShort } from "@/utility/FormatRupiahShort";
import { AlertTriangle, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface OverdueSummary {
  totalOverdue: number;
  totalAmount: number;
  totalPenalty: number;
  bySeverity: {
    critical: { count: number; amount: number; daysAvg: number };
    high: { count: number; amount: number; daysAvg: number };
    medium: { count: number; amount: number; daysAvg: number };
    low: { count: number; amount: number; daysAvg: number };
  };
  byRegion: Array<{
    region: string;
    count: number;
    amount: number;
  }>;
}

interface OverdueRecord {
  nop: string;
  nmWpSppt: string;
  opKecamatan: string;
  opKelurahan: string;
  opAlamat: string;
  yearsList: string;
  yearCount: number;
  oldestYear: string;
  daysOverdue: number;
  severity: "critical" | "high" | "medium" | "low";
  spptPbbHarusDibayar: number;
  pbbDenda: number;
  totalOwed: number;
}

interface OverdueTrackingProps {
  isOpen: boolean;
  onShowOnMap?: (nop: string) => void;
}

// Default filter values
const DEFAULT_YEAR = "2025";
const DEFAULT_KECAMATAN = "BONE";
const DEFAULT_KELURAHAN = "ILOHUUWA";
const DEFAULT_SEVERITY = "all";
const DEFAULT_SORT_BY = "time";

export default function OverdueTracking({ isOpen, onShowOnMap }: OverdueTrackingProps) {
  const [summary, setSummary] = useState<OverdueSummary | null>(null);
  const [overdueList, setOverdueList] = useState<OverdueRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(false);

  // Filters with defaults
  const [selectedYear, setSelectedYear] = useState<string>(DEFAULT_YEAR);
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>(DEFAULT_KECAMATAN);
  const [kecamatanList, setKecamatanList] = useState<string[]>([]);
  const [selectedKelurahan, setSelectedKelurahan] = useState<string>(DEFAULT_KELURAHAN);
  const [kelurahanList, setKelurahanList] = useState<string[]>([]);
  const [selectedSeverity, setSelectedSeverity] = useState<string>(DEFAULT_SEVERITY);

  // Sorting (by overdue time or amount)
  const [sortBy, setSortBy] = useState<"time" | "amount">(DEFAULT_SORT_BY);

  // Use ref to track if data has been fetched (doesn't cause re-renders)
  const hasFetchedSummary = useRef(false);
  const hasFetchedList = useRef(false);

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
          // Ensure default year is in the list
          const years = response.data.data;
          if (!years.includes(DEFAULT_YEAR)) {
            years.push(DEFAULT_YEAR);
            years.sort((a, b) => parseInt(b) - parseInt(a)); // Sort descending
          }
          setAvailableYears(years);
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
          const kecamatans = response.data.data;
          // Ensure default kecamatan is in the list
          if (!kecamatans.includes(DEFAULT_KECAMATAN)) {
            kecamatans.push(DEFAULT_KECAMATAN);
            kecamatans.sort();
          }
          setKecamatanList(kecamatans);
        }
      } catch (error) {
        console.error("Error fetching kecamatan list:", error);
      }
    };

    if (isOpen && kecamatanList.length === 0) {
      fetchKecamatanList();
    }
  }, [isOpen, kecamatanList.length]);

  // Fetch kelurahan list based on selected kecamatan
  useEffect(() => {
    const fetchKelurahanList = async () => {
      if (selectedKecamatan === "all") {
        setKelurahanList([]);
        return;
      }

      try {
        const response = await axios.get<{
          code: number;
          data: Array<{
            kdKecamatan: string;
            kdKelurahan: string;
            nmKelurahan: string;
          }>;
          message: string;
        }>(`${process.env.NEXT_PUBLIC_PBB_API_URL}/api/retrieve/kodekelurahan`, {
          withCredentials: true,
        });

        if (response.data.code === 200) {
          // Filter kelurahan by kecamatan name
          const kecamatanData = await axios.get<{
            code: number;
            data: Array<{
              kdKecamatan: string;
              nmKecamatan: string;
            }>;
          }>(`${process.env.NEXT_PUBLIC_PBB_API_URL}/api/retrieve/kodekecamatan`, {
            withCredentials: true,
          });

          if (kecamatanData.data.code === 200) {
            const kecamatan = kecamatanData.data.data.find((kec) => kec.nmKecamatan.toUpperCase() === selectedKecamatan.toUpperCase());

            if (kecamatan) {
              const filtered = response.data.data.filter((kel) => kel.kdKecamatan === kecamatan.kdKecamatan).map((kel) => kel.nmKelurahan);

              // Ensure default kelurahan is in the list when default kecamatan is selected
              if (selectedKecamatan === DEFAULT_KECAMATAN && !filtered.includes(DEFAULT_KELURAHAN)) {
                filtered.push(DEFAULT_KELURAHAN);
                filtered.sort();
              }

              setKelurahanList(filtered);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching kelurahan list:", error);
      }
    };

    // Only fetch when kecamatan changes, not when panel opens
    fetchKelurahanList();
  }, [selectedKecamatan]);

  // Fetch summary data
  useEffect(() => {
    const fetchSummary = async () => {
      if (!isOpen) return;

      setLoading(true);
      try {
        const response = await axios.get<{
          code: number;
          data: OverdueSummary;
          message: string;
        }>(`${process.env.NEXT_PUBLIC_PBB_API_URL}/api/retrieve/overdue-summary`, {
          params: {
            year: selectedYear,
            kecamatan: selectedKecamatan,
            kelurahan: selectedKelurahan,
          },
          withCredentials: true,
        });

        if (response.data.code === 200) {
          setSummary(response.data.data);
          hasFetchedSummary.current = true;
        } else {
          setSummary(null);
          toast.error("Gagal mengambil data ringkasan tunggakan");
        }
      } catch (error) {
        console.error("Error fetching summary:", error);
        setSummary(null);
        toast.error("Terjadi kesalahan saat mengambil data ringkasan tunggakan");
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if: panel is open AND (never fetched before OR filter changed)
    if (isOpen && !hasFetchedSummary.current) {
      fetchSummary();
    }
  }, [isOpen, selectedYear, selectedKecamatan, selectedKelurahan]);

  // Separate effect to refetch when filters change (after initial load)
  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{
          code: number;
          data: OverdueSummary;
          message: string;
        }>(`${process.env.NEXT_PUBLIC_PBB_API_URL}/api/retrieve/overdue-summary`, {
          params: {
            year: selectedYear,
            kecamatan: selectedKecamatan,
            kelurahan: selectedKelurahan,
          },
          withCredentials: true,
        });

        if (response.data.code === 200) {
          setSummary(response.data.data);
        } else {
          setSummary(null);
          toast.error("Gagal mengambil data ringkasan tunggakan");
        }
      } catch (error) {
        console.error("Error fetching summary:", error);
        setSummary(null);
        toast.error("Terjadi kesalahan saat mengambil data ringkasan tunggakan");
      } finally {
        setLoading(false);
      }
    };

    // Only refetch if already initialized and filter changed
    if (hasFetchedSummary.current) {
      fetchSummary();
    }
  }, [selectedYear, selectedKecamatan, selectedKelurahan]);

  // Fetch overdue list (Top 10 only)
  useEffect(() => {
    const fetchOverdueList = async () => {
      if (!isOpen) return;

      setLoadingList(true);
      try {
        const response = await axios.get<{
          code: number;
          data: {
            records: OverdueRecord[];
            pagination?: {
              currentPage: number;
              totalPages: number;
              totalRecords: number;
              limit: number;
            };
          };
          message: string;
        }>(`${process.env.NEXT_PUBLIC_PBB_API_URL}/api/retrieve/overdue-list`, {
          params: {
            year: selectedYear,
            kecamatan: selectedKecamatan,
            kelurahan: selectedKelurahan,
            severity: selectedSeverity,
            limit: 10,
            sortBy: sortBy === "time" ? "daysOverdue" : "totalOwed",
            sortOrder: "DESC",
          },
          withCredentials: true,
        });

        if (response.data.code === 200) {
          setOverdueList(response.data.data.records);
          hasFetchedList.current = true;
        } else {
          setOverdueList([]);
          toast.error("Gagal mengambil data daftar tunggakan");
        }
      } catch (error) {
        console.error("Error fetching overdue list:", error);
        setOverdueList([]);
        toast.error("Terjadi kesalahan saat mengambil data daftar tunggakan");
      } finally {
        setLoadingList(false);
      }
    };

    // Only fetch if: panel is open AND never fetched before
    if (isOpen && !hasFetchedList.current) {
      fetchOverdueList();
    }
  }, [isOpen, selectedYear, selectedKecamatan, selectedKelurahan, selectedSeverity, sortBy]);

  // Separate effect to refetch when filters/sort change (after initial load)
  useEffect(() => {
    const fetchOverdueList = async () => {
      setLoadingList(true);
      try {
        const response = await axios.get<{
          code: number;
          data: {
            records: OverdueRecord[];
            pagination?: {
              currentPage: number;
              totalPages: number;
              totalRecords: number;
              limit: number;
            };
          };
          message: string;
        }>(`${process.env.NEXT_PUBLIC_PBB_API_URL}/api/retrieve/overdue-list`, {
          params: {
            year: selectedYear,
            kecamatan: selectedKecamatan,
            kelurahan: selectedKelurahan,
            severity: selectedSeverity,
            limit: 10,
            sortBy: sortBy === "time" ? "daysOverdue" : "totalOwed",
            sortOrder: "DESC",
          },
          withCredentials: true,
        });

        if (response.data.code === 200) {
          setOverdueList(response.data.data.records);
        } else {
          setOverdueList([]);
          toast.error("Gagal mengambil data daftar tunggakan");
        }
      } catch (error) {
        console.error("Error fetching overdue list:", error);
        setOverdueList([]);
        toast.error("Terjadi kesalahan saat mengambil data daftar tunggakan");
      } finally {
        setLoadingList(false);
      }
    };

    // Only refetch if already initialized and filter/sort changed
    if (hasFetchedList.current) {
      fetchOverdueList();
    }
  }, [selectedYear, selectedKecamatan, selectedKelurahan, selectedSeverity, sortBy]);

  // Get severity badge color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500 text-white hover:bg-red-600";
      case "high":
        return "bg-orange-500 text-white hover:bg-orange-600";
      case "medium":
        return "bg-yellow-500 text-white hover:bg-yellow-600";
      case "low":
        return "bg-blue-500 text-white hover:bg-blue-600";
      default:
        return "bg-slate-500 text-white";
    }
  };

  // Get severity label
  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case "critical":
        return "Kritis";
      case "high":
        return "Tinggi";
      case "medium":
        return "Sedang";
      case "low":
        return "Rendah";
      default:
        return severity;
    }
  };

  // Format NOP to include dots (XX.XX.XXX.XXX.XXX.XXXX.X)
  const formatNopWithDots = (nop: string) => {
    // Remove any existing dots
    const cleanNop = nop.replace(/\./g, "");

    // Add dots in the correct positions
    if (cleanNop.length === 18) {
      return `${cleanNop.substring(0, 2)}.${cleanNop.substring(2, 4)}.${cleanNop.substring(4, 7)}.${cleanNop.substring(7, 10)}.${cleanNop.substring(10, 13)}.${cleanNop.substring(13, 17)}.${cleanNop.substring(17, 18)}`;
    }
    return nop; // Return as-is if not 18 digits
  };

  // Handle show on map
  const handleShowOnMap = (nop: string) => {
    if (onShowOnMap) {
      const formattedNop = formatNopWithDots(nop);
      onShowOnMap(formattedNop);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="year-select" className="text-xs text-slate-400 mb-1 block">
            Tahun Pajak
          </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm border border-slate-600 focus:border-primary-500 focus:outline-none"
          >
            <option value="all">Semua Tahun</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="kecamatan-select" className="text-xs text-slate-400 mb-1 block">
            Kecamatan
          </label>
          <select
            id="kecamatan-select"
            value={selectedKecamatan}
            onChange={(e) => {
              setSelectedKecamatan(e.target.value);
              setSelectedKelurahan("all");
            }}
            className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm border border-slate-600 focus:border-primary-500 focus:outline-none"
          >
            <option value="all">Semua Kecamatan</option>
            {kecamatanList.map((kec) => (
              <option key={kec} value={kec}>
                {kec}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="kelurahan-select" className="text-xs text-slate-400 mb-1 block">
            Kelurahan
          </label>
          <select
            id="kelurahan-select"
            value={selectedKelurahan}
            onChange={(e) => setSelectedKelurahan(e.target.value)}
            disabled={selectedKecamatan === "all"}
            className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm border border-slate-600 focus:border-primary-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="all">Semua Kelurahan</option>
            {kelurahanList.map((kel) => (
              <option key={kel} value={kel}>
                {kel}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="severity-select" className="text-xs text-slate-400 mb-1 block">
            Tingkat Keparahan
          </label>
          <select
            id="severity-select"
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm border border-slate-600 focus:border-primary-500 focus:outline-none"
          >
            <option value="all">Semua Tingkat</option>
            <option value="critical">Kritis (&gt;5 tahun)</option>
            <option value="high">Tinggi (3-5 tahun)</option>
            <option value="medium">Sedang (1-3 tahun)</option>
            <option value="low">Rendah (&lt;1 tahun)</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500"></div>
        </div>
      ) : !summary ? (
        <div className="text-center py-20">
          <p className="text-slate-400">Tidak ada data tunggakan tersedia</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-slate-600 to-slate-700 p-4 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="w-5 h-5 text-white opacity-80" />
              </div>
              <p className="text-2xl font-bold text-white">{summary.totalOverdue.toLocaleString()}</p>
              <p className="text-xs text-white opacity-90">Total Tunggakan</p>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="w-5 h-5 text-white opacity-80" />
              </div>
              <p className="text-2xl font-bold text-white">{summary.bySeverity.critical.count.toLocaleString()}</p>
              <p className="text-xs text-white opacity-90">Kasus Kritis</p>
            </div>

            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-4 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-5 h-5 text-white opacity-80" />
              </div>
              <p className="text-2xl font-bold text-white">{formatRupiahShort(summary.totalAmount + summary.totalPenalty)}</p>
              <p className="text-xs text-white opacity-90">Total Tagihan</p>
            </div>

            <div className="bg-gradient-to-br from-accent-500 to-accent-600 p-4 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-5 h-5 text-white opacity-80" />
              </div>
              <p className="text-2xl font-bold text-white">
                {Math.round(
                  (summary.bySeverity.critical.daysAvg * summary.bySeverity.critical.count +
                    summary.bySeverity.high.daysAvg * summary.bySeverity.high.count +
                    summary.bySeverity.medium.daysAvg * summary.bySeverity.medium.count +
                    summary.bySeverity.low.daysAvg * summary.bySeverity.low.count) /
                  summary.totalOverdue || 0
                )}
              </p>
              <p className="text-xs text-white opacity-90">Rata-rata Hari Terlambat</p>
            </div>
          </div>

          {/* Overdue List Table */}
          <div className="bg-slate-700 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-slate-600">
              <h3 className="text-sm font-semibold text-white mb-3">Top 10 Tunggakan Terbesar</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortBy("time")}
                  className={`flex items-center gap-2 whitespace-nowrap transition-colors ${sortBy === "time" ? "bg-slate-700 text-accent-500 border-accent-500 hover:bg-slate-600" : "border-slate-600 text-slate-500 hover:bg-slate-700 hover:text-white"
                    }`}
                >
                  <Clock className="w-4 h-4" />
                  Waktu Terlambat
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortBy("amount")}
                  className={`flex items-center gap-2 whitespace-nowrap transition-colors ${sortBy === "amount" ? "bg-slate-700 text-accent-500 border-accent-500 hover:bg-slate-600" : "border-slate-600 text-slate-500 hover:bg-slate-700 hover:text-white"
                    }`}
                >
                  <DollarSign className="w-4 h-4" />
                  Jumlah Tagihan
                </Button>
              </div>
            </div>

            {loadingList ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-500"></div>
              </div>
            ) : overdueList.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400">Tidak ada data tunggakan</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-600">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-200">NOP</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-200">Nama WP</th>
                        {/* <th className="px-4 py-3 text-left text-xs font-medium text-slate-200">Lokasi</th> */}
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-200">Tahun Tunggakan</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-200">Hari Terlambat</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-200">Total Tagihan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-600">
                      {overdueList.map((record, index) => (
                        <tr key={`${record.nop}-${index}`} onClick={() => handleShowOnMap(record.nop)} className="hover:bg-slate-600 transition-colors cursor-pointer">
                          <td className="px-4 py-3">
                            <span className="text-xs text-primary-400 font-mono">{record.nop}</span>
                          </td>
                          <td className="px-4 py-3 text-sm text-white">{record.nmWpSppt || "-"}</td>
                          {/* <td className="px-4 py-3">
                            <div className="text-xs text-slate-300">{record.opKecamatan}</div>
                            <div className="text-xs text-slate-400">{record.opKelurahan}</div>
                          </td> */}
                          <td className="px-4 py-3">
                            <div className="text-sm text-white">{record.yearsList}</div>
                            <div className="text-xs text-slate-400">{record.yearCount} tahun tunggakan</div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge className={getSeverityColor(record.severity)}>
                              {record.daysOverdue} hari ({getSeverityLabel(record.severity)})
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-sm text-white font-semibold">{formatRupiahShort(record.totalOwed)}</div>
                            {/* <div className="text-xs text-slate-400">Denda: {formatRupiahShort(record.pbbDenda)}</div> */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
