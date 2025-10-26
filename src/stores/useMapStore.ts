import {
  DEFAULT_MAP_ID, //
  MAP_IDS,
  type MapId,
  type MapListItem,
} from '@/types';

import { mapApi } from '@/api';

const MAP_STORE = 'MAP_STORE';

export const useMapStore = defineStore(MAP_STORE, () => {
  const mapId = ref<number>(DEFAULT_MAP_ID); // id<48> ➡️ 区域地图<黑风山>
  const regionList = ref<MapListItem[]>([]);
  const regionInfo = ref<Record<string, any>>({});

  function changeMapId(id: number) {
    if (!MAP_IDS.includes(id as MapId)) {
      console.warn(`无效的区域地图id: ${id}`);
      return;
    }
    mapId.value = id;

    loadRegionInfo();
  }

  async function loadRegionList() {
    regionList.value = await mapApi.getRegionList();
  }

  async function loadRegionInfo() {
    regionInfo.value = await mapApi.getRegionInfo(mapId.value);
  }

  return {
    mapId,
    regionList,
    regionInfo,
    changeMapId,
    loadRegionList,
    loadRegionInfo,
  };
});
