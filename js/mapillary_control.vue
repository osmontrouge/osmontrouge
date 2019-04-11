<template>
  <div class="mapboxgl-ctrl mapboxgl-ctrl-group">
    <button
      :class="{ 'mapboxgl-ctrl-active': value }"
      @click="onClick"
    >
      <v-icon>osm-360</v-icon>
    </button>
  </div>
</template>

<script>
import { $helpers } from 'vue-mapbox/dist/vue-mapbox.umd.js';

export default {
  mixins: [$helpers.asControl],

  props: {
    value: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  mounted() {
    this.control = this;
    this.$_addControl();
  },

  methods: {
    onAdd() {
      return this.$el;
    },

    onRemove() {
    },

    onClick(e) {
      this.$emit('input', !this.value);
    }
  }
};
</script>

<style>
  button.mapboxgl-ctrl-active {
    background-color: rgb(53, 175, 109);
  }
</style>
