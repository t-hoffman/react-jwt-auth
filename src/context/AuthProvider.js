import { createContext, useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext({});
export const ACTIONS = {
  SIGN_IN: "sign-in",
  SIGN_OUT: "sign-out",
  REFRESH: "refresh"
};

const initialState = {};

const setLocalStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("setLocal error:", error);
  }
};

const getLocalStorage = (key, initialValue) => {
  try {
    const value = window.localStorage.getItem(key);
    console.log("getLocal:", value);
    return value ? JSON.parse(value) : initialValue;
  } catch (error) {
    console.log("getLocal error:", error);
    return initialValue;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SIGN_IN:
    case ACTIONS.REFRESH: {
      const token = action.payload;
      const payload = JSON.parse(atob(token.split(".")[1]));
      setLocalStorage("auth", token);

      return { ...payload, accessToken: token };
    }
    case ACTIONS.SIGN_OUT: {
      setLocalStorage("auth", initialState);
      return initialState;
    }
    default: {
      return state;
    }
  }
};

const initializer = (init) => {
  try {
    const accessToken = getLocalStorage("auth");
    const payload = JSON.parse(atob(accessToken.split(".")[1]));
    return { ...payload, accessToken };
  } catch (err) {
    return init;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, initializer);
  const location = useLocation();

  console.log(state);

  const verifyToken = async (token) => {
    console.log("verify");
    const options = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      }
    };

    const response = await (await fetch("/auth/verify", options)).json();
    if (!response.accessToken) {
      refreshToken();
    }
  };

  const refreshToken = async () => {
    const response = await (
      await fetch("/auth/refresh", { method: "POST", credentials: "include" })
    ).json();

    if (!response.accessToken) return dispatch({ type: ACTIONS.SIGN_OUT });

    dispatch({ type: ACTIONS.REFRESH, payload: response.accessToken });
  };

  try {
    const exp = new Date(state.exp * 1000);
    console.log("token expires:", exp.toLocaleString("en-us"));

    if (exp < Date.now()) verifyToken(state.accessToken);
  } catch (err) {}

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
