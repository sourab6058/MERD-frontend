import React, { Component } from 'react';

class ImageBand extends Component {

    render() {
        let heromap = require('../../img/gccmap.png');
        return (

            <div className="imageBand">
                <img className="ImageBandAbout"  src={require('../../img/about.png')} alt="Person working on computer"/>
                <img src={heromap} className="ImageBandMap" alt=""/>
                <div className="imageBandText">
                    <h2>About Us</h2>
                    <h3 className="abouthead">Middle East Retail Data (MERD) is an independent agency data focused on collecting, synthesizing and disseminating ‘hyperlocal’ retail data for cities in the Middle East.</h3>
                    <h3 className="abouthead">Our aim is to make accurate retail data available at the click of a mouse, and at price point that does not cost an arm and a leg. For this, we collect data from multiple sources (consumers, retailers, government agencies, etc.) and apply heuristic techniques to generate knowledge out of information. </h3>
                    <h3 className="abouthead">MERD’s unique value proposition is in providing a ‘do-it-yourself’ platform, where you can access ‘difficult to gather’ data instantly. We do what we do best i.e., provide data. We leave the strategy and the decision making to industry incumbents like yourself! </h3>
                    <a href="_blank" className="imageBandButton">Learn More</a>
                </div>
            </div>

        );
    }
}

export default ImageBand;
