import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "./Components/HomePage";
import Admin from "./Components/Admin";
import Dashboard from "./Components/Dashboard";
import Catchments from "./Components/Catchments";
import Demographic from "./Components/Demographic";
import Projects from "./Components/Projects/Projects";
import MapComponent from "./Components/MapComponent";
import SubscriptionJourney from "./Components/SubscriptionPages";
import OneTime from "./Components/SubscriptionPages/OneTime";
import CityReports from "./Components/CityReports";
import TouristReports from "./Components/TouristReports";
import WebChat from "./Components/WebChat";
import { AuthProvider } from "./Components/Authentication/AuthContext";
import { Auth } from "./Components/Authentication";
import "./css/main.css";
import PrivateRoute from "./Components/Authentication/PrivateRoute";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/projects" exact component={Projects} />
              {/* <PrivateRoute path='/dashboard' exact component={Dashboard} />
              <PrivateRoute path='/map' exact component={MapComponent}> */}
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/catchments" exact component={Catchments} />
              <Route path="/demographic" exact component={Demographic} />
              <Route path="/map" exact component={MapComponent} />
              <Route path="/subscribe" exact component={SubscriptionJourney} />
              <Route path="/cityreport" exact component={CityReports} />
              <Route path="/touristreport" exact component={TouristReports} />
              <Route path="/contactus" exact component={WebChat} />
              <Route path="/one-time-subscribe" exact component={OneTime} />
              {/* </PrivateRoute> */}
              <Route path="/auth" exact component={Auth} />
              <Route path="/admin" exact component={Admin} />
              <Route path="/" render={() => <div>404</div>} />
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
