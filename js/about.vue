<template>
  <div>
    <v-navigation-drawer
      absolute
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
    <div class="ma-3 page" v-html="about">
  </div>
</template>

<script>
import OsmSidebar from './sidebar';
import about from '../pages/about';

export default {
  components: { OsmSidebar },

  data() {
    return {
      about
    };
  }
};
</script>

<style>
.page {
  margin-left: 320px !important;
}
.page h1, .page h2, .page h3, .page ul {
  margin-bottom: 10px;
}
</style>
