import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu'
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <header>
        <Link to='/' className='logo'><h1>#DevMap</h1></Link>
        <Menu />
      </header>
    );
  };
};

export default Header;