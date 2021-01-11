import React from 'react';
import User from './User'
import api from '../api';
import './UserList.css';

class UserList extends React.Component {
  state = { users: [] };

  render() {
    return (
      <>
        <h3>User List</h3>
        <div className='user-list'>
          {
            this.state.users.map(user => {
              return <User key={user.id} user={user} />
            })
          }
        </div>
        <button onClick={() => this.props.history.push('/')}>Home</button>
      </>
    );
  };
  
  componentDidMount() {
    api.getUsers()
      .then(users => {
        return this.setState({ users })
      })
      .catch(error => console.log({ error }));
  }
};

export default UserList;