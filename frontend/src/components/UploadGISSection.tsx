"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, FileUp, Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";
import { Kecamatan, Kelurahan } from "@/interface/Backend_PBB_Interface/interfaces_PBB";
import { ApiResponse } from "@/interface/generalInterface";

const UploadGISSection: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [kecamatan, setKecamatan] = useState<string>("");
  const [kelurahan, setKelurahan] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  const [typeOpen, setTypeOpen] = useState(false);
  const [kecamatanOpen, setKecamatanOpen] = useState(false);
  const [kelurahanOpen, setKelurahanOpen] = useState(false);

  const [kecamatanOptions, setKecamatanOptions] = useState<Kecamatan[]>([]);
  const [kelurahanOptions, setKelurahanOptions] = useState<Kelurahan[]>([]);
  const [filteredKelurahan, setFilteredKelurahan] = useState<Kelurahan[]>([]);

  const uploadTypes = [
    { value: "kecamatan", label: "Batas Kecamatan" },
    { value: "kelurahan", label: "Batas Kelurahan" },
    { value: "blok", label: "Batas Blok" },
    { value: "persil", label: "Batas Persil" },
    { value: "ZNT", label: "Batas ZNT" },
  ];

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response1 = await axios.get<ApiResponse<Kecamatan>>(`${process.env.NEXT_PUBLIC_PBB_API_URL}/api/retrieve/kodekecamatan`, {
          withCredentials: true,
        });
        setKecamatanOptions(response1.data.data);

        const response2 = await axios.get<ApiResponse<Kelurahan>>(`${process.env.NEXT_PUBLIC_PBB_API_URL}/api/retrieve/kodekelurahan`, {
          withCredentials: true,
        });
        setKelurahanOptions(response2.data.data);
      } catch (error) {
        console.error("Error fetching options:", error);
        toast.error("Gagal mengambil data kecamatan/kelurahan");
      }
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    if (kecamatan) {
      const kdKecamatan = kecamatan.split(" - ")[0];
      const filtered = kelurahanOptions.filter((kel) => kel.kdKecamatan === kdKecamatan);
      setFilteredKelurahan(filtered);
    } else {
      setFilteredKelurahan([]);
    }
  }, [kecamatan, kelurahanOptions]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (files.length !== 2) {
      toast.error("Silakan unggah 2 file (.shp & .dbf)");
      return;
    }

    if (!selectedType) {
      toast.error("Silakan pilih jenis data yang akan diunggah.");
      return;
    }

    // Kecamatan upload doesn't require kecamatan selection
    if (selectedType !== "kecamatan" && !kecamatan) {
      toast.error("Silakan pilih kecamatan sebelum mengunggah file.");
      return;
    }

    if (selectedType === "blok" && !kelurahan) {
      toast.error("Silakan pilih kelurahan untuk Batas Blok.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    // Only add kecamatan if not uploading kecamatan boundaries
    if (selectedType !== "kecamatan") {
      formData.append("kecamatan", kecamatan);
    }
    formData.append("jenis", selectedType);
    if (kelurahan) {
      formData.append("kelurahan", kelurahan);
    }

    files.forEach((file) => {
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (ext === "shp") {
        formData.append("shp", file);
      } else if (ext === "dbf") {
        formData.append("dbf", file);
      }
    });

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_GIS_API_URL}/api/upload/batas${selectedType}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success(`Berhasil mengunggah ${uploadTypes.find((t) => t.value === selectedType)?.label}`);
        setFiles([]);
        setKecamatan("");
        setKelurahan("");
        setSelectedType("");
      } else {
        toast.error(`Terjadi kesalahan saat mengunggah ${uploadTypes.find((t) => t.value === selectedType)?.label}`);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan tidak diketahui";
      toast.error(`Terjadi kesalahan saat mengunggah: ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="upload-type" className="text-white">
          Jenis Data
        </Label>
        <Popover open={typeOpen} onOpenChange={setTypeOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={typeOpen} className="w-full justify-between bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
              {selectedType ? uploadTypes.find((type) => type.value === selectedType)?.label : "Pilih jenis data..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 bg-slate-800 border-slate-600">
            <Command className="bg-slate-800 text-white">
              <CommandInput placeholder="Cari jenis data..." className="h-9 bg-slate-800 border-slate-600 text-white" />
              <CommandList>
                <CommandEmpty className="text-slate-400">Tidak ditemukan.</CommandEmpty>
                <CommandGroup className="bg-slate-800">
                  {uploadTypes.map((type) => (
                    <CommandItem
                      key={type.value}
                      value={type.value}
                      onSelect={(currentValue) => {
                        setSelectedType(currentValue === selectedType ? "" : currentValue);
                        setTypeOpen(false);
                      }}
                      className="text-white hover:bg-slate-700"
                    >
                      {type.label}
                      <Check className={cn("ml-auto h-4 w-4", selectedType === type.value ? "opacity-100" : "opacity-0")} />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Hide Kecamatan selection when uploading Batas Kecamatan */}
      {selectedType !== "kecamatan" && (
        <div className="space-y-2">
          <Label htmlFor="kecamatan" className="text-white">
            Kecamatan
          </Label>
          <Popover open={kecamatanOpen} onOpenChange={setKecamatanOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={kecamatanOpen} className="w-full justify-between bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                {kecamatan ? kecamatanOptions.find((kec) => `${kec.kdKecamatan} - ${kec.nmKecamatan}` === kecamatan)?.nmKecamatan : "Pilih kecamatan..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 bg-slate-800 border-slate-600">
              <Command className="bg-slate-800 text-white">
                <CommandInput placeholder="Cari kecamatan..." className="h-9 bg-slate-800 border-slate-600 text-white" />
                <CommandList>
                  <CommandEmpty className="text-slate-400">Tidak ditemukan.</CommandEmpty>
                  <CommandGroup className="bg-slate-800">
                    {kecamatanOptions.map((kec) => (
                      <CommandItem
                        key={kec.kdKecamatan}
                        value={`${kec.kdKecamatan} - ${kec.nmKecamatan}`}
                        onSelect={(currentValue) => {
                          setKecamatan(currentValue === kecamatan ? "" : currentValue);
                          setKelurahan(""); // Reset kelurahan when kecamatan changes
                          setKecamatanOpen(false);
                        }}
                        className="text-white hover:bg-slate-700"
                      >
                        {kec.nmKecamatan}
                        <Check className={cn("ml-auto h-4 w-4", kecamatan === `${kec.kdKecamatan} - ${kec.nmKecamatan}` ? "opacity-100" : "opacity-0")} />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      )}

      {(selectedType === "persil" || selectedType === "blok") && (
        <div className="space-y-2">
          <Label htmlFor="kelurahan" className="text-white">
            Kelurahan
          </Label>
          <Popover open={kelurahanOpen} onOpenChange={setKelurahanOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={kelurahanOpen} disabled={!kecamatan} className="w-full justify-between bg-slate-700 border-slate-600 text-white hover:bg-slate-600 disabled:opacity-50">
                {kelurahan ? filteredKelurahan.find((kel) => `${kel.kdKelurahan} - ${kel.nmKelurahan}` === kelurahan)?.nmKelurahan : "Pilih kelurahan..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 bg-slate-800 border-slate-600">
              <Command className="bg-slate-800 text-white">
                <CommandInput placeholder="Cari kelurahan..." className="h-9 bg-slate-800 border-slate-600 text-white" />
                <CommandList>
                  <CommandEmpty className="text-slate-400">Tidak ditemukan.</CommandEmpty>
                  <CommandGroup className="bg-slate-800">
                    {filteredKelurahan.map((kel) => (
                      <CommandItem
                        key={kel.kdKelurahan}
                        value={`${kel.kdKelurahan} - ${kel.nmKelurahan}`}
                        onSelect={(currentValue) => {
                          setKelurahan(currentValue === kelurahan ? "" : currentValue);
                          setKelurahanOpen(false);
                        }}
                        className="text-white hover:bg-slate-700"
                      >
                        {kel.nmKelurahan}
                        <Check className={cn("ml-auto h-4 w-4", kelurahan === `${kel.kdKelurahan} - ${kel.nmKelurahan}` ? "opacity-100" : "opacity-0")} />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="files" className="text-white">
          File GIS (.shp & .dbf)
        </Label>
        <div className="flex items-center gap-2">
          <Input id="files" type="file" accept=".shp,.dbf" multiple onChange={handleFileChange} className="bg-slate-700 border-slate-600 text-white file:bg-slate-600 file:text-white file:border-0 file:rounded file:px-3 file:py-1" />
          <FileUp className="w-5 h-5 text-slate-400" />
        </div>
        {files.length > 0 && <div className="text-sm text-slate-300">File terpilih: {files.map((f) => f.name).join(", ")}</div>}
      </div>

      <Button
        onClick={handleUpload}
        disabled={!selectedType || (selectedType !== "kecamatan" && !kecamatan) || files.length !== 2 || (selectedType === "blok" && !kelurahan) || uploading}
        className="w-full bg-primary-500 hover:bg-primary-600 text-white"
      >
        {uploading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Mengunggah...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4 mr-2" />
            Unggah Data GIS
          </>
        )}
      </Button>

      <div className="text-xs text-slate-400 bg-slate-700 p-3 rounded">
        <p className="font-medium mb-1">Catatan:</p>
        <ul className="space-y-1 text-xs">
          <li>• Upload harus berupa 2 file: .shp dan .dbf</li>
          <li>• Pastikan proyeksi pada shapefile adalah UTM 50S</li>
          <li>• Pastikan data sudah divalidasi sebelum upload</li>
        </ul>
      </div>
    </div>
  );
};

export default UploadGISSection;
