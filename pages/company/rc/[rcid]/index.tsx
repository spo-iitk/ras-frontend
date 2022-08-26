/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useState } from "react";
import { Button, IconButton, Modal, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AvTimerIcon from "@mui/icons-material/AvTimer";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import ActiveButton from "@components/Buttons/ActiveButton";
import useStore from "@store/store";
import proformaRequest, { ProformaType } from "@callbacks/company/proforma";
import InactiveButton from "@components/Buttons/InactiveButton";
import DeleteConfirmation from "@components/Modals/DeleteConfirmation";

function DeleteProforma({
  id,
  updateCallback,
}: {
  id: string;
  updateCallback: () => Promise<void>;
}) {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const { token } = useStore();

  const [openDeleteModal, setDeleteModal] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const handleOpenDeleteModal = () => {
    setDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };
  useEffect(() => {
    if (confirmation) {
      if (rid === undefined || rid === "") return;
      proformaRequest.delete(token, rid, id).then(() => {
        updateCallback();
      });
    }
  }, [confirmation, id, rid, token, updateCallback]);
  return (
    <>
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
    </>
  );
}

function Overview() {
  const { token } = useStore();

  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();

  const [proformas, setProformas] = useState<ProformaType[]>([]);

  useEffect(() => {
    const getall = async () => {
      const data = await proformaRequest.getAll(token, rid);
      setProformas(data);
    };
    if (router.isReady && rid !== "") getall();
  }, [router.isReady, token, rid]);

  const updateTable = useCallback(async () => {
    const getall = async () => {
      const data = await proformaRequest.getAll(token, rid);
      setProformas(data);
    };
    if (router.isReady && rid !== "") getall();
  }, [token, rid, router]);

  const columns: GridColDef[] = [
    {
      field: "ID",
      headerName: "ID",
    },
    {
      field: "UpdatedAt",
      headerName: "Last Updated",
      valueGetter: ({ value }) =>
        value && `${new Date(value).toLocaleString()}`,
    },
    {
      field: "role",
      headerName: "Role Type",
    },
    {
      field: "profile",
      headerName: "Profile",
    },
    {
      field: "is_approved",
      headerName: "Status",
      renderCell: (params) =>
        params.row.is_approved.Valid ? (
          params.row.is_approved.Bool ? (
            <Button
              variant="outlined"
              sx={{ borderRadius: "10px", width: "80%", color: "green" }}
              color="success"
              startIcon={<CheckIcon sx={{ color: "green" }} />}
            >
              Accepted
            </Button>
          ) : (
            <Button
              variant="outlined"
              sx={{ borderRadius: "10px", width: "80%", color: "red" }}
              color="error"
              startIcon={<CloseIcon sx={{ color: "red" }} />}
            >
              Rejected
            </Button>
          )
        ) : (
          <Button
            variant="outlined"
            sx={{ borderRadius: "10px", width: "80%" }}
            startIcon={<AvTimerIcon />}
          >
            Pending by SPO
          </Button>
        ),
    },
    {
      field: "proforma",
      headerName: "View Proforma",
      width: 200,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <ActiveButton
          href={`/company/rc/${params.row.recruitment_cycle_id}/proforma/${params.row.ID}`}
          sx={{ height: 30, width: "100%" }}
        >
          View Proforma
        </ActiveButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete/Edit",
      width: 200,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        if (params.row?.is_approved?.Valid)
          return (
            <InactiveButton sx={{ height: 30, width: "100%" }}>
              Cannot edit
            </InactiveButton>
          );
        return (
          <>
            <DeleteProforma id={params.row.ID} updateCallback={updateTable} />
            <IconButton
              href={`/company/rc/${params.row.recruitment_cycle_id}/proforma/${params.row.ID}/step1`}
            >
              <EditIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Meta title="Overview" />
      <Stack>
        <h2>Overview</h2>

        <DataGrid
          rows={proformas}
          columns={columns}
          getRowId={(row) => row.ID}
        />
      </Stack>
    </div>
  );
}

Overview.layout = "companyPhaseDashboard";
export default Overview;
