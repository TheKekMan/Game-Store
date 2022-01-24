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
import Spinner from "./components/layout/Spinner";
import Footer from "./components/layout/Footer";
import { createTheme, ThemeProvider } from "./mui";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const darkTheme = createTheme({
    palette: {
      // primary: {
      //   main: "#202020",
      // },
      // secondary: {
      //   main: "#121212",
      // },
      // text: {
      //   primary: "#FFFFFF",
      // },
      mode: "dark",
    },
    typography: {
      allVariants: {
        color: "rgba(255, 255, 255)",
      },
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
    typography: {
      allVariants: {
        color: "rgba(0, 0, 0, 0.87)",
      },
    },
  });

  return (
    <Suspense fallback={<Spinner />}>
      <Router>
        <ThemeProvider theme={darkTheme}>
          <Fragment>
            <Navbar />
            <Cart />
            <Switch>
              {/* <Route exact path='/' component={Landing} /> */}
              <Route component={Routes} />
            </Switch>
            <Footer />
          </Fragment>
        </ThemeProvider>
      </Router>
    </Suspense>
  );
};

export default App;
