import React, {Component} from 'react';
import ErrorList from "../helpers/errorList";
import Api from "../helpers/api";

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

class UserList extends Component
{
  state = {
    users: {},
    errors: {},
  }

  componentDidMount() {
    Api.get('/users')
    .then(response => {
      this.setState({users: response.data.data});
    }).catch(error => {
      try {
        this.setState({errors: error.response.data.error.message});
      } catch (errorMsg) {
        this.setState({errors: [error.response.statusText.split()]});
      }
    });
  }

  userList = () => {
    const data = Object.values(this.state.users);

    return(
      <ul>
        {data.map(user => 
          <li key={user.id} className="py-3 px-8 cursor-pointer hover:bg-white1">
            <div className="flex flex-wrap justify-center w-full h-auto">
              <div className="w-1/6 h-full">
                <img
                  className="w-12 h-12 rounded-full" 
                  src={`https://avatars.dicebear.com/api/initials/${user.name}-${user.surname}.svg?fontSize=40`}  
                  alt="user placeholder"
                />
              </div>
              <div className="w-5/6 h-auto pl-3">
                <span className="block capitalize font-medium text-lg text-gray-600">
                  {user.name} {user.surname}
                </span>
                <span className="block font-normal text-sm text-gray-500">
                  {user.email}
                </span>
              </div>
            </div>
          </li>
        )}
      </ul>
    );
  }

  render() 
  {
    return (
      <div className="w-1/3 h-custom border-r border-gray2">
        <div className="flex flex-row items-center w-full h-12 px-8">
          <svg
            className="w-5 h-5 fill-current text-gray-500" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 56.966 56.966"
          >
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
          </svg>
          <input
            className="w-full h-full pl-5 outline-none text-base font-medium placeholder-gray-500 text-gray-600"
            type="text"
            placeholder="Search..."
            autoComplete="off"
            name="search"
          />
          <button 
            type="button"
            className="w-auto h-auto p-1 focus:outline-none text-gray-600 hover:text-purple"
          >
            <svg
              className="w-3 h-3 fill-current"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 47.095 47.095"
            >
	            <path d="M45.363,36.234l-13.158-13.16l12.21-12.21c2.31-2.307,2.31-6.049,0-8.358c-2.308-2.308-6.05-2.307-8.356,0l-12.212,12.21   L11.038,1.906c-2.309-2.308-6.051-2.308-8.358,0c-2.307,2.309-2.307,6.049,0,8.358l12.81,12.81L1.732,36.831   c-2.309,2.31-2.309,6.05,0,8.359c2.308,2.307,6.049,2.307,8.356,0l13.759-13.758l13.16,13.16c2.308,2.308,6.049,2.308,8.356,0   C47.673,42.282,47.672,38.54,45.363,36.234z"/>
            </svg>
          </button>
        </div>
        <div className="w-full h-full py-4">
          <SimpleBar className="h-custom2 custom-scroll">
            <this.userList />
          </SimpleBar>
        </div>
      </div>
    );
  }
}

export default UserList;