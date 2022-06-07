import React from "react";
import Blank from "./Blank";
import Layout from "./Layout";
import StudentDashBoard from "./Student/StudentDashBoard";
import CompanyDashBoard from "./Company/CompanyDashBoard";
import CompanyPhaseDashboard from "./Company/CompanyPhaseDashboard";
import StudentPhaseDashboard from "./Student/StudentPhaseDashboard";
import AdminDashBoard from "./Admin/AdminDashBoard";
import AdminPhaseDashBoard from "./Admin/AdminPhaseDashBoard";

interface layoutings {
  [key: string]: React.ComponentType<{ children: JSX.Element }>;
}
const layouts: layoutings = {
  Navigation: Layout,
  studentDashboard: StudentDashBoard,
  none: Blank,
  companyDashboard: CompanyDashBoard,
  companyPhaseDashboard: CompanyPhaseDashboard,
  studentPhaseDashboard: StudentPhaseDashboard,
  adminDashBoard: AdminDashBoard,
  adminPhaseDashBoard: AdminPhaseDashBoard,
};
function LayoutWrapper({ children }: { children: JSX.Element }) {
  let layoutType: string = children.type.layout;
  if (layoutType === undefined) {
    layoutType = "none";
  }
  const Layouter = layouts[layoutType];
  return <Layouter>{children}</Layouter>;
}

export default LayoutWrapper;
