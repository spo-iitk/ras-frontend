import AddIcon from "@mui/icons-material/Add";
import {
  IconButton,
  Modal,
  Stack,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import DataGrid from "@components/DataGrid";
import addCompanyRequest, { HR } from "@callbacks/admin/company/company";
import AddHRMD from "@components/Modals/AddHRAdminMD";
import useStore from "@store/store";

const boxStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "330px", md: "500px" },
  bgcolor: "background.paper",
  border: "white solid 2px",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  alignItems: "center",
};

const InactiveHRcotactDetailsColumns: GridColDef[] = [
  {
    field: "ID",
    headerName: "ID",
    width: 125,
  },
  {
    field: "name",
    headerName: "HR Name",
    width: 200,
  },
  {
    field: "email",
    headerName: "HR E-mail",
    width: 200,
  },
  {
    field: "phone",
    headerName: "HR Contact",
    width: 250,
  },
  {
    field: "designation",
    headerName: "Designation",
    width: 250,
  }
];

function InactiveHRContactDetails() {
  const [openNew, setOpenNew] = useState(false);
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleCloseNew = () => {
    setOpenNew(false);
  };
  const [hrRows, setHRRows] = useState<HR[]>([]);
  const { token } = useStore();
  const router = useRouter();
  const companyId = router.query.companyId?.toString() || "";
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchInactiveHRDetails = async () => {
      let response = await addCompanyRequest.getAllInactiveHR(token, companyId);
      setHRRows(response);
      setLoading(false);
    };
    if (router.isReady) {
      fetchInactiveHRDetails();
    }
  }, [companyId, router.isReady, token]);
  return (
    <div>
      <Stack>
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          justifyContent="space-between"
        >
          <h2>HR Contact Details</h2>
          <div>
            <IconButton onClick={handleOpenNew}>
              <AddIcon />
            </IconButton>
          </div>
        </Stack>
        <DataGrid
          rows={hrRows}
          columns={InactiveHRcotactDetailsColumns}
          loading={loading}
          getRowId={(row) => row.ID}
        />
      </Stack>
      <Modal open={openNew} onClose={handleCloseNew}>
        <AddHRMD handleCloseNew={handleCloseNew} />
      </Modal>
    </div>
  );
}

export default InactiveHRContactDetails;
