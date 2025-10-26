import { useLocalStorage } from '@vueuse/core';

import {
  DEFAULT_MAP_ID, //
  MAP_IDS,
  type MapId,
  type MapListItem,
  type MapMarker,
} from '@/types';
import { mapApi } from '@/api';

const MAP_STORE = 'MAP_STORE';

export const useMapStore = defineStore(MAP_STORE, () => {
  const mapId = useLocalStorage<number>('map-id', DEFAULT_MAP_ID); // id<48> ➡️ 区域地图<黑风山>
  const catalogMarkerNames = useLocalStorage<string[]>('catalog-marker-catalogs', []);
  const regionList = ref<MapListItem[]>([]);
  const regionInfo = ref<Record<string, any>>({});
  const markerList = ref<MapMarker[]>([]);

  function changeMapId(id: number) {
    if (!MAP_IDS.includes(id as MapId)) {
      console.warn(`无效的区域地图id: ${id}`);
      return;
    }
    mapId.value = id;

    loadRegionInfo();
    loadMarkerList();
  }

  function addCatalogMarker(name: string) {
    catalogMarkerNames.value = [...new Set([...catalogMarkerNames.value, name])];

    loadMarkerList();
  }

  function removeCatalogMarker(name: string) {
    catalogMarkerNames.value = catalogMarkerNames.value.filter((it) => it != name);

    loadMarkerList();
  }

  async function loadRegionList() {
    regionList.value = await mapApi.getRegionList();
  }

  async function loadRegionInfo() {
    regionInfo.value = await mapApi.getRegionInfo(mapId.value);
  }

  async function loadMarkerList() {
    markerList.value = await mapApi.getMarkerList(catalogMarkerNames.value.join(','));
  }

  return {
    mapId,
    regionList,
    regionInfo,
    markerList: markerList,
    catalogMarkerNames: computed(() => [...catalogMarkerNames.value]),
    changeMapId,
    loadRegionList,
    loadRegionInfo,
    loadMarkerList,
    addCatalogMarker,
    removeCatalogMarker,
  };
});
