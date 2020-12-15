import React, {Component} from 'react';
import SearchEngine from "../leftBar/searchEngine";
import ErrorList from "../errorList";
import UserList from "../leftBar/userList";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Pagination from "react-js-pagination";

class LeftBar extends Component
{
    state = {
        users: {},
        pagination: {},
        paginationPage: 1,
        errors: {}
    }

    setUsers = (users) => {
        this.setState({users: users});
    }

    setPagination = (pagination) => {
        this.setState({pagination: pagination});
    }
    
    setPaginationPage = (page) => {
        this.setState({paginationPage: page});
    }

    setErrors = (errors) => {
        this.setState({errors: errors});
    }

  render() 
  {
    return (
        <div className="w-full h-full">
            <SearchEngine 
                setUsers={this.setUsers} 
                setPagination={this.setPagination}
                setPaginationPage={this.setPaginationPage}
                page={this.state.paginationPage}
                setErrors={this.setErrors} 
            />
            {
            Object.values(this.state.errors).length > 0 ?
                <div className="w-full h-auto px-8 py-4">
                    <ErrorList set={this.state.errors} />
                </div>
            :
                <div className="w-full h-custom2 py-4">
                    <SimpleBar className="h-full custom-scroll">
                        <UserList users={this.state.users} setErrors={this.setErrors} />
                        {
                        Object.values(this.state.pagination).length > 0 ?
                            <div className="static bottom-0 w-full h-auto">
                                <Pagination
                                    activePage={this.state.pagination.currentPage}
                                    totalItemsCount={this.state.pagination.total}
                                    itemsCountPerPage={this.state.pagination.perPage}
                                    prevPageText="Previous"
                                    nextPageText="Next"
                                    onChange={this.setPaginationPage}
                                    innerClass="flex flex-row justify-center"
                                    activeClass="text-gray-500"
                                    itemClass="p-2 pb-0 font-medium text-lg text-gray-400 hover:text-gray-500"
                                />
                            </div>
                        :
                            null
                        }
                    </SimpleBar>
                </div>
            }
        </div>
    );
  }
}

export default LeftBar;