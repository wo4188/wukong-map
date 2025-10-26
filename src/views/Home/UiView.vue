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

    <div class="marker-catalogs-block">
      <marker-group
        v-for="item in markerCatalogGroups"
        :key="item.id"
        :title="item.groupName"
        :items="item.landmarkCatalogs"
        :selected-ids="[3266, 3279]"
        @select="() => {}"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import MapSelector from '@/components/mapSelector/index.vue';
import MarkerGroup from '@/components/markerGroup/index.vue';
import type { MarkerCatalogGroupItem } from '@/types';
import { useMapStore } from '@/stores';

const mapStore = useMapStore();

const markerCatalogGroups = computed<any[]>(() => {
  // console.log('xxx ', mapStore.regionInfo);
  return mapStore.regionInfo?.landmarkCatalogGroups ?? [];
});

onMounted(async () => {
  await mapStore.loadRegionList();
  await mapStore.loadRegionInfo();
});
</script>

<style lang="scss" scoped>
.ui-view-wrapper {
  position: absolute;
  z-index: 2;
  width: 344px;
  height: 100%;
  background-color: #222226;
  padding: 20px 16px;

  display: flex;
  flex-flow: column;

  > * + * {
    margin-bottom: 20px;
  }

  .nav-logo {
    width: 100%;
    display: block;
  }

  .selector-block {
    position: relative;
    width: 100%;
  }

  .marker-catalogs-block {
    overflow-y: auto;
  }
}
</style>
