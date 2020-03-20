<template>
  <div
    v-resize="resize"
    :class="{ 'bottom-dialog': isMobile, 'right-sidebar': !isMobile }"
  >
    <v-slide-x-reverse-transition>
      <v-card
        v-if="point"
        min-height="100%"
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
          <detail-entry icon="osm-mail">
            {{ address }}
          </detail-entry>
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

          <detail-entry
            v-if="point.properties['kindergarten:FR']"
            icon="osm-info"
          >
            {{ $t(`details.kindergarten_fr.${point.properties['kindergarten:FR']}`) }}
          </detail-entry>

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
            icon="osm-info"
            name="Nombre de places :"
          />

          <detail-entry
            v-if="point.properties.dog === 'no'"
            icon="osm-no_dogs"
          >
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

          <detail-entry
            v-if="point.properties.operator"
            icon="osm-info"
          >
            <template v-if="point.properties['operator:type']">
              {{ $t('details.operator_with_type', {
                name: point.properties.operator,
                type: $t(`details.operator_type.${point.properties['operator:type']}`)
              }) }}
            </template>
            <template v-else>
              {{ $t('details.operator', { name: point.properties.operator }) }}
            </template>
          </detail-entry>
          <detail-tag
            v-else-if="point.properties['operator:type']"
            :value="$t(`details.operator_type.${point.properties['operator:type']}`)"
            icon="osm-info"
            name="Type de l'opérateur :"
          />
        </v-list>
        <v-btn
          :href="mailto"
          class="mx-3"
          >{{ $t('details.containment_closed') }}
        </v-btn>
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
import { reverse } from './addok';

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
      mapillaryImage: null,
      address: null
    };
  },

  computed: {
    title() {
      return this.point.properties.name || this.feature.name;
    },

    mailto() {
      const name = this.point.properties.name;
      const subject = this.$t('details.containment_closed_subject', { name });
      const body = this.$t('details.containment_closed_message', { name, id: this.id });
      return `mailto:contact@osmontrouge.fr?subject=${subject}&body=${body}`;
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
          this.fetchAddress();
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

    fetchAddress() {
      const [lon, lat] = this.point.geometry.coordinates;
      reverse(config.addok.url, { lat, lon }).then((data) => {
        if (data.features.length > 0) {
          this.address = data.features[0].properties.label;
        }
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
  overflow-y: auto;
}

.bottom-dialog {
  width: 100vw;
  height: 100vh;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  overflow-y: auto;
}
.card-mapillary {
  height: 400px;
}
</style>
