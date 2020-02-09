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
      <v-list-item :to="{ name: 'reuses' }">
        <v-list-item-content class="ml-2">
          <v-list-item-title class="body-1">{{ $t('reuses') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item :to="{ name: 'about' }">
        <v-list-item-content class="ml-2">
          <v-list-item-title class="body-1">{{ $t('about') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-for="link in links"
        :href="link.url">
        <v-list-item-icon
          v-if="link.icon"
          class="mr-0">
          <v-icon small>{{ link.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content class="ml-2">
          <v-list-item-title class="body-1">{{ link.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapName, imageSidebar, links }  from '../config';

export default {
  data () {
    return {
      mapName, imageSidebar, links
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
