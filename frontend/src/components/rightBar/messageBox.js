import React, {Component} from 'react';
import Api, {JWTtoken} from "../../helpers/api";
import ChatContext from "../../helpers/chatContext";
import ErrorList from "../errorList";
import WebSockets from "../../helpers/webSockets";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

class MessageBox extends Component
{
    state = {
        messages: {},
        loadMore: 1,
        scrollPosition: 0,
        previousContext: null,
        senderId: JSON.parse(sessionStorage.getItem("user")).id,
        recipientId: this.context.recipientId
    }
    
    static contextType = ChatContext;
    pusher = WebSockets(sessionStorage.getItem("token"));

    connectUsers = () => {
        this.pusher.subscribe(`private-chat.${this.state.recipientId}.${this.state.senderId}`)
            .bind('new-message', data => {
                this.newMessage(this.state.recipientId, this.state.senderId, data.message);
            });
    }

    fetchMessages = (scroll = true) => {
        if (this.state.loadMore !== null) {
            const {recipientId} = this.context;
            JWTtoken(sessionStorage.getItem("token"));
            Api.get(`/messages/${recipientId}?page=${this.state.loadMore}`)
            .then(response => {
                const messages = Object.values(this.state.messages);
                this.setState({
                    messages: messages.length > 0 ? response.data.data.concat(this.state.messages) : response.data.data,
                    loadMore: response.data.loadMore
                });
                scroll ? this.scrollBottom() : this.scrollBottom(response.data.data.length);
            }).catch(() => {
                this.newMessage(this.state.senderId, this.state.recipientId, <ErrorList set={["An unexpected application error has occurred.".split()]} />);
            });
        }
    }

    loadMore = () => {
        const messageBox = document.querySelector('#message-box .simplebar-content-wrapper');
        if (messageBox.scrollTop === 0 && messageBox.scrollTop !== this.state.scrollPosition) { 
            this.fetchMessages(false);
        }
        this.setState({scrollPosition: messageBox.scrollTop});
    }

    newMessage = (senderId, recipientId, message) => {
        this.setState({
            messages: this.state.messages.concat(
                {senderId: senderId, recipientId: recipientId, message: message}
            )
        });
        this.scrollBottom();
    }

    scrollBottom = (scroll = null) => {
        const msgBox = document.querySelector('#message-box .simplebar-content-wrapper');
        if (msgBox) {
            setTimeout(() => {
                msgBox.scrollTo({top: scroll !== null ? ((scroll - 4) * 62) : msgBox.scrollHeight, behavior: "smooth"});
            }, 1);
        }
    }

    componentDidUpdate()
    {
        if (this.state.previousContext !== this.context) {
            this.setState({
                messages: {},
                loadMore: 1,
                previousContext: this.context,
                recipientId: this.context.recipientId
            });
            
            if (this.context.recipientId === this.state.recipientId) {
                this.connectUsers();
                this.fetchMessages();
            }
        }

        if (this.props.senderMessage !== "") {
            this.newMessage(this.state.senderId, this.state.recipientId, this.props.senderMessage);
            this.props.setMessage("");
        }
    }

    componentWillUnmount() 
    {
        this.pusher.unsubscribe(`private-chat.${this.state.recipientId}.${this.state.senderId}`);
    }

    render() 
    {
        const messages = Object.values(this.state.messages);

        if (messages.length > 0) {
            return (
                <SimpleBar id="message-box" className="w-full h-full px-8 custom-scroll" onWheel={this.loadMore}>
                    <ul className="grid grid-cols list-none">
                        {messages.map((data, index) =>
                            data.recipientId === this.state.recipientId ?
                                <li key={index} className="justify-self-end md:ml-32 my-2 p-3 rounded break-words text-gray-700 bg-white2">
                                    {data.message}
                                </li>
                            :
                                <li key={index} className="justify-self-start md:mr-32 my-2 p-3 rounded break-words text-white bg-purple">
                                    {data.message}
                                </li>
                        )}
                    </ul>
                </SimpleBar>
            ); 
        }

        return (
            <div className="flex flex-wrap justify-center items-center w-full h-full">
                <h2 className="text-center text-xl text-gray-500">Send a first message</h2>
            </div>
        )
    }
}

export default MessageBox;