import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Item from './Items/Item';
import Error from '../Errors/Error';
import ErrorBoundary from '../Errors/ErrorBoundary';
import './List.css';

class List extends React.Component {
  static defaultProps = { items: [] };

  static propTypes = { items: PropTypes.array.isRequired };

  render() {
    const token = window.localStorage.getItem('authToken');
    const projectID = this.props.match.params.projectID;
    const listTitle = (projectID) ? 'Project Issues' : 'Recent Projects';
    const items = 
      (projectID)
        ? this.props.items.filter(issue => issue.projectID === projectID)
        : this.props.items
    if (!items) return <Error message='No data.'/>
    return (
      <>
        <h3>{listTitle}</h3>
        {
          (projectID)
            ? <Link
                className='create'
                to={`/projects/${projectID}/new-issue`}
                style={{visibility: (!token) ? 'hidden' : 'visible'}}
              >New Issue</Link>
            : <Link
                className='create'
                to='/new-project'
                style={{visibility: (!token) ? 'hidden' : 'visible'}}
              >New Project</Link>
        }
        <div className='item-list'>
        {
          items.map(item => {
            return (
            <ErrorBoundary key={item.id}>
              <Item key={item.id} item={item} />
            </ErrorBoundary>
            );
          })
        }
        </div>
        {
          (projectID)
            ? <button type='button'
                onClick={() => {
                  this.props.history.push(`/projects/${projectID}`)}
              }>Back</button>
            : null
        }
      </>
    );
  };
};

export default withRouter(List);