<template>
  <div class="map-view-wrapper" ref="mapBoxRef"></div>
</template>

<script setup lang="ts">
import { MapManager } from '@/logics/MapManager';
import { mockMarkers } from './_data';

const mapBoxRef = useTemplateRef('mapBoxRef');
const mapManager = new MapManager(true);

function initMap() {
  if (!mapBoxRef.value) {
    console.warn('待渲染的地图容器元素不存在');
    return;
  }

  mapManager.init(mapBoxRef.value);
  mapManager.renderTile();
  mapManager.renderZommControl();

  setTimeout(() => {
    mapManager.renderMarkers(mockMarkers);
  }, 100);
}

onMounted(() => {
  initMap();
});
</script>

<style lang="scss" scoped>
.map-view-wrapper {
  position: absolute;
  z-index: 1;

  inset: 0;
}
</style>
