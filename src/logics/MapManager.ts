import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
// import ejs from 'ejs';

const ZOOM_LIMIT = { maxZoom: 12, minZoom: 9 } as const; // 跟瓦片素材一致
const Tile_URL_TEMPLATE_01 = `maps/{id}/{z}/{x}/{y}.webp` as const;
const Tile_URL_TEMPLATE_02 = `maps/{id}/{z}/{x}_{y}.webp` as const;

const DEFAULT_MAP_ID = '48' as const;

const tileUrlTemplateMap = new Map([
  ['48', Tile_URL_TEMPLATE_01],
  ['49', Tile_URL_TEMPLATE_01],
  ['49', Tile_URL_TEMPLATE_02],
]);

export class MapManager {
  map?: L.Map;
  #tileLayer?: L.TileLayer;
  zoomControl?: L.Control.Zoom;

  debug: boolean;

  constructor(debug: boolean = false) {
    // this.map = null;
    // this.#tile = null;

    this.debug = debug;
  }

  init(target: HTMLElement) {
    this.map = L.map(target, {
      ...ZOOM_LIMIT,
      crs: L.CRS.Simple, // 笛卡尔(平面直角)坐标系
      zoomControl: false, // 默认的缩放控件(左上角)
      attributionControl: false,

      // 后续会调用 setView(在 renderTile 方法中) 统一设置
      // 这里不再重复配置
      // zoom: 10,
      // center: L.latLng(-0.5, 0.5), // (纬度y,经度x) 地图中心点
    });

    if (this.debug) {
      this.map.on('click', (e) => console.warn('click 坐标', e.latlng));
    }
  }

  renderTile(id: string = DEFAULT_MAP_ID) {
    if (!this.map) return;

    if (this.#tileLayer) {
      // TODO 清除 之前的所有标点

      this.#tileLayer.remove();
      this.#tileLayer = void 0;
    }

    const urlTemplate = tileUrlTemplateMap.get(id) ?? Tile_URL_TEMPLATE_01;
    this.#tileLayer = L.tileLayer(urlTemplate, {
      ...ZOOM_LIMIT,
      id, // 自定义瓦片图层ID
    });
    this.#tileLayer.addTo(this.map);

    this.map.setView([-0.5, 0.5], 10); // 设置 视图中心点/缩放
  }

  renderZommControl() {
    if (!this.map) return;

    this.zoomControl = L.control.zoom({
      position: 'bottomright',
      zoomInText:'',
      zoomOutText:'',
    });

    this.zoomControl.addTo(this.map);
  }
}
