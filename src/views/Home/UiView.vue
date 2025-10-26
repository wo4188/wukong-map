<template>
  <div class="ui-view-wrapper">
    <div class="selector-block">
      <img class="nav-logo" src="@/assets/images/logo.png" alt="" />

      <map-selector
        :items="mapStore.regionList"
        :curr-id="mapStore.mapId"
        @select="mapStore.changeMapId($event)"
      />
    </div>

    <div class="marker-catalogs-block">
      <marker-group
        v-for="(item, idx) in markerCatalogGroups"
        :key="`${idx}-${item.groupName}`"
        :title="item.groupName"
        :items="item.landmarkCatalogs"
        :selected-catalogs="mapStore.catalogMarkerNames"
        @select="handleMarkerGroupSelect"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import MapSelector from '@/components/mapSelector/index.vue';
import MarkerGroup from '@/components/markerGroup/index.vue';
import type { MarkerCatalogItem } from '@/types';
import { useMapStore } from '@/stores';

type MarkerCatalogGroup = {
  groupName: string;
  landmarkCatalogs: MarkerCatalogItem[];
};

const mapStore = useMapStore();

const markerCatalogGroups = computed<MarkerCatalogGroup[]>(() => {
  return mapStore.regionInfo?.landmarkCatalogGroups ?? [];
});

const handleMarkerGroupSelect = (name: string) => {
  if (mapStore.catalogMarkerNames.includes(name)) {
    mapStore.removeCatalogMarker(name);
  } else {
    mapStore.addCatalogMarker(name);
  }
};

onMounted(() => {
  mapStore.loadRegionList();
  mapStore.loadRegionInfo();
  mapStore.loadMarkerList();
});
</script>

<style lang="scss" scoped>
.ui-view-wrapper {
  position: absolute;
  z-index: 2;

  display: flex;
  flex-flow: column;

  width: 344px;
  height: 100%;
  padding: 20px 16px;

  background-color: #222226;

  > * + * {
    margin-bottom: 20px;
  }

  .nav-logo {
    display: block;

    width: 100%;
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
