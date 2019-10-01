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
      <v-list-item
        v-for="(feature, idFeature) in category.features"
        :key="idFeature"
        class="small-item-height"
        @click=""
      >
        <v-list-item-icon class="mr-0 my-3">
          <v-icon
            :color="feature.selected ? (feature.color || category.color) : null"
            small
          >{{ feature.icon || category.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content
          class="ml-2 py-1"
          @click="feature.selected = !feature.selected"
        >
          <v-list-item-title>{{ feature.name }}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action class="ma-0">
          <v-checkbox v-model="feature.selected" dense></v-checkbox>
        </v-list-item-action>
      </v-list-item>
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
  .small-subheader-height {
    height: 35px;
  }
  .small-item-height {
    height: 40px;
    min-height: 35px;
  }
</style>
