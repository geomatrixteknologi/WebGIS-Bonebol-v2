export const toWgs84 = (lng: number, lat: number): { lat: number; lng: number } => {
  if (Math.abs(lat) <= 90 && Math.abs(lng) <= 180) return { lat, lng };
  const rad = Math.PI / 180;
  const lngWgs = (lng / 20037508.34) * 180;
  const latWgs2 = (180 / Math.PI) * (2 * Math.atan(Math.exp((lat * rad) / 20037508.34)) - Math.PI / 2);
  return { lat: latWgs2, lng: lngWgs };
};
