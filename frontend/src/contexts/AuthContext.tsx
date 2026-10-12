/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { logged } from "@/interface/Backend_GIS_Interface/interfaces_GIS";

interface AuthContextType {
  user: logged["data"] | null;
  isAdmin: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (userData: logged["data"]) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<logged["data"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  const login = (userData: logged["data"]) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_GIS_API_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
      setUser(null);
    }
  };

  const refreshUser = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<logged>(`${process.env.NEXT_PUBLIC_GIS_API_URL}/api/auth/me`, {
        withCredentials: true,
      });

      if (response.data.code === 200 && response.data.loggedIn) {
        setUser(response.data.data);
      } else {
        setUser(null);
      }
    } catch (error: any) {
      if (error?.response?.status === 403 || error?.response?.status === 401) {
        try {
          await axios.post(`${process.env.NEXT_PUBLIC_GIS_API_URL}/api/auth/refresh`, {}, { withCredentials: true });
          const retry = await axios.get<logged>(`${process.env.NEXT_PUBLIC_GIS_API_URL}/api/auth/me`, { withCredentials: true });
          if (retry.data.code === 200 && retry.data.loggedIn) {
            setUser(retry.data.data);
          } else {
            setUser(null);
          }
        } catch (refreshError) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (user) {
        refreshUser();
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    const handleFocus = () => {
      if (user) {
        refreshUser();
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [user]);

  const value: AuthContextType = {
    user,
    isAdmin,
    isLoading,
    isAuthenticated,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
