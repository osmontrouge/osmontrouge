<template>
  <div :id="`mapillary-${uuid}`" />
</template>

<script>
import 'mapillary-js/dist/mapillary.min.css';
import { Viewer } from 'mapillary-js/dist/mapillary.min';
import { mapillaryClientId, mapillaryUsers } from '../../config';
import { mapillaryViewerFilter } from './mapillary';

export default {
  props: {
    mKey: {
      type: String,
      required: true
    },
    cover: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      uuid: Math.random()
    };
  },

  mounted() {
    this.viewer = new Viewer(
      `mapillary-${this.uuid}`,
      mapillaryClientId,
      this.mKey,
      {
        component: {
          cover: this.cover
        }
      }
    );
    this.viewer.setFilter(mapillaryViewerFilter(mapillaryUsers, true));

    this.viewer.on(Viewer.nodechanged, ({ key }) => {
      this.$emit('keychange', key);
    });
  },

  watch: {
    mKey(mKey) {
      this.viewer.moveToKey(mKey);
    }
  }
};
</script>
