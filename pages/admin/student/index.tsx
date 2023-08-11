import { GridColDef } from "@mui/x-data-grid";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";

import AdminStudentRequest, {
  Student,
} from "@callbacks/admin/student/adminStudent";
import useStore from "@store/store";
import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import { getDeptProgram } from "@components/Parser/parser";

const batchSize = 100;

const columns: GridColDef[] = [
  {
    field: "ID",
    headerName: "ID",
    hide: true,
  },
  {
    field: "name",
    headerName: "Name",
  },
  {
    field: "program_department_id",
    headerName: "Program",
    valueGetter: (rowData) => getDeptProgram(rowData.value),
  },
  {
    field: "CreatedAt",
    headerName: "Created At",
    hide: true,
  },
  {
    field: "UpdatedAt",
    headerName: "Updated At",
    hide: true,
  },
  {
    field: "secondary_program_department_id",
    headerName: "Secondary Program",
    valueGetter: (rowData) => getDeptProgram(rowData.value),
  },
  {
    field: "specialization",
    headerName: "Specialisation",
    hide: true,
  },
  {
    field: "roll_no",
    headerName: "IITK Roll No.",
  },
  {
    field: "preference",
    headerName: "Preference",
    hide: true,
  },
  {
    field: "gender",
    headerName: "Gender",
    hide: true,
  },
  {
    field: "disability",
    headerName: "Disability",
    hide: true,
  },
  {
    field: "dob",
    headerName: "DOB",
    valueGetter: ({ value }) =>
      value && `${new Date(value).toLocaleDateString("en-GB")}`,
    hide: true,
  },
  {
    field: "expected_graduation_year",
    headerName: "Expected Graduation Year",
  },
  {
    field: "iitk_email",
    headerName: "IITK Email",
  },
  {
    field: "personal_email",
    headerName: "Personal Email",
    hide: true,
  },
  {
    field: "phone",
    headerName: "Contact Number",
    hide: true,
  },
  {
    field: "alternate_phone",
    headerName: "Alternate Contact Numer",
    hide: true,
  },
  {
    field: "whatsapp_number",
    headerName: "Whatsapp Number",
    hide: true,
  },
  {
    field: "current_cpi",
    headerName: "Current CPI",
  },
  {
    field: "ug_cpi",
    headerName: "UG CPI(on for PG Students)",
    hide: true,
  },
  {
    field: "tenth_board",
    headerName: "10th Board",
    hide: true,
  },
  {
    field: "tenth_year",
    headerName: "10th Board Year",
    hide: true,
  },
  {
    field: "tenth_marks",
    headerName: "10th Marks",
    hide: true,
  },
  {
    field: "twelfth_board",
    headerName: "12th Board",
    hide: true,
  },
  {
    field: "twelfth_year",
    headerName: "12th Board Year",
    hide: true,
  },
  {
    field: "twelfth_marks",
    headerName: "12th Board Marks",
    hide: true,
  },
  {
    field: "entrance_exam",
    headerName: "Entrance Exam",
    hide: true,
  },
  {
    field: "entrance_exam_rank",
    headerName: "Entrance Exam Rank",
    hide: true,
  },
  {
    field: "category",
    headerName: "Category",
    hide: true,
  },
  {
    field: "category_rank",
    headerName: "Category Rank",
    hide: true,
  },
  {
    field: "current_address",
    headerName: "Current Address",
    hide: true,
  },
  {
    field: "permanent_address",
    headerName: "Permanent Address",
    hide: true,
  },
  {
    field: "friend_name",
    headerName: "Friends Name",
    hide: true,
  },
  {
    field: "friend_phone",
    headerName: "Friends Contact Details",
    hide: true,
  },
  {
    field: "is_verified",
    headerName: "Verified",
    valueGetter: ({ value }) => (value ? "Verified" : "-"),
  },
  {
    field: "is_editable",
    headerName: "Editable",
    hide: true,
  },
  {
    field: "button",
    headerName: "View Details",
    renderCell: (params) => (
      <Button href={`student/${params.row.ID}`} variant="contained" fullWidth>
        View Details
      </Button>
    ),
  },
];

function Index() {
  const [rows, setRows] = useState<Student[]>([]);
  const { token } = useStore();
  const [loading, setLoading] = useState(true);
  const [batch, setBatch] = useState<number>(
    (new Date().getFullYear() % 100) - 2
  );
  const startedFetching = useRef(false);

  const getStudentDataInBatch = useCallback(
    async (pageSize: number, lastFetchedId: number, year: number) => {
      const students = await AdminStudentRequest.getLimited(
        token,
        pageSize,
        lastFetchedId,
        year
      );
      setRows((prev) => [...prev, ...students]);
      return students;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token]
  );

  const getAllStudents = useCallback(
    async (year: number) => {
      let fetchedRecords = batchSize;
      let lastFetchedId = 0;
      while (fetchedRecords === batchSize) {
        // eslint-disable-next-line no-await-in-loop
        const res = await getStudentDataInBatch(batchSize, lastFetchedId, year);
        fetchedRecords = res.length;
        lastFetchedId = res[res.length - 1]?.ID;
        setLoading(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [getStudentDataInBatch]
  );

  useEffect(() => {
    if (!startedFetching.current) {
      getAllStudents(Number(batch));
    }
    startedFetching.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAllStudents, token]);

  const handleChangeBatch = (e: SelectChangeEvent<number>) => {
    setBatch(Number(e.target.value));
    setRows([]);
    getAllStudents(Number(e.target.value));
  };

  return (
    <div>
      <Meta title="Master Student Database - Admin" />
      <h2>Master Database (Student)</h2>
      <Stack direction="column" padding={1} alignItems="flex-start">
        <Typography>Select Batch</Typography>
        <Select
          labelId="select-batch"
          id="select-batch"
          value={batch}
          label="Batch"
          onChange={handleChangeBatch}
        >
          {Array.from(
            { length: (new Date().getFullYear() % 100) - 13 },
            (_, n) => n + 14
          ).map((year) => (
            <MenuItem value={year}>Y{year}</MenuItem>
          ))}
        </Select>
      </Stack>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.ID}
        // onCellClick={(params) => router.push(`student/${params.row.ID}`)}
        loading={loading}
      />
    </div>
  );
}

Index.layout = "adminDashBoard";
export default Index;
