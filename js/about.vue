<template>
  <div class="ma-3 page" v-html="about">
</template>

<script>
import about from '../pages/about';

export default {
  data() {
    return {
      about
    };
  }
};
</script>

<style>
.page h1, .page h2, .page h3, .page ul {
  margin-bottom: 10px;
}
</style>
