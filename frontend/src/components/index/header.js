import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Header extends Component
{
  state ={
    style: "hidden"
  }

  expand = () => {
    this.setState({style: this.state.style === "hidden" ? "block" : "hidden"});
  }

  render() 
  {
    const data = JSON.parse(sessionStorage.getItem("user"));

    return (
      <ul className="flex flex-row justify-end items-center">
        <li className="lg:px-3 md:px-2">
          <img
            className="w-12 h-12 rounded-full" 
            src={`https://avatars.dicebear.com/api/initials/${data.name}-${data.surname}.svg?fontSize=40`}  
            alt="profile avatar"
          />
        </li>
        <li className="px-3">
          <Link to="/profile" className="capitalize text-lg font-medium text-gray-400 hover:underline">
            {data.name} {data.surname}
          </Link>
        </li>
        <li className="lg:pl-3 md:pl-2 pr-0">
          <div className="relative inline-block text-left">
            <button 
              type="button"
              className="mt-2 text-sm font-medium focus:outline-none"
              onClick={this.expand}
              >
              <svg 
                className="w-5 h-5 fill-current text-gray-500 transition duration-100 ease-in-out transform hover:text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
              </svg>
            </button>
            <div className={`${this.state.style} origin-top-right absolute right-0 mt-3 border border-gray2 rounded-md shadow-lg bg-white z-50`}>
              <div className="py-1">
                <Link
                  to="/"
                  className="block px-8 py-2 text-sm text-gray-600 hover:bg-white1 hover:text-gray-700" 
                >
                  Profile
                </Link>
                <Link
                  to="/"
                  className="block px-8 py-2 text-sm text-gray-600 hover:bg-white1 hover:text-gray-700" 
                >
                  Settings
                </Link>
                <Link
                  to="/logout"
                  className="block px-8 py-2 text-sm text-gray-600 hover:bg-white1 hover:text-gray-700" 
                >
                  Log out
                </Link>
              </div>
            </div>
          </div>
        </li>
      </ul>
    );
  }
}

export default Header;