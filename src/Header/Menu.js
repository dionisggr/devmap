import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import UserContext from '../context/UserContext';
import './Menu.css';

class Menu extends React.Component {
  static contextType = UserContext;

  render() {
    const token = window.localStorage.getItem('authToken');
    const id = (this.context) ? this.context.id : null;
    const username = (token) ? (this.context.username) : null;
    const admin = username === 'dionisggr';
    return (
      <div className='header-options'>
        {(username) ? <h4>Welcome, {username}.</h4> : null}
        <div className='buttons'>
          {
            (!token)
              ? <>
                  <Link to='/signup'>Sign-Up</Link>
                  <Link to='/login'>Login</Link>
                </>
              : <>
                  {
                    (admin)
                      ? <Link to={`/users`}>Users</Link>
                      : <Link to={`/users/${id}`}>Account</Link>
                  }    
                  <button
                    onClick={() => {
                      window.localStorage.removeItem('authToken');
                      this.props.history.push('/');
                    }}
                  >Log Out</button>
                </>
          }
        </div>
      </div>
    );
  };
};

export default withRouter(Menu);