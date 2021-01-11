import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import UserContext from '../context/UserContext';
import './Menu.css';

class Menu extends React.Component {
  static contextType = UserContext;

  render() {
    const token = window.sessionStorage.getItem('authToken');
    const id = (this.context) ? this.context.id : null;
    const username = (token) ? (this.context.username) : null;
    const admin = username === 'dionisggr';
    return (
      <div className='header-options'>
        {/* Welcome user message IF logged in */}
        {(username) ? <h4>Welcome, {username}.</h4> : null}
        <div className='buttons'>
          {
            // Show different access buttons depending if Logged in or not.
            (!token)
              ? <>
                  <Link to='/signup'>Sign-Up</Link>
                  <Link to='/login'>Login</Link>
                </>
              : <div className='loggedIn'>
                  {
                    // Show access button to Users if 'Admin', otherwise regular Account button.
                    (admin)
                      ? <Link id='users-button' to={`/users`}>Users</Link>
                      : <Link id='account-button' to={`/users/${id}`}>Account</Link>
                  }    
                  <Link
                    id='logout-button'
                    onClick={() => {
                      window.sessionStorage.removeItem('authToken');
                      this.props.history.push('/');
                    }}
                  >Log Out</Link>
                </div>
          }
        </div>
      </div>
    );
  };
};

export default withRouter(Menu);