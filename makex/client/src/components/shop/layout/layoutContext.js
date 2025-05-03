import { createContext } from "react";

export const LayoutContext = createContext();

export const layoutState = {
  navberHamburger: false,
  loginSignupModal: false,
  loginSignupError: false,
  cartModal: false,
  cartProduct: null,
  isAuthenticated: false,
  user: null,
  singleProductDetail: null,
  inCart: [],
  cartTotalCost: 0,
};

export const layoutReducer = (state, action) => {
  switch (action.type) {
    case "hamburgerToggle":
      return { ...state, navberHamburger: action.payload };
    case "loginSignupModalToggle":
      return { ...state, loginSignupModal: action.payload };
    case "loginSignupErrorToggle":
      return { ...state, loginSignupError: action.payload };
    case "cartModalToggle":
      return { ...state, cartModal: action.payload };
    case "cartProduct":
      return { ...state, cartProduct: action.payload };
    case "setCartProduct":
      return { ...state, cartProduct: action.payload };
    case "loginSignupError":
      return { ...state, loginSignupError: action.payload };
    case "login":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "logout":
      return { ...layoutState, isAuthenticated: false, user: null };
    case "setUserDetails":
      return { ...state, isAuthenticated: true, user: action.payload.user };
    case "singleProductDetail":
      return { ...state, singleProductDetail: action.payload };
    case "inCart":
      return { ...state, inCart: action.payload };
    case "cartTotalCost":
      return { ...state, cartTotalCost: action.payload };
    default:
      return state;
  }
};
