<template>
  <div>
    <v-card>
      <v-img
        :src="imageSidebar"
        height="200px"
      >
        <v-layout
          column
          fill-height
        >
          <v-spacer></v-spacer>
  
          <v-card-title class="pl-1 pt-5">
            <div class="display-1 px-1">{{ mapName }}</div>
          </v-card-title>
        </v-layout>
      </v-img>
    </v-card>

    <slot />
    <v-list>
      <slot name="list-top"></slot>
      <v-divider></v-divider>
      <v-list-tile :to="{ name: 'about' }">
        <v-list-tile-content class="ml-2">
          <v-list-tile-title class="body-1">{{ $t('about') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile
        :href="`https://twitter.com/${social.twitter}`"
        target="_blank">
        <v-list-tile-avatar
          class="no-min-width"
          size="20">
          <v-icon small>osm-twitter</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content class="ml-2">
          <v-list-tile-title class="body-1">Twitter</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import { mapName, imageSidebar, social }  from '../config';

export default {
  data () {
    return {
      mapName, imageSidebar, social
    };
  }
}
</script>

<style scoped>
  .no-min-width {
    min-width: auto;
  }
  .display-1 {
    background-color: #ffffffa6;
  }
</style>
