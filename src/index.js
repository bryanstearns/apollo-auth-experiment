import React from "react";
import { render } from "react-dom";
import { Router, Route } from "react-router";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import createHistory from "history/createBrowserHistory";
import {
  ApolloProvider,
  ApolloClient,
  createNetworkInterface
} from "react-apollo";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { Nav } from "./components/Nav";
import { Users } from "./components/Users";
import { reducer } from "./reducer";
import "./style.css";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const networkInterface = createNetworkInterface({
  uri: "https://api.graph.cool/simple/v1/cj6sl9wmm10ih0139hd1nv240"
});
networkInterface.use([
  {
    applyMiddleware(req, next) {
      const token = localStorage.getItem("token");
      if (token) {
        if (!req.options.headers) req.options.headers = {};
        req.options.headers.authorization = `Bearer ${token}`;
      }

      next();
    }
  }
]);

const apolloClient = new ApolloClient({
  networkInterface
});

const history = createHistory();

const store = createStore(
  combineReducers(
    {
      auth: reducer,
      apollo: apolloClient.reducer()
    },
    compose([
      applyMiddleware(apolloClient.middleware()),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    ])
  )
);

render(
  <ApolloProvider store={store} client={apolloClient}>
    <Router history={history}>
      <div>
        <div className="app">
          <Nav />
          <div className="content">
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/users" component={Users} />
          </div>
        </div>

        <ol>
          <li>If signed in, click "Sign out", then click the Log Out button</li>
          <li>
            click "Home"; refresh the page, so things will be consistently
            fresh.
          </li>
          <li>click "Users"; get redirected to /login</li>
          <li>
            click "Log in as Bob"; get redirected back to /users, which
            displays.
          </li>
          <li>
            click "Sign out", then the "Log Out" button; get redirected back to
            /users, then redirected again to /login
          </li>
          <li>
            click "Log in as Bob"; get redirected back to /users, which displays
            "loading"... which never goes away.
          </li>
        </ol>
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
