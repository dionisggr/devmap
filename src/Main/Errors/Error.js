import React from 'react';
import PropTypes from 'prop-types';
import './Error.css';

class Error extends React.Component {
  static defaultProps = { message: '' }

  static propTypes = PropTypes.string;
  
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