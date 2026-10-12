"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { TrendingUp, TrendingDown, Award, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { formatRupiahShort } from "@/utility/FormatRupiahShort";

interface TrendData {
  year: string;
  target: number;
  realization: number;
  collectionRate: number;
  complianceRate: number;
  totalNop: number;
  paidNop: number;
  unpaidNop: number;
  targetGrowth: number;
  realizationGrowth: number;
  collectionRateChange: number;
}

interface CollectionEfficiencyData {
  trends: TrendData[];
  summary: {
    totalYears: number;
    averageCollectionRate: number;
    bestYear: TrendData;
    worstYear: TrendData;
    totalTargetAllYears: number;
    totalRealizationAllYears: number;
  };
}

interface CollectionEfficiencyProps {
  isOpen: boolean;
}

export default function CollectionEfficiency({ isOpen }: CollectionEfficiencyProps) {
  const [efficiencyData, setEfficiencyData] = useState<CollectionEfficiencyData | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch collection trends data
  useEffect(() => {
    const fetchEfficiencyData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{
          code: number;
          data: CollectionEfficiencyData;
          message: string;
        }>(`${process.env.NEXT_PUBLIC_PBB_API_URL}/api/retrieve/collection-trends`, {
          withCredentials: true,
        });

        if (response.data.code === 200) {
          setEfficiencyData(response.data.data);
        } else {
          setEfficiencyData(null);
          toast.error("Gagal mengambil data tren efisiensi");
        }
      } catch (error) {
        console.error("Error fetching collection efficiency:", error);
        setEfficiencyData(null);
        toast.error("Terjadi kesalahan saat mengambil data tren efisiensi");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && !efficiencyData) {
      fetchEfficiencyData();
    }
  }, [isOpen, efficiencyData]);

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500"></div>
        </div>
      ) : !efficiencyData ? (
        <div className="text-center py-20">
          <p className="text-slate-400">Tidak ada data tren efisiensi tersedia</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-white">{efficiencyData.summary.averageCollectionRate.toFixed(1)}%</p>
              <p className="text-xs text-white opacity-90">Rata-rata Penagihan</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-white" />
              </div>
              <p className="text-xl font-bold text-white">{efficiencyData.summary.bestYear.year}</p>
              <p className="text-xs text-white opacity-90">Tahun Terbaik ({efficiencyData.summary.bestYear.collectionRate.toFixed(1)}%)</p>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <p className="text-xl font-bold text-white">{efficiencyData.summary.worstYear.year}</p>
              <p className="text-xs text-white opacity-90">Tahun Terendah ({efficiencyData.summary.worstYear.collectionRate.toFixed(1)}%)</p>
            </div>

            <div className="bg-gradient-to-br from-accent-500 to-accent-600 p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-white">{efficiencyData.summary.totalYears}</p>
              <p className="text-xs text-white opacity-90">Tahun Data</p>
            </div>
          </div>

          {/* Collection Rate Trend */}
          <div className="bg-slate-700 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-4">Tren Tingkat Penagihan (%)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={efficiencyData.trends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="year" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => `${value.toFixed(2)}%`}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line
                  type="monotone"
                  dataKey="collectionRate"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Tingkat Penagihan"
                  dot={{ fill: '#10b981', r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <Line
                  type="monotone"
                  dataKey="complianceRate"
                  stroke="#0066FF"
                  strokeWidth={2}
                  name="Tingkat Kepatuhan"
                  dot={{ fill: '#0066FF', r: 4 }}
                  activeDot={{ r: 6 }}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Target vs Realization Growth */}
          <div className="bg-slate-700 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-4">Pertumbuhan Target vs Realisasi (YoY %)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={efficiencyData.trends.filter((_, index) => index > 0)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="year" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => `${value.toFixed(2)}%`}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="targetGrowth" fill="#0066FF" name="Pertumbuhan Target" />
                <Bar dataKey="realizationGrowth" fill="#10b981" name="Pertumbuhan Realisasi" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Yearly Detail Table */}
          <div className="bg-slate-700 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-4">Detail per Tahun</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-slate-600 text-slate-300">
                  <tr>
                    <th className="px-3 py-2">Tahun</th>
                    <th className="px-3 py-2">Target</th>
                    <th className="px-3 py-2">Realisasi</th>
                    <th className="px-3 py-2">Tingkat Penagihan</th>
                    <th className="px-3 py-2">Perubahan</th>
                    <th className="px-3 py-2">NOP Lunas</th>
                    <th className="px-3 py-2">NOP Belum</th>
                  </tr>
                </thead>
                <tbody className="text-slate-200">
                  {efficiencyData.trends.map((trend) => (
                    <tr key={trend.year} className="border-b border-slate-600 hover:bg-slate-600/50">
                      <td className="px-3 py-2 font-medium">{trend.year}</td>
                      <td className="px-3 py-2">{formatRupiahShort(trend.target)}</td>
                      <td className="px-3 py-2">{formatRupiahShort(trend.realization)}</td>
                      <td className="px-3 py-2">
                        <span className={`font-bold ${
                          trend.collectionRate >= 80 ? 'text-green-400' :
                          trend.collectionRate >= 60 ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {trend.collectionRate.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        {trend.collectionRateChange !== 0 && (
                          <span className={`flex items-center gap-1 ${
                            trend.collectionRateChange > 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {trend.collectionRateChange > 0 ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {Math.abs(trend.collectionRateChange).toFixed(1)}%
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-green-400">{trend.paidNop.toLocaleString()}</td>
                      <td className="px-3 py-2 text-red-400">{trend.unpaidNop.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Overall Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-6 rounded-lg shadow-lg">
              <p className="text-sm text-white opacity-90 mb-2">Total Target (Semua Tahun)</p>
              <p className="text-3xl font-bold text-white">{formatRupiahShort(efficiencyData.summary.totalTargetAllYears)}</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg shadow-lg">
              <p className="text-sm text-white opacity-90 mb-2">Total Realisasi (Semua Tahun)</p>
              <p className="text-3xl font-bold text-white">{formatRupiahShort(efficiencyData.summary.totalRealizationAllYears)}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
