/* eslint-disable react/require-default-props */
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  // GridRowHeightParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  MuiEvent,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { useEffect, useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";

import companyRequest from "@callbacks/company/company";
import studentRequest from "@callbacks/student/student";
import whoami from "@callbacks/auth/whoami";
import useStore from "@store/store";

import downloadExcel from "./excelUtils";

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <Image src="/images/norows.png" height={500} width={300} alt="noRows" />
      <Box sx={{ mt: 1, fontSize: 20 }}>No Rows</Box>
    </StyledGridOverlay>
  );
}

function CustomToolbar({ handleDownload }: { handleDownload: () => void }) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <Button startIcon={<DownloadIcon />} onClick={handleDownload} />
      <Box flexGrow={1} />
      <GridToolbarQuickFilter
        showQuickFilter
        quickFilterProps={{ debounceMs: 500 }}
      />
    </GridToolbarContainer>
  );
}
interface paramsType {
  rows: any[];
  columns: GridColDef[];
  onCellClick?: (
    // eslint-disable-next-line no-unused-vars
    params: GridCellParams,
    // eslint-disable-next-line no-unused-vars
    event: MuiEvent<React.MouseEvent>
  ) => void;
  // eslint-disable-next-line no-unused-vars
  getRowId?: (row: any) => string;
  loading?: boolean;
  heighted?: boolean;
}

function Index({
  rows,
  columns,
  onCellClick,
  getRowId,
  loading = false,
  heighted = false,
}: paramsType) {
  const [pageSize, setPageSize] = useState<number>(25);
  const { name, role, token, setToken } = useStore();
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [pageName, setPageName] = useState("");

  useEffect(() => {
    setPageName(document.title);

    const getCompany = async () => {
      const response = await companyRequest.get(token);
      if (response.name === "error401" && response.email === "error401") {
        router.push("/login");
        setToken("");
      }
      setUserId(response.email.split("@")[0]);
    };

    const getStudent = async () => {
      const response = await studentRequest.get(token);
      if (response.ID === -1) {
        router.push("/login");
        setToken("");
      }
      setUserId(response.iitk_email.split("@")[0]);
    };

    const getAdmin = async () => {
      const response = await whoami.get(token);
      if (response.name === "error401" && response.user_id === "error401") {
        router.push("/login");
        setToken("");
      }
      setUserId(response.user_id.split("@")[0]);
    };
    if (token !== "") {
      if (role === 2) getCompany();
      if (role === 1) getStudent();
      if (role === 100 || role === 101 || role === 102 || role === 103)
        getAdmin();
    }
  }, [role, userId, router, token, setToken]);

  const handleDownload = () => {
    downloadExcel(rows, columns, name, userId, pageName);
  };
  const cols = columns.map((col) => ({
    ...col,
    flex: 1,
    minWidth: 150,
  }));

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={cols}
        components={{
          // eslint-disable-next-line react/no-unstable-nested-components
          Toolbar: () => <CustomToolbar handleDownload={handleDownload} />,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        disableDensitySelector
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 25, 50, 100]}
        autoHeight={rows?.length > 0 && heighted === false}
        // getRowHeight={({ id, densityFactor }: GridRowHeightParams) => {
        //   if ((id as number) % 2 === 0) {
        //     return 100 * densityFactor;
        //   }

        //   return null;
        // }}
        rowHeight={80}
        onCellClick={onCellClick}
        getRowId={getRowId}
        sx={{ padding: 2, minHeight: rows?.length > 0 ? 0 : 500 }}
        loading={loading}
      />
    </div>
  );
}

export default Index;
