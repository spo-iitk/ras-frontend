import AddIcon from "@mui/icons-material/Add";
import { IconButton, Modal, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationsIcon from "@mui/icons-material/Notifications";

import DataGrid from "@components/DataGrid";
import NewNotice from "@components/Modals/newNotice";
import Meta from "@components/Meta";
import noticeRequest, { NoticeParams } from "@callbacks/admin/rc/notice";
import useStore from "@store/store";

function HandleNotice(props: { id: string }) {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const { token } = useStore();
  const { id } = props;
  return (
    <Stack spacing={3} direction="row">
      <IconButton
        onClick={() => {
          if (rid === undefined || rid === "") return;
          noticeRequest.delete(token, rid, id);
          window.location.reload();
        }}
      >
        <DeleteIcon />
      </IconButton>
      <IconButton
        onClick={() => {
          if (rid === undefined || rid === "") return;
          noticeRequest.notify(token, rid, id);
        }}
      >
        <NotificationsIcon />
      </IconButton>
    </Stack>
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
    headerName: "Title",
    width: 300,
  },
  {
    field: "description",
    headerName: "Description",
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
    headerName: "Delete/Notify",
    renderCell: (params) => <HandleNotice id={params.row.ID} />,
    width: 50,
    align: "center",
    sortable: false,
    filterable: false,
  },
];
function Index() {
  const { token } = useStore();
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const [notices, setNotice] = React.useState<NoticeParams[]>([]);

  const [openNew, setOpenNew] = React.useState(false);
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleCloseNew = () => {
    setOpenNew(false);
  };
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const fetch = async () => {
      if (rid === undefined || rid === "") return;
      const notice: NoticeParams[] = await noticeRequest.getAll(token, rid);

      setNotice(notice);
      setLoading(false);
    };
    fetch();
  }, [rid, token]);

  return (
    <div className="container">
      <Meta title="Notices" />
      <Stack>
        {/* <h1>{rcName}</h1> */}
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

        <DataGrid
          rows={notices}
          getRowId={(row) => row.ID}
          columns={columns}
          loading={loading}
        />
      </Stack>
      <Modal open={openNew} onClose={handleCloseNew}>
        <NewNotice handleCloseNew={handleCloseNew} setNotice={setNotice} />
      </Modal>
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
