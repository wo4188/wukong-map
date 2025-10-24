<script setup lang="ts">
import MapView from '@/views/MapView.vue';
import UiView from '@/views/UiView.vue';
</script>

<template>
  <main class="container">
    <map-view />
    <ui-view />
  </main>
</template>

<style lang="scss">
.container {
  position: relative;

  width: 100vw;
  height: 100vh;
}
</style>
