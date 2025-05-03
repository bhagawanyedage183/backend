import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: "Bearer " + token } : {};
};

export const getAllProduct = async () => {
  try {
    const response = await axios.get(apiURL + "/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return { Products: [] };
  }
};

export const getAllCategory = async () => {
  try {
    const response = await axios.get(apiURL + "/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { Categories: [] };
  }
};

export const getSlideImages = async () => {
  try {
    const response = await axios.get(apiURL + "/api/customize/get-slide-image");
    return response.data.sliders || [];
  } catch (error) {
    console.error("Error fetching slide images:", error);
    return [];
  }
};