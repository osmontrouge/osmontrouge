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
      <v-list-item href="https://www.openstreetmap.fr/contribuer/" target="_blank">
        <v-list-item-icon class="mr-0">
          <v-icon small>osm-edit</v-icon>
        </v-list-item-icon>
        <v-list-item-content class="ml-2">
          <v-list-item-title class="body-1">{{ $t('edit') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item :to="{ name: 'reuses' }">
        <v-list-item-icon class="mr-0">
          <v-icon small>osm-share</v-icon>
        </v-list-item-icon>
        <v-list-item-content class="ml-2">
          <v-list-item-title class="body-1">{{ $t('reuse') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        href="https://data.osmontrouge.fr"
        target="_blank">
        <v-list-item-icon class="mr-0">
          <v-icon small>osm-open_with</v-icon>
        </v-list-item-icon>
        <v-list-item-content class="ml-2">
          <v-list-item-title class="body-1">Open Data</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item
        :href="`https://twitter.com/${social.twitter}`"
        target="_blank">
        <v-list-item-icon class="mr-0">
          <v-icon small>osm-twitter</v-icon>
        </v-list-item-icon>
        <v-list-item-content class="ml-2">
          <v-list-item-title class="body-1">Twitter</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item :to="{ name: 'about' }">
        <v-list-item-icon class="mr-0">
          <v-icon small>osm-info</v-icon>
        </v-list-item-icon>
        <v-list-item-content class="ml-2">
          <v-list-item-title class="body-1">{{ $t('about') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
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
