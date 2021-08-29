import React, { Component } from 'react';
import SignupDrawing from '../../img/signupDrawing.svg'

export default class Signup extends Component {

    render() {
        return (
            <div className="login-base-container" ref={this.props.containerRef}>
                <div className="login-header">
                    <h1>Sign up</h1>
                    <p>Already have an account? <span onClick={() => this.props.setActivePage('login')}>Login</span></p>
                </div>
                <div className="login-content">
                    <div className="login-image">
                        <img src={SignupDrawing} alt="illustration for login" />
                    </div>
                    <div className="login-form">
                        <div className="login-form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" placeholder="Email"></input>
                        </div>
                        <div className="login-form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder="Password"></input>
                        </div>
                    </div>
                </div>
                <div className="login-footer">
                    <button type="button" className="btn">Sign up</button>
                </div>
            </div>
        );
    }

}