<template>
  <v-app>
    <keep-alive>
      <router-view class="fullHeight" />
    </keep-alive>
  </v-app>
</template>

<script>
export default {}
</script>

<style>
html {
  overflow-y: auto;
}

.fullHeight {
  height: 100vh;
}
</style>
