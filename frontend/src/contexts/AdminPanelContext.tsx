"use client";

import React, { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useState } from "react";

export type AdminPanelType = "user" | "role";

export interface User {
  id: number;
  username: string;
  role: string;
}

interface AdminPanelContextValue {
  activeAdminPanel: AdminPanelType | null;
  setActiveAdminPanel: (AdminPanel: AdminPanelType | null) => void;
  switchAdminPanel: (AdminPanel: AdminPanelType | null) => void;
  registerOpen: boolean;
  setRegisterOpen: Dispatch<SetStateAction<boolean>>;
  editOpen: User | null;
  setEditOpen: Dispatch<SetStateAction<User | null>>;
  deleteOpen: User | null;
  setDeleteOpen: Dispatch<SetStateAction<User | null>>;
  userRefreshKey: number;
  refreshUserTable: () => void;
}

const AdminPanelContext = createContext<AdminPanelContextValue | undefined>(undefined);

interface AdminPanelProviderProps {
  children: ReactNode;
  defaultAdminPanel?: AdminPanelType;
}

export const ROLE_OPTIONS = ["admin", "user"] as const;

export function AdminPanelProvider({ children, defaultAdminPanel = "user" }: AdminPanelProviderProps) {
  const [activeAdminPanel, setActiveAdminPanel] = useState<AdminPanelType | null>(defaultAdminPanel);
  const [registerOpen, setRegisterOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<User | null>(null);
  const [deleteOpen, setDeleteOpen] = useState<User | null>(null);
  const [userRefreshKey, setUserRefreshKey] = useState(0);

  const switchAdminPanel = useCallback((AdminPanel: AdminPanelType | null) => {
    setActiveAdminPanel(AdminPanel);
  }, []);

  const refreshUserTable = () => {
    setUserRefreshKey((prev) => prev + 1);
  };

  const value: AdminPanelContextValue = {
    activeAdminPanel,
    setActiveAdminPanel,
    switchAdminPanel,
    registerOpen,
    setRegisterOpen,
    editOpen,
    setEditOpen,
    deleteOpen,
    setDeleteOpen,
    userRefreshKey,
    refreshUserTable,
  };

  return <AdminPanelContext.Provider value={value}>{children}</AdminPanelContext.Provider>;
}

export function useAdminPanelContext(): AdminPanelContextValue {
  const context = useContext(AdminPanelContext);
  if (context === undefined) {
    throw new Error("usePanelContext must be used within a PanelProvider");
  }
  return context;
}
