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
      class="pt-1"
      subheader
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
        @click=""
      >
        <v-list-tile-avatar
          size="20"
          class="no-min-width"
        >
          <v-icon
            :color="feature.selected ? (feature.color || category.color) : null"
            small
          >{{ feature.icon || category.icon }}</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content
          class="ml-2"
          @click="feature.selected = !feature.selected"
        >
          <v-list-tile-title class="body-1">{{ feature.name }}</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action class="no-min-width">
          <v-checkbox v-model="feature.selected"></v-checkbox>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <v-card
      class="ma-1 mt-3"
      color="#bddcf4"
    >
      <v-card-text v-html="mapFooter" />
    </v-card>

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
    mapFooter: {
      type: String,
      required: true
    },
    imageSidebar: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped>
  .no-min-width {
    min-width: auto;
  }
  .small-subheader-height {
    height: 35px;
  }
  .small-tile-height {
    height: 40px;
  }
</style>
