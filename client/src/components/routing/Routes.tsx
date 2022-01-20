import PrivateRoute from './PrivateRoute';
import Checkout from '../auth/Checkout';
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import NotFound from '../layout/NotFound';
import Games from '../games/Games';
import GamesByTag from '../games/GamesByTag';
import Game from '../games/Game';
import ReactDOM from 'react-dom';


// import Dashboard from '../dashboard/Dashboard';
// import CreateProfile from '../profile-forms/CreateProfile';
// import EditProfile from '../profile-forms/EditProfile';
// import AddExperience from '../profile-forms/AddExperience';
// import AddEducation from '../profile-forms/AddEducation';
// import Profiles from '../profiles/Profiles';
// import Profile from '../profile/Profile';
// import Posts from '../posts/Posts';
// import Post from '../post/Post';


const Routes = () => {
    return (
        <section className='container'>
          {ReactDOM.createPortal(<Alert />, document.body)}
          <Switch>
            <Route exact path='/' component={Games} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/games/search/:query' component={Games} />
            <Route exact path='/games/tag/:tag' component={GamesByTag} />
            <Route exact path='/games/:id' component={Game} />
            { /*<PrivateRoute exact path='/dashboard' component={Dashboard} /> */}
            {/* <PrivateRoute exact path='/add-experience' component={AddExperience} /> */}
            {/* <PrivateRoute exact path='/add-education' component={AddEducation} /> */}
            {/* <PrivateRoute exact path='/posts' component={Posts} /> */}
            {/* <PrivateRoute exact path='/posts/:id' component={Post} /> */}
            <PrivateRoute exact path='/checkout' component={Checkout} />
            <Route component={NotFound} />
          </Switch>
        </section>
    )
}

export default Routes;