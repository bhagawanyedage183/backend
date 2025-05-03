import React, { Fragment, useContext, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { logout } from "./Action";
import { DashboardUserContext } from "./Layout";

const Sidebar = (props) => {
  const context = useContext(DashboardUserContext);
  const data = context ? context.data : {};
  const dispatch = context ? context.dispatch : () => {};

  const history = useHistory();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Upload handler function declared before return
  async function handleProfilePhotoUpload(file) {
    // Create FormData and append the file
    const formData = new FormData();
    formData.append("profilePhoto", file);
    formData.append("uId", data.userDetails ? data.userDetails._id : "");

    try {
      const response = await fetch("http://localhost:8000/api/user/upload-profile-photo", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        // Update context with new photo URL
        dispatch({
          type: "UPDATE_PROFILE_PHOTO",
          payload: result.photoUrl,
        });
      } else {
        console.error("Upload failed:", result.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  }

  return (
    <Fragment>
      {/* Mobile menu toggle button */}
      <div className="md:hidden flex justify-end p-2 bg-gray-100">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar menu */}
      <div className={`flex flex-col w-full space-y-4 md:w-3/12 font-medium ${mobileMenuOpen ? "block" : "hidden"} md:block`}>
        <div
          style={{ background: "#303031" }}
          className="flex items-center space-x-2 rounded shadow p-2 text-gray-100"
        >
          <div className="relative cursor-pointer w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100">
            <img
              src={data.userDetails && data.userDetails.userImage ? data.userDetails.userImage : "/default_profile.png"}
              alt="User Profile"
              className="w-full h-full object-cover"
              onClick={() => document.getElementById("profilePhotoInput").click()}
            />
            <input
              type="file"
              id="profilePhotoInput"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  handleProfilePhotoUpload(file);
                }
              }}
            />
            <div className="absolute bottom-0 right-0 bg-yellow-700 rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <span className="text-sm">Hello,</span>
            <span className="text-lg">{data.userDetails ? data.userDetails.name : ""}</span>
          </div>
        </div>
        <div className="shadow w-full flex flex-col">
          <div
            onClick={() => {
              history.push("/user/orders");
              setMobileMenuOpen(false);
            }}
            className={`${
              location.pathname === "/user/orders" ? "border-r-4 border-yellow-700 bg-gray-200" : ""
            } px-4 py-4 hover:bg-gray-200 cursor-pointer`}
          >
            My Orders
          </div>
          <hr />
          <div
            onClick={() => {
              history.push("/user/profile");
              setMobileMenuOpen(false);
            }}
            className={`${
              location.pathname === "/user/profile" ? "border-r-4 border-yellow-700 bg-gray-200" : ""
            } px-4 py-4 hover:bg-gray-200 cursor-pointer`}
          >
            My Accounts
          </div>
          <hr />
          <div
            onClick={() => {
              history.push("/wish-list");
              setMobileMenuOpen(false);
            }}
            className="px-4 py-4 hover:bg-gray-200 cursor-pointer"
          >
            My Wishlist
          </div>
          <hr />
          <div
            onClick={() => {
              history.push("/user/product-submission");
              setMobileMenuOpen(false);
            }}
            className={`${
              location.pathname === "/user/product-submission" ? "border-r-4 border-yellow-700 bg-gray-200" : ""
            } px-4 py-4 hover:bg-gray-200 cursor-pointer`}
          >
            Your Shop
          </div>
          <hr />
          <div
            onClick={() => {
              history.push("/user/setting");
              setMobileMenuOpen(false);
            }}
            className={`${
              location.pathname === "/user/setting" ? "border-r-4 border-yellow-700 bg-gray-200" : ""
            } px-4 py-4 hover:bg-gray-200 cursor-pointer`}
          >
            Setting
          </div>
          <hr />
          <div
            onClick={() => {
              logout(dispatch);
              setMobileMenuOpen(false);
            }}
            className="px-4 py-4 hover:bg-gray-200 cursor-pointer"
          >
            Logout
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
