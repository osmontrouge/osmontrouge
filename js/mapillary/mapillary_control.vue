<template>
  <v-tooltip left>
    <template v-slot:activator="{ on }">
      <div
        v-on="on"
        class="mapboxgl-ctrl mapboxgl-ctrl-group"
      >
        <button
          :class="{ 'mapboxgl-ctrl-active': value }"
          @click="onClick"
        >
        </button>
        </div>
      </template>
      <span>{{ $t('mapillary.control') }}</span>
    </v-tooltip>
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

<style scoped>
  button.mapboxgl-ctrl-active {
    background-color: #b7b7b7;
  }
  button {
    background-image: url(../../images/360.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 80%;
  }
</style>
