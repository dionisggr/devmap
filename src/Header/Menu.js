import React from "react";
import { Link, withRouter } from "react-router-dom";
import { API_KEY } from "../config";
import jwt_decode from "jwt-decode";
import UserContext from "../context/UserContext";
import "./Menu.css";

class Menu extends React.Component {
  state = { menu: false };

  static contextType = UserContext;

  render() {
    const menu = this.state.menu;
    const token = window.sessionStorage.getItem("authToken");
    const id = this.context ? this.context.id : null;
    let username = token ? this.context.username : null;
    const admin = username === "dionisggr";
    if (!username && token && token !== API_KEY)
      username = jwt_decode(token).sub;
    return (
      <>
      {(username) ? <h4>Welcome, {username}.</h4> : null}
      <nav className={menu ? "faded" : ""}>
        <ul>
          <li><Link to="/signup">Sign-Up</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li>
            <a
              href="https://github.com/dionisggr/devmap"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </li>
        </ul>
        <i
          onClick={(evt) => {
            evt.stopPropagation();
            this.setState({ menu: !menu });
          }}
          onBlur={this.blur}
          className="fa fa-bars"
        ></i>
        <div className={`nav ${menu ? "show-menu" : ""}`}>
          <ul>
            {
              // Show different access buttons depending if Logged in or not.
              !token ? (
                <>
                  <li>
                    <Link to="/signup">Sign-Up</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                </>
              ) : (
                admin
                  ? <li><Link id="users-button" to={`/users`}>Users</Link></li>
                  : <li><Link id="account-button" to={`/users/${id}`}>Accounts</Link></li>
              )
            }
            <li>
              <a
                href="https://github.com/dionisggr/devmap"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
            {
              (!token)
                ? null
                : <li>
                    <Link
                      to="/logout"
                      id="logout-button"
                      onClick={() => {
                        window.sessionStorage.removeItem("authToken");
                        this.props.history.push("/");
                      }}
                    >
                      Log Out
                    </Link>
                  </li>
            }
          </ul>
        </div>
      </nav>
      </>
    );
  }

  componentDidMount() {
    document.addEventListener("click", () => this.setState({ menu: false }));
  }
}

export default withRouter(Menu);
