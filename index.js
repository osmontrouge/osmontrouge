import 'mapbox-gl/dist/mapbox-gl.css';
import 'vuetify/dist/vuetify.min.css';
import './font/osm.css';

import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';

import App from './js/app.vue';
import OsmMap from './js/map.vue';

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

const routes = [
  {
    name: 'index',
    path: '/:position?',
    component: OsmMap,
    props: true,
    children: [
      {
        name: '360',
        path: '360/:mKey',
        component: () => import('./js/mapillary/mapillary_view'),
        props: true
      }
    ]
  },

];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  router,
  render: createEle => createEle(App),
}).$mount('#app');
