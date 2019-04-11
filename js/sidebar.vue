<template>
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

        <v-card-title class="white--text pl-1 pt-5">
          <div class="display-1 pt-5">{{ mapName }}</div>
        </v-card-title>
      </v-layout>
    </v-img>

    <v-list
      v-for="(category, id) in taxonomy"
      :key="id"
    >
      <v-subheader
        class="small-subheader-height"
      >
        {{ category.name }}
      </v-subheader>

      <v-list-tile
        v-for="(feature, idFeature) in category.features"
        :key="idFeature"
        class="small-tile-height"
      >
        <v-list-tile-avatar
          size="20"
          class="no-min-width"
        >
          <v-icon
            :color="feature.color || category.color"
            small
          >{{ feature.icon || category.icon }}</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content class="ml-2">
          <v-list-tile-title class="body-1">{{ feature.name }}</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action class="no-min-width">
          <v-checkbox @change="$emit('input', id, idFeature, $event)"></v-checkbox>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    taxonomy: {
      type: Object,
      required: true
    },
    mapName: {
      type: String,
      required: true
    },
    imageSidebar: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
  .no-min-width {
    min-width: auto;
  }
  .small-subheader-height {
    height: 30px;
  }
  .small-tile-height {
    height: 40px;
  }
</style>
