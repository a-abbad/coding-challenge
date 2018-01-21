import React from "react";
import { Route, Redirect } from "react-router";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            isAuthenticated
                ? <Component {...props} />
                : <Redirect
                    to={{
                        pathname: "/log-in",
                        state: { from: props.location }
                    }}
                />)
        }
    />
);

export default PrivateRoute;
