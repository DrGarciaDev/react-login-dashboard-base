import React, { useState, useEffect } from "react";

import { HashRouter, Switch, Route, useHistory } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';

import Login from "../Components/Login";
import Dashboard from "../Components/Dashboard/Index";
import PageNotFound from "../Components/NotFound/NotFound";

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AuthService from "../Services/auth.service";

function Routes() {

    const history = useHistory();

    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {

        AuthService.refreshSession()
        .then( () => {
            setAuthLoading(false);
        })
        .catch( (errorAuth) => {
            const errorMessage =
            (errorAuth.response && errorAuth.response.data && errorAuth.response.data.message) ||
                errorAuth.message ||
                errorAuth.toString();

            setAuthLoading(true);
            console.log(errorMessage);
            history.push('/');
        });
    }, [history]);

    if (authLoading) {
        return <LinearProgress color="primary" />
    }

    return (
        <HashRouter>
            <Switch>
                <PublicRoute exact path={["/"]} component={Login} />
                <PrivateRoute exact path={["/dashboard/:board_id", "/dashboard/"]} component={Dashboard} />
                <Route exact path="*" component={PageNotFound}/>
            </Switch>
        </HashRouter>
    );
}

export default Routes;
