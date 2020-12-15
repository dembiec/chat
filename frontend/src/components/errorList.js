import React, {Component} from 'react';

class ErrorList extends Component
{
    render()
    {
        const errors = Object.values(this.props.set);
        if (errors.length > 0) {
            return(
                <div className="mb-3" role="alert">
                    <ul>
                        {errors.map(error =>
                            error.map((alert, index) =>
                                <li key={index} className="flex items-center py-1">
                                    <div  className="rounded-full p-1 fill-current bg-red-200 text-red-700">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>   
                                    </div>
                                    <span className="font-medium text-sm ml-3 text-red-700">{alert}</span>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            );
        }

        return null;   
    }
}

export default ErrorList;