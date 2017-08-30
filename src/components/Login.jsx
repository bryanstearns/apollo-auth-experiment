import React from "react";
import { connect } from "react-redux";
import { compose, withApollo } from "react-apollo";
import { withRouter } from "react-router";
import { login } from "../reducer";

export const rawLogin = ({ goBack, resetStore, onLogin }) => {
  return (
    <button onClick={compose(goBack, resetStore, onLogin)}>
      Log In as "bob"
    </button>
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
    onLogin: () => dispatch(login("bob"))
  };
};

export const Login = compose(
  // get client so I can resetStore
  withApollo,
  // get history so I can goBack
  withRouter,
  // get dispatch so I can send the login action
  connect(mapStateToProps, mapDispatchToProps)
)(rawLogin);
