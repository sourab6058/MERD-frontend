import React from "react";
import mapboxgl from "mapbox-gl";
import ReactDOM from "react-dom";
import { RadiusPopup } from "../componets/radius-popup";

export const MarkerLayerEvents = {
    dragend: "dragend",
    radiusChanged: "radiusChanged",
    buttonClick: "buttonClick",
    modeChanged: "modeChanged",
    timeChanged: "timeChanged",
};

export class MarkerLayer extends mapboxgl.Evented {
    radiusInputId = "marker-input-radius";
    radiusButtonId = "marker-button-radius";

    /**
     * @param {mapboxgl.Map} map
     */
    constructor(map) {
        super();
        this.map = map;

        this.marker = new mapboxgl.Marker({
            draggable: true,
        });

        this.popupContainer = document.createElement("div");
        this.popup = new mapboxgl.Popup({ closeButton: true, closeOnClick: true, closeOnMove: false }).setDOMContent(
            this.popupContainer,
        );
    }

    remove() {
        if (this.marker) this.marker.remove();
        if (this.popup) this.popup.remove();
    }

    /**
     * @param {mapboxgl.LngLat} coor
     */
    init(coor, initData) {
        this.marker.setLngLat(coor.toArray());
        this.marker.setPopup(this.popup);
        this.marker.addTo(this.map);
        this.marker.togglePopup();
        this.marker.on("dragend", this.onDragEnd);
        ReactDOM.render(
            <RadiusPopup
                radius={initData.radius}
                time={initData.time}
                mode={initData.mode}
                onChangeRadius={this.onRadiusChange}
                onClickSelect={this.onButtonClick}
                onChangeMode={this.onChangeMode}
                onChangeTime={this.onTimeChange}
            />,
            this.popupContainer,
        );
    }

    onChangeMode = (e) => {
        this.fire(MarkerLayerEvents.modeChanged, { mode: e.target.value });
    };

    onTimeChange = (e) => {
        this.fire(MarkerLayerEvents.timeChanged, { time: Number(e.target.value) });
    };

    onRadiusChange = (e) => {
        this.fire(MarkerLayerEvents.radiusChanged, { radius: Number(e.target.value) });
    };

    onDragEnd = () => {
        const lngLat = this.marker.getLngLat();
        this.fire(MarkerLayerEvents.dragend, { lngLat });
    };

    onButtonClick = () => {
        this.fire(MarkerLayerEvents.buttonClick);
    };
}
