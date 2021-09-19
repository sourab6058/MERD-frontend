import React from 'react';
import { Link } from 'react-router-dom';
import NavTwo from "../NavTwo";
import Footer from "../Footer";

import "../../css/SubscriptionPages/styles.css";

const First = () => (
    <>
    <NavTwo/>
    <div className="sub-hero first">
    We understand that you would like to subscribe 
to our data. <span> Great!</span>
<Link to="second" className="next-btn">Next</Link>
    </div>
    

    <Footer/>
</>
);

export default First;