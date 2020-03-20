import 'mapbox-gl/dist/mapbox-gl.css';
import './font/osm.css';

import Vue from 'vue';
import Vuetify, {
  VAlert,
  VApp,
  VBtn,
  VCard,
  VCardSubtitle,
  VCardText,
  VCardTitle,
  VCheckbox,
  VCol,
  VContainer,
  VContent,
  VDivider,
  VIcon,
  VImg,
  VLayout,
  VList,
  VListGroup,
  VListItem,
  VListItemAction,
  VListItemAvatar,
  VListItemContent,
  VListItemGroup,
  VListItemIcon,
  VListItemTitle,
  VNavigationDrawer,
  VRow,
  VSlideXReverseTransition,
  VSpacer,
  VSubheader,
  VToolbar,
  VToolbarTitle,
  VTooltip,
} from 'vuetify/lib';
import { Resize } from 'vuetify/lib/directives'
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';

import { mapName, baseUrl, imageSidebar } from './config';
import App from './js/app.vue';
import OsmMap from './js/map.vue';

import messages from './locales.json';
import markdownPages from './pages/*.md';

Vue.use(Vuetify, {
  components: {
    VAlert,
    VApp,
    VBtn,
    VCard,
    VCardSubtitle,
    VCardText,
    VCardTitle,
    VCheckbox,
    VCol,
    VContainer,
    VContent,
    VDivider,
    VIcon,
    VImg,
    VLayout,
    VList,
    VListGroup,
    VListItem,
    VListItemAction,
    VListItemAvatar,
    VListItemContent,
    VListItemGroup,
    VListItemIcon,
    VListItemTitle,
    VNavigationDrawer,
    VRow,
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

const staticPagesMarkdown = Object.keys(markdownPages).map((page) => {
  return {
    name: page,
    path: `/${page}`,
    component: () => import('./js/page'),
    props: { html: markdownPages[page] }
  };
});

const Reuses = () => import('./pages/reuses');
const staticPagesVue = [
  {
    name: 'reuses',
    path: `/reuses`,
    component: () => import('./js/page'),
    props: { component: Reuses },
    meta: { title: i18n.t('reuses')  }
  }
];

const routes = [
  ...staticPagesMarkdown,
  ...staticPagesVue,
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
        path: '360/:mKey/:bearing?',
        component: () => import('./js/mapillary/mapillary_view'),
        props: (route) => {
          return {
            featuresAndLocation: route.params.featuresAndLocation,
            mKey: route.params.mKey,
            bearing: route.params.bearing,
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

router.afterEach((route) => {
  const title = () => {
    const markdownPage = markdownPages[route.name];
    if (markdownPage) {
      const doc2 = new DOMParser().parseFromString(markdownPages[route.name], 'text/html');
      const title = doc2.querySelector('h1').textContent;
      return `${title} - ${mapName}`;
    } else if (route.meta.title) {
      return `${route.meta.title} - ${mapName}`;
    } else {
      return mapName;
    }
  };
  document.title = title();
  const metaFactory = (property, content) => {
    const meta = document.createElement('meta');
    meta.setAttribute('property', property);
    meta.setAttribute('content', content);
    const existingMeta = document.head.querySelector(`meta[property="${property}"]`);
    if (existingMeta) existingMeta.remove();
    document.head.append(meta);
  }
  metaFactory('og:title', document.title);
  metaFactory('og:url', document.URL);
  metaFactory('og:image', `${baseUrl}${imageSidebar}`);
});

new Vue({
  router,
  i18n,
  vuetify,
  render: createEle => createEle(App),
}).$mount('#app');
