import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Modal} from "antd"
import { Menu, Dropdown } from 'antd';
import axios from "axios";
import Aos from "aos";

import NavTwo from "../NavTwo";
import Footer from "../Footer";

import "../../css/SubscriptionPages/styles.css";
import { sortZones } from '../../utils/sort';
import { Checkbox, Button } from 'antd';

const citiesChecked = [];
const categoriesChecked = [];

function handleCheck(e, item, list){
  if(e.target.checked){
    list.push(item)
  }
  else{
    const idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    }
  }
  console.log(list);
}

function displaySelected(){
  return(
    <div style={{position:"flex", flexDirection:"row"}}>
      <div>
      <h3>Selected cities</h3>
      <ul style={{marginLeft:"2rem"}}>
        {citiesChecked.map((city, idx)=>(<li>{city}</li>))}
      </ul>
      </div>
      <div>
        <h3>Selected categories</h3>
        <ul style={{marginLeft:"2rem"}}>
          {categoriesChecked.map((cat)=>(<li>{cat}</li>))}
        </ul>
      </div>
      <h4>Total subscriptions:{citiesChecked.length*categoriesChecked.length}</h4>
    </div>
  );
}

const CityMenu = ({options})=>{
  return (options?options[4][1].map((ele)=>(<Menu>
    <Menu.Item style={{backgroundColor:"white"}} key={ele.id}>
        <Checkbox style={{fontSize:"1.25rem"}} key={ele.city} onChange={(e)=>handleCheck(e, ele.city, citiesChecked)} >{ele.city}</Checkbox>
    </Menu.Item>
  </Menu>)):(<p>Please Wait...</p>));
}

const CategoryMenu = ({options})=>{
  return (options?options[3][1].map((ele)=>(<Menu>
    <Menu.Item style={{backgroundColor:"white"}} key={ele.id}>
        <Checkbox style={{fontSize:"1.25rem"}} key={ele.name} onChange={(e)=>handleCheck(e, ele.name, categoriesChecked)}>{ele.name}</Checkbox>
    </Menu.Item>
  </Menu>)):(<p>Please Wait...</p>));
}

const Third = ({history}) => {
    let [openOptions, setOpenOptions] = useState(false);
    let [options, setOptions] = useState(false);
    let [openProceedModal, setOpenProceedModal] = useState(false);
    const footerEle = useRef(null);
    const API_URL = "http://3.108.159.143:8000/api/filter";

    useEffect(()=>{
      Aos.init({duration:1000,});
        axios
      .get(API_URL)
      .then((res) => {
        let optionData = Object.entries(res.data.filters[0]);
        optionData = sortZones(optionData);
        setOptions(optionData);
        console.log("options",options);
      }, [options])
      .catch((err) => {
        console.log(err);
      });
    })

    
    function proceedAfterSelections(){
      // if(citiesChecked.length&&categoriesChecked.length)
        setOpenProceedModal(true);
    }

    return(
<>
  {openProceedModal&&
    <Modal 
      open={openProceedModal} 
      visible={openProceedModal} 
      onOk={()=>history.push("/table")} 
      onCancel={()=>setOpenProceedModal(false)}>

        {displaySelected()}

    </Modal>}
    <NavTwo/>
    <ArrowBackIcon onClick={()=>{
            history.goBack();
        }}className="arrow-back" style={{fontSize:"3.5rem", color:"white"}}/>
    {!openOptions?<div data-aos="fade-left" className="sub-hero third" style={{fontSize:"2rem"}}>
        
        Our pricing works progressively - the first subscription costs AED 6,500 for 6 months or AED 9,500
        for 12 months.And every subsequent subscription is 20% cheaper (AED 5,200 for 6 months or AED 7,600 for 12 months).
        <span className="next-btn" onClick={()=>{
            setOpenOptions(true);
            // footerEle.current.scrollIntoView();
           }}>Next</span>
    </div>
    :(<div className="option-main"><div className="sub-option-container">Now, lets get started with the selections.
    Choose the city and category you want to subscribe.
    {options&&(<div className="sub-dropdowns">
      <h5 className="sub-dropdowns-title">Select below</h5>
      <Dropdown overlay={<CityMenu options={options}/>}>
        <a onClick={(e)=>e.preventDefault()} className="drop-links">CITIES</a>
      </Dropdown>
      <Dropdown overlay={<CategoryMenu options={options}/>}>
        <a onClick={(e)=>e.preventDefault() } className="drop-links">CATEGORIES</a>
      </Dropdown>
    </div>)}
    
    </div>
    <span className="next-btn" onClick={proceedAfterSelections}>Lets go</span>
    </div>)}
    <Footer ref={footerEle} />
</>
)};

export default Third;