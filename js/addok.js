export function reverse(baseUrl, { lat, lon, type = 'housenumber' }) {
  const url = new URL(`${baseUrl}/reverse`);
  url.searchParams.append('type', type);
  url.searchParams.append('lat', lat);
  url.searchParams.append('lon', lon);
  return fetch(url).then(data => data.json());
}
