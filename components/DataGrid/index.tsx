import * as React from "react";
import { DataGrid, GridRowHeightParams, GridToolbar } from "@mui/x-data-grid";

function Index({ rows, cols }: any) {
  const [pageSize, setPageSize] = React.useState<number>(10);

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={cols}
        components={{ Toolbar: GridToolbar }}
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
