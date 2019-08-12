<template>
  <div class="mapboxgl-ctrl mapboxgl-ctrl-group">
    <button
      :class="{ 'mapboxgl-ctrl-active': value }"
      @click="onClick"
    >
      <strong>3D</strong>
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
      required: true
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

<style scoped>
  button.mapboxgl-ctrl-active {
    background-color: #b7b7b7;
  }
</style>
