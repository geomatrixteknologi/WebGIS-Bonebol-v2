"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Lock, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_GIS_API_URL}/api/auth/login`, { username, password }, { withCredentials: true });

      // Refresh user data in AuthContext
      await refreshUser();

      toast.success("Login berhasil!");
      router.push("/maps");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login gagal!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900">
        <div className="loginbg absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 transition-opacity duration-1000" />

        {/* Floating Elements */}
        <div className="absolute top-[10%] left-[10%] w-24 h-24 rounded-full bg-white/10 animate-float" />
        <div className="absolute top-[20%] right-[15%] w-16 h-16 rounded-full bg-accent-500/20 animate-float-reverse" />
        <div className="absolute bottom-[15%] left-[20%] w-20 h-20 rounded-full bg-white/5 animate-float-slow" />

        {/* Logo Section */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-10 flex items-center gap-3 z-10">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
            <Image src="/logo.png" alt="GEOTAX Logo" width={180} height={180} className="rounded-full" />
          </div>
          <div>
            <h1 className="text-white text-lg sm:text-xl font-bold tracking-wider drop-shadow-lg">GEOTAX</h1>
            <p className="text-white/80 text-xs sm:text-sm tracking-widest font-light">From Maps to Tax</p>
          </div>
        </div>

        {/* Split-Screen Login Card - PT.GEOMATRIX Branded Design */}
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-4xl">
            {/* Fluid Organic Card Shape - Wider for Split Layout */}
            <div className="relative">
              <div className="geomatrix-split-card relative overflow-hidden flex">
                {/* Left Side - Welcome Image */}
                <div className="w-1/2 relative">
                  <div className="relative h-full w-full">
                    <Image src="/welcome.jpg" alt="Welcome to GEOTAX" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px" priority />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                  </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-1/2 relative">
                  {/* Client Customization Area - Future Use */}
                  <div className="absolute top-6 left-6 right-6 h-12 z-10">
                    {/* This space is reserved for client logo/branding */}
                    <div className="h-full w-full bg-transparent"></div>
                  </div>

                  {/* Main Form Content */}
                  <div className="relative z-20 pt-20 pb-8 px-8 h-full flex flex-col justify-center">
                    <form onSubmit={handleLogin} className="space-y-6">
                      {/* Welcome Section */}
                      <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#126EB9] mb-2">Selamat Datang</h2>
                        <p className="text-[#599ACE] text-sm sm:text-base">Masuk ke platform GEOTAX</p>
                      </div>

                      {/* Username Field */}
                      <div className="space-y-2">
                        <Label htmlFor="username" className="text-sm font-medium text-[#126EB9]">
                          Username
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#599ACE] w-4 h-4" />
                          <Input
                            id="username"
                            type="text"
                            placeholder="Masukkan username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="pl-10 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 hover:bg-gray-100 focus:bg-white focus:ring-2 focus:ring-[#126EB9]/20 transition-all duration-200"
                            required
                          />
                        </div>
                      </div>

                      {/* Password Field */}
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-[#126EB9]">
                          Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#599ACE] w-4 h-4" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Masukkan password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 pr-10 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 hover:bg-gray-100 focus:bg-white focus:ring-2 focus:ring-[#126EB9]/20 transition-all duration-200"
                            required
                          />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#599ACE] hover:text-[#126EB9] transition-colors">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Login Button */}
                      <Button
                        type="submit"
                        className="w-full bg-[#126EB9] hover:bg-[#0F5A9A] text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-0"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Memproses...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span>Masuk</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        )}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-10 z-10">
          <Badge variant="outline" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
            © 2025 PT Geomatrix Teknologi Indonesia
          </Badge>
        </div>
      </div>

      <style jsx global>{`
        /* Floating Animation Keyframes */
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(20px);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 4s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        /* PT.GEOMATRIX Split-Screen Organic Card Design */
        .geomatrix-split-card {
          width: 100%;
          height: 420px; /* Reduced height to prevent overlap with logo */
          background: white; /* Changed to white */
          border-radius: 32px 28px 36px 30px;
          box-shadow: 0 10px 30px rgba(18, 110, 185, 0.15), 0 4px 12px rgba(18, 110, 185, 0.1);
          position: relative;
          border: 1px solid rgba(18, 110, 185, 0.1);
          overflow: hidden;
        }

        /* Enhanced Input Styling for Brand Colors */
        .geomatrix-split-card input {
          border-radius: 12px !important;
        }

        .geomatrix-split-card input:focus {
          border-color: #126eb9 !important;
          box-shadow: 0 0 0 3px rgba(18, 110, 185, 0.1) !important;
        }

        /* Responsive Adjustments for Split Card */
        @media (max-width: 768px) {
          .geomatrix-split-card {
            flex-direction: column;
            height: 520px; /* Reduced height for mobile */
          }

          .geomatrix-split-card > div {
            width: 100% !important;
          }

          .geomatrix-split-card > div:first-child {
            height: 220px; /* Reduced height for carousel on mobile */
          }

          .geomatrix-split-card {
            border-radius: 24px 20px 28px 22px;
          }

          .geomatrix-split-card .embla,
          .geomatrix-split-card .embla__viewport,
          .geomatrix-split-card .embla__container,
          .geomatrix-split-card .embla__slide {
            height: 220px; /* Fixed height for mobile carousel */
          }
        }

        @media (max-width: 640px) {
          .geomatrix-split-card {
            height: 480px; /* Reduced height for very small screens */
          }

          .geomatrix-split-card > div:first-child {
            height: 180px; /* Smaller carousel on very small screens */
          }

          .geomatrix-split-card .embla,
          .geomatrix-split-card .embla__viewport,
          .geomatrix-split-card .embla__container,
          .geomatrix-split-card .embla__slide {
            height: 180px; /* Fixed height for very small screens */
          }
        }

        /* Enhanced Button Hover Effects */
        .geomatrix-split-card button[type="submit"]:hover {
          box-shadow: 0 15px 30px rgba(18, 110, 185, 0.4), 0 5px 15px rgba(18, 110, 185, 0.3);
        }
      `}</style>
    </>
  );
}
