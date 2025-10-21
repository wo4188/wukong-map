import { http } from '@/utils';

const PREFIX = '/templates';

export function getMarkerTmpl() {
  return http.get<unknown, string>(`${PREFIX}/marker.ejs`);
}

export function getMarkerPopupTmpl() {
  return http.get<unknown, string>(`${PREFIX}/markerPopup.ejs`);
}
