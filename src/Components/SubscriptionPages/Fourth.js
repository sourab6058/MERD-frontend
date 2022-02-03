import React, { useEffect, useState } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import ResetIcon from "@material-ui/icons/Cached";
import { ArrowBackIos } from "@material-ui/icons";
import { Modal } from "antd";
import { Menu, Dropdown } from "antd";
import axios from "axios";
import Aos from "aos";

import "../../css/SubscriptionPages/styles.css";
import { Checkbox } from "antd";

import data from "./temp.json";

let citiesChecked = [];
let categoriesChecked = [];

function SelectedItems() {
  return (
    <div style={{ position: "flex", flexDirection: "row" }}>
      <div>
        <h3>Selected cities</h3>
        <ul style={{ marginLeft: "2rem" }}>
          {citiesChecked.map((city, idx) => (
            <li key={idx}>{city}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Selected categories</h3>
        <ul style={{ marginLeft: "2rem" }}>
          {categoriesChecked.map((cat, idx) => (
            <li key={idx}>{cat}</li>
          ))}
        </ul>
      </div>
      <h4>
        Total subscriptions:
        {" " + citiesChecked.length * categoriesChecked.length}
      </h4>
    </div>
  );
}

const Fourth = ({
  setShowPlansTable,
  setSubscriptionsCount,
  setCities,
  setCategories,
  handlePrev,
}) => {
  const [options, setOptions] = useState(data);
  const [openProceedModal, setOpenProceedModal] = useState(false);
  const [openInvalid, setOpenInvalid] = useState(false);
  const API_URL = "http://3.108.159.143:8000/api/filter";

  function handleCheck(e, item, list) {
    if (e.target.checked && !list.some((ele) => ele === item)) {
      list.push(item);
    } else {
      const idx = list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
      }
    }
    console.log(list);
  }

  const CategoryMenu = ({ options }) => {
    return options ? (
      options[3][1].map((ele) => (
        <Menu>
          <Menu.Item style={{ backgroundColor: "white" }} key={ele.id}>
            <Checkbox
              style={{ fontSize: "1.25rem" }}
              key={ele.name}
              onChange={(e) => {
                handleCheck(e, ele.name, categoriesChecked);
              }}
            >
              {ele.name}
            </Checkbox>
          </Menu.Item>
        </Menu>
      ))
    ) : (
      <p>Please Wait...</p>
    );
  };

  const CityMenu = ({ options }) => {
    return options ? (
      options[4][1].map((ele) => (
        <Menu>
          <Menu.Item style={{ backgroundColor: "white" }} key={ele.id}>
            <Checkbox
              style={{ fontSize: "1.25rem" }}
              key={ele.city}
              onChange={(e) => {
                handleCheck(e, ele.city, citiesChecked);
              }}
            >
              {ele.city}
            </Checkbox>
          </Menu.Item>
        </Menu>
      ))
    ) : (
      <p>Please Wait...</p>
    );
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
    // axios
    //   .get(API_URL)
    //   .then(
    //     (res) => {
    //       let optionData = Object.entries(res.data.filters[0]);
    //       optionData = sortZones(optionData);
    //       setOptions(optionData);
    //       console.log("options", options);
    //     },
    //     [options]
    //   )
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  function proceedAfterSelections() {
    if (citiesChecked.length * categoriesChecked.length) {
      setSubscriptionsCount(citiesChecked.length * categoriesChecked.length);
      setOpenProceedModal(true);
      setCities(citiesChecked);
      setCategories(categoriesChecked);
    } else setOpenInvalid(true);
  }

  function resetSelections() {
    citiesChecked = [];
    categoriesChecked = [];
    setShowPlansTable(false);
    setCities([]);
    setCategories([]);
  }

  return (
    <>
      {openProceedModal && (
        <Modal
          open={openProceedModal}
          visible={openProceedModal}
          onOk={() => {
            setShowPlansTable(true);
            setOpenProceedModal(false);
          }}
          onCancel={() => setOpenProceedModal(false)}
        >
          <SelectedItems />
        </Modal>
      )}
      {openInvalid && (
        <Modal
          open={openInvalid}
          visible={openInvalid}
          onOk={() => {
            setOpenInvalid(false);
            // setShowPlansTable(true);
          }}
          onCancel={() => setOpenInvalid(false)}
        >
          <h3>Select atleast one city and one category.</h3>
          {/* <h3>Showing fake table for testing purposes.</h3> */}
        </Modal>
      )}
      <div className="option-main">
        <div className="sub-option-container">
          <span onClick={handlePrev} className="prev-btn">
            <ArrowBackIos style={{ fontSize: "3rem" }} />
          </span>
          Now, lets get started with the selections. Choose the city and
          category you want to subscribe.
          <div className="title-dd-section">
            {options ? (
              <h5 className="sub-dopdowns-title" style={{ color: "white" }}>
                Select below
              </h5>
            ) : (
              <h5 className="sub-dopdowns-title" style={{ color: "white" }}>
                Please wait...
              </h5>
            )}

            {options ? (
              <div className="sub-dropdowns">
                <Dropdown overlay={<CityMenu options={options} />}>
                  <a onClick={(e) => e.preventDefault()} className="drop-links">
                    CITIES
                  </a>
                </Dropdown>
                <Dropdown overlay={<CategoryMenu options={options} />}>
                  <a onClick={(e) => e.preventDefault()} className="drop-links">
                    CATEGORIES
                  </a>
                </Dropdown>
              </div>
            ) : (
              <Skeleton
                height={300}
                width={500}
                style={{ backgroundColor: "white", marginInline: "1rem" }}
              />
            )}
            {options && (
              <span
                className="next-btn"
                style={{
                  fontSize: "1.25rem",
                  alignSelf: "self-start",
                  marginInline: "0.25rem",
                  paddingInline: 10,
                }}
                onClick={resetSelections}
              >
                {<ResetIcon />}Reset
              </span>
            )}
          </div>
        </div>
        <span className="next-btn" onClick={proceedAfterSelections}>
          Lets go
        </span>
      </div>
    </>
  );
};

export default Fourth;
