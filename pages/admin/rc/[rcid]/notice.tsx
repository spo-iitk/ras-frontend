import AddIcon from "@mui/icons-material/Add";
import { IconButton, Modal, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationsIcon from "@mui/icons-material/Notifications";

import styles from "@styles/adminPhase.module.css";
import NewNotice from "@components/Modals/newNotice";
import Meta from "@components/Meta";
import NoticeReq, { NoticeParams } from "@callbacks/admin/rc/notice";
import useStore from "@store/store";

function DeleteNotice(props: { id: string }) {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const { token } = useStore();
  const { id } = props;
  return (
    <IconButton
      onClick={() => {
        if (rid === undefined || rid === "") return;
        NoticeReq.delete(token, rid, id);
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
}
function NotifyNotice(props: { id: string }) {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const { token } = useStore();
  const { id } = props;
  return (
    <IconButton
      onClick={() => {
        if (rid === undefined || rid === "") return;
        NoticeReq.notify(token, rid, id);
      }}
    >
      <NotificationsIcon />
    </IconButton>
  );
}
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
    headerName: "Published Date And Time",
    valueGetter: ({ value }) =>
      value &&
      `${new Date(value).toLocaleDateString()} ${new Date(
        value
      ).toLocaleTimeString()}`,
    width: 200,
  },
  {
    field: "button1",
    headerName: "",
    renderCell: (params) => <DeleteNotice id={params.row.ID} />,
    width: 50,
    align: "center",
  },
  {
    field: "button2",
    headerName: "",
    renderCell: (params) => <NotifyNotice id={params.row.ID} />,
    width: 50,
    align: "center",
  },
  // {
  //   field: "button2",
  //   headerName: "",
  //   renderCell: () => (
  //     <IconButton
  //       onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
  //         const { id } = e.currentTarget;
  //         await NoticeReq.notif(token, id);
  //       }}
  //     >
  //       <NotificationsIcon />
  //     </IconButton>
  //   ),
  //   width: 50,
  //   align: "center",
  // },
];
function Index() {
  const { token } = useStore();
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
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

  const [openNew, setOpenNew] = React.useState(false);
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleCloseNew = () => {
    setOpenNew(false);
  };
  React.useEffect(() => {
    const fetch = async () => {
      if (rid === undefined || rid === "") return;
      const notice: NoticeParams[] = await NoticeReq.getAll(token, rid);

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
          <Stack direction="row" spacing={3}>
            <IconButton onClick={handleOpenNew}>
              <AddIcon />
            </IconButton>
          </Stack>
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
      <Modal open={openNew} onClose={handleCloseNew}>
        <NewNotice handleCloseNew={handleCloseNew} setNotice={setNotice} />
      </Modal>
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
