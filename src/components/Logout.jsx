import React from "react";
import { connect } from "react-redux";
import { compose, withApollo } from "react-apollo";
import { withRouter } from "react-router";
import { logout } from "../reducer";

const rawLogout = ({ goBack, resetStore, onLogout }) => {
  return (
    <button onClick={compose(goBack, resetStore, onLogout)}>Log Out</button>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    resetStore: ownProps.client.resetStore,
    goBack: ownProps.history.goBack
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logout())
  };
};

export const Logout = compose(
  // get client so I can resetStore
  withApollo,
  // get history so I can goBack
  withRouter,
  // get dispatch so I can send the logout action
  connect(mapStateToProps, mapDispatchToProps)
)(rawLogout);
