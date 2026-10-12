export const getPolygonCenter = (coordinates: number[][]) => {
  let latSum = 0,
    lngSum = 0;
  coordinates.forEach(([lng, lat]) => {
    latSum += lat;
    lngSum += lng;
  });
  return { lat: latSum / coordinates.length, lng: lngSum / coordinates.length };
};
