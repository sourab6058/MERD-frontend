import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class Card extends Component {

    render() {
        return (
            <div className="card">
                <Link to={`/${this.props.link}`}>
                    <div className="cardIcon">
                        <span className={this.props.icon}></span>
                    </div>
                    <div className="cardLine"></div>
                    <div className={this.props.headingClass}>
                        <h3>{this.props.heading}</h3>
                    </div>
                    <div className="cardBody">
                        <p>{this.props.body}</p>
                    </div>
                </Link>
            </div>
        );
    }
}

export default Card;
