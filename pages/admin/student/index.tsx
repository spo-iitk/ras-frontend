import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

import AdminStudentRequest, {
  Student,
} from "@callbacks/admin/student/adminStudent";
import useStore from "@store/store";
import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import { getDeptProgram } from "@components/Parser/parser";

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
        Click
      </Button>
    ),
  },
];

function Index() {
  const [rows, setRows] = useState<Student[]>([]);
  const { token } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const students = await AdminStudentRequest.getAll(token).catch(() => []);
      setRows(students);
      setLoading(false);
    };
    fetch();
  }, [token]);

  return (
    <div>
      <Meta title="Master Student Database - Admin" />
      <h2>Master Database (Student)</h2>
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
