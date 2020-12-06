import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Api from "../helpers/api";

class Register extends Component
{
  state = {
    data: {
      name: "",
      surname: "",
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

    if (input.name === "" || input.surname === "" || input.email === "" || input.password === "") {
      this.props.setErrors(["All fields are required.".split()]);
      return false;
    }

    Api.post('/register', this.state.data)
    .then(response => {
      this.props.history.push("/login");
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
        <div className="w-full h-auto grid gap-x-4 md:grid-cols-2">
          <input 
            className="w-full h-12 my-2 p-3 outline-none rounded-sm border border-gray2 bg-gray1 text-gray-600"
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.data.name}
            onChange={this.saveData}
          />
          <input 
            className="w-full h-12 my-2 p-3 outline-none rounded-sm border border-gray2 bg-gray1 text-gray-600"
            type="text"
            name="surname"
            placeholder="Surname"
            value={this.state.data.surname}
            onChange={this.saveData}
          />
        </div>
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
          Register
        </button>
        <span className="mt-2 font-medium text-gray-500">
          or <Link className="hover:underline" to="/login">Log in</Link>
        </span>
      </form>
    );
  }
}

export default Register;