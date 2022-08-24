import AddIcon from "@mui/icons-material/Add";
import { IconButton, Modal, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EditIcon from "@mui/icons-material/Edit";

import EditRCNotices from "@components/Modals/EditRCNotices";
import ViewNotice from "@components/Modals/ViewNotice";
import DataGrid from "@components/DataGrid";
import NewNotice from "@components/Modals/newNotice";
import Meta from "@components/Meta";
import noticeRequest, { NoticeParams } from "@callbacks/admin/rc/notice";
import useStore from "@store/store";
import DeleteConfirmation from "@components/Modals/DeleteConfirmation";
import NotifyConfirmation from "@components/Modals/NotifyConfirmation";

function HandleNotice(props: { id: string }) {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const { token } = useStore();
  const { id } = props;
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [openNotifyModal, setNotifyModal] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [notify, setNotify] = useState(false);
  const handleOpenDeleteModal = () => {
    setDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };
  const handleOpenNotifyModal = () => {
    setNotifyModal(true);
  };
  const handleCloseNotifyModal = () => {
    setNotifyModal(false);
  };

  useEffect(() => {
    if (confirmation) {
      if (rid === undefined || rid === "") return;
      noticeRequest.delete(token, rid, id);
      window.location.reload();
    }
  }, [confirmation, id, rid, token]);
  useEffect(() => {
    if (notify) {
      if (rid === undefined || rid === "") return;
      noticeRequest.notify(token, rid, id);
    }
  }, [notify, id, rid, token]);
  return (
    <Stack spacing={3} direction="row">
      <IconButton
        onClick={() => {
          handleOpenDeleteModal();
        }}
      >
        <DeleteIcon />
      </IconButton>
      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <DeleteConfirmation
          handleClose={handleCloseDeleteModal}
          setConfirmation={setConfirmation}
        />
      </Modal>
      <IconButton
        onClick={() => {
          handleOpenNotifyModal();
        }}
      >
        <NotificationsIcon />
      </IconButton>
      <Modal open={openNotifyModal} onClose={handleCloseNotifyModal}>
        <NotifyConfirmation
          handleClose={handleCloseNotifyModal}
          setConfirmation={setNotify}
        />
      </Modal>
    </Stack>
  );
}

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
    field: "CreatedAt",
    headerName: "Published Date And Time",
    valueGetter: ({ value }) => value && `${new Date(value).toLocaleString()}`,
  },
  {
    field: "tags",
    headerName: "Tags",
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
  const { token, rcName } = useStore();
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const [notices, setNotice] = useState<NoticeParams[]>([]);
  const [loading, setLoading] = useState(true);
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

  const [openView, setOpenView] = useState(false);
  const handleOpenView = () => {
    setOpenView(true);
  };
  const handleCloseView = () => {
    setOpenView(false);
  };

  const [openNew, setOpenNew] = useState(false);
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleCloseNew = () => {
    setOpenNew(false);
  };

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  useEffect(() => {
    const fetch = async () => {
      if (rid === undefined || rid === "") return;
      const notice: NoticeParams[] = await noticeRequest.getAll(token, rid);

      setNotice(notice);
      setLoading(false);
    };
    fetch();
  }, [rid, token]);

  return (
    <div>
      <Meta title={`Notices - ${rcName}`} />
      <Stack>
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
            <IconButton onClick={handleOpenEdit}>
              <EditIcon />
            </IconButton>
          </Stack>
        </Stack>

        <DataGrid
          rows={notices}
          getRowId={(row) => row.ID}
          columns={columns}
          loading={loading}
          onCellClick={(params) => {
            setCurrentNotice(params.row);
            handleOpenView();
          }}
        />
      </Stack>
      <Modal open={openNew} onClose={handleCloseNew}>
        <NewNotice handleCloseNew={handleCloseNew} setNotice={setNotice} />
      </Modal>
      <Modal open={openView} onClose={handleCloseView}>
        <ViewNotice currentNotice={currentNotice} />
      </Modal>
      <Modal open={openEdit} onClose={handleCloseEdit}>
        <EditRCNotices
          handleCloseEdit={handleCloseEdit}
          setNotice={setNotice}
        />
      </Modal>
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
