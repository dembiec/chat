import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PrivateRoute from "../src/helpers/privateRoute";
import Authentication from "./views/authentication";
import Logout from "./components/authentication/logout";
import Index from "./views/index";

class App extends Component
{
  render() {
    return (
      <Router>
        <div className="flex flex-wrap justify-center w-screen h-screen py-20">
          <div className="w-8/12 h-auto max-h-full rounded-sm shadow-xl bg-white">
            <Switch>
              <Route exact path="/login" component={Authentication} />
              <Route exact path="/register" component={Authentication} />
              <PrivateRoute exact path="/logout" component={Logout} redirectTo="/login" />
              <PrivateRoute exact path="/" component={Index} redirectTo="/login" />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;