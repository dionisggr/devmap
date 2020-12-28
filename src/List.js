import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Item from './Item';
import Error from './Error';
import ErrorBoundary from './ErrorBoundary';
import './List.css';

class List extends React.Component {
  static defaultProps = { items: [] };

  static propTypes = { items: PropTypes.array.isRequired };

  render() {
    const projectID = this.props.match.params.projectID;
    const listTitle = (projectID) ? 'Project Issues' : 'Recent Projects';
    const items = 
      (projectID)
        ? this.props.items.filter(issue => issue.projectID === projectID)
        : this.props.items
    if (!items) return <Error target='project' />
    return (
      <>
        <h3>{listTitle}</h3>
        {
          (projectID)
            ? <Link className='create' to={`/projects/${projectID}/new-issue`}>New Issue</Link>
            : <Link className='create' to='/new-project'>New Project</Link>
        }
        <div className='item-list'>
        {
          items.map(item => {
            return (
            <ErrorBoundary>
              <Item key={item.id} item={item} />
            </ErrorBoundary>
            );
          })
        }
        </div>
      </>
    );
  };
};

export default withRouter(List);