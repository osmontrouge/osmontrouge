<template>
</template>

<script>
import { MapboxStyleSwitcherControl } from 'mapbox-gl-style-switcher';
import { $helpers } from 'vue-mapbox';

import 'mapbox-gl-style-switcher/styles.css';

export default {
  mixins: [$helpers.asControl],

  props: {
    styles: {
      type: Array,
      required: true
    }
  },

  created() {
    this.control = new MapboxStyleSwitcherControl(this.styles);
    this.$_addControl();
  }
};
</script>
