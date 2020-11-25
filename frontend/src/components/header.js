import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Header extends Component
{
  userData = () => {
    const data = JSON.parse(localStorage.user);
    return(
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

  render() 
  { 
    return (
      <div className="flex flex-row w-full h-20 px-8 py-4 border-b border-gray2">
        <div className="md:w-3/12 lg:w-1/2 h-full">
          <div className="flex flex-row justify-start items-center">
            <svg 
              className="w-12 h-12 fill-current text-purple"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 30.743 30.744"
            >
              <path d="M28.585,9.67h-0.842v9.255c0,1.441-0.839,2.744-2.521,2.744H8.743v0.44c0,1.274,1.449,2.56,2.937,2.56h12.599l4.82,2.834   L28.4,24.669h0.185c1.487,0,2.158-1.283,2.158-2.56V11.867C30.743,10.593,30.072,9.67,28.585,9.67z"/>
              <path d="M22.762,3.24H3.622C1.938,3.24,0,4.736,0,6.178v11.6c0,1.328,1.642,2.287,3.217,2.435l-1.025,3.891L8.76,20.24h14.002   c1.684,0,3.238-1.021,3.238-2.462V8.393V6.178C26,4.736,24.445,3.24,22.762,3.24z M6.542,13.032c-0.955,0-1.729-0.774-1.729-1.729   s0.774-1.729,1.729-1.729c0.954,0,1.729,0.774,1.729,1.729S7.496,13.032,6.542,13.032z M13,13.032   c-0.955,0-1.729-0.774-1.729-1.729S12.045,9.574,13,9.574s1.729,0.774,1.729,1.729S13.955,13.032,13,13.032z M19.459,13.032   c-0.955,0-1.73-0.774-1.73-1.729s0.775-1.729,1.73-1.729c0.953,0,1.729,0.774,1.729,1.729S20.412,13.032,19.459,13.032z"/>
            </svg>
          </div>
        </div>
        <div className="md:w-9/12 lg:w-1/2 h-full">
          <this.userData />
        </div>
      </div>
    );
  }
}

export default Header;