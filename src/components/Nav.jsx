import React from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const linkStyle = {
  paddingRight: "0.5em"
};

const signedOutLinks = () =>
  <span>
    <NavLink className="login" to="/login" style={linkStyle}>
      Sign in
    </NavLink>
  </span>;

const signedInLinks = currentUser =>
  <span>
    <NavLink className="logout" to="/logout" style={linkStyle}>
      Sign out
    </NavLink>
    <span className="currentUser">
      ({currentUser})
    </span>
  </span>;

export const rawNav = ({ currentUser }) =>
  <nav>
    <NavLink className="home" to="/" exact style={linkStyle}>
      Home
    </NavLink>
    <NavLink className="users" to="/users" exact style={linkStyle}>
      Users
    </NavLink>
    {typeof currentUser === "undefined"
      ? signedOutLinks()
      : signedInLinks(currentUser)}
  </nav>;

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.auth.currentUser,
    location: ownProps.location
  };
};

export const Nav = withRouter(connect(mapStateToProps)(rawNav));
