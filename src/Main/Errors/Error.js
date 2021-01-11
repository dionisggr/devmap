import React from 'react';
import PropTypes from 'prop-types';
import './Error.css';

class Error extends React.Component {
  static defaultProps = { message: '' }

  static propTypes = { message: PropTypes.string };
  
  render() {
    return (
      <div className='error'>
        <h3>ERROR</h3>
        {/* Different messages passed as props from error handling in components*/}
        <p>{this.props.message}</p>
      </div>
    );
  };
};

export default Error;