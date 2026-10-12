"use client";

import AdminPanelLayout from "@/components/AdminPanel/AdminPanelLayout";
import { AdminPanelProvider } from "@/contexts/AdminPanelContext";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function AdminPanel() {
  useAuthGuard("admin");
  return (
    <>
      <AdminPanelProvider defaultAdminPanel="user">
        <AdminPanelLayout />
      </AdminPanelProvider>
    </>
  );
}
