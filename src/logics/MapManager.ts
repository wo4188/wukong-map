import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import ejs from 'ejs';

import {
  DEFAULT_MAP_ID, //
  type MapMarker,
} from '@/types';

import { tmplApi } from '@/api';

const ZOOM_LIMIT = { maxZoom: 12, minZoom: 9 } as const; // 跟瓦片素材一致
const Tile_URL_TEMPLATE_01 = `maps/{id}/{z}/{x}/{y}.webp` as const;
const Tile_URL_TEMPLATE_02 = `maps/{id}/{z}/{x}_{y}.webp` as const;

const tileUrlTemplateMap = new Map([
  [48, Tile_URL_TEMPLATE_01],
  [49, Tile_URL_TEMPLATE_01],
  [61, Tile_URL_TEMPLATE_02],
]);

export class MapManager {
  map?: L.Map;
  #zoomControl?: L.Control.Zoom;

  #tileLayer?: L.TileLayer;
  #markerLayer?: L.LayerGroup;

  #markerTmpl?: string;
  #markerPopupTmpl?: string;

  debug: boolean;

  constructor(debug: boolean = false) {
    this.debug = debug;

    this.#loadTmpls();
  }

  async #loadTmpls() {
    this.#markerTmpl = await tmplApi.getMarkerTmpl();
    this.#markerPopupTmpl = await tmplApi.getMarkerPopupTmpl();
  }

  init(target: HTMLElement) {
    this.map = L.map(target, {
      ...ZOOM_LIMIT,
      crs: L.CRS.Simple, // 笛卡尔(平面直角)坐标系
      zoomControl: false, // 默认的缩放控件(左上角)
      attributionControl: false,

      // 限制地图的可视范围边界([左下角, 右上角])。超出时，会自动回弹
      // 地图素材的坐标范围 横向x➡️: [0, 1], 纵向y⬇️: [0, -1]
      maxBounds: L.latLngBounds(L.latLng(-1, 0), L.latLng(0, 1)),
    });

    if (this.debug) {
      this.map.on('click', (e) => console.warn('click 坐标', e.latlng));
    }
  }

  renderTile(id: number = DEFAULT_MAP_ID) {
    if (!this.map) return;

    if (this.#tileLayer) {
      this.#markerLayer?.clearLayers();
      this.#markerLayer = void 0;

      this.#tileLayer.remove();
      this.#tileLayer = void 0;
    }

    const urlTemplate = tileUrlTemplateMap.get(id) ?? Tile_URL_TEMPLATE_01;
    this.#tileLayer = L.tileLayer(urlTemplate, {
      ...ZOOM_LIMIT,
      id: `${id}`, // 自定义瓦片图层ID
    });
    this.#tileLayer.addTo(this.map);

    // 设置 视图中心点/缩放([纬度y,经度x]，缩放级别)
    this.map.setView([-0.5, 0.5], 10);
  }

  renderZommControl() {
    if (!this.map) return;

    this.#zoomControl = L.control.zoom({
      position: 'bottomright',
      zoomInText: '',
      zoomOutText: '',
    });
    this.#zoomControl.addTo(this.map);
  }

  renderMarkers(arr: MapMarker[]) {
    if (!this.map) return;

    this.#markerLayer?.clearLayers();

    const markers = arr.map((item) => {
      const {
        x, //
        y,
        name,
        desc,
        iconUrl,
      } = item;
      const htmlStr = ejs.render(this.#markerTmpl ?? '', { name, iconUrl });

      const marker = L.marker(L.latLng(y, x), {
        icon: L.divIcon({
          html: htmlStr,
        }),
      });

      marker.bindPopup(
        L.popup({
          content: ejs.render(this.#markerPopupTmpl ?? '', {
            name,
            iconUrl,
            desc,
          }),
        }),
      );

      return marker;
    });

    this.#markerLayer = L.layerGroup(markers);
    this.#markerLayer.addTo(this.map);
  }
}
