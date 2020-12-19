import React, {Component } from 'react';
import ChatContext from "../../helpers/chatContext";

class UserBox extends Component
{
    static contextType = ChatContext;

    render() 
    {
        const {recipientName} = this.context;
        const {recipientSurname} = this.context;

        return (
            <div className="flex flex-row items-center w-full h-16 px-8">
                <img
                  className="w-10 h-10 rounded-full mr-4" 
                  src={`https://avatars.dicebear.com/api/initials/${recipientName}-${recipientSurname}.svg?fontSize=40`}  
                  alt="user placeholder"
                />
                <span className="font-medium text-gray-600">
                    {recipientName} {recipientSurname}
                </span>
            </div>
        )
    }
}

export default UserBox;