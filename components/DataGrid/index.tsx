/* eslint-disable react/require-default-props */
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowHeightParams,
  GridToolbar,
  MuiEvent,
} from "@mui/x-data-grid";
import Image from "next/image";
import * as React from "react";

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
}

function Index({ rows, columns, onCellClick, getRowId }: paramsType) {
  const [pageSize, setPageSize] = React.useState<number>(10);

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
          Toolbar: GridToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        disableDensitySelector
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 25, 50, 100]}
        autoHeight={rows.length > 0}
        getRowHeight={({ id, densityFactor }: GridRowHeightParams) => {
          if ((id as number) % 2 === 0) {
            return 100 * densityFactor;
          }

          return null;
        }}
        onCellClick={onCellClick}
        getRowId={getRowId}
        sx={{ padding: 2, minHeight: rows.length > 0 ? 0 : 500 }}
      />
    </div>
  );
}

export default Index;
