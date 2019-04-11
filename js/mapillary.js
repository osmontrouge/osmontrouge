export function findImage(pos, pano, users, clientId) {
  const url = new URL("https://a.mapillary.com/v3/images");
  const params = {
    client_id: clientId,
    pano,
    userkeys: users.join(','),
    closeto: [pos.lng, pos.lat].join(','),
    radius: 20
  };
  url.search = new URLSearchParams(params);
  return fetch(url)
    .then(e => e.json())
    .then((e) => {
      if (e.features.length > 0) {
        return e.features[0].properties.key;
      }
    });
}

export function mapillaryViewerFilter(users, pano) {
  return [
    'all',
    ['in', 'userKey', ...users],
    ['==', 'pano', pano]
  ];
}
