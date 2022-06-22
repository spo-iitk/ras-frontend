import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

import AdminStudentRequest, {
  Student,
} from "@callbacks/admin/student/adminStudent";
import useStore from "@store/store";
import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";

const columns: GridColDef[] = [
  {
    field: "ID",
    headerName: "ID",
  },
  {
    field: "name",
    headerName: "Name",
  },
  {
    field: "program",
    headerName: "Program",
  },
  {
    field: "department",
    headerName: "Department",
  },
  {
    field: "specialization",
    headerName: "Specialisation",
  },
  {
    field: "roll_no",
    headerName: "IITK Roll No.",
  },
  {
    field: "preference",
    headerName: "Preference",
  },
  {
    field: "gender",
    headerName: "Gender",
  },
  {
    field: "disability",
    headerName: "Disability",
  },
  {
    field: "dob",
    headerName: "DOB",
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
  },
  {
    field: "contact_number",
    headerName: "Contact Number",
  },
  {
    field: "alternate_contact_number",
    headerName: "Alternate Contact Numer",
  },
  {
    field: "whatsapp_number",
    headerName: "Whatsapp Number",
  },
  {
    field: "current_cpi",
    headerName: "Current CPI",
  },
  {
    field: "ug_cpi",
    headerName: "UG CPI(on for PG Students)",
  },
  {
    field: "tenth_board",
    headerName: "10th Board",
  },
  {
    field: "tenth_board_year",
    headerName: "10th Board Year",
  },
  {
    field: "tenth_marks",
    headerName: "10th Marks",
  },
  {
    field: "twelfth_board",
    headerName: "12th Board",
  },
  {
    field: "twelfth_board_year",
    headerName: "12th Board Year",
  },
  {
    field: "twelfth_marks",
    headerName: "12th Board Marks",
  },
  {
    field: "entrance_exam",
    headerName: "Entrance Exam",
  },
  {
    field: "entrance_exam_rank",
    headerName: "Entrance Exam Rank",
  },
  {
    field: "category",
    headerName: "Category",
  },
  {
    field: "category_rank",
    headerName: "Category Rank",
  },
  {
    field: "current_address",
    headerName: "Current Address",
  },
  {
    field: "permanent_address",
    headerName: "Permanent Address",
  },
  {
    field: "friend_name",
    headerName: "Friends Name",
  },
  {
    field: "friend_phone",
    headerName: "Friends Contact Details",
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
    <div className="container">
      <Meta title="Master Student Database - Admin" />
      <h1>Master Database (Student)</h1>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.ID}
        loading={loading}
      />
    </div>
  );
}

Index.layout = "adminDashBoard";
export default Index;
