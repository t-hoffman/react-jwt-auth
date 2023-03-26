import useAuth from "hooks/useAuth";
import React from "react";

const User = () => {
  const { state } = useAuth();

  return (
    <div>
      User page:
      <br />
      Welcome, {state.username}! ACCESS_TOKEN: {state.accessToken}
    </div>
  );
};

export default User;
