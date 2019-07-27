<template>
  <v-list-tile>
    <v-list-tile-action
      v-if="name"
      class="mr-1"
    >{{ name }}</v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title>
        <slot />
      </v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: undefined
    }
  }
}
</script>
