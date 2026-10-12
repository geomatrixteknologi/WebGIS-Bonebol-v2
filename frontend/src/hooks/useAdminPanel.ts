import { useAdminPanelContext } from "../contexts/AdminPanelContext";
import { ApiResponseAdminPanel, User } from "../interface/Frontend_Interface/interface_frontend";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export function usePaginatedData<T>(fetcher: (page: number, limit: number) => Promise<ApiResponseAdminPanel<T>>, refreshKey?: number) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [pagination, setPagination] = useState<ApiResponseAdminPanel<T>["pagination"]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      const res = await fetcher(page, limit);
      if (mounted) {
        setData(res.data);
        setPagination(res.pagination);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [page, limit, fetcher, refreshKey]);

  return {
    data,
    page,
    limit,
    pagination,
    loading,
    setPage,
    setLimit,
  };
}

export function useUsers() {
  const { userRefreshKey } = useAdminPanelContext();
  const fetchUsers = useCallback(async (page: number, limit: number): Promise<ApiResponseAdminPanel<User>> => {
    const res = await axios.get<ApiResponseAdminPanel<User>>(`${process.env.NEXT_PUBLIC_GIS_API_URL}/api/retrieve/alluser`, {
      withCredentials: true,
      params: { page, limit },
    });
    return res.data;
  }, []);
  return usePaginatedData<User>(fetchUsers, userRefreshKey);
}
