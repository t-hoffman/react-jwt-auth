import useAuth from "hooks/useAuth";
import React, { useEffect } from "react";

const Test = () => {
  const { state } = useAuth();

  const fetchData = async () => {
    const response = await (
      await fetch("/test/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
    ).json();

    console.log(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return state.accessToken ? (
    <div>
      <h2>Welcome!</h2>Hello there, {state.username}!
    </div>
  ) : (
    <div>TEST</div>
  );
};

export default Test;
