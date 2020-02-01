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
    bearing: {
      type: String,
      required: false,
      default: null
    },
    cover: {
      type: Boolean,
      required: false,
      default: false
    },
    mKey: {
      type: String,
      required: true
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
    const setBearing = (node, desiredBearing) => {
      if (!node.fullPano) {
        // We are only interested in setting the bearing for full 360 panoramas.
        return;
      }

      const nodeBearing = node.computedCA; // Computed node compass angle (equivalent
                                        // to bearing) is used by mjs when placing
                                        // the node in 3D space.

      const basicX = bearingToBasic(desiredBearing, nodeBearing);
      const basicY = 0.5; // Vertical center

      const center = [basicX, basicY];

      this.viewer.setCenter(center);
   }
    /**
     * Convert a desired bearing to a basic X image coordinate for
     * a specific node bearing.
     *
     * Works only for a full 360 panorama.
     */
    function bearingToBasic(desiredBearing, nodeBearing) {
      // 1. Take difference of desired bearing and node bearing in degrees.
      // 2. Scale to basic coordinates.
      // 3. Add 0.5 because node bearing corresponds to the center
      //    of the image. See
      //    https://mapillary.github.io/mapillary-js/classes/viewer.html
      //    for explanation of the basic coordinate system of an image.
      const basic = (desiredBearing - nodeBearing) / 360 + 0.5;

      // Wrap to a valid basic coordinate (on the [0, 1] interval).
      // Needed when difference between desired bearing and node
      // bearing is more than 180 degrees.
      return wrap(basic, 0, 1);
    }

    /**
     * Wrap a value on the interval [min, max].
     */
    function wrap(value, min, max) {
      const interval = (max - min);

      while (value > max || value < min) {
        if (value > max) {
          value = value - interval;
        } else if (value < min) {
          value = value + interval;
        }
      }

      return value;
    }

    this.viewer.setFilter(mapillaryViewerFilter(mapillaryUsers, true));
    this.viewer.on(Viewer.bearingchanged, (bearing) => {
      this.$emit('updateBearing', bearing.toFixed());
    });

    this.viewer.on(Viewer.nodechanged, (node) => {
      if (this.bearing) setBearing(node, this.bearing);
      this.$emit('keychange', node.key);
    });
  },

  watch: {
    mKey(mKey) {
      this.viewer.moveToKey(mKey);
    }
  }
};
</script>
