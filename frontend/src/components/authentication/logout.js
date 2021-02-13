import React, {Component} from 'react';
import Api, {JWTtoken} from "../../helpers/api";
import {Redirect} from "react-router-dom";

class Logout extends Component
{
  constructor(props)
  {
    super(props);

    JWTtoken(sessionStorage.getItem("token"));
    Api.get("/logout");
    sessionStorage.clear();
  }
  
  render() 
  {
    return <Redirect to="/login" />;
  }
}

export default Logout;