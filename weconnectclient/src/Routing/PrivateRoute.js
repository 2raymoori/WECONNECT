import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { connect } from "react-redux";
const PrivateRoute = (props) => (
  <Routes>
    <Route
      render={(props) =>
        !props.auth.isAuthenticated && !props.auth.loading ? (
          <h1>dfs</h1>
        ) : (
          <h1>sdfs</h1>
        )
      }
    />
  </Routes>
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
