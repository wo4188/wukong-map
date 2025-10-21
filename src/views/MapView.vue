<template>
  <div class="map-wrapper" ref="mapBoxRef"></div>
</template>

<script setup lang="ts">
import { MapManager } from '@/logics/MapManager';

const mapBoxRef = useTemplateRef('mapBoxRef');
const mapManager = new MapManager(true);

function initMap() {
  if (!mapBoxRef.value) {
    console.warn('待渲染的地图容器元素不存在');
    return;
  }

  mapManager.init(mapBoxRef.value);
  mapManager.renderTile();
}

onMounted(() => {
  initMap();
});
</script>

<style lang="scss" scoped>
.map-wrapper {
  position: absolute;
  z-index: 1;

  inset: 0;
}
</style>
