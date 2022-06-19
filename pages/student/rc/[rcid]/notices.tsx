import { Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { useRouter } from "next/router";

import styles from "@styles/studentInternPhase.module.css";
import Meta from "@components/Meta";
import { NoticeParams } from "@callbacks/admin/rc/notice";
import useStore from "@store/store";
import NoticeSReq from "@callbacks/student/rc/noticeS";

const columns: GridColDef[] = [
  {
    field: "ID",
    headerName: "Id",
    width: 100,
  },
  {
    field: "title",
    headerName: "Company Name",
    width: 300,
  },
  {
    field: "CreatedAt",
    valueGetter: ({ value }) => value && new Date(value),
    headerName: "Published Date And Time",
    width: 200,
  },
];

// const rows = [
//   { id: 1, name: "Company Name : Title", publishedDateAndTime: "May 26 2019" },
// ];

function Notices() {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const { token } = useStore();
  const [notices, setNotice] = React.useState<NoticeParams[]>([
    {
      ID: 0,
      recruitment_cycle_id: 0,
      title: "I",
      description: "",
      tags: "",
      attachment: "",
      created_by: "",
      CreatedAt: "",
      last_reminder_at: 0,
    },
  ]);
  React.useEffect(() => {
    const fetch = async () => {
      if (rid === undefined || rid === "") return;
      // const token = sessionStorage.getItem("token") || "";
      const notice: NoticeParams[] = await NoticeSReq.getSAll(token, rid);
      setNotice(notice);
    };
    fetch();
  }, [rid, token]);

  return (
    <div className={styles.container}>
      <Meta title="Notices" />
      <Stack>
        <h1>Internship 2022-23 Phase 1</h1>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <h2>Notices</h2>
        </Stack>
        <div
          style={{ height: 500, margin: "0px auto" }}
          className={styles.datagridNotices}
        >
          <DataGrid
            rows={notices}
            getRowId={(row: NoticeParams) => row.ID}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
          />
        </div>
      </Stack>
    </div>
  );
}

Notices.layout = "studentPhaseDashboard";
export default Notices;
