import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Logout from "./components/logout";
import Header from "./components/header";
import UserList from "./components/userList";

class App extends Component
{
  render() {
    return (
      <Router>
        <Switch>
          <div className="flex flex-wrap justify-center w-screen h-screen py-20">
            <div className="w-8/12 h-auto max-h-full rounded-sm shadow-xl bg-white">
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/logout" component={Logout} />
              <Route exact path="/">
                <div className="flex flex-wrap w-full h-full justify-start">
                  <Header />
                  <UserList />
                </div>
              </Route>
            </div>
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;