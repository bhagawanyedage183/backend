import {
  DashboardData,
  postUploadImage,
  getSliderImages,
  postDeleteImage,
  getAllUsers,
} from "./FetchApi";
import { getAllOrder } from "../orders/FetchApi.js";

export const GetAllData = async (dispatch) => {
  let responseData = await DashboardData();
  if (responseData) {
    dispatch({ type: "totalData", payload: responseData });
  }
};

export const todayAllOrders = async (dispatch) => {
  let responseData = await getAllOrder();
  if (responseData) {
    dispatch({ type: "totalOrders", payload: responseData });
  }
};

export const sliderImages = async (dispatch) => {
  try {
    let responseData = await getSliderImages();
    if (responseData && responseData.length > 0) {
      dispatch({ type: "sliderImages", payload: responseData });
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchUsers = async (dispatch) => {
  try {
    let responseData = await getAllUsers();
    if (responseData && responseData.length > 0) {
      dispatch({ type: "users", payload: responseData });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteImage = async (id, dispatch) => {
  dispatch({ type: "imageUpload", payload: true });
  try {
    let responseData = await postDeleteImage(id);
    console.log("Delete response:", responseData);
    if (responseData && responseData.message === "Slide image deleted successfully") {
      sliderImages(dispatch);
      dispatch({ type: "imageUpload", payload: false });
    } else {
      console.error("Delete failed:", responseData);
      dispatch({ type: "imageUpload", payload: false });
    }
  } catch (error) {
    console.error("Delete error:", error);
    dispatch({ type: "imageUpload", payload: false });
  }
};

export const uploadImage = async (image, dispatch) => {
  dispatch({ type: "imageUpload", payload: true });
  let formData = new FormData();
  formData.append("image", image);
  console.log("Uploading image:", formData.get("image"));
  try {
    let responseData = await postUploadImage(formData);
    console.log("Upload response:", responseData);
    if (responseData && responseData.message === "Slide image uploaded successfully") {
      dispatch({ type: "imageUpload", payload: false });
      sliderImages(dispatch);
    } else {
      dispatch({ type: "imageUpload", payload: false });
      console.error("Upload failed:", responseData);
    }
  } catch (error) {
    console.error("Upload error:", error);
    dispatch({ type: "imageUpload", payload: false });
  }
};
