<template>
  <div
    tabindex="0"
    @keydown.esc="close"
  >
    <mapillary-viewer
      :m-key="mKey"
      @keychange="updateRoute"
    />
    <v-card
      :loading="loading"
      class="mapillary-geocode"
    >
      <v-card-text>
        {{ address }}
      </v-card-text>
    </v-card>
    <v-btn
      fixed
      icon
      dark
      top
      right
      @click="close"
    >
      <v-icon>osm-close</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { getImage } from './mapillary';
import { reverse } from '../addok';
import { mapillaryClientId, addok as configAddok } from '../../config';

export default {
  components: {
    MapillaryViewer: () => import('./mapillary_viewer')
  },

  props: {
    mKey: {
      type: String,
      required: true
    },
    featuresAndLocation: {
      type: String,
      required: false,
      default: ''
    }
  },

  data() {
    return {
      loading: false,
      address: null
    };
  },

  mounted() {
    this.$el.focus();
    this.fetchAddress();
  },

  watch: {
    mKey() {
      this.fetchAddress();
    }
  },

  methods: {
    updateRoute(key) {
      this.$router.replace({ name: '360', params: { mKey: key, featuresAndLocation: this.featuresAndLocation } });
    },

    fetchAddress() {
      this.loading = true;
      getImage(this.mKey, mapillaryClientId).then((image) => {
        const [lon, lat] = image.geometry.coordinates;
        return reverse(configAddok.url, { lat, lon });
      }).then((data) => {
        this.loading = false;
        if (data.features.length > 0) {
          this.address = data.features[0].properties.label;
        }
      });
    },

    close() {
      this.$router.push({ name: 'index', params: { featuresAndLocation: this.featuresAndLocation } })
    }
  }
};
</script>

<style>
  .mapillary-js {
    height: 100vh;
  }

  .mapillary-geocode {
    position: fixed;
    top: 1rem;
    left: 1rem;
  }
</style>
