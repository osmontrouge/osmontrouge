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

    <v-list>

      <v-list-group
        v-for="(category, id) in taxonomy"
        :key="id"
        :prepend-icon="category.icon"
      >
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>{{ category.name }}</v-list-tile-title>
          </v-list-tile>
        </template>

        <v-list-tile
          v-for="(feature, idFeature) in category.features"
          :key="idFeature"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ feature.name }}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-checkbox @change="$emit('input', id, idFeature, $event)"></v-checkbox>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>

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
