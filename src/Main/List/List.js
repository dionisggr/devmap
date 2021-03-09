import React from 'react';
import jwt_decode from 'jwt-decode';
import { withRouter, Link } from 'react-router-dom';
import { API_KEY } from '../../config';
import PropTypes from 'prop-types';
import Item from './Items/Item';
import Error from '../Errors/Error';
import ErrorBoundary from '../Errors/ErrorBoundary';
import './List.css';

class List extends React.Component {
  static defaultProps = { items: [] };

  state = { items: [] };

  static propTypes = { items: PropTypes.array.isRequired };

  componentDidMount() {
    const projectID = this.props.match.params.projectID;

    const items = (projectID)
      ? this.props.items.filter(issue => issue.projectID === projectID)
      : this.props.items;
    
    this.setState({ items });
  };

  render() {
    const token = window.sessionStorage.getItem('authToken');
    const admin = (token) ? token === API_KEY : false; 
    const username = (token && !admin) ? jwt_decode(token).sub : 'dionisggr';
    const projectID = this.props.match.params.projectID;
    const listTitle = (projectID) ? 'Project Issues' : 'All Projects';
   
    const project = (this.props.items)
      ? this.props.items.find(project => project.id === projectID)
      : null;
    
    const owner = (project) ? project.owner : null;

    const { items } = this.state;
    
    if (!items) return <Error message='No data.' />
    
    return (
      <>
        <h3>{listTitle}</h3>
        {
          /* Show different Create/New button depending
            if adding project or issue. */
          (!projectID)
            ? <Link
                className='create'
                to='/new-project'
                style={{display: (!token) ? 'none' : 'in-line block'}}
              >New Project</Link>
            : ((username === owner) || admin)
                ? <Link
                    className='create'
                    to={`/projects/${projectID}/new-issue`}
                    style={{display: (!token) ? 'none' : 'in-line block'}}
                  >New Issue</Link>
                : null
        }
        <div className='item-list'>
        {
          // List of items
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
          /*  Show 'Back' button at Issue List for going back to project
              Unnecessary for Project List (nothing to go back to) */
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