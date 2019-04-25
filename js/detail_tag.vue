<template>
  <v-list-tile>
    <v-list-tile-action class="mr-1">{{ name }}</v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title>{{ value }}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }
}
</script>
