"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BarChart3, FileText, AlertTriangle, Upload, Search, Settings, UserPlus } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { useRouter } from "next/navigation";

interface SidebarProps {
  onIconClick: (panelType: string) => void;
  activePanel: string;
  onClosePanel: () => void;
  isAdmin?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onIconClick, activePanel, isAdmin = false }) => {
  const router = useRouter();

  const allIcons = [
    { id: "dashboard", icon: BarChart3, label: "Dashboard", adminOnly: false },
    { id: "search", icon: Search, label: "Pencarian", adminOnly: false },
    { id: "info", icon: FileText, label: "Detail Objek Pajak", adminOnly: false },
    { id: "warning", icon: AlertTriangle, label: "Sistem Peringatan", adminOnly: false },
    { id: "management", icon: Upload, label: "Upload Data", adminOnly: true },
    { id: "settings", icon: Settings, label: "Pengaturan", adminOnly: true },
    { id: "adminpanel", icon: UserPlus, label: "Admin Panel", adminOnly: true, type: "route", path: "/adminpanel" },
  ];

  const icons = allIcons.filter((icon) => !icon.adminOnly || isAdmin);

  return (
    <div className="sidebar-main fixed left-0 top-0 w-16 h-screen border-r z-[30] flex flex-col">
      {/* Logo Section */}
      <div className="flex flex-col items-center p-4">
        <div className="w-12 h-12 rounded-full bg-white mb-3 flex items-center justify-center">
          <Image src="/Geotax_V2_G_Only.png" alt="Logo" className="rounded-full" width={30} height={30} />
        </div>
        <div className="w-8 h-px bg-slate-600 mb-4"></div>
      </div>

      {/* Icon Buttons */}
      <div className="flex flex-col items-center space-y-2 pr-6 pl-2 flex-1">
        {icons.map(({ id, icon: Icon, label, type, path }) => (
          <div key={id} className="relative w-full">
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`w-10 h-10 rounded-lg transition-all duration-200 relative ${activePanel === id ? "bg-accent-500 text-white" : "text-accent-500 hover:bg-slate-700"}`}
                    onClick={() => {
                      if (type === "route" && path) {
                        router.push(path);
                      } else {
                        onIconClick(id);
                      }
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-slate-900 text-white border-primary-500/30 z-[50]">
                  {label}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </div>

      {/* User Avatar */}
      <div className="absolute bottom-4 left-2">
        <UserAvatar isAdmin={isAdmin} />
      </div>
    </div>
  );
};

export default Sidebar;
