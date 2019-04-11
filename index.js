import 'mapbox-gl/dist/mapbox-gl.css';
import 'vuetify/dist/vuetify.min.css';
import './font/osm.css';

import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';

import App from './js/app.vue';
import OsmMap from './js/map.vue';
import MapillaryView from './js/mapillary_view.vue';

Vue.use(Vuetify, {
  icons: {
    prev: 'osm-chevron_left',
    next: 'osm-chevron_right',
    expand: 'osm-arrow_down',
    checkboxOn: 'osm-check_box',
    checkboxOff: 'osm-check_box_outline_blank'
  }
});
Vue.use(VueRouter);

function castParamsToFloat(keys, route) {
  return keys.reduce((memo, key) => {
    memo[key] = parseFloat(route.params[key]);
    return memo;
  }, {});
}

const routes = [
  { name: 'index',          path: '',                  component: OsmMap },
  { name: 'index_with_pos', path: '/@:lat,:lng,:zoom', component: OsmMap,        props(route) { return castParamsToFloat(['lat', 'lng', 'zoom'], route); } },
  { name: '360',            path: '/360/:mKey',        component: MapillaryView, props: true }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  router,
  render: createEle => createEle(App),
}).$mount('#app');
