import React, { Fragment, useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./style.css";

import { logout } from "./Action";
import { LayoutContext } from "../layout/layoutContext";
import { DashboardUserContext } from "../dashboardUser/Layout";
import { isAdmin } from "../auth/fetchApi";

const Navbar = (props) => {
  const history = useHistory();
  const location = useLocation();

  const { data, dispatch } = useContext(LayoutContext);
  const dashboardContext = useContext(DashboardUserContext);
  const dashboardDispatch = dashboardContext ? dashboardContext.dispatch : null;

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout(dispatch);
    if (dashboardDispatch) {
      logout(dashboardDispatch);
    }
    setUserDropdownOpen(false);
  };

  const navberToggleOpen = () =>
    dispatch({ type: "hamburgerToggle", payload: !data.navberHamburger });

  const loginModalOpen = () =>
    dispatch({ type: "loginSignupModalToggle", payload: !data.loginSignupModal });

  const cartModalOpen = () =>
    dispatch({ type: "cartModalToggle", payload: !data.cartModal });

  const renderUserDropdown = () => (
    <div className="userDropdown absolute right-0 mt-1 bg-gray-200 rounded">
      {!isAdmin() ? (
        <Fragment>
          <div className="flex flex-col text-gray-700 w-48 shadow-lg">
            <span
              onClick={() => {
                history.push("/user/orders");
                setUserDropdownOpen(false);
              }}
              className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>My Orders</span>
            </span>
            <span
              onClick={() => {
                history.push("/user/profile");
                setUserDropdownOpen(false);
              }}
              className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>My Account</span>
            </span>
            <span
              onClick={() => {
                history.push("/wish-list");
                setUserDropdownOpen(false);
              }}
              className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>My Wishlist</span>
            </span>
            <span
              onClick={() => {
                history.push("/user/setting");
                setUserDropdownOpen(false);
              }}
              className="flex space-x-1 py-2 px-8 hover:bg-gray-400 cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Setting</span>
            </span>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="flex flex-col text-gray-700 w-48 shadow-lg">
            <span
              onClick={() => {
                history.push("/admin/dashboard");
                setUserDropdownOpen(false);
              }}
              className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Admin Panel</span>
            </span>
            <span
              onClick={handleLogout}
              className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </span>
          </div>
        </Fragment>
      )}
    </div>
  );

  return (
    <Fragment>
      {/* Navbar Section */}
      <nav className="fixed top-0 w-full z-20 shadow-lg lg:shadow-none bg-white">
        <div className="m-4 md:mx-12 md:my-6 grid grid-cols-4 lg:grid-cols-3">
          {/* Desktop Navigation Links (Left) */}
          <div className="hidden lg:block col-span-1 flex text-gray-600 mt-1">
            {["Shop", "Blog", "Contact us"].map((item) => (
              <span
                key={item}
                className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer"
                onClick={() => {
                  if (item === "Shop") {
                    history.push("/");
                  } else if (item === "Blog") {
                    history.push("/blog");
                  }
                  
                  else {
                    history.push(`/${item.toLowerCase().replace(" ", "-")}`);
                  }
                }}
              >
                {item}
              </span>
            ))}
          </div>

          {/* Mobile Logo and Hamburger */}
          <div className="col-span-2 lg:hidden flex justify-items-stretch items-center">
            <svg
              onClick={navberToggleOpen}
              className="col-span-1 lg:hidden w-8 h-8 cursor-pointer text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <img
              onClick={() => history.push("/")}
              src="/main_logo.png"
              alt="Make-X Logo"
              style={{ maxHeight: "40px", height: "auto", cursor: "pointer", objectFit: "contain" }}
              className="px-2"
            />
          </div>

          {/* Desktop Logo (Center) */}
          <div
            onClick={() => history.push("/")}
            className="hidden lg:block flex items-left col-span-1 text-center cursor-pointer"
          >
            <img
              src="/main_logo.png"
              alt="Make-X Logo"
              style={{
                maxHeight: "60px",
                height: "auto",
                cursor: "pointer",
                objectFit: "contain",
                marginLeft: "14vw",
              }}
            />
          </div>

          {/* Right Side Icons */}
          <div className="flex items-right col-span-2 lg:col-span-1 flex justify-end">
            {/* WishList Button */}
            <div
              onClick={() => history.push("/wish-list")}
              className="hover:bg-gray-200 rounded-lg px-2 py-2 cursor-pointer"
              title="Wishlist"
            >
              <svg
                className={`${
                  location.pathname === "/wish-list" ? "fill-current text-gray-800" : ""
                } w-8 h-8 text-gray-600 cursor-pointer`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>

            {/* Cart Button */}
            <div
              onClick={cartModalOpen}
              className="hover:bg-gray-200 rounded-lg px-2 py-2 cursor-pointer"
              title="Cart"
            >
              <svg
                className={`${
                  location.pathname === "/cart" ? "fill-current text-gray-800" : ""
                } w-8 h-8 text-gray-600 cursor-pointer`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m1-14h2a1 1 0 011 1v1a1 1 0 01-1 1h-2m-6 0H5a1 1 0 00-1 1v1a1 1 0 001 1h2"
                />
              </svg>
            </div>

            {/* User Dropdown */}
            <div
              className="userDropdownBtn hover:bg-gray-200 px-2 py-2 rounded-lg relative"
              title={data.isAuthenticated ? "Logout" : "Login"}
            >
              <svg
                className="cursor-pointer w-8 h-8 text-gray-600 hover:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  if (!data.isAuthenticated) {
                    loginModalOpen();
                  } else {
                    setUserDropdownOpen(!userDropdownOpen);
                  }
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {userDropdownOpen && data.isAuthenticated && renderUserDropdown()}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={
            data.navberHamburger
              ? "px-1 pb-2 md:pb-0 md:px-10 lg:hidden"
              : "hidden px-1 pb-2 md:pb-0 md:px-10 lg:hidden"
          }
        >
          <div className="col-span-1 flex flex-col text-gray-600">
            {["Shop", "Blog", "Contact us"].map((item) => (
              <span
                key={item}
                className="font-medium text-lg tracking-widest hover:text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer"
                onClick={() => {
                  if (item.toLowerCase() === "shop") {
                    history.push("/");
                  } else if (item.toLowerCase() === "blog") {
                    history.push("/blog");
                  } else {
                    history.push(`/${item.toLowerCase().replace(" ", "-")}`);
                  }
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </nav>
      {/* End Navbar Section */}
    </Fragment>
  );
};

export default Navbar;
