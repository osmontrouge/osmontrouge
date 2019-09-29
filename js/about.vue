<template>
  <div
    v-resize="computeIsMobile"
   :class="{ withSidebar: sidebar && !isMobile }">
    <v-navigation-drawer
      v-model="sidebar"
      :temporary="isMobile"
      :stateless="!isMobile"
      :hide-overlay="!isMobile"
      :absolute="!isMobile"
      :fixed="isMobile"
    >
      <osm-sidebar>
        <template v-slot:list-top>
          <v-list-tile :to="{ name: 'index' }">
            <v-list-tile-content class="ml-2">
              <v-list-tile-title class="body-1">{{ $t('map') }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </osm-sidebar>
    </v-navigation-drawer>
    <v-content>
      <v-btn
        v-show="!sidebar"
        fixed
        fab
        dark
        top
        left
        color="pink"
        @click="sidebar = !sidebar"
      >
        <v-icon>osm-filter_list</v-icon>
      </v-btn>
      <div class="ma-3 page" v-html="about">
    </v-content>
  </div>
</template>

<script>
import OsmSidebar from './sidebar';
import about from '../pages/about';

export default {
  components: { OsmSidebar },

  data() {
    return {
      sidebar: false,
      isMobile: false,
      about
    };
  },

  mounted() {
    this.computeIsMobile();
    this.sidebar = !this.isMobile;
  },

  methods: {
    computeIsMobile() {
      this.isMobile = window.innerWidth < 800;
    },
  }
};
</script>

<style>
.withSidebar .page {
  margin-left: 320px !important;
}
.page h1, .page h2, .page h3, .page ul {
  margin-bottom: 10px;
}
</style>
