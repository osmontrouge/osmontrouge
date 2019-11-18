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
        <v-toolbar dark>
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
            v-if="point.properties.tags.phone"
            :href="`tel:${point.properties.tags.phone}`"
          >
            <v-list-item-icon><v-icon>osm-phone</v-icon></v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ point.properties.tags.phone }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <detail-tag
            :value="point.properties.tags['kindergarten:FR']"
            name="Type de crèche :"
          />
          <detail-tag
            :value="point.properties.tags['school:FR']"
            name="Type de l'école :"
          />

          <detail-opening-hours
            v-if="point.properties.tags.opening_hours"
            :value="point.properties.tags.opening_hours"
          />

          <detail-opening-hours
            v-if="point.properties.tags.collection_times"
            :mode="1"
            :value="point.properties.tags.collection_times"
            namespace="details.collection_times"
          />

          <detail-tag
            :value="point.properties.tags.capacity"
            name="Nombre de places :"
          />

          <detail-entry v-if="point.properties.tags.dog === 'no'">
            {{ $t('details.dog_no') }}
          </detail-entry>

          <v-list-item
            v-if="point.properties.tags.website"
            :href="point.properties.tags.website"
          >
            <v-list-item-icon><v-icon>osm-link</v-icon></v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ point.properties.tags.website }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <detail-entry
            v-if="point.properties.tags.operator"
            icon="osm-info"
          >
            <template v-if="point.properties.tags['operator:type']">
              {{ $t('details.operator_with_type', {
                name: point.properties.tags.operator,
                type: $t(`details.operator_type.${point.properties.tags['operator:type']}`)
              }) }}
            </template>
            <template v-else>
              {{ $t('details.operator', { name: point.properties.tags.operator }) }}
            </template>
          </detail-entry>
          <detail-tag
            v-else-if="point.properties.tags['operator:type']"
            :value="$t(`details.operator_type.${point.properties.tags['operator:type']}`)"
            icon="osm-info"
            name="Type de l'opérateur :"
          />

        </v-list>
      </v-card>
    </v-slide-x-reverse-transition>
  </div>
</template>

<script>
import { findImage } from './mapillary/mapillary';
import * as config from '../config';
import DetailTag from './detail_tag';
import DetailEntry from './detail_entry';
import DetailOpeningHours from './detail_opening_hours';
import { reverse } from './addok';
import { getById } from './addok';

export default {
  components: {
    DetailEntry,
    DetailTag,
    DetailOpeningHours,
    MapillaryViewer: () => import('./mapillary/mapillary_viewer')
  },

  props: {
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
      point: null,
      mapillaryImage: null,
      address: null
    };
  },

  computed: {
    title() {
      return this.point.properties.name;
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
      getById(config.addok.url, { id: this.id })
        .then((feature) => {
          this.point = feature;
          this.mapillaryImage = this.point.properties.tags.mapillary;
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
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
}
.card-mapillary {
  height: 400px;
}
</style>
