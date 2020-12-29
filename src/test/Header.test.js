import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import Header from '../Header/Header';
import Signup from '../Header/Signup';
import Login from '../Header/Login';

describe('Header Section', () => {
  const header = <BrowserRouter><Header /></BrowserRouter>;
  const login = <BrowserRouter><Login /></BrowserRouter>;
  const signup = <BrowserRouter><Signup /></BrowserRouter>;
  describe('The Header', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(header, div);
      ReactDOM.unmountComponentAtNode(div);
    });
    it('renders the UI as expected', () => {
      const tree = renderer.create(header).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('The Login page', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(login, div);
      ReactDOM.unmountComponentAtNode(div);
    });
    it('renders the UI as expected', () => {
      const tree = renderer.create(login).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('The Sign-Up page', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(signup, div);
      ReactDOM.unmountComponentAtNode(div);
    });
    it('renders the UI as expected', () => {
      const tree = renderer.create(signup).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});