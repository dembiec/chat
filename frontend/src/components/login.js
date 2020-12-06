import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Api from "../helpers/api";

class Login extends Component
{
  state = {
    data: {
      email: "",
      password: ""
    }
  }

  saveData = (e) => {
    const data = this.state.data;
    data[e.target.name] = e.target.value;
    this.setState({data: data});
  }

  authenticate = () => {
    const input = this.state.data;

    if (input.email === "" || input.password === "") {
      this.props.setErrors(["All fields are required.".split()]);
      return false;
    }

    Api.post('/login', this.state.data)
    .then(response => {
      const data = response.data.data;
      localStorage.setItem("token", data.token);
      delete data.token;
      localStorage.setItem("user", JSON.stringify(data));

      this.props.history.push("/");
    }).catch(error => {
      try {
        this.props.setErrors(error.response.data.error.message);
      } catch (errorMsg) {
        this.props.setErrors([error.response.statusText.split()]);
      }
    });
  }

  render() 
  { 
    return (
      <form 
        className="flex flex-col items-center"
      >
        <input 
          className="w-full h-12 my-2 p-3 outline-none rounded-sm border border-gray2 bg-gray1 text-gray-600"
          type="text"
          name="email"
          placeholder="Email"
          value={this.state.data.email}
          onChange={this.saveData}
        />
        <input 
          className="w-full h-12 my-2 p-3 outline-none rounded-sm border border-gray2 bg-gray1 text-gray-600"
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.data.password}
          onChange={this.saveData}
        />
        <button
          type="button"
          className="w-11/12 h-12 mt-5 p-3 focus:outline-none rounded-md bg-purple font-medium text-white transition duration-100 ease-in-out transform hover:opacity-75"
          onClick={this.authenticate}
        >
          Log in
        </button>
        <span className="mt-2 font-medium text-gray-500">
          or <Link className="hover:underline" to="/register">Register</Link>
        </span>
      </form>
    );
  }
}

export default Login;