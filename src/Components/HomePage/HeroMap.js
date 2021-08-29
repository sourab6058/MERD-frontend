import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import '../../css/HeroMap.scss'

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FraW5hY29tcCIsImEiOiJja2ZqanU2NTYwODBwMnhxbWp0aXc2bjdnIn0.NW_dzv8gZtgeze5F_GAx1g';

const cities = [
    {
        city: 'Dubai',
        coordinates: [55.296249, 25.276987],
        market_size: 450000
    },
    {
        city: 'Abu Dhabi',
        coordinates: [54.3773, 24.4539],
        market_size: 650000
    },
    {
        city: 'Jeddah',
        coordinates: [39.1925, 21.4858],
        market_size: 800000,
    },
    {
        city: 'Oman',
        coordinates: [55.9754, 21.4735],
        market_size: 500000,
    }
]

export class HeroMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: 25.276987,
            lng: 52.296249,
            zoom: 4.75,
        }
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/sakinacomp/ckfjksydo1ai819s2r03bsyrr',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        cities.forEach(city => {

            var popup = new mapboxgl.Popup({ offset: 25 }).setText(
                `Market size for ${city.city} is ${city.market_size}`
            );

            // create the marker
            new mapboxgl.Marker()
                .setLngLat(city.coordinates)
                .setPopup(popup) // sets a popup on this marker
                .addTo(map);

        })



        console.log(map)
    }

    render() {

        return (
            <div>
                <div ref={el => this.mapContainer = el} className="mapContainer" />
                <div className="heroMapText">
                    <h1>Middle East Retail Data</h1>
                    <br /><br />
                    <h3>Accurate. Instant. Detailed. Affordable.</h3>
                </div>
            </div>

        )
    }
}

export default HeroMap
