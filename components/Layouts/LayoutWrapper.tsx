import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArticleIcon from "@mui/icons-material/Article";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BarChartIcon from "@mui/icons-material/BarChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import FeedIcon from "@mui/icons-material/Feed";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import PieChartIcon from "@mui/icons-material/PieChart";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { useRouter } from "next/router";
import React from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import ApartmentIcon from "@mui/icons-material/Apartment";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import Blank from "./Blank";
import Layout from "./Layout";
import MasterLayout from "./MasterLayout";

export interface fields {
  route: string;
  isUser: boolean;
  userInfo: {
    avatar: JSX.Element;
    name: string;
    id: string;
  };
  moveBack: boolean;
  moveTo: string;
  userData: userItems[];
}

export interface userItems {
  avatar: JSX.Element;
  name: string;
  id: string;
}
interface layoutings {
  [key: string]: React.ComponentType<{
    children: JSX.Element;
    items?: fields;
  }>;
}

interface iding {
  [key: string]: number;
}
const Ids: iding = {
  studentDashboard: 0,
  studentPhaseDashboard: 1,
  companyDashboard: 2,
  companyPhaseDashboard: 3,
  adminDashBoard: 4,
  adminPhaseDashBoard: 5,
};
const layouts: layoutings = {
  Navigation: Layout,
  studentDashboard: MasterLayout,
  none: Blank,
  companyDashboard: MasterLayout,
  companyPhaseDashboard: MasterLayout,
  studentPhaseDashboard: MasterLayout,
  adminDashBoard: MasterLayout,
  adminPhaseDashBoard: MasterLayout,
};

function LayoutWrapper({ children }: { children: JSX.Element }) {
  let layoutType: string = children.type.layout;
  if (!layoutType) {
    layoutType = "none";
  }
  const Layouter = layouts[layoutType];
  const Id = Ids[layoutType];

  const router = useRouter();
  const { rcid } = router.query;
  const dashbboard_items: fields[] = [
    {
      route: `/student`,
      isUser: true,
      userInfo: {
        avatar: <AccountCircleIcon />,
        name: "User",
        id: "student",
      },
      moveBack: false,
      moveTo: "",
      userData: [
        {
          avatar: <PieChartIcon />,
          name: "Overview",
          id: "/rc",
        },
        {
          avatar: <AccountCircleIcon />,
          name: "Profile",
          id: "/profile",
        },
        {
          avatar: <LightbulbIcon />,
          name: "Placements Insight",
          id: "/placementinsights",
        },
        {
          avatar: <ArticleIcon />,
          name: "Intern Policy",
          id: "/internpolicy",
        },
        {
          avatar: <ArticleIcon />,
          name: "Placement Policy",
          id: "/placementpolicy",
        },
      ],
    },
    {
      route: `/student/rc/${rcid}`,
      isUser: true,
      userInfo: {
        avatar: <AccountCircleIcon />,
        name: "Student",
        id: "student",
      },
      moveBack: true,
      moveTo: "/student/rc",
      userData: [
        {
          avatar: <PieChartIcon />,
          name: "Notices",
          id: "/notices",
        },
        {
          avatar: <ArticleIcon />,
          name: "Manage Resume",
          id: "/resume",
        },
        {
          avatar: <TravelExploreIcon />,
          name: "Job Opening",
          id: "/opening",
        },
        {
          avatar: <FeedIcon />,
          name: "Your Applications",
          id: "/applications",
        },
        {
          avatar: <AssignmentIcon />,
          name: "Proforma",
          id: "/proforma",
        },
        {
          avatar: <CalendarMonthIcon />,
          name: "Calendar",
          id: "/events",
        },
        {
          avatar: <AccountCircleIcon />,
          name: "Attendance",
          id: "/attendance",
        },
        {
          avatar: <EqualizerIcon />,
          name: "Stats",
          id: "/stats",
        },
      ],
    },
    {
      route: `/company`,
      isUser: true,
      userInfo: {
        avatar: <AccountCircleIcon />,
        name: children.type?.companyName || "Company",
        id: "company",
      },
      moveBack: false,
      moveTo: "",
      userData: [
        {
          avatar: <PieChartIcon />,
          name: "Overview",
          id: "",
        },
        {
          avatar: <ArticleIcon />,
          name: "Intern Policy",
          id: "/internpolicy",
        },
        {
          avatar: <ArticleIcon />,
          name: "Placement Policy",
          id: "/placementpolicy",
        },
      ],
    },
    {
      route: `/company/rc/${rcid}`,
      isUser: true,
      userInfo: {
        avatar: <AccountCircleIcon />,
        name: "Company",
        id: "company",
      },
      moveBack: true,
      moveTo: "/company",
      userData: [
        {
          avatar: <PieChartIcon />,
          name: "Overview",
          id: "",
        },
        {
          avatar: <ArticleIcon />,
          name: "Create New Opening",
          id: "/proforma/new",
        },
        {
          avatar: <ArticleIcon />,
          name: "Applications",
          id: "/opening",
        },
      ],
    },
    {
      route: `/admin`,
      isUser: false,
      userInfo: {
        avatar: <AccountCircleIcon />,
        name: "Admin",
        id: "admin",
      },
      moveBack: false,
      moveTo: "",
      userData: [
        {
          avatar: <PieChartIcon />,
          name: "Overview",
          id: "/rc",
        },
        {
          avatar: <BarChartIcon />,
          name: "Master Database (Company)",
          id: "/company",
        },
        {
          avatar: <BarChartIcon />,
          name: "Master Database (Student)",
          id: "/student",
        },
        {
          avatar: <GroupsIcon />,
          name: "Worklog",
          id: "/worklog",
        },
        {
          avatar: <ApartmentIcon />,
          name: "Allotted Companies",
          id: "/allotedcompanies",
        },
        {
          avatar: <ApartmentIcon />,
          name: "Allot Companies",
          id: "/allotcompanies",
        },
      ],
    },
    {
      route: `/admin/rc/${rcid}`,
      isUser: false,
      userInfo: {
        avatar: <AccountCircleIcon />,
        name: "Admin",
        id: "admin",
      },
      moveBack: true,
      moveTo: "/admin/rc",
      userData: [
        {
          avatar: <PieChartIcon />,
          name: "Overview",
          id: "",
        },
        {
          avatar: <ArticleIcon />,
          name: "Notices",
          id: "/notice",
        },
        {
          avatar: <QuestionMarkIcon />,
          name: "Questions",
          id: "/question",
        },
        {
          avatar: <ApartmentIcon />,
          name: "Company",
          id: "/company",
        },
        {
          avatar: <GroupsIcon />,
          name: "Students",
          id: "/student",
        },
        {
          avatar: <BarChartIcon />,
          name: "Stats",
          id: "/stats",
        },
        {
          avatar: <AccountCircleIcon />,
          name: "Attendance",
          id: "/attendance",
        },
        {
          avatar: <ArticleIcon />,
          name: "Resume",
          id: "/resume",
        },
        {
          avatar: <CalendarMonthIcon />,
          name: "Calendar",
          id: "/calendar",
        },
      ],
    },
  ];

  return <Layouter items={dashbboard_items[Id]}>{children}</Layouter>;
}

export default LayoutWrapper;
