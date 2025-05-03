import React, { Fragment, useState } from "react";
import { signupReq } from "./fetchApi";
import { useSnackbar } from 'notistack';

const Signup = (props) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    error: false,
    loading: false,
    success: false,
  });

  const alert = (msg, type) => (
    <div className={`text-sm text-${type}-500 mt-1 animate-fadeIn`}>{msg}</div>
  );
  const { enqueueSnackbar } = useSnackbar();

  const formSubmit = async () => {
    setData({ ...data, loading: true });
    if (data.cPassword !== data.password) {
      return setData({
        ...data,
        loading: false,
        error: {
          cPassword: "Password doesn't match",
          password: "Password doesn't match",
        },
      });
    }
    try {
      let responseData = await signupReq({
        name: data.name,
        email: data.email,
        password: data.password,
        cPassword: data.cPassword,
      });
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
          cPassword: "",
        });
      } else if (responseData.success) {
        setData({
          success: responseData.success,
          name: "",
          email: "",
          password: "",
          cPassword: "",
          loading: false,
          error: false,
        });
        enqueueSnackbar('Account Created Successfully..!', { variant: 'success' });
      }
    } catch (error) {
      console.log(error);
      setData({ ...data, loading: false });
    }
  };

  return (
    <Fragment>
      <div className="text-center text-3xl font-semibold mb-8 animate-fadeInDown">Register</div>
      <form className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg animate-fadeInUp">
        {data.success ? alert(data.success, "green") : ""}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 font-medium text-gray-700">
            Name<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                name: e.target.value,
              })
            }
            value={data.name}
            type="text"
            id="name"
            className={`${
              data.error.name ? "border-red-500" : "border-gray-300"
            } px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border transition duration-300`}
          />
          {!data.error ? null : alert(data.error.name, "red")}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-medium text-gray-700">
            Email address<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                email: e.target.value,
              })
            }
            value={data.email}
            type="email"
            id="email"
            className={`${
              data.error.email ? "border-red-500" : "border-gray-300"
            } px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border transition duration-300`}
          />
          {!data.error ? null : alert(data.error.email, "red")}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 font-medium text-gray-700">
            Password<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                password: e.target.value,
              })
            }
            value={data.password}
            type="password"
            id="password"
            className={`${
              data.error.password ? "border-red-500" : "border-gray-300"
            } px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border transition duration-300`}
          />
          {!data.error ? null : alert(data.error.password, "red")}
        </div>
        <div className="flex flex-col">
          <label htmlFor="cPassword" className="mb-2 font-medium text-gray-700">
            Confirm password<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                cPassword: e.target.value,
              })
            }
            value={data.cPassword}
            type="password"
            id="cPassword"
            className={`${
              data.error.cPassword ? "border-red-500" : "border-gray-300"
            } px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border transition duration-300`}
          />
          {!data.error ? null : alert(data.error.cPassword, "red")}
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
        <div
          onClick={(e) => formSubmit()}
          style={{ background: "#303031" }}
          className="w-full py-3 rounded-md text-white font-semibold cursor-pointer hover:bg-gray-800 transition duration-300 animate-pulse text-center"
        >
          {data.loading ? "Creating account..." : "Create an account"}
        </div>
      </form>
    </Fragment>
  );
};

export default Signup;
