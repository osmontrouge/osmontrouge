<template>
  <div
    v-resize="resize"
    :class="{ 'bottom-dialog': isMobile, 'right-sidebar': !isMobile }"
  >
    <v-slide-x-reverse-transition>
      <v-card
        v-if="point"
        height="100%"
      >
        <v-toolbar
          :color="color"
          card
          dark
        >
          <v-icon>{{ icon }}</v-icon>
          <v-card-title
            class="headline lighten-2"
          >
            {{ point.properties.name || feature.name }}
          </v-card-title>
          <v-spacer></v-spacer>
          <v-btn
            icon
            dark
             @click="close">
            <v-icon>osm-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list>
          <v-list-tile v-if="point.properties.opening_hours">
            <v-list-tile-action>
              Ouvert
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ point.properties.opening_hours }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-if="point.properties.operator">
            <v-list-tile-action>
              Opéré par
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ point.properties.operator }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-slide-x-reverse-transition>
  </div>
</template>

<script>
import { taxonomy } from '../config';
import geojsondata from '../data/*.geojson';

export default {
  props: {
    idCategory: {
      type: String,
      required: true
    },
    idFeature: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    featuresAndLocation: {
      type: String,
      required: false,
      default: ''
    }
  },

  mounted() {
    this.resize();
    this.updatePoint();
  },

  data() {
    return {
      isMobile: true,
      color: null,
      icon: null,
      feature: null,
      point: null
    };
  },

  watch: {
    id() {
      this.point = null;
      this.updatePoint();
    }
  },

  methods: {
    resize() {
      this.isMobile = window.innerWidth < 800;
    },

    updatePoint() {
      const category = taxonomy[this.idCategory];
      const feature = category.features[this.idFeature];

      this.color = feature.color || category.color;
      this.icon = feature.icon || category.icon;
      this.feature = feature;

      fetch(geojsondata[this.idFeature])
        .then(data => data.json())
        .then(({ features }) => {
          this.point = features.find(f => f.id === this.id);
        });
    },

    close() {
      this.$router.push({ name: 'index', params: { featuresAndLocation: this.featuresAndLocation } })
    }
  }
}
</script>

<style>
.right-sidebar {
  width: 400px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
}

.bottom-dialog {
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
}
</style>
