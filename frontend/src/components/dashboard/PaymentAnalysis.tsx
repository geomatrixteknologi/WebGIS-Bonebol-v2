"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Clock, CheckCircle2, XCircle, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatRupiahShort } from "@/utility/FormatRupiahShort";

interface PaymentTimelineData {
  summary: {
    onTime: number;
    late1to30: number;
    late31to60: number;
    late61to90: number;
    lateOver90: number;
    onTimeAmount: number;
    lateAmount: number;
    totalPaid: number;
    totalAmount: number;
    onTimeRate: number;
    lateRate: number;
  };
  monthlyDistribution: Array<{
    month: string;
    count: number;
  }>;
}

interface PaymentAnalysisProps {
  isOpen: boolean;
}

const DEFAULT_KECAMATAN = "BONE";
const DEFAULT_KELURAHAN = "ILOHUUWA";

export default function PaymentAnalysis({ isOpen }: PaymentAnalysisProps) {
  const [paymentData, setPaymentData] = useState<PaymentTimelineData | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [kecamatanList, setKecamatanList] = useState<string[]>([]);
  const [kelurahanList, setKelurahanList] = useState<string[]>([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>(DEFAULT_KECAMATAN);
  const [selectedKelurahan, setSelectedKelurahan] = useState<string>(DEFAULT_KELURAHAN);

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

        if (response.data.code === 200 && response.data.data.length > 0) {
          setKecamatanList(response.data.data);
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
      if (!selectedKecamatan) return;

      try {
        const response = await axios.get<{
          code: number;
          data: string[];
          message: string;
        }>(`${process.env.NEXT_PUBLIC_PBB_API_URL}/api/retrieve/kelurahan-list`, {
          params: { kecamatan: selectedKecamatan },
          withCredentials: true,
        });

        if (response.data.code === 200 && response.data.data.length > 0) {
          setKelurahanList(response.data.data);
          setSelectedKelurahan((prevKelurahan) => {
            // If MELAYU exists in the list and ASAKOTA is selected, and we don't have a valid selection yet, keep it. Otherwise, select first
            if (selectedKecamatan === "ASAKOTA" && response.data.data.includes("MELAYU") && !response.data.data.includes(prevKelurahan)) {
              return "MELAYU";
            } else if (!response.data.data.includes(prevKelurahan)) {
              return response.data.data[0];
            }
            return prevKelurahan;
          });
        }
      } catch (error) {
        console.error("Error fetching kelurahan list:", error);
      }
    };

    // Only fetch when kecamatan changes, not when panel opens
    if (selectedKecamatan) {
      fetchKelurahanList();
    }
  }, [selectedKecamatan]);

  // Fetch payment timeline data
  useEffect(() => {
    const fetchPaymentData = async () => {
      if (!selectedYear) return;

      setLoading(true);
      try {
        const response = await axios.get<{
          code: number;
          data: PaymentTimelineData;
          message: string;
        }>(`${process.env.NEXT_PUBLIC_PBB_API_URL}/api/retrieve/payment-timeline`, {
          params: {
            year: selectedYear,
            kecamatan: selectedKecamatan,
            kelurahan: selectedKelurahan,
          },
          withCredentials: true,
        });

        if (response.data.code === 200) {
          setPaymentData(response.data.data);
        } else {
          setPaymentData(null);
          toast.error("Gagal mengambil data timeline pembayaran");
        }
      } catch (error) {
        console.error("Error fetching payment timeline:", error);
        setPaymentData(null);
        toast.error("Terjadi kesalahan saat mengambil data timeline pembayaran");
      } finally {
        setLoading(false);
      }
    };

    if (selectedYear && selectedKecamatan && selectedKelurahan) {
      fetchPaymentData();
    }
  }, [selectedYear, selectedKecamatan, selectedKelurahan]);

  // Format month for display
  const formatMonth = (monthStr: string) => {
    const [year, month] = monthStr.split("-");
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid grid-cols-3 gap-3">
        <div>
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

        <div>
          <label className="text-xs text-slate-400 mb-1 block">Kecamatan</label>
          <select
            title="Kecamatan"
            value={selectedKecamatan}
            onChange={(e) => setSelectedKecamatan(e.target.value)}
            className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm border border-slate-600 focus:border-primary-500 focus:outline-none"
          >
            {kecamatanList.map((kec) => (
              <option key={kec} value={kec}>
                {kec}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-slate-400 mb-1 block">Kelurahan</label>
          <select
            title="Kelurahan"
            value={selectedKelurahan}
            onChange={(e) => setSelectedKelurahan(e.target.value)}
            className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm border border-slate-600 focus:border-primary-500 focus:outline-none"
          >
            {kelurahanList.map((kel) => (
              <option key={kel} value={kel}>
                {kel}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500"></div>
        </div>
      ) : !paymentData ? (
        <div className="text-center py-20">
          <p className="text-slate-400">Tidak ada data timeline pembayaran tersedia</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle2 className="w-5 h-5 text-white opacity-80" />
              </div>
              <p className="text-2xl font-bold text-white">{paymentData.summary.onTimeRate.toFixed(1)}%</p>
              <p className="text-xs text-white opacity-90">Bayar Tepat Waktu</p>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <XCircle className="w-5 h-5 text-white opacity-80" />
              </div>
              <p className="text-2xl font-bold text-white">{paymentData.summary.lateRate.toFixed(1)}%</p>
              <p className="text-xs text-white opacity-90">Bayar Terlambat</p>
            </div>

            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-4 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-5 h-5 text-white opacity-80" />
              </div>
              <p className="text-2xl font-bold text-white">{paymentData.summary.totalPaid.toLocaleString()}</p>
              <p className="text-xs text-white opacity-90">Total Pembayaran</p>
            </div>

            <div className="bg-gradient-to-br from-accent-500 to-accent-600 p-4 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-5 h-5 text-white opacity-80" />
              </div>
              <p className="text-2xl font-bold text-white">{formatRupiahShort(paymentData.summary.totalAmount)}</p>
              <p className="text-xs text-white opacity-90">Total Nilai</p>
            </div>
          </div>

          {/* Payment Amounts - Full Width */}
          <div className="bg-slate-700 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-4">Nilai Pembayaran</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-4 bg-green-500/20 rounded-lg border border-green-500">
                <div>
                  <p className="text-xs text-slate-400">Tepat Waktu</p>
                  <p className="text-xl font-bold text-green-400">{formatRupiahShort(paymentData.summary.onTimeAmount)}</p>
                  <p className="text-xs text-slate-300 mt-1">{paymentData.summary.onTime.toLocaleString()} pembayaran</p>
                </div>
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              </div>

              <div className="flex items-center justify-between p-4 bg-red-500/20 rounded-lg border border-red-500">
                <div>
                  <p className="text-xs text-slate-400">Terlambat</p>
                  <p className="text-xl font-bold text-red-400">{formatRupiahShort(paymentData.summary.lateAmount)}</p>
                  <p className="text-xs text-slate-300 mt-1">{(paymentData.summary.late1to30 + paymentData.summary.late31to60 + paymentData.summary.late61to90 + paymentData.summary.lateOver90).toLocaleString()} pembayaran</p>
                </div>
                <XCircle className="w-10 h-10 text-red-400" />
              </div>

              <div className="flex items-center justify-between p-4 bg-primary-500/20 rounded-lg border border-primary-500">
                <div>
                  <p className="text-xs text-slate-400">Total</p>
                  <p className="text-xl font-bold text-primary-400">{formatRupiahShort(paymentData.summary.totalAmount)}</p>
                  <p className="text-xs text-slate-300 mt-1">{paymentData.summary.totalPaid.toLocaleString()} pembayaran</p>
                </div>
                <Calendar className="w-10 h-10 text-primary-400" />
              </div>
            </div>
          </div>

          {/* Monthly Distribution */}
          {paymentData.monthlyDistribution.length > 0 && (
            <div className="bg-slate-700 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-white mb-4">Distribusi Pembayaran per Bulan</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={paymentData.monthlyDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: "10px" }} tickFormatter={formatMonth} angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #475569",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    labelFormatter={formatMonth}
                    formatter={(value: number) => [`${value} pembayaran`, "Jumlah"]}
                  />
                  <Bar dataKey="count" fill="#0066FF" name="Jumlah Pembayaran" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
}
