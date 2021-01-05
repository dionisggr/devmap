import React from 'react';
import './Error.css';

class Error extends React.Component {
  render() {
    return (
      <div className='error'>
        <h3>ERROR</h3>
        <p>{this.props.message}</p>
      </div>
    );
  };
};

export default Error;