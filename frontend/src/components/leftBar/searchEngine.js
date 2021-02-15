import React, {Component} from 'react';
import debounce from 'lodash.debounce';
import Api, {JWTtoken} from "../../helpers/api";

class SearchEngine extends Component
{
  state = {
    search: ""
  }

  saveData = async (e) => {
    await this.setState({search: e.target.value});
    this.clearData();
  }

  clearData = (state = false) => {
    if (state) {
      this.setState({search: ""});
    }
    this.props.setUsers({});
    this.props.setPagination({});
    this.props.setPaginationPage(1);
    this.props.setErrors({});
  }

  searchUser = () => {
    if(this.state.search.length > 0) {
      JWTtoken(sessionStorage.getItem("token"));
      Api.get(`/users/${this.state.search}?page=${this.props.page}`)
      .then(response => {
        this.props.setUsers(response.data.data);
        if (response.data.pagination.totalPages > 1) {
          this.props.setPagination(response.data.pagination);
        }
      }).catch(error => {
        try {
          this.props.setErrors(error.response.data.error.message);
        } catch (errorMsg) {
          this.props.setErrors(["An unexpected error has occurred, please try again in a moment.".split()]);
        }
      });
    } else {
      this.clearData();
    }
  }

  searchUserLate = debounce(this.searchUser, 300);
  
  componentDidUpdate(e)
  {
    if (e.page !== this.props.page) {
      this.searchUser();
    }
  }

  render() 
  {
    return (
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
          value={this.state.search}
          onChange={(e) => {this.saveData(e); this.searchUserLate();}}
        />
        <button 
          type="button"
          className="w-auto h-auto p-1 focus:outline-none text-gray-500 hover:text-gray-600"
          style={(this.state.search === "") ? {display: "none"} : {display: "block"}}
          onClick={this.clearData.bind(true)}
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
    );
  }
}

export default SearchEngine;