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
    </v-list>
  </div>
</template>

<script>
import { mapName, imageSidebar }  from '../config';

export default {
  data () {
    return {
      mapName, imageSidebar
    };
  }
}
</script>

<style scoped>
  .display-1 {
    background-color: #ffffffa6;
  }
</style>
