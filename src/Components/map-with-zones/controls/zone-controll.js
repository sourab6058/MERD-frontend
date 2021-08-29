import { ZoneApi } from "../api/zone-api";
import { ZoneLayer } from "../layers/zone-layer";

export class ZoneControll {
    zones = [];
    selectedZones = [];
    zoneApi = new ZoneApi();
    layers = new Map();

    constructor(selectedZones) {
        this.selectedZones = selectedZones;
    }

    /**
     * @param {mapboxgl.Map} map
     */
    onAdd(map) {
        this.map = map;
        this.container = document.createElement("div");
        this.container.className = "mapboxgl-ctrl";
        map.on("load", this.init);
        return this.container;
    }

    onRemove() {
        this.container.parentNode.removeChild(this.container);
        this.map = undefined;
    }

    init = async () => {
        const zones = await this.zoneApi.getZoneList();
        if (!zones) return;
        this.zones = zones;
        this.drawZones();
    };

    updateSelectedZones(selectedZones) {
        this.selectedZones = selectedZones;
        this.drawZones();
    }

    async deleteZone(zoneId) {
        await this.zoneApi.deleteZone(zoneId);
        this.zones = this.zones.filter((zone) => zone.id !== zoneId);
        const layer = this.layers.get(zoneId);
        if (!layer) return;
        layer.remove();
        this.layers.delete(zoneId);
    }

    async updateZone(newZone) {
        await this.zoneApi.updateZone(newZone);

        this.zones = this.zones.map((el) => {
            if (el.id === newZone.id) return newZone;
            return el;
        });

        this.drawZones();
    }

    async createZone(newZone) {
        await this.zoneApi.addZone(newZone);
        this.zones.push(newZone);
        this.drawZones();
    }

    getZoneList() {
        console.log("FFFFF")
        console.log(this.zones)
        return this.zones;
    }

    getZoneById(zoneId) {
        return this.zones.find((el) => el.id === zoneId);
    }

    updateZoneColor(zoneId, color) {
        const layer = this.layers.get(zoneId);
        if (!layer) return;
        layer.setColor(color);
    }

    updateZoneCoordinates(zoneId, coordinates) {
        const layer = this.layers.get(zoneId);
        if (!layer) return;
        layer.update(coordinates, true);
    }

    removeZoneLayer(zoneId) {
        const layer = this.layers.get(zoneId);
        if (layer) layer.remove();
    }

    getNewZoneName() {
        return `Zone ${this.zones.length + 1}`;
    }

    drawZones() {
        this.zones.forEach((zone) => {
            const existLayer = this.layers.get(zone.id);
            if (existLayer) {
                existLayer.update(zone.coordinates);
                existLayer.setColor(zone.color);
                existLayer.updateName(zone.name);
                if (this.selectedZones.includes(zone.id)) {
                    existLayer.addHighlight();
                } else {
                    existLayer.removeHighlight();
                }
            } else {
                const layer = new ZoneLayer(this.map, zone.id, { color: zone.color, name: zone.name });
                layer.update(zone.coordinates);
                if (this.selectedZones.includes(zone.id)) layer.addHighlight();
                this.layers.set(zone.id, layer);
            }
        });
    }
}
