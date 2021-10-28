import React, { useState, useEffect } from "react";
import { Radio, Space, Dropdown, Menu, Checkbox } from "antd";
import { ArrowBack, ExpandMore } from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";

import NavTwo from "./NavTwo";
import Footer from "./Footer";

import "../css/Catchments.css";

const mapImg = require("../img/maps.jpg");

const MALLS_URL = "http://3.108.159.143:8000/catchments_info/";
const API_URL = "http://3.108.159.143:8000/api/filter";

export default function Catchments() {
  const [malls, setMalls] = useState([]);
  const [mallOptions, setMallOptions] = useState([]);
  const [cities, setCities] = useState([]);
  const [citiesOptions, setCitiesOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState();
  const [selectedMall, setSelectedMall] = useState(false);
  const [zones, setZones] = useState([]);
  const [selectedZones, setSelectedZones] = useState([]);

  const [scrollX, setScrollX] = useState(0);

  function handleNext() {
    if (scrollX > -300) setScrollX(scrollX - 100);
  }

  function handlePrev() {
    if (scrollX < 0) setScrollX(scrollX + 100);
  }

  useEffect(() => {
    axios.get(MALLS_URL).then((res) => {
      const malls = res.data;
      axios.get(API_URL).then((res) => {
        let citiesData = Object.entries(res.data.filters[0].cities);
        setCities(citiesData);
        let _cities = [];
        console.log(citiesData);
        for (let city of citiesData) {
          for (let mall of malls.data) {
            if (city[1].id === mall.city) {
              _cities.push({ id: mall.city, name: city[1].city });
            }
          }
        }
        _cities = _cities.filter(
          (city, index, self) =>
            index ===
            self.findIndex((t) => t.id === city.id && t.name === city.name)
        );
        setCitiesOptions(_cities);
        setSelectedCity(_cities[0].id);
        setMalls(malls.data);
      });
    });
  }, []);

  function handleCitySelection(e) {
    setSelectedCity(e.target.value);
    let distinctMalls = malls.filter((mall) => mall.city === e.target.value);
    distinctMalls = distinctMalls.map((mall) => mall.name);
    distinctMalls = [...new Set(distinctMalls)];
    console.log(distinctMalls);
    setMallOptions(distinctMalls);
  }

  function handleMallSelection(e) {
    let finalMalls = malls.filter((mall) => mall.name == e.target.value);
    setSelectedMall(e.target.value);
    const [city] = cities.filter((city) => city[1].id === selectedCity);
    const zonesId = finalMalls.map((mall) => mall.zone);
    const zones = [];
    for (let zId of zonesId) {
      for (let zone of city[1].zone) {
        if (zId === zone.id) {
          zones.push(zone.zone);
        }
      }
    }
    setZones(zones);
  }

  function addZone(zone, e) {
    let tempZones = [...selectedZones];
    if (e.target.checked) {
      tempZones.push(zone);
      tempZones = [...new Set(tempZones)];
    } else {
      console.log(selectedZones);
      let idx = tempZones.findIndex((z) => zone === z);
      if (idx !== -1) {
        tempZones.splice(idx, 1);
      }
    }
    console.log(tempZones);
    setSelectedZones(tempZones);
  }

  const citiesMenu = (
    <Menu key={1}>
      <Radio.Group onChange={handleCitySelection} value={selectedCity}>
        <Space direction="vertical">
          {citiesOptions.map((city) => (
            <Menu.Item key={city.id}>
              <Radio key={city.id} value={city.id}>
                {city.name}
              </Radio>
            </Menu.Item>
          ))}
        </Space>
      </Radio.Group>
    </Menu>
  );
  const mallsMenu = (
    <Menu key={2}>
      <Radio.Group onChange={handleMallSelection} value={selectedMall}>
        <Space direction="vertical">
          {mallOptions.map((mall, idx) => (
            <Menu.Item key={mall}>
              <Radio key={idx} value={mall}>
                {mall}
              </Radio>
            </Menu.Item>
          ))}
        </Space>
      </Radio.Group>
    </Menu>
  );
  const zonesMenu = (
    <Menu>
      <Menu.ItemGroup>
        {zones.map((zone, idx) => (
          <Menu.Item key={idx}>
            <Checkbox key={idx} onChange={(e) => addZone(zone, e)}>
              Zone {zone}
            </Checkbox>
          </Menu.Item>
        ))}
      </Menu.ItemGroup>
    </Menu>
  );

  return (
    <>
      <NavTwo />
      <div className="carousal-outer">
        {scrollX < 0 && (
          <ArrowBack
            className="arrow-back"
            onClick={handlePrev}
            style={{ fontSize: "3.5rem", color: "white" }}
          />
        )}
        <div className="catchments" style={{ left: `${scrollX}vw` }}>
          <div className="intro slide">
            We understand you like to conduct a catchments analysis. Please
            choose the city and the mall
            <span className="custom-btn" onClick={handleNext}>
              Proceed
            </span>
          </div>
          <div className="slide slide2">
            Select a city from the dropdown below
            {citiesOptions.length ? (
              <Dropdown overlay={citiesMenu} placement="bottomCenter" arrow>
                <span className="drp-dwn-btn custom-btn">
                  Cities
                  <ExpandMore style={{ fontSize: "2rem" }} />
                </span>
              </Dropdown>
            ) : (
              "\nLoading Cities..."
            )}
            {mallOptions.length ? (
              <span className="custom-btn" onClick={handleNext}>
                Proceed
              </span>
            ) : (
              <span className="custom-btn disabled">Proceed</span>
            )}
          </div>
          <div className="slide slide3">
            Select a mall from the dropdown below
            {mallOptions.length ? (
              <Dropdown overlay={mallsMenu} placement="bottomCenter" arrow>
                <span className="drp-dwn-btn custom-btn">
                  Malls
                  <ExpandMore style={{ fontSize: "2rem" }} />
                </span>
              </Dropdown>
            ) : (
              "\nLoading Malls..."
            )}
            {zones.length ? (
              <span className="custom-btn" onClick={handleNext}>
                Proceed
              </span>
            ) : (
              <span className="custom-btn disabled">Proceed</span>
            )}
          </div>
          <div className="slide slide4">
            <img src={mapImg} className="catchments-map"></img>
            <div className="zones-menu">
              Select zones from the menu below
              {zones.length ? zonesMenu : "\nLoading Zones..."}
              {selectedZones.length ? (
                <>
                  <Link className="custom-btn" to="/dashboard">
                    See Market Size
                  </Link>
                  <Link className="custom-btn" to="/demographic">
                    See Demographic Data
                  </Link>
                </>
              ) : (
                <span style={{ color: "pink", fontSize: "1rem" }}>
                  Please select atleast one zone.
                </span>
              )}
            </div>
          </div>
          {/* 
          {mallOptions.length && (
            <Dropdown overlay={mallsMenu} placement="bottomCenter" arrow>
              <Button>Malls</Button>
            </Dropdown>
          )}
          {}
          {selectedCity} */}
        </div>
      </div>
      <Footer />
    </>
  );
}
