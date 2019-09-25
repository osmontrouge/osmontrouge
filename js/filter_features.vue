<template>
  <div>
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
  </div>
</template>

<script>
export default {
  props: {
    taxonomy: {
      type: Object,
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
    height: 35px;
  }
  .small-tile-height {
    height: 40px;
  }
</style>
