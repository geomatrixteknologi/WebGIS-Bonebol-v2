export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiResponseAdminPanel<T> {
  code: number;
  data: T[];
  pagination: Pagination;
  message: string;
}

export interface User {
  id: number;
  username: string;
  role: string;
}
