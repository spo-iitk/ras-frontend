import { Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { useRouter } from "next/router";

import DataGrid from "@components/DataGrid";
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
    field: "description",
    headerName: "Description",
    width: 300,
  },
  {
    field: "CreatedAt",
    valueGetter: ({ value }) =>
      value &&
      `${new Date(value).toLocaleDateString()} ${new Date(
        value
      ).toLocaleTimeString()}`,
    headerName: "Published Date And Time",
    width: 200,
  },
];
function Notices() {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const { token } = useStore();
  const [notices, setNotice] = React.useState<NoticeParams[]>([]);
  React.useEffect(() => {
    const fetch = async () => {
      if (rid === undefined || rid === "") return;
      const notice: NoticeParams[] = await NoticeSReq.getSAll(token, rid);
      setNotice(notice);
    };
    fetch();
  }, [rid, token]);

  return (
    <div className="container">
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

        <DataGrid rows={notices} getRowId={(row) => row.ID} columns={columns} />
      </Stack>
    </div>
  );
}

Notices.layout = "studentPhaseDashboard";
export default Notices;
