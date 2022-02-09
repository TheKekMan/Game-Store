import PrivateRoute from "./PrivateRoute";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Alert from "../layout/Alert";
import NotFound from "../layout/NotFound";
import Games from "../games/Games";
import GamesByTag from "../games/GamesByTag";
import Game from "../games/Game";
import ReactDOM from "react-dom";
import { Box } from "../../mui";
import Profile from "../profile/Profile";
import DevPage from "../devs/DevPage";

// TODO:
// import Dashboard from '../dashboard/Dashboard';
// import CreateProfile from '../profile-forms/CreateProfile';
// import Profiles from '../profiles/Profiles';
// import Posts from '../posts/Posts';
// import Post from '../post/Post';

const Routes = () => {
  return (
    <Box component="section" className="container">
      <>
        {ReactDOM.createPortal(<Alert />, document.body)}
        <Switch>
          <Route exact path="/" component={Games} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/games/search/:query" component={Games} />
          <Route exact path="/games/tag/:tag" component={GamesByTag} />
          <Route exact path="/games/:id" component={Game} />
          <Route exact path="/devs/:id" component={DevPage} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </>
    </Box>
  );
};

export default Routes;
