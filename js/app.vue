<template>
  <v-app
    v-resize="resize"
  >
    <v-navigation-drawer
      v-model="sidebar"
      :temporary="isMobile"
      :stateless="!isMobile"
      :hide-overlay="!isMobile"
      fixed
    >
      <osm-sidebar
        :taxonomy="taxonomy"
        :image-sidebar="imageSidebar"
        :map-name="mapName"
        class="sidebar"
        @input="toggleMarker"
      />
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
        :hash="true"
        :max-bounds="map.maxBounds"
        :center.sync="map.center"
        :zoom.sync="map.zoom"
        :map-style="mapStyles[0].uri"
      >
        <template
          v-for="category in markers"
        >
          <MglMarker
            v-for="marker in category.markers"
            :key="marker.id"
            :coordinates="marker.geometry.coordinates"
            anchor="bottom"
          >
            <div
              slot="marker"
            >
              <svg
                baseProfile="basic"
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                class="marker-inside"
              >
                <path
                  :fill="category.color"
                  d="M24 0c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z" />
                <foreignObject x="9" y="3" width="30" height="30">
                  <div class="marker-icon">
                    <v-icon :color="category.color">{{ category.icon }}</v-icon>
                  </div>
                </foreignObject>
              </svg>
            </div>
            <MglPopup
              :offset="72"
              :close-button="false"
              @added="(e) => e.popup.remove()"
            >
              <div>{{ marker.properties.name || category.name }}</div>
            </MglPopup>
          </MglMarker>
        </template>
        <MglNavigationControl :show-compass="false" />
        <style-control :styles="this.mapStyles" />
      </MglMap>
    </v-content>
  </v-app>
</template>

<script>
import { MglMap, MglMarker, MglNavigationControl, MglPopup } from 'vue-mapbox';
import StyleControl from './style_control';
import OsmSidebar from './sidebar';
import geojsondata from '../data/*.geojson';

export default {
  components: {
    MglMap,
    MglMarker,
    MglPopup,
    MglNavigationControl,
    StyleControl,
    OsmSidebar
  },

  props: {
    taxonomy: {
      type: Object,
      required: true
    },
    mapMaxBounds: {
      type: Array,
      required: false,
      default: null
    },
    mapCenter: {
      type: Array,
      required: true
    },
    mapZoom: {
      type: Number,
      required: false,
      default: 10
    },
    mapName: {
      type: String,
      required: true
    },
    mapStyles: {
      type: Array,
      required: true
    },
    imageSidebar: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      isMobile: false,
      sidebar: false,
      markers: [],
      map: {
        maxBounds: this.mapMaxBounds,
        center: this.mapCenter,
        zoom: this.mapZoom
      }
    };
  },

  mounted() {
    this.resize();
    this.sidebar = !this.isMobile;
  },

  methods: {
    resize() {
      this.isMobile = window.innerWidth < 800;
    },

    toggleMarker(idCategory, idFeature, displayed) {
      if (displayed) {
        const category = this.taxonomy[idCategory];
        const featureOrCategoryInfo = name => category.features[idFeature][name] || category[name];
        const marker = {
          id: idCategory,
          name: category.features[idFeature].name,
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
        this.markers.splice(this.markers.findIndex(c => c.id === idCategory), 1);
      }
    },
  }
}
</script>

<style>
html {
  overflow-y: auto;
}
.sidebar {
  height: 100vh;
}

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

#map {
  height: 100vh;
  width: 100vw;
}

.mapboxgl-marker {
  transition: none;
}
.marker-inside {
  transition: transform .1s ease;
  transform-origin: bottom center;
  cursor: pointer;
}
.marker-inside:hover {
  transform: scale(1.5);
}
.marker-icon {
  background-color: white;
  border-radius: 20px;
  height: 30px;
  width: 30px;
}
.marker-icon i {
  height: 30px;
  width: 30px;
  padding: 5px;
  font-size: 20px;
}

.mgl-map-wrapper {
  height: 100%;
  position: relative;
  width: 100%;
}
.mgl-map-wrapper .mapboxgl-map {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
