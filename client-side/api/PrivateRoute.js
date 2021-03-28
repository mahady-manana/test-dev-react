import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Auth from './authentication';

export const PrivateRoute = ({component : Component, ...rest}) => {
return (
    <Route {...rest} render = {
        props => (
            Auth.isAuthenticated() ? (
                <Component {...props}/>
            ) : (
                <Redirect to = {{
                    pathname : '/',
                    state : {from : props.location}
                }}/>
            )
        )
    }/>
    )
}