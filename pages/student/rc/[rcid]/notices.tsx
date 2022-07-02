import { Modal, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import { NoticeParams } from "@callbacks/admin/rc/notice";
import useStore from "@store/store";
import NoticeSReq from "@callbacks/student/rc/noticeS";
import ViewNotice from "@components/Modals/ViewStudentNotice";

const columns: GridColDef[] = [
  {
    field: "ID",
    headerName: "Id",
  },
  {
    field: "title",
    headerName: "Title",
  },
  {
    field: "description",
    headerName: "Description",
  },
  {
    field: "CreatedAt",
    valueGetter: ({ value }) => value && `${new Date(value).toLocaleString()}`,
    headerName: "Published Date And Time",
  },
];
function Notices() {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const { token } = useStore();
  const [openNew, setOpenNew] = useState(false);
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleCloseNew = () => {
    setOpenNew(false);
  };
  const [notices, setNotice] = useState<NoticeParams[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentNotice, setCurrentNotice] = useState<NoticeParams>({
    ID: 0,
    recruitment_cycle_id: 0,
    title: "",
    description: "",
    tags: "",
    attachment: "",
    created_by: "",
    CreatedAt: "",
    last_reminder_at: 0,
  });

  useEffect(() => {
    const fetch = async () => {
      if (rid === undefined || rid === "") return;
      const notice: NoticeParams[] = await NoticeSReq.getSAll(token, rid);
      setNotice(notice);
      setLoading(false);
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

        <DataGrid
          rows={notices}
          getRowId={(row) => row.ID}
          columns={columns}
          loading={loading}
          onCellClick={(params) => {
            setCurrentNotice(params.row);
            handleOpenNew();
          }}
        />
      </Stack>
      <Modal open={openNew} onClose={handleCloseNew}>
        <ViewNotice currentNotice={currentNotice} />
      </Modal>
    </div>
  );
}

Notices.layout = "studentPhaseDashboard";
export default Notices;
