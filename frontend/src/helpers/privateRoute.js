import {Route, Redirect} from "react-router-dom";

const PrivateRoute = ({path, component, redirectTo}) => {
    if (sessionStorage.getItem("token")) {
      return <Route path={path} component={component} />
    }

    return <Redirect to={redirectTo} />
  };

  export default PrivateRoute;