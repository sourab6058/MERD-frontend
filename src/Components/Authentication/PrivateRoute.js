import React, { useContext } from 'react'
import { Route } from 'react-router'
import { Auth } from './index';
import { AuthContext } from './AuthContext'

const PrivateRoute = ({ component: RouteComponent, path, ...rest }) => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={routeProps =>
                !!isLoggedIn ? (
                    <RouteComponent {...routeProps} />
                ) : (
                        <Auth path={path} />
                    )}
        />
    )
}

export default PrivateRoute;