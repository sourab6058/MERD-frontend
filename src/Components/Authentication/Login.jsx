import React, { useContext, useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import LoginDrawing from '../../img/loginDrawing.svg'
import { AuthContext } from './AuthContext'

const Login = ({ history, path, ...props }) => {
    const [showError, setShowError] = useState(false)
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    // const handleLogin = useCallback(
    //     async event => {
    //         event.preventDefault();
    //         console.log(event)
    //         const { email, password } = event.target.elements;
    //         if (email === 'test@gmail.com' && password === 'password') {
    //             setIsLoggedIn(true)
    //             console.log('reached')
    //             history.push(path)
    //         }
    //     },
    //     [history, setIsLoggedIn, path],
    // )

    const handleLogin = (event) => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        console.log(email, password)
        if (email.value === 'test@gmail.com' && password.value === 'password') {
            setIsLoggedIn(true)
            console.log('reached')
            history.push(path)
        } else setShowError('Invalid email or password')
    }

    if (isLoggedIn) {
        return <Redirect to={path} />;
    }

    return (
        <div className="login-base-container">
            <div className="login-header">
                <h1>Login</h1>
                <p>Do not have an account? <span onClick={() => props.setActivePage('signup')}>Sign up</span></p>
            </div>
            <div className="login-content">
                <div className="login-image">
                    <img src={LoginDrawing} alt="illustration for login" />
                </div>
                <form
                    className="login-form"
                    onSubmit={handleLogin}
                >
                    <div className="login-form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="Email"></input>
                    </div>
                    <div className="login-form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Password"></input>
                    </div>
                    {
                        showError && <div className="errorMessage">Incorrect email or password</div>
                    }
                    <div className="login-footer">
                        <button type="submit" className="btn">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default withRouter(Login);