import React, { Fragment, useReducer, useEffect } from "react";
import { Navbar, Footer, CartModal } from "../partials";
import LoginSignup from "../auth/LoginSignup";
import { LayoutContext, layoutReducer, layoutState } from "./layoutContext";

const getInitialState = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  if (token && user) {
    return {
      ...layoutState,
      isAuthenticated: true,
      user: JSON.parse(user),
    };
  }
  return layoutState;
};

const Layout = ({ children }) => {
  const [state, dispatch] = useReducer(layoutReducer, getInitialState());

  useEffect(() => {
    // Optionally, sync localStorage changes with context state here if needed
  }, []);

  return (
    <LayoutContext.Provider value={{ data: state, dispatch }}>
      <Fragment>
        <div className="flex-grow">
          <Navbar/>
          <LoginSignup />
          <CartModal />
          {children}
        </div>
        <Footer />
      </Fragment>
    </LayoutContext.Provider>
  );
};

export { LayoutContext };
export default Layout;
