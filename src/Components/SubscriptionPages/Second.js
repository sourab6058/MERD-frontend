import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Aos from "aos";

import NavTwo from "../NavTwo";
import Footer from "../Footer";

import "../../css/SubscriptionPages/styles.css";

const Second = ({history}) => {
    useEffect(()=>{
        Aos.init({duration:1000,});
    })
    
return (<>
    <NavTwo/>
    <div className="sub-hero second" data-aos="fade-left">
        <ArrowBackIcon onClick={()=>{
            history.goBack();
        }}className="arrow-back" style={{fontSize:"3.5rem"}}/>
        One city and one category makes one subscription.
        <Link to="third" className="next-btn">Next</Link>
    </div>
    <Footer/>
</>)
};

export default Second;