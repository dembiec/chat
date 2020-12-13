import React, {Component} from 'react';
import SearchEngine from "../components/leftBar/searchEngine";
import UserList from "../components/leftBar/userList";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";


import ErrorList from "../helpers/errorList";


class LeftBar extends Component
{
    state = {
        users: {},
        errors: {}
    }

    setUsers = (users) => {
        this.setState({users: users});
    }

    setErrors = (errors) => {
        this.setState({errors: errors});
    }

  render() 
  {
    return (
        <div className="w-full h-full">
            <SearchEngine setUsers={this.setUsers} setPagination={this.setPagination} setErrors={this.setErrors} />
            {
                Object.values(this.state.errors).length > 0 ?
                    <div className="w-full h-auto px-8 py-4">
                        <ErrorList set={this.state.errors} />
                    </div>
                :
                    <div className="w-full h-custom2 py-4">
                        <SimpleBar className="h-full custom-scroll">
                            <UserList users={this.state.users} setErrors={this.setErrors} />
                        </SimpleBar>
                    </div>
            }
        </div>
    );
  }
}

export default LeftBar;