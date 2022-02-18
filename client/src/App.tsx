import React, { Fragment, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
// import Landing from './components/layout/Landing';
// import Games from './components/games/Games';
import Cart from "./components/cart/Cart";
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
import "./css/Devs.css";
import Spinner from "./components/layout/Spinner";
import Footer from "./components/layout/Footer";
import { createTheme, DarkModeIcon, ThemeProvider, IconButton } from "./mui";
import { CssBaseline } from "@mui/material";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
if (!localStorage.theme) {
  localStorage.theme = "dark";
}

const App = () => {
  const [pageTheme, setPageTheme] = useState(localStorage.theme);

  const handleThemeChange = () => {
    if (localStorage.theme === "dark") {
      setPageTheme("light");
      localStorage.theme = "light";
    } else {
      localStorage.theme = "dark";
      setPageTheme("dark");
    }
  };

  const Switcher = () => {
    return (
      <IconButton
        sx={{ position: "fixed", right: "10px", bottom: "10px" }}
        onClick={() => handleThemeChange()}
      >
        <DarkModeIcon />
      </IconButton>
    );
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const darkTheme = createTheme({
    palette: {
      background: {
        default: "#121212",
      },
      primary: {
        main: "#121212",
      },
      secondary: {
        main: "#2d2d2d",
      },
      text: {
        primary: "#FFFFFF",
      },
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
      background: {
        default: "#fafafa",
      },
      primary: {
        main: "#fafafa",
      },
      secondary: {
        main: "#e1e2e1",
      },
      text: {
        primary: "#000000",
      },
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
        <ThemeProvider theme={pageTheme === "dark" ? darkTheme : lightTheme}>
          <CssBaseline />
          <Fragment>
            <Navbar />
            <Cart />
            <Switch>
              {/* <Route exact path='/' component={Landing} /> */}
              <Route component={Routes} />
            </Switch>
            <Footer />
            <Switcher />
          </Fragment>
        </ThemeProvider>
      </Router>
    </Suspense>
  );
};

export default App;
