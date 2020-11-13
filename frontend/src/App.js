import React, { Component } from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

class App extends Component
{
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/">
            <span>App</span>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;