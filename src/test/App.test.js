import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import App from '../App';

describe('The App', () => {
  const app = <BrowserRouter><App /></BrowserRouter>;
  describe('Smoke Test', () => {
    it('renders learn react link', () => {
      render(app);
    });
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(app, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });
  describe('Snapshot Test', () => {
    it('renders the UI as expected', () => {
      const tree = renderer.create(app).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});


