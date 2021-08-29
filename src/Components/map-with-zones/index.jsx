import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import mapboxgl from "mapbox-gl";
import { UserControll } from "./controls/user-controll";
import { AdminControll } from "./controls/admin-controll";
import { ZoneControll } from "./controls/zone-controll";
import { MAP_ID } from "./utils/constants";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.scss";
import { ZoneTable } from "./componets/zone-table";

/** Collection of cities coordinates */
export const Cities = {
    Abudhabi: new mapboxgl.LngLat(54.3773, 24.4539),
    Dubai: new mapboxgl.LngLat(55.2708, 25.2048),
};

/**
 * Map with Zones Component
 *
 * @typedef {object} Props
 * @property {string} mapToken - Mapbox token (https://docs.mapbox.com/help/how-mapbox-works/access-tokens/)
 * @property {string} mapStyle - Mapbox map style (https://docs.mapbox.com/vector-tiles/reference/)
 * @property {boolean} isAdmin - Selecting the use mode Admin or User
 * @property {string} cityCoor - Сity coordinates
 * @property {Array<string>} selectedZones - Selected zones ID which will be highlighted on the map
 *
 * @extends {React.Component<Props>}
 */
export class MapWithZones extends React.Component {
    componentDidMount() {
        const { mapStyle, mapToken, isAdmin, selectedCity, selectedZones } = this.props;

        mapboxgl.accessToken = mapToken;

        this.map = new mapboxgl.Map({
            container: MAP_ID,
            style: mapStyle,
            center: Cities[selectedCity],
            zoom: 11,
        });
        console.log("DDDDD")
        console.log(selectedCity)
        localStorage.setItem("selectedCity",selectedCity); 
        this.zoneControll = new ZoneControll(selectedZones);
        this.map.addControl(this.zoneControll);
        this.userControll = new UserControll(this.zoneControll);
        this.adminControll = new AdminControll(this.zoneControll);

        if (isAdmin) {
            this.map.addControl(this.adminControll);
        } else {
            this.map.addControl(this.userControll);
        }
    }

    componentDidUpdate(prevProps) {
        const { isAdmin, selectedZones, selectedCity, mapStyle } = this.props;

        if (isAdmin !== prevProps.isAdmin) {
            if (!this.map) return;
            if (isAdmin) {
                this.map.removeControl(this.userControll);
                this.map.addControl(this.adminControll);
            } else {
                this.map.removeControl(this.adminControll);
                this.map.addControl(this.userControll);
            }
        }

        if (!_.isEqual(selectedZones, prevProps.selectedZones)) {
            this.zoneControll.updateSelectedZones(selectedZones);
        }

        if (selectedCity !== prevProps.selectedCity) {
            this.map = new mapboxgl.Map({
                container: MAP_ID,
                style: mapStyle,
                center: Cities[selectedCity],
                zoom: 11,
            });
        }
    }

    render() {
        return <div id={MAP_ID}/>;
    }
}

MapWithZones.defaultProps = {
    mapStyle: "mapbox://styles/mapbox/streets-v11",
    isAdmin: false,
    selectedCity: Cities.Dubai,
    selectedZones: [],
};

MapWithZones.propTypes = {
    mapToken: PropTypes.string.isRequired,
    mapStyle: PropTypes.string,
    isAdmin: PropTypes.bool,
    selectedCity: PropTypes.string,
    selectedZones: PropTypes.arrayOf(PropTypes.string),
};
