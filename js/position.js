export function decode(position, config) {
  let lng = config.mapCenter[0];
  let lat = config.mapCenter[1];
  let zoom = config.mapZoom;
  const result = position.match(/@([.0-9]+),([.0-9]+),([.0-9]+)/);
  if (result) {
    lat = parseFloat(result[1]);
    lng = parseFloat(result[2]);
    zoom = parseFloat(result[3]);
  }
  return { lat, lng, zoom };
}

export function encode(lat, lng, zoom) {
  return `@${[lat.toFixed(6), lng.toFixed(6), zoom.toFixed(2)].join(',')}`;
}
