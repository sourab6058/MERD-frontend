import React from "react";
import axios from 'axios';
import { TABLE_BASE_CLASS_NAME, TABLE_TITLE_CLASS_NAME, TABLE_ZONES_CLASS_NAME } from "../utils/constants";
// const API_URL = "http://ec2-3-219-204-162.compute-1.amazonaws.com/api/filter";
const API_URL = "http://3.108.159.143:8000/api/filter";
export const ZoneTable = ({ zones, itHasPoint, selectedCity }) => {
    const getContent = () => {
        if (!itHasPoint) {
            return <span className={TABLE_TITLE_CLASS_NAME}>Set point on the map</span>;
        }
        if (!zones.length) {
            return <span className={TABLE_TITLE_CLASS_NAME}>No zones in the radius</span>;
        }
        if (!selectedCity.length) {
        
        }
        console.log("CITY")
        console.log(selectedCity)
        let newzone=Object.assign({},zones)
        console.log("AAAAAAAAAAAAA")
        console.log(newzone)
        let city=selectedCity;
        let zoneSelected = [];
        for (var i = 0; i < zones.length; ++i){
            // zoneSelected[i] = Object.assign([],zones[i]);
            zoneSelected[i] = Object.assign(zones[i].name);
        }
        console.log("BBBBBBB")
        console.log(zoneSelected)
        console.log(city)
        // let data= new FormData();
        // data.append('zone',zoneSelected)
        // data.append('city',city)
        axios.post(API_URL, {zoneSelected, city})

        return (
            <>
                <span className={TABLE_TITLE_CLASS_NAME}>You have selected the following zones:</span>
                <div className={TABLE_ZONES_CLASS_NAME}>
                    {zones.map((zone) => (
                        
                        <span key={zone.id}>{zone.name}</span>
                    ))}
                </div>
            </>
        );
    };

    return <div className={TABLE_BASE_CLASS_NAME}>{getContent()}</div>;
};
