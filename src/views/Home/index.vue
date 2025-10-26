<script setup lang="ts">
import MapView from './MapView.vue';
import UiView from './UiView.vue';

defineOptions({
  name: 'HomePage',
});
</script>

<template>
  <div class="home-page">
    <map-view />
    <ui-view />
  </div>
</template>

<style lang="scss">
.home-page {
  position: relative;

  width: 100%;
  height: 100%;
}
</style>
