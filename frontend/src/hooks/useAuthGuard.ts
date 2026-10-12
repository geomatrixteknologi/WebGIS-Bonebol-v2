import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { logged } from "../interface/Backend_GIS_Interface/interfaces_GIS";

export const useAuthGuard = (requiredRole?: string) => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get<logged>(`${process.env.NEXT_PUBLIC_GIS_API_URL}/api/auth/me`, { withCredentials: true });

        if (!res.data.loggedIn) {
          router.replace("/login");
          return;
        }

        if (requiredRole && res.data.data?.role !== requiredRole) {
          router.replace("/not-authorized");
        }
      } catch {
        router.replace("/login");
      }
    };

    checkAuth();
  }, [router, requiredRole]);
};
