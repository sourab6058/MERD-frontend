import React, { Component } from 'react';
import Cards from '../HomePage/Cards';

class Projects extends Component {

    render() {

        let heroImg = require('../../img/mac1.png');
        // let heromap = require('../../img/gccmap.png');
        return (
            <div className="hero" >
                {/* <Cards/> */}
                <img src={heroImg} className="project_oneImg" alt=""/>
                {/* <img src={heromap} className="heroMap" alt=""/> */}
                <div className="project_oneText">
                    <h1>Resident Demographic Data By Community</h1>
                    
                    <h3>From choosing the next retail site to analyzing sales vis-à-vis market to predicting future turnover, demographic data can help you make more profitable business decisions. We offer rich demographic information at a neighborhood  level  for each of the cities we cover. Our data offering is supported by corresponding maps at a detailed level that would help you visualize and understand your catchments well enough to base your strategies on. </h3>
                    <a href="_blank" className="projecth4">Download to View Data Format</a>

                </div>
                <div className="project_twoText">
                    <h1>Market Size By Category By Neighborhood</h1>
                    
                    <h3>In retail, it is not only nice to know, but a must-know, as to what is the purchasing power of residents of a city. And not at a city level, but at a neighborhood level, because nobody is going to travel the city from one end to the other to buy the same brand that they can get closer to their home. </h3>
                    <h3>Our market size data offers exactly that – detailed market size data, by neighbourhood. And this is on a quarterly basis for you to align your quarterly, annual and long term  targets.</h3>
                    <a href="_blank" className="projecth4">Download to View Data Format</a>

                </div>
                
                <img src={heroImg} className="project_threeImg" alt=""/>
                {/* <img src={heromap} className="heroMap" alt=""/> */}
                <div className="project_threeText">
                    <h1>Retail Intelligence / Catchments Analysis</h1>
                    
                    <h3>As markets mature and retail spaces proliferate, analyzing an existing location of your store or shopping centre, or choosing a new one will increasingly become complex. Footfall and purchasing power within a certain drive time will be key. Our catchments analysis platform addresses this need by using technology, and enabling you to instantly assess the market size available within various drive times – presented on maps for your easy understanding. </h3>
                    <a href="_blank" className="projecth4">Download Sample Report</a>

                </div>
                <div className="project_fourText">
                    <h1>Tourist Information</h1>
                    
                    <h3>Did you know that Dubai has the highest international overnight visitor spend in the entire world (Source: Mastercard)? As each country in the Middle East comes up with its own tourism strategy, the importance of tourist retail spend in the Middle East cannot be overstated. We provide data on retail spend that tourists make. </h3>
                    {/* <a href="_blank" className="projecth4">Download to View Data Format</a> */}

                </div>
            </div>
        );
    }
}

export default Projects;
