<template>
  <div
    tabindex="0"
    @keydown.esc="close"
  >
    <div id="mapillary" />
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
import 'mapillary-js/dist/mapillary.min.css';
import { Viewer } from 'mapillary-js/dist/mapillary.min';
import { mapillaryClientId, mapillaryUsers } from '../config';
import { mapillaryViewerFilter } from './mapillary';

export default {
  props: {
    mKey: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: false,
      default: ''
    }
  },

  mounted() {
    this.viewer = new Viewer(
      'mapillary',
      mapillaryClientId,
      this.mKey,
      {
        component: {
          cover: false,
        }
      }
    );
    this.viewer.setFilter(mapillaryViewerFilter(mapillaryUsers, true));
    this.$el.focus();

    this.viewer.on(Viewer.nodechanged, ({ key }) => {
      this.$router.replace({ name: '360', params: { mKey: key, position: this.position } });
    });
  },

  watch: {
    mKey(mKey) {
      this.viewer.moveToKey(mKey);
    }
  },

  methods: {
    close() {
      this.$router.push({ name: 'index', params: { position: this.position } })
    }
  }
};
</script>

<style>
  .mapillary-js {
    height: 100vh;
  }
</style>
