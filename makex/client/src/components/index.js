import React from "react";
import {
  Home,
  WishList,
  ProtectedRoute,
  AdminProtectedRoute,
  CartProtectedRoute,
  PageNotFound,
  ProductDetails,
  ProductByCategory,
  CheckoutPage,
} from "./shop";
import { DashboardAdmin, Categories, Products, Orders } from "./admin";
import { UserProfile, UserOrders, SettingUser } from "./shop/dashboardUser";
import AdminUserListPage from "./admin/dashboardAdmin/AdminUserListPage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductsByFilter from "./shop/home/ProductsByFilter";

/* Routing All page will be here */
const Routes = (props) => {
  return (
    <Router>
      <Switch>
        {/* Shop & Public Routes */}
        <Route exact path="/" component={Home} />
        <Route exact path="/blog" component={require("./blog/BlogPage").default} />
        <Route exact path="/wish-list" component={WishList} />
        <Route exact path="/products/:id" component={ProductDetails} />
        <Route
          exact
          path="/products/category/:catId"
          component={ProductByCategory}
        />
        <Route exact path="/products/discount-20" component={ProductsByFilter} />
        <Route exact path="/products/price-200" component={ProductsByFilter} />
        <Route exact path="/products/high-rated" component={ProductsByFilter} />
        <CartProtectedRoute
          exact={true}
          path="/checkout"
          component={CheckoutPage}
        />
        {/* Shop & Public Routes End */}

        {/* Admin Routes */}
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard"
          component={DashboardAdmin}
        />
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard/categories"
          component={Categories}
        />
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard/products"
          component={Products}
        />
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard/orders"
          component={Orders}
        />
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard/product-approvals"
          component={require("./admin/dashboardAdmin/ProductApprovals").default}
        />
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard/users"
          component={AdminUserListPage}
        />
        {/* Admin Routes End */}

        {/* User Dashboard */}
        <ProtectedRoute
          exact={true}
          path="/user/profile"
          component={UserProfile}
        />
        <ProtectedRoute
          exact={true}
          path="/user/orders"
          component={UserOrders}
        />
        <ProtectedRoute
          exact={true}
          path="/user/setting"
          component={SettingUser}
        />
        <ProtectedRoute
          exact={true}
          path="/user/product-submission"
          component={require("./shop/dashboardUser/SellerProductSubmission").default}
        />
        <ProtectedRoute
          exact={true}
          path="/user/sold-products"
          component={require("./shop/dashboardUser/SoldProducts").default}
        />
        
        {/* User Dashboard End */}

        {/* Contact Us Page */}
        <Route exact path="/contact-us" component={require("./shop/ContactUs").default} />

        {/* 404 Page */}
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
