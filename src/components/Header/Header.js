import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../services/Auth';
import lazy from '../../images/lazy.svg';
import './Header.css';
import app from '../../services/base';
import JobNotification from '../../components/JobNotification/JobNotification';

export default class Header extends Component {
  static contextType = AuthContext;

  renderLoginLink() {
    return (
      <div className="Header__sub_container">
        <div className="Header__login">
          <Link className="Header__btn Header__alt" to="/login">
            Log In
          </Link>
          <Link className="Header__btn Header__primary" to="/register">
            Register
          </Link>
        </div>
      </div>
    );
  }

  showRole = () => {
    if (this.context.currentUser.role === 'owner') return 'Owner';
    if (this.context.currentUser.role === 'project manager')
      return 'Project Manager';
    if (this.context.currentUser.role === 'project worker')
      return 'Project Worker';
  };

  renderLogoutLink() {
    return (
      <div className="Header__sub_container">
        <div className="Header__user_info">
          <span test-id="header-name">
            Welcome, {this.context.currentUser.name}!
          </span>
          <span test-id="header-role">Role: {this.showRole()}</span>
        </div>
        <div className="Header__db_logout">
          <Link to="/dashboard">
            <h3 className="Header__dashboard" id="dashboard-button">
              Dashboard
            </h3>
          </Link>
          <Link
            onClick={() => this.handleLogout()}
            className="Header__btn  Header__alt"
            to="/"
            test-id="logout-button"
          >
            Log Out
          </Link>
        </div>
      </div>
    );
  }

  handleLogout = () => {
    this.props.setPath(null);
    localStorage.removeItem('path');
    app.auth().signOut();
  };

  render() {
    return (
      <>
        <nav className="Header">
          <h1>
            <Link className="Header__link" to="/dashboard">
              <img
                className="Header__logo"
                src={lazy}
                alt="man reclining in chair"
              />
              <span className="Header__app_name">manageLazily</span>
            </Link>
          </h1>
          {this.context.currentUser
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </nav>
        <div className="Header__notifications">
          {this.context.currentUser && (
            <JobNotification user={this.context.currentUser} />
          )}
        </div>
      </>
    );
  }
}
