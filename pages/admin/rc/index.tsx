import React, { useEffect, useState } from "react";
import { IconButton, Modal, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";

import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import InactiveButton from "@components/Buttons/InactiveButton";
import rcRequest, { RC } from "@callbacks/admin/rc/rc";
import ActiveButton from "@components/Buttons/ActiveButton";
import useStore from "@store/store";
import AddRC from "@components/Modals/AddRC";

const columns: GridColDef[] = [
  {
    field: "ID",
    headerName: "ID",
    width: 90,
  },
  {
    field: "name",
    headerName: "Recruitment Drive Name",
    width: 200,
  },
  {
    field: "academic_year",
    headerName: "Session",
    width: 100,
  },
  {
    field: "type",
    headerName: "Type of Recruitment",
    width: 175,
  },
  {
    field: "phase",
    headerName: "Recruitment Phase",
    width: 200,
  },
  {
    field: "start_date",
    headerName: "Start Date",
    width: 150,
  },
  {
    field: "is_active",
    headerName: "Status",
    width: 200,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <>
        {!params.value && (
          <InactiveButton sx={{ height: 30, width: "100%" }}>
            INACTIVE
          </InactiveButton>
        )}
        {params.value && (
          <ActiveButton sx={{ height: 30, width: "100%" }}>ACTIVE</ActiveButton>
        )}
      </>
    ),
  },
];

function Index() {
  const router = useRouter();
  const [rows, setRows] = useState<RC[]>([]);
  const { token, setRCName, setRcId } = useStore();
  const [openNew, setOpenNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleCloseNew = () => {
    setOpenNew(false);
  };

  useEffect(() => {
    const getRC = async () => {
      const response = await rcRequest.getAll(token);
      for (let i = 0; i < response.length; i += 1) {
        response[i].name = `${response[i].type} ${response[i].phase}`;
        response[i].start_date = new Date(
          response[i].start_date
        ).toLocaleDateString("en-GB");
      }
      setRows(response);
      setLoading(false);
    };
    getRC();
  }, [token]);
  return (
    <div>
      <Meta title="RC Overview - Admin" />
      <Stack>
        <Stack
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
          direction="row"
        >
          <div>
            <h2>Recruitment Cycle</h2>
          </div>
          <div>
            <IconButton onClick={handleOpenNew}>
              <AddIcon />
            </IconButton>
          </div>
        </Stack>

        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.ID}
          onCellClick={(params) => {
            setRcId(params.row.ID);
            setRCName(
              `${params.row.type} ${params.row.academic_year} ${params.row.phase}`
            );
            router.push(`rc/${params.row.ID}`);
          }}
          loading={loading}
        />
        <Modal open={openNew} onClose={handleCloseNew}>
          <AddRC handleClose={handleCloseNew} />
        </Modal>
      </Stack>
    </div>
  );
}

Index.layout = "adminDashBoard";
export default Index;
