import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "./Components/HomePage";
import Dashboard from "./Components/Dashboard";
import Demographic from "./Components/Demographic";
import Projects from "./Components/Projects/Projects";
import MapComponent from "./Components/MapComponent";
import SubscriptionJourney from "./Components/SubscriptionPages";
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
              <Route path="/demographic" exact component={Demographic} />
              <Route path="/map" exact component={MapComponent} />
              <Route path="/subscribe" exact component={SubscriptionJourney} />
              <Route path="/contactus" exact component={WebChat} />
              {/* </PrivateRoute> */}
              <Route path="/auth" exact component={Auth} />
              <Route path="/" render={() => <div>404</div>} />
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
