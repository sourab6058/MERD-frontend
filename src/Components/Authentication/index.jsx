import React from 'react'
import Login from './Login'

import './loginStyles.scss'
import Signup from './Signup'
import { useState } from 'react'

export const Auth = () => {
    const [activePage, setActivePage] = useState('login')
    return (

        <div className="main-container">
            {activePage === 'login' ? <Login setActivePage={setActivePage} /> : <Signup setActivePage={setActivePage} />}
        </div>

    )
}