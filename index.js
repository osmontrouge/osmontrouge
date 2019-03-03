import 'ol/ol.css';
import 'ol-popup/src/ol-popup.css';
import 'normalize.css/normalize.css';
import './index.css';

import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat, transformExtent } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { createDefaultStyle } from 'ol/style/Style';
import { Style, Icon } from 'ol/style';
import { apply } from 'ol-mapbox-style';
import Popup from 'ol-popup';
import data from './data.yml';
import ejs from 'ejs';
import icons from './icons/*.svg'
import geojsondata from './data/*.geojson'

const map = new Map({
  target: 'map',
  view: new View({
    center: fromLonLat([2.3160600, 48.8144000]),
    extent: transformExtent([2.300305,48.809181,2.333694,48.822321],
                            'EPSG:4326', 'EPSG:3857'),
    zoom: 15
  })
});
apply(map, 'https://tiles.osmontrouge.fr/styles/osm-bright/style.json');

const popup = new Popup();
map.addOverlay(popup);

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
      layer = new VectorLayer({
        source: new VectorSource({
          url: geojsondata[name],
          format: new GeoJSON()
        }),
        style: (feature, resolution) => {
          if (feature.getGeometry().getType() === 'Point' && feature.getProperties().icon) {
            return new Style({
              image: new Icon({
                anchor: [0, 0],
                src: icons[feature.getProperties().icon]
              })
            });
          }
          return createDefaultStyle(feature, resolution);
        }
      },);
      map.addLayer(layer);
    } else {
      map.removeLayer(layer);
    }
  });
});


function displayTooltip(evt) {
  var pixel = evt.pixel;
  var feature = map.forEachFeatureAtPixel(pixel, (feature) => feature, { layerFilter(layer) {
    return layer.type === 'VECTOR';
  }});
  if (feature && feature.getProperties().name) {
    popup.show(evt.coordinate, feature.getProperties().name);
  } else {
    popup.hide();
  }
};

map.on('pointermove', displayTooltip);
