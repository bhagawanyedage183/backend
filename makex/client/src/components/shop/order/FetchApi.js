import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const getBrainTreeToken = async () => {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  if (!token || !userStr) {
    console.log("Token or user not found in localStorage");
    return null;
  }
  let user;
  try {
    user = JSON.parse(userStr);
  } catch (e) {
    console.log("Error parsing user from localStorage", e);
    return null;
  }
  if (!user._id) {
    console.log("User ID not found in user data");
    return null;
  }
  let uId = user._id;
  try {
    let res = await axios.post(`${apiURL}/api/braintree/get-token`, {
      uId: uId,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPaymentProcess = async (paymentData) => {
  try {
    let res = await axios.post(`${apiURL}/api/braintree/payment`, paymentData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (orderData) => {
  try {
    let res = await axios.post(`${apiURL}/api/order/create-order`, orderData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
