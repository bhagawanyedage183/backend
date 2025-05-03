export const logout = (dispatch) => {
  // Clear user-related data from localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("cart");
  localStorage.removeItem("wishList");

  // Dispatch logout action to update context state
  if (dispatch) {
    dispatch({ type: "logout" });
  }

  // Redirect to home page
  window.location.href = "/";
};
