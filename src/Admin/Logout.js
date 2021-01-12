import React from 'react';
import { withRouter } from 'react-router-dom';

class Logout extends React.Component {
  render() {
    return null;
  };
  componentDidMount() {
    window.sessionStorage.removeItem('authToken');
    this.props.history.push('/');
  };
};

export default withRouter(Logout);