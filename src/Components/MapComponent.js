import React, { useState } from "react";
import { MapWithZones } from "./map-with-zones";
import "../css/MapComponent.scss";
import { ZonesList } from "./map-with-zones/componets/zones-list";

const MapComponent = () => {
    const [mode, setMode] = useState("user");
    const [selectedZones, setSelectedZones] = useState([]);
    const [selectedCity, setSelectedCity] = useState('Dubai');
console.log("CCCCcc")
console.log(selectedCity)
    return (
        <>
            <div className="test-panel">
                <button
                    onClick={() => setMode("admin")}
                    className={mode === "admin" ? "test-panel__button-active" : ""}
                >
                    ADMIN MODE
                </button>
                <button onClick={() => setMode("user")} className={mode === "user" ? "test-panel__button-active" : ""}>
                    USER MODE
                </button>
                <button
                    onClick={() => setMode("highlight")}
                    className={mode === "highlight" ? "test-panel__button-active" : ""}
                >
                    HIGHLIGHT ZONE
                </button>
                <select
                    className="city-select"
                    onChange={e => setSelectedCity(e.target.value)}>
                    <option value="Dubai">Dubai</option>
                    <option value="Abudhabi">Abu Dhabi</option>
                </select>
            </div>
            {mode === "highlight" && <ZonesList selectedZones={selectedZones} setSelectedZones={setSelectedZones} />}
            <MapWithZones
                mapToken={'pk.eyJ1Ijoic2FraW5hY29tcCIsImEiOiJja2ZqanU2NTYwODBwMnhxbWp0aXc2bjdnIn0.NW_dzv8gZtgeze5F_GAx1g'}
                isAdmin={mode === "admin"}
                selectedZones={selectedZones}
                selectedCity={selectedCity}
            />
        </>
    );
};

export default MapComponent;
