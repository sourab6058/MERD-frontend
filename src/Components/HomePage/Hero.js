import React, { Component } from 'react';

class Hero extends Component {

    render() {

        let heroImg = require('../../img/mac_light.png');
        let heromap = require('../../img/city.png');
        return (
            <div className="hero" >
                <img src={heroImg} className="heroImg" alt=""/>
                <img src={heromap} className="heroMap" alt=""/>
                <div className="heroText">
                <p className="heroh4">Middle East Retail Data offers accurate, instant, detailed and affordable retail and consumer data.</p>
                    <h1>Middle East Retail Data</h1>
                    
                    <h3>Accurate. Instant. Detailed. Affordable.</h3>

                    {/* <div class="chat">
                    <div class="message">
    Dubai
  </div>
  <div class="user">
  Total Clothes Sales<br></br>
Sep 2020: USD 120 mn
  </div>
                    </div>
                    <div class="chat2">
                    <div class="message2">
    Abu Dhabi
  </div>
  <div class="user2">
  Total Clothes Sales<br></br>
Sep 2020: USD 120 mn
  </div>
                    </div>
                    <div class="chat3">
                    <div class="message3">
    Bahrain
  </div>
  <div class="user3">
  Total Clothes Sales<br></br>
Sep 2020: USD 120 mn
  </div>
                    </div>
                    <div class="chat4">
                    <div class="message4">
    Jeddah
  </div>
  <div class="user4">
  Total Clothes Sales<br></br>
Sep 2020: USD 120 mn
  </div>
                    </div>
                    <div class="chat5">
                    <div class="message5">
    Riyadh
  </div>
  <div class="user5">
  Total Clothes Sales<br></br>
Sep 2020: USD 120 mn
  </div>
                    </div> */}
                </div>
            </div>
        );
    }
}

export default Hero;
