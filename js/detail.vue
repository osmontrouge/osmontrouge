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
          dark
        >
          <v-icon>{{ icon }}</v-icon>
          <v-toolbar-title
            :title="title"
            class="ml-3"
            >{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            icon
            dark
            @click="close">
            <v-icon>osm-close</v-icon>
          </v-btn>
        </v-toolbar>

        <mapillary-viewer
          v-if="mapillaryImage"
          :m-key="mapillaryImage"
          :cover="true"
          class="card-mapillary"
        />

        <v-list>
          <v-list-item
            v-if="point.properties.phone"
            :href="`tel:${point.properties.phone}`"
          >
            <v-list-item-icon><v-icon>osm-phone</v-icon></v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ point.properties.phone }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <detail-tag
            :value="point.properties['operator:type']"
            name="Type de l'opérateur :"
          />
          <detail-tag
            :value="point.properties['kindergarten:FR']"
            name="Type de crèche :"
          />
          <detail-tag
            :value="point.properties['school:FR']"
            name="Type de l'école :"
          />

          <detail-opening-hours
            v-if="point.properties.opening_hours"
            :value="point.properties.opening_hours"
          />

          <detail-opening-hours
            v-if="point.properties.collection_times"
            :mode="1"
            :value="point.properties.collection_times"
            namespace="details.collection_times"
          />

          <detail-tag
            :value="point.properties.capacity"
            name="Nombre de places :"
          />
          <detail-tag
            :value="point.properties.operator"
            name="Opéré par"
          />

          <detail-entry v-if="point.properties.dog === 'no'">
            {{ $t('details.dog_no') }}
          </detail-entry>

          <v-list-item
            v-if="point.properties.website"
            :href="point.properties.website"
          >
            <v-list-item-icon><v-icon>osm-link</v-icon></v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ point.properties.website }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-slide-x-reverse-transition>
  </div>
</template>

<script>
import { findImage } from './mapillary/mapillary';
import * as config from '../config';
import geojsondata from '../data/*.geojson';
import DetailTag from './detail_tag';
import DetailEntry from './detail_entry';
import DetailOpeningHours from './detail_opening_hours';

export default {
  components: {
    DetailEntry,
    DetailTag,
    DetailOpeningHours,
    MapillaryViewer: () => import('./mapillary/mapillary_viewer')
  },

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
      point: null,
      mapillaryImage: null
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
      const category = config.taxonomy[this.idCategory];
      const feature = category.features[this.idFeature];

      this.color = feature.color || category.color;
      this.icon = feature.icon || category.icon;
      this.feature = feature;

      fetch(geojsondata[this.idFeature])
        .then(data => data.json())
        .then(({ features }) => {
          this.point = features.find(f => f.id === this.id);
          this.mapillaryImage = this.point.properties.mapillary;
          if (!this.mapillaryImage) {
            this.fetchMapillaryImage();
          }
        });
    },

    fetchMapillaryImage() {
      const coordinates = {
        lng: this.point.geometry.coordinates[0],
        lat: this.point.geometry.coordinates[1]
      };
      findImage(coordinates, true, config.mapillaryUsers, config.mapillaryClientId)
        .then((mKey) => {
          this.mapillaryImage = mKey;
        });
    },

    close() {
      this.$router.push({ name: 'index', params: { featuresAndLocation: this.featuresAndLocation } })
    }
  }
}
</script>

<style scoped>
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
.card-mapillary {
  height: 400px;
}
</style>
