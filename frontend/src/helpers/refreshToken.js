import Api, {JWTtoken} from "../helpers/api";
import {Redirect} from "react-router-dom";

const sendRequest = () => {
  if (window.location.pathname === "/") {
    JWTtoken(sessionStorage.getItem("token"));
    Api.get("/refresh")
    .then(response => {
      sessionStorage.setItem("token", response.data.data.token);
      sessionStorage.setItem("time", new Date().getTime() + (55 * 60 * 1000));
    }).catch(() => {
      return <Redirect to="/logout" />;
    });   
  }
}

const RefreshToken = () => {
  const time = sessionStorage.getItem("time") - (new Date().getTime());
  if (time > 0) {
    setTimeout(() => {
      sendRequest();
      RefreshToken();
    }, time); 
  }
}

export default RefreshToken;