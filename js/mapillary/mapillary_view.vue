<template>
  <div
    tabindex="0"
    @keydown.esc="close"
  >
    <mapillary-viewer
      :m-key="mKey"
      @keychange="updateRoute"
    />
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

  mounted() {
    this.$el.focus();
  },

  methods: {
    updateRoute(key) {
      this.$router.replace({ name: '360', params: { mKey: key, featuresAndLocation: this.featuresAndLocation } });
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
</style>
