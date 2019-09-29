<template>
  <div
    v-resize="computeIsMobile"
    :class="{ 'place-opened': $route.name === 'place' && !isMobile }"
  >
    <div>
      <v-navigation-drawer
        v-model="sidebar"
        :temporary="isMobile"
        :stateless="!isMobile"
        :hide-overlay="!isMobile"
        fixed
      >
        <osm-sidebar>
          <osm-filter-features :taxonomy="taxonomy" />
        </osm-sidebar>
      </v-navigation-drawer>
      <v-container
        v-show="!isMobile"
        :class="{ 'handle--closed': !sidebar }"
        fill-height
        tag="a"
        class="handle"
        @click.prevent="sidebar = !sidebar"
      >
        <v-icon v-if="sidebar">{{ $vuetify.icons.prev }}</v-icon>
        <v-icon v-else>{{ $vuetify.icons.next }}</v-icon>
      </v-container>
      <v-content>
        <v-btn
          v-show="isMobile"
          fixed
          fab
          dark
          top
          left
          color="pink"
          @click="sidebar = !sidebar"
        >
          <v-icon>osm-filter_list</v-icon>
        </v-btn>
        <MglMap
          :max-bounds="mapMaxBounds"
          :center.sync="mapCenter"
          :zoom.sync="mapZoom"
          :map-style="mapStyle"
        >
          <template
            v-for="category in markers"
          >
            <osm-marker
              v-for="marker in category.markers"
              :key="marker.id"
              :feature="marker"
              :category="category"
              @open="openDetail(category, $event)"
            />
          </template>
          <mapillary-layer
            v-if="mapillaryLayer"
            :pano="1"
            :users="config.mapillaryUsers"
            @click="displayMapillaryView"
          />
          <MglNavigationControl :show-compass="false" />
          <view-control v-model="style3D" />
          <mapillary-control v-model="mapillaryLayer" />
        </MglMap>
        <v-card
          v-if="mapillaryLayer"
          width="400"
          height="55"
          class="mapillary-info"
        >
          <v-card-text>
            {{ $t("mapillary.info") }}
          </v-card-text>
        </v-card>
      </v-content>
    </div>
    <router-view />
  </div>
</template>

<script>
import { MglMap, MglNavigationControl } from 'vue-mapbox/dist/vue-mapbox.umd';
import ViewControl from './3d_control';
import OsmSidebar from './sidebar';
import OsmFilterFeatures from './filter_features';
import OsmMarker from './marker';
import MapillaryLayer from './mapillary/mapillary_layer';
import MapillaryControl from './mapillary/mapillary_control';
import geojsondata from '../data/*.geojson';
import * as config from '../config';
import { findImage } from './mapillary/mapillary';
import { encode, decode, encodePosition, decodePosition, encodeFeatures, decodeFeatures } from './url';

export default {
  components: {
    MapillaryControl,
    MapillaryLayer,
    MglMap,
    MglNavigationControl,
    OsmFilterFeatures,
    OsmMarker,
    OsmSidebar,
    ViewControl
  },

  props: {
    featuresAndLocation: {
      type: String,
      required: false,
      default: ''
    }
  },

  data() {
    const { features, location } = decode(this.featuresAndLocation);
    const { lat, lng, zoom } = decodePosition(location, config);
    const params = new URLSearchParams(features);
    decodeFeatures(features, config.taxonomy);
    return {
      isMobile: false,
      sidebar: false,
      markers: [],
      mapillaryLayer: params.has('mapillary'),
      mapMaxBounds: config.mapMaxBounds,
      mapCenter: { lat, lng },
      mapZoom: zoom,
      config,
      taxonomy: config.taxonomy,
      style3D: params.has('3d')
    };
  },

  mounted() {
    this.computeIsMobile();
    this.sidebar = !this.isMobile;
    this.updateMarkers();
  },

  computed: {
    mapStyle() {
      if (this.style3D) return this.config.mapStyles['3d'];
      return this.config.mapStyles.normal;
    }
  },

  watch: {
    mapCenter() {
      this.updateRoute();
    },

    mapZoom() {
      this.updateRoute();
    },

    mapillaryLayer() {
      this.updateRoute();
    },

    style3D() {
      this.updateRoute();
    },

    taxonomy: {
      deep: true,
      handler() {
        this.updateMarkers();
        this.updateRoute();
      }
    }
  },

  methods: {
    computeIsMobile() {
      this.isMobile = window.innerWidth < 800;
    },

    updateRoute() {
      this.$router.replace({
        name: this.$route.name,
        params: {
          ...this.$route.params,
          featuresAndLocation: encode(
            encodeFeatures(this.taxonomy, { mapillary: this.mapillaryLayer, '3d': this.style3D }),
            encodePosition(this.mapCenter.lat, this.mapCenter.lng, this.mapZoom)
          )
        }
      });
    },

    updateMarkers() {
      Object.keys(this.taxonomy).forEach((idCategory) => {
        Object.keys(this.taxonomy[idCategory].features).forEach((idFeature) => {
          const feature = this.taxonomy[idCategory].features[idFeature];
          const index = this.markers.findIndex(c => c.id === idFeature);
          if (feature.selected) {
            if (index !== -1) {
              return;
            }
            const category = this.taxonomy[idCategory];
            const featureOrCategoryInfo = name => feature[name] || category[name];
            const marker = {
              id: idFeature,
              category: idCategory,
              feature: idFeature,
              name: feature.name,
              icon: featureOrCategoryInfo('icon'),
              color: featureOrCategoryInfo('color'),
              markers: []
            };
            this.markers.push(marker)
            fetch(geojsondata[idFeature])
              .then(data => data.json())
              .then(({ features }) => {
                marker.markers.push(...features);
              });
          } else {
            if (index === -1) {
              return;
            }
            this.markers.splice(index, 1);
          }
        });
      });
    },

    displayMapillaryView(position) {
      findImage(position, true, config.mapillaryUsers, config.mapillaryClientId)
        .then((mKey) => {
          this.$router.push({ name: '360', params: { mKey, featuresAndLocation: this.featuresAndLocation } });
        });
    },

    openDetail(category, id) {
      this.$router.push({
        name: 'place',
        params: {
          idCategory: category.category,
          idFeature: category.feature,
          id: id,
          featuresAndLocation: this.featuresAndLocation
        }
      });
    }
  }
}
</script>

<style>
.handle {
  position: absolute;
  top: 170px;
  transform: translateX(300px);
  padding: 24px 0 !important;
  height: 70px;
  width: 25px;
  background-color: white;
  z-index: 5;
  box-shadow: 0 3px 1px -2px #0003,0 2px 2px 0 #00000024,0 1px 5px 0 #0000001f;
}

.handle--closed {
  transform: translateX(0);
}

.mgl-map-wrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
}

.mgl-map-wrapper .mapboxgl-map {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
}

.mapillary-info {
  position: fixed;
  bottom: 10px;
  left: 50%;
  margin-left: -200px;
}

.place-opened  .mapboxgl-ctrl-bottom-right, .place-opened .mapboxgl-ctrl-top-right {
  transform: translateX(-400px);
}
</style>
