import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";

class App extends Component
{
  render() {
    return (
      <Router>
        <Switch>
          <div className="flex flex-wrap justify-center w-screen h-screen py-20">
            <div className="w-8/12 h-auto rounded-sm shadow-xl bg-white">
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </div>
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;