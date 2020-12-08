import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Header extends Component
{
  render() 
  {
    const data = JSON.parse(sessionStorage.getItem("user"));

    return (
      <ul className="flex flex-row justify-end items-center">
        <li className="px-3">
          <img
            className="w-12 h-12 rounded-full" 
            src={`https://avatars.dicebear.com/api/initials/${data.name}-${data.surname}.svg?fontSize=40`}  
          />
        </li>
        <li className="px-3">
          <Link to="/profile" className="capitalize text-lg font-medium text-gray-400 hover:underline">
            {data.name} {data.surname}
          </Link>
        </li>
        <li className="px-3 pr-0">
          <Link to="/logout">
            <svg
              className="w-5 h-5 fill-current text-gray-500 transition duration-100 ease-in-out transform hover:text-gray-600" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 511 512"
            >
              <path d="m361.5 392v40c0 44.113281-35.886719 80-80 80h-201c-44.113281 0-80-35.886719-80-80v-352c0-44.113281 35.886719-80 80-80h201c44.113281 0 80 35.886719 80 80v40c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-40c0-22.054688-17.945312-40-40-40h-201c-22.054688 0-40 17.945312-40 40v352c0 22.054688 17.945312 40 40 40h201c22.054688 0 40-17.945312 40-40v-40c0-11.046875 8.953125-20 20-20s20 8.953125 20 20zm136.355469-170.355469-44.785157-44.785156c-7.8125-7.8125-20.476562-7.8125-28.285156 0-7.8125 7.808594-7.8125 20.472656 0 28.28125l31.855469 31.859375h-240.140625c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h240.140625l-31.855469 31.859375c-7.8125 7.808594-7.8125 20.472656 0 28.28125 3.90625 3.90625 9.023438 5.859375 14.140625 5.859375 5.121094 0 10.238281-1.953125 14.144531-5.859375l44.785157-44.785156c19.496093-19.496094 19.496093-51.214844 0-70.710938zm0 0"/>
            </svg>
          </Link>
        </li>
      </ul>
    );
  }
}

export default Header;