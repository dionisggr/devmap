import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../api';
import './User.css';

class User extends React.Component {
  static defaultProps = { user: {} };

  static propTypes = { user: PropTypes.object.isRequired };
  
  render() {
    let { 
      id, username, firstName, lastName,
      email, startDate, role
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