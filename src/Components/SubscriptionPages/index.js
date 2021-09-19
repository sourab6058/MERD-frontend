import React from 'react';
import {BrowserRouter as Router, Switch, Route,useRouteMatch, HashRouter} from "react-router-dom";

import First from "./First"
import Second from "./Second"
import Third from "./Third"

const SubscriptionJourney = () => {
    let { path, url } = useRouteMatch();
    return(<HashRouter basename={`/${path}`}>
        <Switch>
            <Route exact path="/" component={First}/>
            <Route exact path="/second" component={Second}/>
            <Route exact path="/third" component={Third}/>
        </Switch>
    </HashRouter>)
};

export default SubscriptionJourney;