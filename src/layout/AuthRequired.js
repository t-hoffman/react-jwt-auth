import useAuth from "hooks/useAuth";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthRequired = () => {
  const { state } = useAuth();
  const location = useLocation();

  return state.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default AuthRequired;
