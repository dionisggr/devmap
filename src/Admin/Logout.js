import React from 'react';
import { withRouter } from 'react-router-dom';

class Logout extends React.Component {
  render() {
      window.sessionStorage.removeItem('authToken')
      this.props.history.push('/')
    return null;
  };
};

export default withRouter(Logout);