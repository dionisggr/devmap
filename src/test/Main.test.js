import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import List from '../Main/List/List';
import Item from '../Main/List/Items/Item';
import ProjectPage from '../Main/List/Items/ProjectPage';
import IssuePage from '../Main/List/Items/IssuePage';
import Error from '../Main/Errors/Error';
import UserPage from '../Main/Users/UserPage';
import Menu from '../Main/Menu';

describe('Main Section', () => {
  const list = <BrowserRouter><List /></BrowserRouter>;
  const item = <BrowserRouter><Item /></BrowserRouter>;
  const error = <BrowserRouter><Error /></BrowserRouter>;
  const project = <BrowserRouter><ProjectPage /></BrowserRouter>;
  const issue = <BrowserRouter><IssuePage /></BrowserRouter>;
  const user = <BrowserRouter><UserPage /></BrowserRouter>;
  const menu = <BrowserRouter><Menu /></BrowserRouter>;
  describe('The List', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(list, div);
      ReactDOM.unmountComponentAtNode(div);
    });
    it('renders the UI as expected', () => {
      const tree = renderer.create(list).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('The Items', () => {
    describe('The Item component', () => {
      it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(item, div);
        ReactDOM.unmountComponentAtNode(div);
      });
      it('render the UI as expected', () => {
        const tree = renderer.create(item).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
    describe('The Project Page', () => {
      it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(project, div);
        ReactDOM.unmountComponentAtNode(div);
      });
      it('renders the UI as expected', () => {
        const tree = renderer.create(project).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
    describe('The Issue Page', () => {
      it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(issue, div);
        ReactDOM.unmountComponentAtNode(div);
      });
      it('renders the UI as expected', () => {
        const tree = renderer.create(issue).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
  describe('The Errors', () => {
    it('render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(error, div);
      ReactDOM.unmountComponentAtNode(div);
    });
    it('render the UI as expected', () => {
      const tree = renderer.create(error).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('The Users', () => {
    it('render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(user, div);
      ReactDOM.unmountComponentAtNode(div);
    });
    it('render the UI as expected', () => {
      const tree = renderer.create(user).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('The Menu', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(menu, div);
      ReactDOM.unmountComponentAtNode(div);
    });
    it('render the UI as expected', () => {
      const tree = renderer.create(menu).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});