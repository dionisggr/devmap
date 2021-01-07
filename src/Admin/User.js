import React from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './User.css';

class User extends React.Component {
  render() {
    let { 
      id, username, firstName, lastName,
      email, tools, startDate, role, github
    } = this.props.user;
    startDate = startDate.slice(4, 16);
    return (
      <Link to={`/users/${id}`} className='user'>
        <div className='user-main'>
          <label>{`${firstName} ${lastName}`}</label>
          <div className='user-alias'>
            <label>{username}</label>
            <label>{email}</label>
          </div>
        </div>
        <div className='user-extra'>
          <label>{startDate}</label>
          <label>{role}</label>
        </div>
      </Link>
    );
  };
  
  componentDidMount() {
    api.getUsers()
      .then(users => {
        this.setState({ users })
      })
      .catch(error => console.log({ error }));
  }
};

export default User;