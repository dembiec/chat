import React, {Component} from 'react';
import Api, {JWTtoken} from "../../helpers/api";

class UserList extends Component
{
  state = {
    users: {}
  }

  componentDidMount() 
  {
    JWTtoken(sessionStorage.getItem("token"));
    Api.get("/random-users/20")
    .then(response => {
      this.setState({users: response.data.data});
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
    const data = Object.values(
      Object.values(this.props.users).length > 0 ? this.props.users : this.state.users
    );

    return (
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
}

export default UserList ;