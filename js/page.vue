<template>
  <div
    v-resize="computeIsMobile"
   :class="{ withSidebar: sidebar && !isMobile }">
    <v-navigation-drawer
      v-model="sidebar"
      :temporary="isMobile"
      :stateless="!isMobile"
      :hide-overlay="!isMobile || !sidebar"
      :absolute="!isMobile"
      :fixed="isMobile"
      width="300"
    >
      <osm-sidebar>
        <template v-slot:list-top>
          <v-list-item
            :exact="true"
            :to="{ name: 'index' }">
            <v-list-item-content class="ml-2">
              <v-list-item-title class="body-1">{{ $t('map') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
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
      <div class="ma-3 page" v-html="page">
    </v-content>
  </div>
</template>

<script>
import OsmSidebar from './sidebar';

export default {
  components: { OsmSidebar },

  props: {
    page: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      sidebar: false,
      isMobile: false
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
