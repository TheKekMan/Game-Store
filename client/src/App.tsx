import React, { Fragment, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
// import Landing from './components/layout/Landing';
// import Games from './components/games/Games';
import Cart from "./components/layout/Cart";
import Routes from "./components/routing/Routes";
// Redux:
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
// CSS:
import "./css/App.css";
import "./css/Games.css";
import "./css/Cart.css";
import "./css/Search.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Suspense fallback="loading">
      <Router>
        <Fragment>
          <Navbar />
          <Cart />
          <Switch>
            {/* <Route exact path='/' component={Landing} /> */}
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Suspense>
  );
};

export default App;
