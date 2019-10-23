export function reverse(baseUrl, { lat, lon }) {
  const url = new URL(`${baseUrl}/reverse`);
  url.searchParams.append('lat', lat);
  url.searchParams.append('lon', lon);
  return fetch(url).then(data => data.json());
}
