import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { API_KEY } from '../config';
import api from '../api';
import './Menu.css';

class Menu extends React.Component {
  state = { userID: null };

  render() {
    console.log(this.state.userID);
    const token = window.localStorage.getItem('authToken');
    const username =
      (token)
        ? (token === API_KEY)
          ? 'dionisggr'
          : jwt_decode(token).sub
        : null
    return (
      <div className='header-options'>
        {(token) ? <h4>Welcome, {username}</h4> : null}
        {
          (!token)
            ? <div className='buttons'>
                <Link to='/signup'>Sign-Up</Link>
                <Link to='/login'>Login</Link>
              </div>
            : <div className='buttons'>
                <Link to={`/users/${this.state.userID}`}>Account</Link>
                <button
                  onClick={() => {
                    window.localStorage.removeItem('authToken');
                    this.props.history.push('/');
                  }}
                >Log Out</button>
              </div>
        }
      </div>
    );
  };

  // componentDidMount() {
  //   const token = window.localStorage.getItem('authToken');
  //   const username =
  //     (token)
  //       ? (token === API_KEY)
  //         ? 'dionisggr'
  //         : jwt_decode(token).sub
  //       : null
  //   if (username) {
  //     api.findUsername(username)
  //       .then(user => this.setState({ userID: user.user_id }))
  //       .catch(error => console.log({ error }));
  //   };
  // };
};

export default withRouter(Menu);