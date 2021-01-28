import React, {Component} from 'react';
import Header from "../components/index/header";
import LeftBar from "../components/index/leftBar";
import RightBar from "../components/index/rightBar";
import ChatContext from "../helpers/chatContext";
import RefreshToken from "../helpers/refreshToken";

class Index extends Component
{
    state = {
        recipientId: null,
        recipientName: "",
        recipientSurname: "",
        status: true,
        leftBar: "",
        rightBar: ""
    }

    setRecipientId = (id) => {
        this.setState({recipientId: id});
    }
    
    setRecipientData = (name, surname) => {
        this.setState({recipientName: name});
        this.setState({recipientSurname: surname});
    }

    setStatus = () => {
        this.setState({status: this.state.status ? false : true});
    }

    device = () => {
        if (window.innerWidth <= 768) {
            if (this.state.status) {
                this.setState({leftBar: "block w-full"});
                this.setState({rightBar: "hidden w-2/3"});
            } else {
                this.setState({leftBar: "hidden w-1/3"});
                this.setState({rightBar: "block w-full"});
            }
        } else {
            this.setState({leftBar: "block w-1/3"});
            this.setState({rightBar: "block w-2/3"});
        }
    }

    componentDidMount()
    {
        RefreshToken();

        this.device();
        window.addEventListener("resize", this.device);
    }

    componentDidUpdate(e, prev)
    {
        if (prev.status !== this.state.status) {
            this.device();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.device);
    }

    render() 
    {
        return (
            <div className="flex flex-wrap w-full h-full justify-start">
                <div className="flex flex-row justify-end items-center w-full h-20 px-8 py-4 border-b border-gray2">
                    <div className="lg:w-1/2 md:w-1/4 h-full">
                        <div className="flex flex-row justify-start items-center h-full">
                            <button
                                className="lg:hidden md:block w-auto h-6 focus:outline-none"
                                onClick={this.setStatus}
                            >
                                <svg
                                    className="w-auto h-full text-gray-500 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 240.823 240.823"
                                >
                                    <path d="M57.633,129.007L165.93,237.268c4.752,4.74,12.451,4.74,17.215,0c4.752-4.74,4.752-12.439,0-17.179   l-99.707-99.671l99.695-99.671c4.752-4.74,4.752-12.439,0-17.191c-4.752-4.74-12.463-4.74-17.215,0L57.621,111.816   C52.942,116.507,52.942,124.327,57.633,129.007z"/>
                                </svg>
                            </button>
                            <div className="lg:flex md:hidden flex-row space-x-2 items-center">
                                <span className="rounded-full h-3 w-3 bg-red-500"></span>
                                <span className="rounded-full h-3 w-3 bg-yellow-400"></span>
                                <span className="rounded-full h-3 w-3 bg-green-400"></span>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 md:w-3/4 h-full">
                        <Header />
                    </div>
                </div>
                <ChatContext.Provider value={
                    {
                        recipientId: this.state.recipientId ,
                        setRecipientId: this.setRecipientId,
                        recipientName: this.state.recipientName,
                        recipientSurname: this.state.recipientSurname,
                        setRecipientData: this.setRecipientData,
                        setStatus: this.setStatus
                    }
                }>
                    <div className={`${this.state.leftBar} h-custom border-r border-gray2`}>
                        <LeftBar />
                    </div>
                    <div className={`${this.state.rightBar} h-custom`}>
                        <RightBar />
                    </div>
                </ChatContext.Provider>
            </div>
        );
    }
}

export default Index;