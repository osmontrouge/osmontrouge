<template>
  <div>
    <div id="mapillary" />
    <v-btn
      fixed
      icon
      dark
      top
      right
      @click="$emit('close')"
    >
      <v-icon>osm-close</v-icon>
    </v-btn>
  </div>
</template>

<script>
import  "mapillary-js/dist/mapillary.min.css";
import { Viewer } from 'mapillary-js/dist/mapillary.min.js';

export default {
  props: {
    pano: {
      type: Number,
      required: false,
      default: -1
    },

    users: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    },

    pos: {
      type: Object,
      required: true
    }
  },

  mounted() {
    const clientId = 'ZV9aQkU2bUZkN0NZTmpSU3BMbC1MZzo0YmYyNDRkMDFkYWE3YWQ3';

    const viewer = new Viewer(
      'mapillary',
      clientId,
      null,
    );
    const url = new URL("https://a.mapillary.com/v3/images");
    const params = {
      client_id: clientId,
      pano: this.pano === 1,
      userkeys: this.users.join(','),
      closeto: `${this.pos.lng},${this.pos.lat}`,
      radius: 20
    };
    url.search = new URLSearchParams(params);
    fetch(url)
      .then(e => e.json())
      .then((e) => {
        if (e.features.length > 0) {
          viewer.moveToKey(e.features[0].properties.key);
        }
      });
  }
};
</script>

<style>
  .mapillary-js {
    height: 100vh;
  }
</style>
