import * as regionData from './region-data';

const _iconMap = new Map<string, string>();

// 初始化时一次性缓存所有 icon
function _initIconMap() {
  if (_iconMap.size > 0) return;
  for (const regionInfo of regionData.regionInfoList) {
    for (const group of regionInfo.landmarkCatalogGroups) {
      for (const catalog of group.landmarkCatalogs) {
        _iconMap.set(catalog.name, catalog.iconUrl);
      }
    }
  }
}

export function getIcon(name: string) {
  if (_iconMap.size === 0) {
    _initIconMap();
  }
  return _iconMap.get(name);
}
