import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends React.Component {
  render() {
    const token = window.sessionStorage.getItem('authToken');
    const link = (token) ? '/projects' : '/';
    return (
      <header>
        <Link to={link} className='logo'><h1>#DevMap</h1></Link>
        <nav>
          <Link to="/signup">Sign-Up</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>
    );
  };
};

export default Header;