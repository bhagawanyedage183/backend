import React, { useReducer, Fragment } from "react";
import AdminUserList from "./AdminUserList";
import { dashboardState, dashboardReducer, DashboardContext } from "./DashboardContext";
import AdminLayout from "../../admin/layout";

const AdminUserListPage = () => {
  const [data, dispatch] = useReducer(dashboardReducer, dashboardState);

  return (
    <Fragment>
      <DashboardContext.Provider value={{ data, dispatch }}>
        <AdminLayout>
          <AdminUserList />
        </AdminLayout>
      </DashboardContext.Provider>
    </Fragment>
  );
};

export default AdminUserListPage;
