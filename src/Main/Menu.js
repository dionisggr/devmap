import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Menu.css';

class Menu extends React.Component {
  render() {
    const token = window.localStorage.getItem('authToken');
    return (
      <div className='header-options'>
        {
          (!token)
            ? <>
                <Link to='/signup'>Sign-Up</Link>
                <Link to='/login'>Login</Link>
              </>
            : <>
                <button
                  onClick={() => {
                    window.localStorage.removeItem('authToken');
                    this.props.history.push('/');
                  }}
                >Log Out</button>
              </>
        }
      </div>
    );
  };
};

export default withRouter(Menu);