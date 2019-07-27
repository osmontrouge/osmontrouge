<template>
  <detail-entry
    v-if="value"
    :name="name"
  >
    {{ value }}
  </detail-entry>
</template>

<script>
import DetailEntry from './detail_entry';

export default {
  components: { DetailEntry },

  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: undefined
    }
  }
}
</script>
