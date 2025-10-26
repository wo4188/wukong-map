import { http } from '@/utils';
import type { MapListItem } from '@/types';

const PREFIX = '/api/map';

export function getRegionList() {
  return http.get<unknown, MapListItem[]>(`${PREFIX}/regionList`);
}

export function getRegionInfo(id: number) {
  return http.get(`${PREFIX}/regionInfo`, {
    params: { id },
  });
}
