import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  state = { error: false };

  static getDerivedStateFromError(error) {
    return { error };
  };

  render() {
    // Return either error or props children (this component is set as Boundary)
    if (this.state.error) return <h2>Something went wrong.</h2>;
    return this.props.children;
  };
};

export default ErrorBoundary;