import React, {Component} from 'react';
import TextBox from "../rightBar/textBox";

class RightBar extends Component
{
  state = {
    errors: {}
  }

  setErrors = (errors) => {
    this.setState({errors: errors});
  }

  render() 
  {
    return (
        <div className="w-full h-full">
          <div className="w-full h-custom3">
            <span>Elo</span>
          </div>
          <TextBox setErrors={this.setErrors} />
        </div>
    );
  }
}

export default RightBar;