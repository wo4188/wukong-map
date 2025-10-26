import mockjs from 'mockjs';

import * as mockData from './data';
import { DEFAULT_MAP_ID } from '@/types';

const PREFIX = '/api/map';

export function setupMockMap() {
  mockGetRegionList();
  mockGetRegionInfo();
}

function mockGetRegionList() {
  mockjs.mock(new RegExp(`^${PREFIX}/regionList`), 'get', () => {
    return mockData.regionList;
  });
}

function mockGetRegionInfo() {
  // NOTE mockjs.mock(rurl, ...) 中，
  // rurl(string | RegExp) 推荐使用 正则形式
  // (字符串形式，是全等匹配！不会匹配到 带参数的 url)
  mockjs.mock(new RegExp(`^${PREFIX}/regionInfo`), 'get', (opts) => {
    const urlParams = new URLSearchParams(opts.url);
    const id = parseInt(urlParams.get('id') ?? `${DEFAULT_MAP_ID}`);

    return mockData.regionInfoList.find((it) => it.id == id);
  });
}
