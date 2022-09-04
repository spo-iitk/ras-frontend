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
import React, { useEffect, useState } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import ApartmentIcon from "@mui/icons-material/Apartment";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import StarsIcon from "@mui/icons-material/Stars";
import People from "@mui/icons-material/People";

import useStore from "@store/store";
import companyRequest from "@callbacks/company/company";
import studentRequest from "@callbacks/student/student";
import rcRequestStudent from "@callbacks/student/rc/rc";
import rcRequestCompany from "@callbacks/company/rc/rc";
import rcRequestAdmin from "@callbacks/admin/rc/rc";
import whoami from "@callbacks/auth/whoami";

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
  rcName: string;
  userData: userItems[];
  extra: userItems[];
}

export interface userItems {
  avatar: JSX.Element;
  name: string;
  id: string;
  hidden?: boolean;
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
  const { role, token, setName, setRCName, setToken } = useStore();
  const router = useRouter();
  const { rcid } = router.query;

  const [companyName, setCompanyName] = useState("Company");
  const [studentName, setStudentName] = useState("Student");
  const [email, setEmail] = useState("");
  const [rcName, setRcName] = useState("");

  useEffect(() => {
    const getCompany = async () => {
      const response = await companyRequest.get(token);
      if (response.name === "error401" && response.email === "error401") {
        router.push("/login");
        setToken("");
      }
      setCompanyName(response.name);
      setName(response.name);
    };

    const getStudent = async () => {
      const response = await studentRequest.get(token);
      if (response.ID === -1) {
        router.push("/login");
        setToken("");
      }
      setStudentName(response.name);
      setName(response.name);
    };

    const getRc = async () => {
      if (rcid && rcid !== undefined) {
        if (role === 1) {
          const response = await rcRequestStudent.getAll(token);
          const rc = response.filter(
            (item: any) => item.ID === parseInt(rcid.toString(), 10)
          )[0];
          const name = `${rc.type} ${rc.academic_year} ${rc.phase} `;
          setRcName(name);
          setRCName(name);
        } else if (role === 2) {
          const response = await rcRequestCompany.getAll(token);
          const rc = response.filter(
            (item: any) => item.id === parseInt(rcid.toString(), 10)
          )[0];
          const name = `${rc.name} `;
          setRcName(name);
          setRCName(name);
        } else if (role === 100 || role === 101 || role === 102) {
          const response = await rcRequestAdmin.getAll(token);
          const rc = response.filter(
            (item: any) => item.ID === parseInt(rcid.toString(), 10)
          )[0];
          const name = `${rc.type} ${rc.academic_year} ${rc.phase} `;
          setRcName(name);
          setRCName(name);
        }
      }
    };

    const getAdmin = async () => {
      const response = await whoami.get(token);
      if (response.name === "error401" && response.user_id === "error401") {
        router.push("/login");
        setToken("");
      }
      setStudentName(response.name);
      setEmail(response.user_id.split("@")[0]);
      setName(response.name);
    };
    if (token !== "") {
      if (role === 2) getCompany();
      if (role === 1) getStudent();
      if (role === 100 || role === 101 || role === 102) getAdmin();

      if (rcid && rcid !== "") {
        getRc();
      } else setRcName("Dashboard");
    }
  }, [
    role,
    token,
    setCompanyName,
    setName,
    setStudentName,
    rcid,
    setRCName,
    setToken,
    router,
  ]);

