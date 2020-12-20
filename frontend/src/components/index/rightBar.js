import React, {Component, Fragment} from 'react';
import ChatContext from "../../helpers/chatContext";
import UserBox from "../rightBar/userBox";
import TextBox from "../rightBar/textBox";

class RightBar extends Component
{
  state = {
    errors: {}
  }

  setErrors = (errors) => {
    this.setState({errors: errors});
  }

  static contextType = ChatContext;

  render() 
  {
    const {recipientId} = this.context;

    if (recipientId !== null) {
      return (
        <div className="w-full h-full">
          <UserBox />
          <TextBox setErrors={this.setErrors} />
        </div>
      ); 
    }

    return (
      <div className="flex flex-wrap justify-center items-center w-full h-full">
        <h2 className="text-center text-xl text-gray-500">Select a user to start a chat</h2>
      </div>
    );
  }
}

export default RightBar;