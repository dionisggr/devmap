import React from 'react';
import { Link } from 'react-router-dom';
import HeaderOptions from './HeaderOptions'
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <header>
        <Link to='/' className='logo'>#DevMap</Link>
        <HeaderOptions />
      </header>
    );
  };
};

export default Header;