  const dashbboard_items: fields[] = [
    {
      route: `/student`,
      isUser: true,
      userInfo: {
        avatar: <AccountCircleIcon />,
        name: studentName,
        id: "Student",
      },
      moveBack: false,
      moveTo: "",
      rcName,
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
      ],
      extra: [
        {
          avatar: <LightbulbIcon />,
          name: "Placements Insight",
          id: "https://spo.iitk.ac.in/insights",
        },
        {
          avatar: <ArticleIcon />,
          name: "Intern Policy",
          id: "https://spo.iitk.ac.in/docs/students/internship-policy.pdf",
        },
        {
          avatar: <ArticleIcon />,
          name: "Placement Policy",
          id: "https://spo.iitk.ac.in/docs/2021-22/Placement_Policy_2021-22.pdf",
        },
        {
          avatar: <StarsIcon />,
          name: "Credits",
          id: `/credits`,
        },
      ],
    },
    {
      route: `/student/rc/${rcid}`,
      isUser: true,
      userInfo: {
        avatar: <AccountCircleIcon />,
        name: studentName,
        id: "Student",
      },
      moveBack: true,
      moveTo: "/student/rc",
      rcName,
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
        {
          avatar: <QuestionMarkIcon />,
          name: "Enrollment Questions",
          id: "/enroll",
        },
      ],
      extra: [
        {
          avatar: <StarsIcon />,
          name: "Credits",
          id: `/credits`,
        },
      ],
    },
    {
      route: `/company`,
      isUser: true,
      userInfo: {
        avatar: <AccountCircleIcon />,
        name: companyName,
        id: "Company",
      },
      moveBack: false,
      moveTo: "",
      rcName,
      userData: [
        {
          avatar: <PieChartIcon />,
          name: "Recruitment Drives",
          id: "",
        },
        {
          avatar: <People />,
          name: "Registered HRs",
          id: "/hr",
        },
      ],
      extra: [
        {
          avatar: <ArticleIcon />,
          name: "Intern Policy",
          id: "https://spo.iitk.ac.in/assets/companies_links/Internship-Policy-Companies.pdf",
        },
        {
          avatar: <ArticleIcon />,
          name: "Placement Policy",
          id: "https://spo.iitk.ac.in/docs/company/placement-policy.pdf",
        },
        {
          avatar: <StarsIcon />,
          name: "Credits",
          id: `/credits`,
        },
      ],
    },
    {
      route: `/company/rc/${rcid}`,
      isUser: true,
      userInfo: {
        avatar: <AccountCircleIcon />,
        name: companyName,
        id: "Company",
      },
      moveBack: true,
      moveTo: "/company",
      rcName,
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
      extra: [
        {
          avatar: <StarsIcon />,
          name: "Credits",
          id: `/credits`,
        },
      ],
    },
    {
      route: `/admin`,
      isUser: true,
      userInfo: {
        avatar: <AccountCircleIcon />,
        name: studentName,
        id: email,
      },
      moveBack: false,
      moveTo: "",
      rcName,
      userData: [
        {
          avatar: <PieChartIcon />,
          name: "Overview",
          id: "/rc",
        },
        {
          avatar: <BarChartIcon />,
          name: "Master Database (Student)",
          id: "/student",
        },
        // conditional rendering
        role === 100 || role === 101
          ? {
              avatar: <BarChartIcon />,
              name: "Master Database (Company)",
              id: "/company",
            }
          : // eslint-disable-next-line react/jsx-no-useless-fragment
            { avatar: <></>, name: "", id: "", hidden: true },
        role === 100 || role === 101
          ? {
              avatar: <BarChartIcon />,
              name: "User Database",
              id: "/users",
            }
          : // eslint-disable-next-line react/jsx-no-useless-fragment
            { avatar: <></>, name: "", id: "", hidden: true },
      ],
      extra: [
        {
          avatar: <StarsIcon />,
          name: "Credits",
          id: `/credits`,
        },
      ],
    },
    {
      route: `/admin/rc/${rcid}`,
      isUser: true,
      userInfo: {
        avatar: <AccountCircleIcon />,
        name: studentName,
        id: email,
      },
      moveBack: true,
      moveTo: "/admin/rc",
      rcName,
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
          avatar: <ArticleIcon />,
          name: "Proforma",
          id: "/proforma",
        },
        {
          avatar: <ArticleIcon />,
          name: "Resume",
          id: "/resume",
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
          avatar: <CalendarMonthIcon />,
          name: "Events",
          id: "/event",
        },
        {
          avatar: <BarChartIcon />,
          name: "Stats",
          id: "/stats",
        },
        {
          avatar: <QuestionMarkIcon />,
          name: "Questions",
          id: "/question",
        },
        {
          avatar: <AccountCircleIcon />,
          name: "Attendance",
          id: "/attendance",
        },
        {
          avatar: <CalendarMonthIcon />,
          name: "Calendar",
          id: "/calendar",
        },
      ],
      extra: [
        {
          avatar: <StarsIcon />,
          name: "Credits",
          id: `/credits`,
        },
      ],
    },
  ];

  return <Layouter items={dashbboard_items[Id]}>{children}</Layouter>;
}

export default LayoutWrapper;
