import React, { useEffect, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Modal } from "antd"
import { Menu, Dropdown } from 'antd';
import axios from "axios";
import Aos from "aos";

import "../../css/SubscriptionPages/styles.css";
import { sortZones } from '../../utils/sort';
import { Checkbox, Button } from 'antd';

const citiesChecked = [];
const categoriesChecked = [];

function handleCheck(e, item, list) {
    if (e.target.checked) {
        list.push(item)
    }
    else {
        const idx = list.indexOf(item);
        if (idx > -1) {
            list.splice(idx, 1);
        }
    }
    console.log(list);
}

function SelectedItems() {
    return (
        <div style={{ position: "flex", flexDirection: "row" }}>
            <div>
                <h3>Selected cities</h3>
                <ul style={{ marginLeft: "2rem" }}>
                    {citiesChecked.map((city, idx) => (<li>{city}</li>))}
                </ul>
            </div>
            <div>
                <h3>Selected categories</h3>
                <ul style={{ marginLeft: "2rem" }}>
                    {categoriesChecked.map((cat) => (<li>{cat}</li>))}
                </ul>
            </div>
            <h4>Total subscriptions:{citiesChecked.length * categoriesChecked.length}</h4>
        </div>
    );
}

const CityMenu = ({ options }) => {
    return (options ? options[4][1].map((ele) => (<Menu>
        <Menu.Item style={{ backgroundColor: "white" }} key={ele.id}>
            <Checkbox style={{ fontSize: "1.25rem" }} key={ele.city} onChange={(e) => handleCheck(e, ele.city, citiesChecked)} >{ele.city}</Checkbox>
        </Menu.Item>
    </Menu>)) : (<p>Please Wait...</p>));
}

const CategoryMenu = ({ options }) => {
    return (options ? options[3][1].map((ele) => (<Menu>
        <Menu.Item style={{ backgroundColor: "white" }} key={ele.id}>
            <Checkbox style={{ fontSize: "1.25rem" }} key={ele.name} onChange={(e) => handleCheck(e, ele.name, categoriesChecked)}>{ele.name}</Checkbox>
        </Menu.Item>
    </Menu>)) : (<p>Please Wait...</p>));
}

const Third = ({ handlePrev }) => {
    const [options, setOptions] = useState(false);
    const [openProceedModal, setOpenProceedModal] = useState(false);
    const [openInvalid, setOpenInvalid] = useState(false);
    const API_URL = "http://3.108.159.143:8000/api/filter";

    useEffect(() => {
        Aos.init({ duration: 1000, });
        axios
            .get(API_URL)
            .then((res) => {
                let optionData = Object.entries(res.data.filters[0]);
                optionData = sortZones(optionData);
                setOptions(optionData);
                console.log("options", options);
            }, [options])
            .catch((err) => {
                console.log(err);
            });
    })


    function proceedAfterSelections() {
        if (citiesChecked.length && categoriesChecked.length)
            setOpenProceedModal(true);
        else setOpenInvalid(true);
    }

    return (
        <>
            {openProceedModal &&
                <Modal
                    open={openProceedModal}
                    visible={openProceedModal}
                    onOk={() => setOpenProceedModal(false)}
                    onCancel={() => setOpenProceedModal(false)}>

                    <SelectedItems />

                </Modal>}
            {openInvalid &&
                <Modal
                    open={openInvalid}
                    visible={openInvalid}
                    onOk={() => setOpenInvalid(false)}
                    onCancel={() => setOpenInvalid(false)}>

                    <h3>Select atleast one city and one category.</h3>

                </Modal>}
            <div className="option-main"><div className="sub-option-container">
                Now, lets get started with the selections.
                Choose the city and category you want to subscribe.
                <div className="title-dd-section">
                    {options ? (<h5 className="sub-dopdowns-title">Select below</h5>)
                        : (<h5 className="sub-dopdowns-title" style={{ color: "white" }}>Please wait...</h5>)}

                    {options ? (<div className="sub-dropdowns">
                        <Dropdown overlay={<CityMenu options={options} />}>
                            <a onClick={(e) => e.preventDefault()} className="drop-links">CITIES</a>
                        </Dropdown>
                        <Dropdown overlay={<CategoryMenu options={options} />}>
                            <a onClick={(e) => e.preventDefault()} className="drop-links">CATEGORIES</a>
                        </Dropdown>
                    </div>) : (<Skeleton height={300} width={500} style={{ backgroundColor: "white", marginInline: "1rem" }} />)}
                </div>

            </div>
                <span className="next-btn" onClick={proceedAfterSelections}>Lets go</span>
            </div>
        </>
    )
};

export default Third;