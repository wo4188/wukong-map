<template>
  <div class="ui-view-wrapper">
    <div class="selector-block">
      <!-- TODO 添加 logo 图片 -->

      <map-selector
        :items="mapStore.regionList"
        :curr-id="mapStore.mapId"
        @select="mapStore.changeMapId($event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import MapSelector from '@/components/mapSelector/index.vue';
import type { MapListItem } from '@/types';
import { useMapStore } from '@/stores';

const mapStore = useMapStore();

onMounted(() => {
  mapStore.loadRegionList();
});
</script>

<style lang="scss" scoped>
.ui-view-wrapper {
  position: absolute;
  z-index: 2;
  width: 344px;
  height: 100%;
  background-color: #222226;

  .selector-block {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-x: hidden;

    padding: 20px 16px;
  }

  .nav-logo {
    width: 100%;
    display: block;
  }
}
</style>
