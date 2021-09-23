import React, { useEffect } from 'react';
import Aos from "aos";

import "../../css/SubscriptionPages/styles.css";

const Second = ({ handleNext, handlePrev }) => {
    useEffect(() => {
        Aos.init({ duration: 1000, });
    })

    return (<>
        <div className="sub-hero second" data-aos="fade-left">
            One city and one category makes one subscription.
            <span className="next-btn" onClick={handleNext}>Next</span>
        </div>
    </>)
};

export default Second;