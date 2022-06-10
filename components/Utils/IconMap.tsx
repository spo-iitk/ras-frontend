import React from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import FeedIcon from "@mui/icons-material/Feed";
import GroupsIcon from "@mui/icons-material/Groups";
import HandshakeIcon from "@mui/icons-material/Handshake";
import MonitorIcon from "@mui/icons-material/Monitor";
import PeopleIcon from "@mui/icons-material/People";
import ScreenshotMonitorIcon from "@mui/icons-material/ScreenshotMonitor";

const iconMap: { [key: string]: React.ReactElement } = {
  Applications: <AssignmentIcon fontSize="large" />,
  "Pre-Placement Talk": <MonitorIcon fontSize="large" />,
  "Resume Shortlisting": <FeedIcon fontSize="large" />,
  "Group Discussion": <GroupsIcon fontSize="large" />,
  "Technical Test": <ScreenshotMonitorIcon fontSize="large" />,
  "Aptitude Test": <AssignmentIcon fontSize="large" />,
  "Technical Interview": <PeopleIcon fontSize="large" />,
  "HR Interview": <HandshakeIcon fontSize="large" />,
  Other: <AttachFileIcon fontSize="large" />,
};

export default iconMap;
