import 'mapbox-gl/dist/mapbox-gl.css';
import './font/osm.css';

import Vue from 'vue';
import Vuetify, {
  VBtn,
  VCard,
  VCardText,
  VCardTitle,
  VCheckbox,
  VContainer,
  VContent,
  VDivider,
  VIcon,
  VImg,
  VLayout,
  VList,
  VListItem,
  VListItemAction,
  VListItemAvatar,
  VListItemContent,
  VListItemGroup,
  VListItemIcon,
  VListItemTitle,
  VNavigationDrawer,
  VSlideXReverseTransition,
  VSpacer,
  VSubheader,
  VToolbar,
  VToolbarTitle,
  VTooltip,
  VApp,
} from 'vuetify/lib';
import { Resize } from 'vuetify/lib/directives'
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';

import App from './js/app.vue';
import OsmMap from './js/map.vue';

import messages from './locales.json';
import pages from './pages/*.md';

Vue.use(Vuetify, {
  components: {
    VApp,
    VBtn,
    VCard,
    VCardText,
    VCardTitle,
    VCheckbox,
    VContainer,
    VContent,
    VDivider,
    VIcon,
    VImg,
    VLayout,
    VList,
    VListItem,
    VListItemAction,
    VListItemAvatar,
    VListItemContent,
    VListItemGroup,
    VListItemIcon,
    VListItemTitle,
    VNavigationDrawer,
    VSlideXReverseTransition,
    VSpacer,
    VSubheader,
    VToolbar,
    VToolbarTitle,
    VTooltip,
  },
  directives: {
    Resize
  }
});
Vue.use(VueRouter);
Vue.use(VueI18n);

const vuetify = new Vuetify({
  icons: {
    values: {
      prev: 'osm-chevron_left',
      next: 'osm-chevron_right',
      expand: 'osm-arrow_down',
      checkboxOn: 'osm-check_box',
      checkboxOff: 'osm-check_box_outline_blank'
    }
  }
});

const i18n = new VueI18n({
  locale: 'fr',
  messages,
});

const staticPages = Object.keys(pages).map((page) => {
  return {
    name: page,
    path: `/${page}`,
    component: () => import('./js/page'),
    props: { page: pages[page] }
  };
});

const routes = [
  ...staticPages,
  {
    name: 'index',
    path: '/:featuresAndLocation?',
    component: OsmMap,
    props: (route) => {
      return {
        featuresAndLocation: route.params.featuresAndLocation
      };
    },
    children: [
      {
        name: 'place',
        path: 'place/:idCategory/:idFeature/:id',
        component: () => import('./js/detail'),
        props: (route) => {
          return {
            featuresAndLocation: route.params.featuresAndLocation,
            idCategory: route.params.idCategory,
            idFeature: route.params.idFeature,
            id: route.params.id
          };
        }
      },
      {
        name: '360',
        path: '360/:mKey',
        component: () => import('./js/mapillary/mapillary_view'),
        props: (route) => {
          return {
            featuresAndLocation: route.params.featuresAndLocation,
            mKey: route.params.mKey,
            class: 'fullscreen'
          };
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  router,
  i18n,
  vuetify,
  render: createEle => createEle(App),
}).$mount('#app');
