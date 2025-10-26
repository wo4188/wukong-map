import { http } from '@/utils';
import type {
  MapListItem, //
  MapMarker,
} from '@/types';

const PREFIX = '/api/map';

export function getRegionList() {
  return http.get<unknown, MapListItem[]>(`${PREFIX}/regionList`);
}

export function getRegionInfo(id: number) {
  return http.get<unknown, Record<string, any>>(`${PREFIX}/regionInfo`, {
    params: { id },
  });
}

/**
 * @param names 用逗号分隔 'xx1,xx2,xx3'
 */
export function getMarkerList(names: string) {
  return http.get<unknown, MapMarker[]>(`${PREFIX}/markerList`, {
    params: { names },
  });
}
