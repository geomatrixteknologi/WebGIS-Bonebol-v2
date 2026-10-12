export interface ApiResponse<T> {
  code: number;
  data: T[];
  legenda?: T[];
}

export interface GeomData {
  type: string;
  coordinates: [][];
}
