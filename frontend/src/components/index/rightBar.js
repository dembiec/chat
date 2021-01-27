import React, {Component, Fragment} from 'react';
import ChatContext from "../../helpers/chatContext";
import MessageBox from "../rightBar/messageBox";
import UserBox from "../rightBar/userBox";
import TextBox from "../rightBar/textBox";

class RightBar extends Component
{
  state = {
    message: ""
  }

  setMessage = (message) => {
    this.setState({message: message});
  }

  static contextType = ChatContext;

  render() 
  {
    const {recipientId} = this.context;

    if (recipientId !== null) {
      return (
        <div className="w-full h-full">
          <UserBox />
          <div className="w-full h-custom3 pb-2">
            <MessageBox setMessage={this.setMessage} senderMessage={this.state.message} />
          </div>
          <TextBox setMessage={this.setMessage} />
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