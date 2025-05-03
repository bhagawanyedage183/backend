import React, { Fragment, useState, useContext } from "react";
import { loginReq } from "./fetchApi";
import { LayoutContext } from "../layout/layoutContext";

import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const context = useContext(LayoutContext);
  const layoutData = context ? context.data : {};
  const dispatch = context ? context.dispatch : () => {};

  const history = useHistory();

  const [data, setData] = useState({
    email: "",
    password: "",
    error: false,
    loading: false,
  });

  const alert = (msg) => <div className="text-xs text-red-500 mt-1 animate-fadeIn">{msg}</div>;

  const { enqueueSnackbar } = useSnackbar();

  const formSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, loading: true });
    try {
      let responseData = await loginReq({
        email: data.email,
        password: data.password,
      });
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
        });
      } else if (responseData.token) {
        setData({ email: "", password: "", loading: false, error: false });
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("user", JSON.stringify(responseData.user));
        dispatch({ type: "setUserDetails", payload: { user: responseData.user, token: responseData.token } });
        enqueueSnackbar('Login Completed Successfully..!', { variant: 'success' });
        window.location.reload();

        if (data.email === "admin" && data.password === "Admin@123") {
          history.push("/admin/dashboard");
        } else if (responseData.user && (responseData.user.userRole === 1 || responseData.user.userRole === "1")) {
          history.push("/admin/dashboard");
        } else {
          history.push("/user/profile");
        }
      }
    } catch (error) {
      setData({ ...data, loading: false });
    }
  };

  return (
    <Fragment>
      <div className="text-center text-3xl font-semibold mb-8 rounded-lg animate-fadeInDown">Login</div>
      {layoutData.loginSignupError ? (
        <div className="bg-red-200 py-2 px-4 rounded mb-4 animate-fadeIn">
          You need to login for checkout. Haven't account? Create new one.
        </div>
      ) : null}
      <form className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg animate-fadeInUp" onSubmit={formSubmit}>
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 font-medium text-gray-700">
            Username or email address
            <span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) => {
              setData({ ...data, email: e.target.value, error: false });
              dispatch({ type: "loginSignupError", payload: false });
            }}
            value={data.email}
            type="text"
            id="name"
            name="email"
            className={`${
              !data.error ? "border-gray-300" : "border-red-500"
            } px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border transition duration-300`}
          />
          {!data.error ? null : alert(data.error)}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 font-medium text-gray-700">
            Password<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) => {
              setData({ ...data, password: e.target.value, error: false });
              dispatch({ type: "loginSignupError", payload: false });
            }}
            value={data.password}
            type="password"
            id="password"
            name="password"
            className={`${
              !data.error ? "border-gray-300" : "border-red-500"
            } px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border transition duration-300`}
          />
          {!data.error ? null : alert(data.error)}
        </div>
        <div className="flex flex-col space-y-3 md:flex-row md:justify-between md:items-center">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="rememberMe"
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="rememberMe" className="text-gray-700 select-none">
              Remember me<span className="text-sm text-gray-600">*</span>
            </label>
          </div>
          <a className="block text-indigo-600 hover:underline" href="/">
            Lost your password?
          </a>
        </div>
        <button
          type="submit"
          disabled={data.loading}
          style={{ background: "#303031" }}
          className="w-full py-3 rounded-lg text-white font-semibold cursor-pointer hover:bg-gray-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed animate-pulse"
        >
          {data.loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </Fragment>
  );
};

export default Login;
