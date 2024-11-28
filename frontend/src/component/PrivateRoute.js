import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ component: Component, roleRequired }) => {
  const { currentUser } = useAuth();

  // Check if the user is logged in
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Check if the user has the required role
  if (roleRequired && currentUser.Role !== roleRequired) {
    return <Navigate to="/" />; // Redirect to home or a forbidden page
  }

  return <Component />;
};

export default PrivateRoute;
