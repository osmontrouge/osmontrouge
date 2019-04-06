import 'mapbox-gl/dist/mapbox-gl.css';
import 'vuetify/dist/vuetify.min.css';
import './font/osm.css';

import Vue from 'vue';
import Vuetify from 'vuetify';

import data from './data.yml';
import App from './js/app.vue';

import imageSidebar from './images/montrouge.png';

Vue.use(Vuetify, {
  icons: {
    prev: 'osm-chevron_left',
    next: 'osm-chevron_right',
    expand: 'osm-arrow_down',
    checkboxOn: 'osm-check_box',
    checkboxOff: 'osm-check_box_outline_blank'
  }
});

const mapMaxBounds = [[2.293611, 48.807344], [2.336998, 48.825486]];
const mapCenter = [2.315111, 48.816614];
const mapZoom = 15;
const mapName = 'OSMontrouge';
const mapStyles = [
  {
    title: 'Bright',
    uri: 'https://tiles.osmontrouge.fr/styles/bright/style.json',
  },
  {
    title: 'Liberty',
    uri: 'https://tiles.osmontrouge.fr/styles/liberty/style.json',
  }
];
const mappillaryUsers = [
  'e_ZBE6mFd7CYNjRSpLl-Lg', // francois2
  'C4ENdWpJdFNf8CvnQd7NrQ', // phyks
  'XtzGKZX2_VIJRoiJ8IWRNQ'  // overflorian
];

new Vue({
  render: createEle => createEle(App, {
    props: {
      imageSidebar,
      mapCenter,
      mapMaxBounds,
      mapName,
      mapStyles,
      mapZoom,
      mappillaryUsers,
      taxonomy: data,
    }
  }),
}).$mount('#app');
