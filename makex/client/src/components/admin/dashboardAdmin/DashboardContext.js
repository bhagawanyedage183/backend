import React from "react";

export const DashboardContext = React.createContext();

export const dashboardState = {
  totalData: [],
  totalOrders: [],
  uploadSliderBtn: true,
  imageUpload: false,
  sliderImages: [],
  users: [],
};

export const dashboardReducer = (state, action) => {
  switch (action.type) {
    case "totalData":
      return {
        ...state,
        totalData: action.payload,
      };
    case "totalOrders":
      return {
        ...state,
        totalOrders: action.payload,
      };
    case "uploadSliderBtn":
      return {
        ...state,
        uploadSliderBtn: action.payload,
      };
    case "imageUpload":
      return {
        ...state,
        imageUpload: action.payload,
      };
    case "sliderImages":
      return {
        ...state,
        sliderImages: action.payload,
      };
    case "users":
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};
