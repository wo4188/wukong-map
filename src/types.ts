export const MAP_IDS = [
  48, //
  49,
  61,
] as const;

export const DEFAULT_MAP_ID = 48 as const;

export type MapId = (typeof MAP_IDS)[number];

export interface MapMarker {
  x: number;
  y: number;
  id: number;
  name: string;
  desc: string;
  iconUrl: string;
}

export interface MapListItem {
  id: number;
  name: string;
  regionName: string;
}
