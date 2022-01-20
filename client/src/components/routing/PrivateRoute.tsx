import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

interface Props {
  [x: string]: any;
  component: any;
  auth: {
    isAuthenticated: boolean;
    loading: boolean;
  };
}

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}: Props) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = (state: { auth: any }) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
