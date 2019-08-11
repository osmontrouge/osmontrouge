<template>
  <MglVectorLayer
    :source="source"
    :layer="layer"
    source-id="mapillary"
    layer-id="mapillary"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click="onClick"
  />
</template>

<script>
import { MglVectorLayer } from 'vue-mapbox/dist/vue-mapbox.umd.js';

export default {
  components: {
    MglVectorLayer
  },

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
    }
  },

  computed: {
    source() {
      return {
        type: 'vector',
        tiles: ['https://d25uarhxywzl1j.cloudfront.net/v0.1/{z}/{x}/{y}.mvt'],
        minzoom: 0,
        maxzoom: 14
      };
    },

    layer() {
      const layer = {
        type: 'line',
        'source-layer': 'mapillary-sequences',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-opacity': 0.6,
          'line-color': 'rgb(53, 175, 109)',
          'line-width': 6
        }
      };
      if (this.filter.length > 0) {
        layer.filter = this.filter;
      }
      return layer;
    },

    filter() {
      const filters = [];
      if (this.pano !== -1) {
        filters.push(['==', 'pano', this.pano]);
      }
      if (this.users.length > 0) {
        filters.push(['in', 'userkey', ...this.users]);
      }
      if (filters.length > 1) {
        return ['all', ...filters];
      } else if (filters.length == 1) {
        return filters[0];
      }
      return [];
    }
  },

  methods: {
    onMouseEnter(e) {
      e.map.getCanvas().style.cursor = 'pointer';
    },

    onMouseLeave(e) {
      e.map.getCanvas().style.cursor = '';
    },

    onClick(e) {
      this.$emit('click', e.mapboxEvent.lngLat);
    }
  }
};
</script>
