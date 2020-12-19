import React, {Component} from 'react';
import Api, {JWTtoken} from "../../helpers/api";
import ChatContext from "../../helpers/chatContext";

class TextBox extends Component
{
    state = {
        message: ""
    }

    saveData = (e) => {
        if (e.target.value.length > 0) {
            this.setState({message: e.target.value});  
        } else {
            this.clearData();
        }
    }

    clearData = () => {
        this.setState({message: ""});
    }

    static contextType = ChatContext;

    SendMessage = () => {
        const {recipientId} = this.context;
        
        JWTtoken(sessionStorage.getItem("token"));
        Api.post('/messages', {recipientId: recipientId, message: this.state.message})
        .then(response => {
            this.clearData();
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
        return (
            <div className="flex flex-row justify-center w-full h-16 bg-gray1">
                <input
                    className="w-full h-full focus:outline-none p-8 antialiased text-base placeholder-gray-500 text-gray-600 bg-gray1"
                    type="text"
                    placeholder="Write a message..."
                    autoComplete="off"
                    name="message"
                    value={this.state.message}
                    onChange={this.saveData}
                />
                <button className="w-auto h-full pr-8 py-4 focus:outline-none bg-gray1" onClick={this.SendMessage}>
                    <svg 
                        className="w-8 h-8 text-gray-500 hover:text-gray-400 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 465.882 465.882"
                    >
                        <path d="m 465.882 0 l -465.882 262.059 l 148.887 55.143 l 229.643 -215.29 l -174.674 235.65 l 0.142 0.053 l -0.174 -0.053 v 128.321 l 83.495 -97.41 l 105.77 39.175 Z" />
                    </svg>
                </button>
            </div>
        );
    }
}

export default TextBox;