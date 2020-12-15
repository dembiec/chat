import React, {Component} from 'react';
import ErrorList from "../helpers/errorList";
import Login from "../components/authentication/login";
import Register from "../components/authentication/register";

class Authentication extends Component
{
    state = {
        errors: {},
    }

    setErrors = (errors) => {
        this.setState({errors: errors});
    }

    switchComponent = () => {
        switch (window.location.pathname) {
            case "/login":
                return <Login setErrors={this.setErrors} history={this.props.history} />;
                break;
            case "/register":
                return <Register setErrors={this.setErrors} history={this.props.history} />;
                break;
        }
    }

    render() 
    { 
        return (
            <div className="flex flex-col justify-center items-center w-full h-full">
                <div className="lg:w-1/3 md:w-3/4 h-auto">
                    <ErrorList set={this.state.errors} />
                    <h2 className="text-4xl mb-4 text-gray-500">Welcome</h2>
                    <this.switchComponent />
                </div>
            </div>
        );
    }
}

export default Authentication;