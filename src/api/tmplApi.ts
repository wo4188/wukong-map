import { http } from '@/utils';

const base = import.meta.env.BASE_URL;

const PREFIX = `${base}templates`;

export function getMarkerTmpl() {
  return http.get<unknown, string>(`${PREFIX}/marker.ejs`);
}

export function getMarkerPopupTmpl() {
  return http.get<unknown, string>(`${PREFIX}/markerPopup.ejs`);
}
