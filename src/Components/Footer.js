import React, { Component } from 'react';
import ContactUs from './Contactus';

class Footer extends Component {
    constructor(props){
        super(props);
        this.state={
        contactus: false,
        };
        this.contactClose = this.contactClose.bind(this);
    }
   
    contactClose (){
        this.setState({contactus: false});
    }
    render() {
        console.log("STATESS")
        console.log(this.state)
        // let Logo = require('./img/logo.png');

        return (

            <div className="footer">
                {/* <div className="footerNav">
                    <div className="footerNavLogo">
                        <img src={Logo} />
                    </div>
                    <ul className="footerNavLinks">
                        <li><a href="_blank">About Us</a></li>
                        <li><a href="_blank">Products</a></li>
                        <li><a href="_blank">Subscribe</a></li>
                    </ul>
                </div> */}

                <div className="copyright">
                    <div className="socialLinks">
                       <h4 onClick={() => this.setState({contactus: true})} style={{cursor:"pointer"}}>Contact Us</h4>
                        {this.state.contactus && 
                    <ContactUs
                    show={this.state.contactus}
                    onHide={this.contactClose.bind(this)}
                                       />
                }
                        <p>Connect with us on Linkedn and Facebook!</p>
                        <a href="_blank"><i className="fa fa-linkedin-square" aria-hidden="true"></i> </a>
                        <a href="_blank"><i className="fa fa-facebook-square" aria-hidden="true"></i> </a>
                    </div>
                    <div className="rights">
                        <p>All rights reserved 2020 (Middle East Retail Data)</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;