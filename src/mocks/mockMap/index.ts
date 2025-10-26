import mockjs from 'mockjs';

import * as regionData from './region-data';
import * as markerData from './marker-data';
import { DEFAULT_MAP_ID } from '@/types';
import { getIcon } from './helpers';

const PREFIX = '/api/map';

export function setupMockMap() {
  mockGetRegionList();
  mockGetRegionInfo();
  mockGetMarkerList();
}

function mockGetRegionList() {
  mockjs.mock(new RegExp(`^${PREFIX}/regionList`), 'get', () => {
    return regionData.regionList;
  });
}

function mockGetRegionInfo() {
  // NOTE mockjs.mock(rurl, ...) 中，
  // rurl(string | RegExp) 推荐使用 正则形式
  // (字符串形式，是全等匹配！不会匹配到 带参数的 url)
  mockjs.mock(new RegExp(`^${PREFIX}/regionInfo`), 'get', (opts) => {
    const urlParams = new URLSearchParams(opts.url.split('?')[1]);
    const id = parseInt(urlParams.get('id') ?? `${DEFAULT_MAP_ID}`);

    return regionData.regionInfoList.find((it) => it.id == id);
  });
}

function mockGetMarkerList() {
  mockjs.mock(new RegExp(`^${PREFIX}/markerList`), 'get', (opts) => {
    const urlParams = new URLSearchParams(opts.url.split('?')[1]);
    const names = (urlParams.get('names') ?? '').split(',');

    const markers = markerData.markerList.filter((it) => names.includes(it.landmarkCatalogName));

    // NOTE markerList ->> iconUrl 有显示问题，直接从 regionData 中拿
    return markers.map((it) => ({
      ...it,
      iconUrl: getIcon(it.landmarkCatalogName),
    }));
  });
}
