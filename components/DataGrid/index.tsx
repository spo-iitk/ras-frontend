import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRowHeightParams,
  GridToolbar,
} from "@mui/x-data-grid";

interface params {
  rows: any[];
  columns: GridColDef[];
}

function Index({ rows, columns }: params) {
  const [pageSize, setPageSize] = React.useState<number>(10);

  const cols = columns.map((col) => ({
    ...col,
    flex: 1,
    minWidth: 200,
  }));

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={cols}
        components={{ Toolbar: GridToolbar }}
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
        autoHeight
        getRowHeight={({ id, densityFactor }: GridRowHeightParams) => {
          if ((id as number) % 2 === 0) {
            return 100 * densityFactor;
          }

          return null;
        }}
      />
    </div>
  );
}

export default Index;
