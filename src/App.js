import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './index.css'

import HomePage from "./Components/HomePage";
import Admin from "./Components/Admin";
import Dashboard from "./Components/Dashboard";
import Catchments from "./Components/Catchments";
import Demographic from "./Components/Demographic";
import NewDemographic from "./Components/NewDemographic";
import Projects from "./Components/Projects/Projects";
import MapComponent from "./Components/MapComponent";
import SubscriptionJourney from "./Components/SubscriptionPages";
import SubscribeMore from "./Components/SubscribeMore";
import OneTime from "./Components/SubscriptionPages/OneTime";
import CityReports from "./Components/CityReports";
import TouristReports from "./Components/TouristReports";
import WebChat from "./Components/WebChat";
import { AuthProvider } from "./Components/Authentication/AuthContext";
import { Auth } from "./Components/Authentication";
import "./css/main.css";
import PrivateRoute from "./Components/Authentication/PrivateRoute";
import login from "./Components/login";
import ContactUsNew from "./Components/ContactUsNew";
import Faq from './Components/Faq.js'
class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/Faq" exact component={Faq} />
              <Route path="/projects" exact component={Projects} />
              {/* <PrivateRoute path='/dashboard' exact component={Dashboard} />
              <PrivateRoute path='/map' exact component={MapComponent}> */}
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/catchments" exact component={Catchments} />
              <Route path="/new-demographic" exact component={NewDemographic} />
              <Route path="/demographic" exact component={Demographic} />
              <Route path="/map" exact component={MapComponent} />
              <Route path="/subscribe" exact component={SubscriptionJourney} />
              <Route path="/subscribe-more" exact component={SubscribeMore} />
              <Route path="/cityreport" exact component={CityReports} />
              <Route path="/touristreport" exact component={TouristReports} />
              <Route path="/contactus" exact component={ContactUsNew} />
              <Route path="/one-time-subscribe" exact component={OneTime} />
              {/* </PrivateRoute> */}
              <Route path="/auth" exact component={Auth} />
              <Route path="/admin" exact component={Admin} />
              <Route path="/login" exact component={login} />
              {/* <Route path="/" render={() => <div>404</div>} /> */}
              <Redirect from='*' to='/' />
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
