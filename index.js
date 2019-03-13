import 'mapbox-gl/dist/mapbox-gl.css';
import 'normalize.css/normalize.css';
import './index.css';

import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import data from './data.yml';
import ejs from 'ejs';
import geojsondata from './data/*.geojson'

const map = new mapboxgl.Map({
  container: 'map',
  style: 'https://tiles.osmontrouge.fr/styles/liberty/style.json',
  center: [2.3160600, 48.8144000],
  zoom: 15,
  maxBounds: [[2.300305, 48.809181], [2.333694, 48.822321]],
  hash: true
});

map.addControl(new mapboxgl.NavigationControl());

class Sidebar {
  onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
    this._button = document.createElement('button');
    this._button.innerHTML = '<';
    this._container.appendChild(this._button);
    this._button.addEventListener('click', this._onClick.bind(this), false);
    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }

  _onClick() {
    document.body.classList.toggle('sidebar-closed');
    if (document.body.classList.contains('sidebar-closed')) {
      this._button.innerHTML = '>';
    } else {
      this._button.innerHTML = '<';
    }
  }
}

map.addControl(new Sidebar(), 'top-left');

const filters = Object.keys(data).map((id) => {
  return {
    id,
    ...data[id]
  };
});
const content = ejs.render(`
  <% filters.forEach(({ id, name }) => { %>
    <label><input type="checkbox" data-name="<%= id %>" /> <%= name %></label>
  <% }) %>
`, { filters });
document.getElementById('filters').innerHTML = content;

document.querySelectorAll('input[type=checkbox]').forEach((checkbox) => {
  let layer = null;
  const name = checkbox.dataset.name;
  checkbox.addEventListener('change', (e) => {
    if (e.target.checked) {
      map.addSource(name, {
        type: 'geojson',
        data: geojsondata[name]
      });
      const color = (data[name].style || { color: 'blue' }).color;
      map.addLayer({
        id: `${name}-polygon`,
        type: 'fill',
        source: name,
        paint: {
          'fill-color': color,
          'fill-opacity': .4
        },
        filter: ['==', '$type', 'Polygon']
      });
      map.addLayer({
        id: `${name}-point`,
        type: 'circle',
        source: name,
        paint: {
          'circle-radius': 10,
          'circle-color': color
        },
        filter: ['==', '$type', 'Point']
      });
      bindTooltip(`${name}-polygon`);
      bindTooltip(`${name}-point`);
    } else {
      map.removeLayer(`${name}-polygon`);
      map.removeLayer(`${name}-point`);
      map.removeSource(name);
      unbindTooltip(`${name}-polygon`);
      unbindTooltip(`${name}-point`);
    }
  });
});

const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});

function showTooltip(e) {
  const name = e.features[0].properties.name;
  if (!name) return;
  map.getCanvas().style.cursor = 'pointer';

  popup.setLngLat(e.lngLat)
    .setHTML(name)
    .addTo(map);
}

function hideTooltip() {
  map.getCanvas().style.cursor = '';
  popup.remove();
}

function bindTooltip(layer) {
  map.on('mouseenter', layer, showTooltip);
  map.on('mouseleave', layer, hideTooltip);
}
function unbindTooltip(layer) {
  map.off('mouseenter', layer, showTooltip);
  map.off('mouseleave', layer, hideTooltip);
}
