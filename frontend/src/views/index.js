import React, {Component} from 'react';
import Header from "../components/header";
import LeftBar from "../components/leftBar";

class Index extends Component
{
    render() 
    {
        return (
            <div className="flex flex-wrap w-full h-full justify-start">
                {/* Start - Header */}
                <div className="flex flex-row w-full h-20 px-8 py-4 border-b border-gray2">
                    <div className="md:w-3/12 lg:w-1/2 h-full">
                        <div className="flex flex-row justify-start items-center">
                            <svg 
                                className="w-12 h-12 fill-current text-purple"
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 30.743 30.744"
                            >
                                <path d="M28.585,9.67h-0.842v9.255c0,1.441-0.839,2.744-2.521,2.744H8.743v0.44c0,1.274,1.449,2.56,2.937,2.56h12.599l4.82,2.834   L28.4,24.669h0.185c1.487,0,2.158-1.283,2.158-2.56V11.867C30.743,10.593,30.072,9.67,28.585,9.67z"/>
                                <path d="M22.762,3.24H3.622C1.938,3.24,0,4.736,0,6.178v11.6c0,1.328,1.642,2.287,3.217,2.435l-1.025,3.891L8.76,20.24h14.002   c1.684,0,3.238-1.021,3.238-2.462V8.393V6.178C26,4.736,24.445,3.24,22.762,3.24z M6.542,13.032c-0.955,0-1.729-0.774-1.729-1.729   s0.774-1.729,1.729-1.729c0.954,0,1.729,0.774,1.729,1.729S7.496,13.032,6.542,13.032z M13,13.032   c-0.955,0-1.729-0.774-1.729-1.729S12.045,9.574,13,9.574s1.729,0.774,1.729,1.729S13.955,13.032,13,13.032z M19.459,13.032   c-0.955,0-1.73-0.774-1.73-1.729s0.775-1.729,1.73-1.729c0.953,0,1.729,0.774,1.729,1.729S20.412,13.032,19.459,13.032z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="md:w-9/12 lg:w-1/2 h-full">
                        <Header />
                    </div>
                </div>
                {/* End - Header */}
                {/* Start - Left panel */}
                <div className="w-1/3 h-custom border-r border-gray2">
                    <LeftBar />
                </div>
                {/* End - Left panel */}
            </div>
        );
    }
}

export default Index;