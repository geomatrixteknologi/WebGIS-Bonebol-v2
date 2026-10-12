"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User, LogOut } from "lucide-react";
// import axios from "axios";
import { useRouter } from "next/navigation";
// import { logged } from "@/utility/Interfaces";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";

interface UserAvatarProps {
  isAdmin?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = () => {
  const { user: userData, logout: authLogout, isLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleLogout = async () => {
    try {
      setLoading(true);
      await authLogout();
      toast.success("Berhasil logout");
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Gagal logout");
    } finally {
      setLoading(false);
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrator";
      case "user":
        return "Pengguna";
      default:
        return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "user":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 text-white border-2 border-slate-600 hover:border-accent-500 transition-all duration-200"
          disabled={loading || isLoading}
        >
          <User className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      
      <PopoverContent 
        side="right" 
        align="start"
        className="w-64 p-4 z-[40] bg-slate-800 text-white"
        sideOffset={10}
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">
                {userData?.username || "Loading..."}
              </h3>
              {userData?.role && (
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(userData.role)}`}>
                  {getRoleDisplayName(userData.role)}
                </span>
              )}
            </div>
          </div>

          {/* Logout Button */}
          <div className="border-t border-slate-200 pt-3">
            <Button
              variant="outline"
              className="w-full text-red-600 border-red-200 hover:bg-red-200 hover:border-red-300"
              onClick={handleLogout}
              disabled={loading}
            >
              <LogOut className="w-4 h-4 mr-2" />
              {loading ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserAvatar;
