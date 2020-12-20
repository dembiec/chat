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
                        className="w-8 h-8 text-gray-500 hover:text-gray-400 fill-current origin-top transform -rotate-45" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 488.721 488.721"
                    >
		                <path d="M483.589,222.024c-5.022-10.369-13.394-18.741-23.762-23.762L73.522,11.331C48.074-0.998,17.451,9.638,5.122,35.086    C-1.159,48.052-1.687,63.065,3.669,76.44l67.174,167.902L3.669,412.261c-10.463,26.341,2.409,56.177,28.75,66.639    c5.956,2.366,12.303,3.595,18.712,3.624c7.754,0,15.408-1.75,22.391-5.12l386.304-186.982    C485.276,278.096,495.915,247.473,483.589,222.024z M58.657,446.633c-8.484,4.107-18.691,0.559-22.798-7.925    c-2.093-4.322-2.267-9.326-0.481-13.784l65.399-163.516h340.668L58.657,446.633z M100.778,227.275L35.379,63.759    c-2.722-6.518-1.032-14.045,4.215-18.773c5.079-4.949,12.748-6.11,19.063-2.884l382.788,185.173H100.778z"/>
                    </svg>
                </button>
            </div>
        );
    }
}

export default TextBox;