import { getZonePolygonByCoordinates } from "../utils/zone-helpers";
import {
    DEFAULT_ZONE_LAYER_COLOR,
    HIGHLIGHTED_ZONE_LAYER_OPACITY,
    DEFAULT_ZONE_LAYER_OPACITY,
} from "../utils/constants";
import { ZoneStrokeLayer } from "./zone-stroke-layer";
import { ZoneNameLayer } from "./zone-name-layer";
import { getZonePolygonPaint } from "../utils/map-helpers";

export class ZoneLayer {
    /**
     * @param {mapboxgl.Map} map
     * @param {string} id
     */
    constructor(map, id, options) {
        this.map = map;
        this.layerId = `zone-layer-${id}`;
        this.sourceId = `zone-source-${id}`;
        this.id = id;
        this.color = (options && options.color) || DEFAULT_ZONE_LAYER_COLOR;
        this.strokeLayer = new ZoneStrokeLayer(map, id, options);
        this.nameLayer = new ZoneNameLayer(map, id, options);
    }

    update(coordinates, isEdit = false) {
        this.addSource(coordinates);
        this.addLayer();
        this.strokeLayer.update(coordinates);
        if (!isEdit) this.nameLayer.update(coordinates);
    }

    updateName(name) {
        this.nameLayer.updateName(name);
    }

    setColor(color) {
        this.color = color;
        this.map.setPaintProperty(this.layerId, "fill-color", color);
        this.strokeLayer.setColor(color);
    }

    addHighlight() {
        this.map.setPaintProperty(this.layerId, "fill-opacity", HIGHLIGHTED_ZONE_LAYER_OPACITY);
    }

    removeHighlight() {
        this.map.setPaintProperty(this.layerId, "fill-opacity", DEFAULT_ZONE_LAYER_OPACITY);
    }

    addSource(coordinates) {
        const data = getZonePolygonByCoordinates(coordinates, this.id);
        if (!data) return;

        const source = this.getSource();
        if (source) {
            return source.setData(data);
        }

        this.map.addSource(this.sourceId, { type: "geojson", data });
    }

    addLayer() {
        if (this.gerLayer() || !this.getSource()) return;

        this.map.addLayer({
            id: this.layerId,
            source: this.sourceId,
            type: "fill",
            paint: getZonePolygonPaint(this.color),
        });
    }

    remove() {
        if (this.gerLayer()) this.map.removeLayer(this.layerId);
        if (this.getSource()) this.map.removeSource(this.sourceId);
        this.strokeLayer.remove();
        this.nameLayer.remove();
    }

    getSource() {
        return this.map.getSource(this.sourceId);
    }

    gerLayer() {
        return this.map.getLayer(this.layerId);
    }
}
