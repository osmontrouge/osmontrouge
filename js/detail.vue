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
          <v-toolbar-title
            :title="title"
            >{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            icon
            dark
             @click="close">
            <v-icon>osm-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list>
          <detail-tag
            v-if="point.properties['operator:type']"
            :value="point.properties['operator:type']"
            name="Type de l'opérateur :"
          />
          <detail-tag
            v-if="point.properties['school:FR']"
            :value="point.properties['school:FR']"
            name="Type de l'école :"
          />
          <detail-tag
            v-if="point.properties.opening_hours"
            :value="point.properties.opening_hours"
            name="Horaires d'ouverture"
          />
          <detail-tag
            v-if="point.properties.operator"
            :value="point.properties.operator"
            name="Opéré par"
          />

          <v-list-tile v-if="point.properties.website">
            <v-list-tile-content>
              <v-list-tile-title>
                <a
                  :href="point.properties.website"
                >
                  {{ point.properties.website }}
                </a>
              </v-list-tile-title>
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
import DetailTag from './detail_tag';

export default {
  components: { DetailTag },

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

  computed: {
    title() {
      return this.point.properties.name || this.feature.name;
    }
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
