import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderOptions.css';

class HeaderOptions extends React.Component {
  render() {
    return (
      <div className='header-options'>
        <Link to='/signup'>Sign-Up</Link>
        <Link to='/login'>Login</Link>
      </div>
    );
  };
};

export default HeaderOptions;