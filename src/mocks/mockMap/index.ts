import mockjs from 'mockjs';

import * as mockData from './data';

const PREFIX = '/api/map';

export function setupMockMap() {
  mockGetRegionList();
}

function mockGetRegionList() {
  mockjs.mock(`${PREFIX}/regionList`, 'get', () => {
    return mockData.regionList;
  });
}
