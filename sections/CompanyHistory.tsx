import { FormControl, Stack, TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import DataGrid from "@components/DataGrid";
import addCompanyRequest, {
  CompanyHistory,
} from "@callbacks/admin/company/company";
import useStore from "@store/store";

const CompanyHistoryColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
  },
  {
    field: "recruitmentCycleID",
    headerName: "Recruitment Drive",
    flex: 1,
  },
  {
    field: "comments",
    headerName: "Comments",
    flex: 1,
    renderCell: (params) => (
      <Stack
        direction="row"
        alignItems="center"
        width="100%"
        justifyContent="space-between"
      >
        <FormControl sx={{ m: 1 }}>
          <TextField
            label="Comment"
            id="comment"
            variant="standard"
            value={params.row.Comments}
            sx={{ minWidth: "20vw" }}
            disabled
          />
        </FormControl>
      </Stack>
    ),
  },
];

function CompanyHistory() {
  const [companyHistoryRows, setCompanyHistoryRows] = useState<
    CompanyHistory[]
  >([]);
  const { token } = useStore();
  const router = useRouter();

  useEffect(() => {
    const fetchCompanyHistory = async () => {
      const companyId = router.query.companyId?.toString() || "";

      const historyData = await addCompanyRequest.getCompanyHistory(
        token,
        companyId
      );
      setCompanyHistoryRows(historyData);
    };

    fetchCompanyHistory();
  }, [router.query.companyId, token]);

  return (
    <div>
      <Stack>
        <h2>Company History</h2>
        <DataGrid rows={companyHistoryRows} columns={CompanyHistoryColumns} />
      </Stack>
    </div>
  );
}

export default CompanyHistory;
