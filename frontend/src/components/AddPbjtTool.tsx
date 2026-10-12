"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { MapPin, X } from "lucide-react";
import AxiosError from "axios";

interface AddPbjtToolProps {
  onPointSelect: (callback: (lat: number, lng: number) => void) => void;
  onCancelPointSelect: () => void;
}

interface ApiResponse {
  code: number;
  message: string;
}

const TIPE_PBJT_OPTIONS = [
  "RESTORAN",
  "HOTEL",
  "LISTRIK",
  "PARKIR",
  "KESENIAN & HIBURAN",
];

export default function AddPbjtTool({ onPointSelect, onCancelPointSelect }: AddPbjtToolProps) {
  const [jenisPajak, setJenisPajak] = useState<string>("PBJT");
  const [tipePbjt, setTipePbjt] = useState<string>("");
  const [npwpd, setNpwpd] = useState<string>("");
  const [namaWp, setNamaWp] = useState<string>("");
  const [keterangan, setKeterangan] = useState<string>("");
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [isSelectingPoint, setIsSelectingPoint] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isExisting, setIsExisting] = useState(false);

  const handleStartPointSelection = () => {
    setIsSelectingPoint(true);
    onPointSelect((lat: number, lng: number) => {
      setCoordinates({ lat, lng });
      setIsSelectingPoint(false);
      toast.success("Titik berhasil dipilih");
    });
  };

  const handleCancelPointSelection = () => {
    setIsSelectingPoint(false);
    onCancelPointSelect();
  };

  const handleRemovePoint = () => {
    setCoordinates(null);
    toast.success("Titik dihapus");
  };

  const handleCheckNpwpd = async () => {
    if (!npwpd) {
      toast.error("NPWPD wajib diisi");
      return;
    }

    setIsChecking(true);
    try {
      const response = await axios.get<{
        code: number;
        data?: {
          npwpd: string;
          tipeOp: string;
          namaWp: string;
          koordinat: string;
          keterangan: string;
          lat: number;
          lng: number;
        };
        message: string;
      }>(
        `${process.env.NEXT_PUBLIC_GIS_API_URL}/api/retrieve/pbjt/check`,
        {
          params: { npwpd },
          withCredentials: true,
        }
      );

      if (response.data.code === 200 && response.data.data) {
        // NPWPD found - auto-fill form
        const data = response.data.data;
        setTipePbjt(data.tipeOp);
        setNamaWp(data.namaWp);
        setKeterangan(data.keterangan || "");
        if (data.lat && data.lng) {
          setCoordinates({ lat: data.lat, lng: data.lng });
        }
        setIsExisting(true);
        toast.success("NPWPD ditemukan! Data berhasil dimuat");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && (await error).status === 404) {
        // NPWPD not found - clear form for new entry
        setTipePbjt("");
        setNamaWp("");
        setKeterangan("");
        setCoordinates(null);
        setIsExisting(false);
        toast("NPWPD tidak ditemukan. Silakan isi data baru");
      } else {
        console.error("Error checking NPWPD:", error);
        toast.error("Terjadi kesalahan saat memeriksa NPWPD");
      }
    } finally {
      setIsChecking(false);
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!npwpd || !tipePbjt || !namaWp || !coordinates) {
      toast.error("NPWPD, Tipe PBJT, Nama WP, dan Koordinat wajib diisi");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        npwpd,
        tipeOp: tipePbjt,
        namaWp,
        koordinat: `${coordinates.lat}, ${coordinates.lng}`,
        keterangan: keterangan || null,
        lat: coordinates.lat,
        lng: coordinates.lng,
      };

      let response;
      if (isExisting) {
        // Update existing record (PUT)
        response = await axios.put<ApiResponse>(
          `${process.env.NEXT_PUBLIC_GIS_API_URL}/api/retrieve/pbjt`,
          payload,
          { withCredentials: true }
        );
      } else {
        // Create new record (POST)
        response = await axios.post<ApiResponse>(
          `${process.env.NEXT_PUBLIC_GIS_API_URL}/api/retrieve/pbjt`,
          payload,
          { withCredentials: true }
        );
      }

      if (response.data.code === 201 || response.data.code === 200) {
        toast.success(
          isExisting
            ? "Data PBJT berhasil diperbarui!"
            : "Titik PBJT berhasil ditambahkan!"
        );
        // Reset form
        setTipePbjt("");
        setNpwpd("");
        setNamaWp("");
        setKeterangan("");
        setCoordinates(null);
        setIsExisting(false);
      } else {
        toast.error(
          response.data.message ||
            (isExisting ? "Gagal memperbarui data PBJT" : "Gagal menambahkan titik PBJT")
        );
      }
    } catch (error: unknown) {
      console.error("Error submitting PBJT point:", error);
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof error.response === "object" &&
        error.response !== null &&
        "data" in error.response
      ) {
        const errorData = error.response.data as ApiResponse;
        toast.error(
          errorData.message ||
            (isExisting ? "Gagal memperbarui data PBJT" : "Gagal menambahkan titik PBJT")
        );
      } else {
        toast.error(
          isExisting
            ? "Terjadi kesalahan saat memperbarui data PBJT"
            : "Terjadi kesalahan saat menambahkan titik PBJT"
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Jenis Pajak Selector */}
      <div>
        <label htmlFor="jenis-pajak" className="text-xs text-slate-400 mb-1 block">
          Jenis Pajak
        </label>
        <select
          id="jenis-pajak"
          value={jenisPajak}
          onChange={(e) => setJenisPajak(e.target.value)}
          disabled
          className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm border border-slate-600 focus:border-primary-500 focus:outline-none disabled:opacity-50"
        >
          <option value="PBJT">PBJT (Pajak Barang & Jasa Tertentu)</option>
        </select>
      </div>

      {/* Tipe PBJT Selector */}
      {jenisPajak === "PBJT" && (
        <div>
          <label htmlFor="tipe-pbjt" className="text-xs text-slate-400 mb-1 block">
            Tipe PBJT <span className="text-red-500">*</span>
          </label>
          <select
            id="tipe-pbjt"
            value={tipePbjt}
            onChange={(e) => setTipePbjt(e.target.value)}
            className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm border border-slate-600 focus:border-primary-500 focus:outline-none"
          >
            <option value="">Pilih Tipe PBJT</option>
            {TIPE_PBJT_OPTIONS.map((tipe) => (
              <option key={tipe} value={tipe}>
                {tipe}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* NPWPD Input with Check Button */}
      <div>
        <label htmlFor="npwpd" className="text-xs text-slate-400 mb-1 block">
          NPWPD <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <input
            id="npwpd"
            type="text"
            value={npwpd}
            onChange={(e) => {
              setNpwpd(e.target.value.toUpperCase());
              setIsExisting(false); // Reset existing flag when NPWPD changes
            }}
            placeholder="Masukkan NPWPD"
            className="flex-1 bg-slate-700 text-white px-3 py-2 rounded-lg text-sm border border-slate-600 focus:border-primary-500 focus:outline-none placeholder-slate-500"
          />
          <Button
            onClick={handleCheckNpwpd}
            disabled={isChecking || !npwpd}
            className="bg-accent-500 hover:bg-accent-600 text-white px-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isChecking ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Cek
              </>
            ) : (
              "Cek"
            )}
          </Button>
        </div>
        {isExisting && (
          <p className="text-xs text-green-400 mt-1">
            NPWPD terdaftar - Mode update
          </p>
        )}
      </div>

      {/* Nama WP Input */}
      <div>
        <label htmlFor="nama-wp" className="text-xs text-slate-400 mb-1 block">
          Nama Wajib Pajak <span className="text-red-500">*</span>
        </label>
        <input
          id="nama-wp"
          type="text"
          value={namaWp}
          onChange={(e) => setNamaWp(e.target.value)}
          placeholder="Masukkan nama wajib pajak"
          className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm border border-slate-600 focus:border-primary-500 focus:outline-none placeholder-slate-500"
        />
      </div>

      {/* Keterangan Input */}
      <div>
        <label htmlFor="keterangan" className="text-xs text-slate-400 mb-1 block">
          Keterangan
        </label>
        <textarea
          id="keterangan"
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
          placeholder="Masukkan keterangan (opsional)"
          rows={3}
          className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm border border-slate-600 focus:border-primary-500 focus:outline-none placeholder-slate-500 resize-none"
        />
      </div>

      {/* Koordinat Section */}
      <div>
        <label className="text-xs text-slate-400 mb-2 block">
          Koordinat Lokasi <span className="text-red-500">*</span>
        </label>
        
        {coordinates ? (
          <div className="bg-slate-700 p-3 rounded-lg border border-green-500">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <span className="text-xs font-semibold text-green-400">Titik Terpilih</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1 ml-6">
                  <div>
                    <span className="text-slate-400">Latitude:</span>{" "}
                    <span className="font-mono text-white">{coordinates.lat.toFixed(6)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Longitude:</span>{" "}
                    <span className="font-mono text-white">{coordinates.lng.toFixed(6)}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemovePoint}
                className="text-red-400 hover:text-red-300 hover:bg-slate-600 h-8 w-8"
                title="Hapus titik"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-700 p-3 rounded-lg border border-slate-600">
            <p className="text-xs text-slate-400 mb-2">
              Belum ada titik dipilih. Klik tombol di bawah untuk memilih lokasi pada peta.
            </p>
          </div>
        )}

        {isSelectingPoint ? (
          <Button
            variant="outline"
            onClick={handleCancelPointSelection}
            className="w-full mt-2 bg-red-600 hover:bg-red-700 border-red-500 text-white"
          >
            <X className="w-4 h-4 mr-2" />
            Batal Pilih Titik
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={handleStartPointSelection}
            className="w-full mt-2 border-accent-500 text-accent-400 hover:bg-accent-500 hover:text-white"
          >
            <MapPin className="w-4 h-4 mr-2" />
            {coordinates ? "Ganti Titik Lokasi" : "Pilih Titik Lokasi"}
          </Button>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4 border-t border-slate-600">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !npwpd || !tipePbjt || !namaWp || !coordinates}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {isExisting ? "Memperbarui..." : "Menyimpan..."}
            </>
          ) : isExisting ? (
            "Perbarui Data PBJT"
          ) : (
            "Tambah Titik PBJT"
          )}
        </Button>
      </div>
    </div>
  );
}

