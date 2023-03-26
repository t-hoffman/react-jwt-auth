import useAuth from "hooks/useAuth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignOutPage = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const signOut = async () => {
    const response = await (
      await fetch("/auth/signout", { method: "POST", credentials: "include" })
    ).json();
    dispatch({ type: "sign-out" });
    navigate("/", { replace: true });
  };

  useEffect(() => {
    signOut();
  }, []);

  return <div>Signed out</div>;
};

export default SignOutPage;
