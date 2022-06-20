import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

import AdminStudentRequest, {
  Student,
} from "@callbacks/admin/student/adminStudent";
import useStore from "@store/store";
import DataGrid from "@components/DataGrid";

const columns: GridColDef[] = [
  {
    field: "ID",
    headerName: "ID",
    width: 90,
  },
  {
    field: "name",
    headerName: "Name",
    width: 400,
  },
  {
    field: "program",
    headerName: "Program",
    width: 200,
  },
  {
    field: "department",
    headerName: "Department",
    width: 200,
  },
  {
    field: "specialization",
    headerName: "Specialisation",
    width: 200,
  },
  {
    field: "roll_no",
    headerName: "IITK Roll No.",
    width: 200,
  },
  {
    field: "preference",
    headerName: "Preference",
    width: 200,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 200,
  },
  {
    field: "disability",
    headerName: "Disability",
    width: 200,
  },
  {
    field: "dob",
    headerName: "DOB",
    width: 200,
  },
  {
    field: "expected_graduation_year",
    headerName: "Expected Graduation Year",
    width: 200,
  },
  {
    field: "iitk_email",
    headerName: "IITK Email",
    width: 200,
  },
  {
    field: "personal_email",
    headerName: "Personal Email",
    width: 200,
  },
  {
    field: "contact_number",
    headerName: "Contact Number",
    width: 200,
  },
  {
    field: "alternate_contact_number",
    headerName: "Alternate Contact Numer",
    width: 200,
  },
  {
    field: "whatsapp_number",
    headerName: "Whatsapp Number",
    width: 200,
  },
  {
    field: "current_cpi",
    headerName: "Current CPI",
    width: 200,
  },
  {
    field: "ug_cpi",
    headerName: "UG CPI(on for PG Students)",
    width: 200,
  },
  {
    field: "tenth_board",
    headerName: "10th Board",
    width: 200,
  },
  {
    field: "tenth_board_year",
    headerName: "10th Board Year",
    width: 200,
  },
  {
    field: "tenth_marks",
    headerName: "10th Marks",
    width: 200,
  },
  {
    field: "twelfth_board",
    headerName: "12th Board",
    width: 200,
  },
  {
    field: "twelfth_board_year",
    headerName: "12th Board Year",
    width: 200,
  },
  {
    field: "twelfth_marks",
    headerName: "12th Board Marks",
    width: 200,
  },
  {
    field: "entrance_exam",
    headerName: "Entrance Exam",
    width: 200,
  },
  {
    field: "entrance_exam_rank",
    headerName: "Entrance Exam Rank",
    width: 200,
  },
  {
    field: "category",
    headerName: "Category",
    width: 200,
  },
  {
    field: "category_rank",
    headerName: "Category Rank",
    width: 200,
  },
  {
    field: "current_address",
    headerName: "Current Address",
    width: 200,
  },
  {
    field: "permanent_address",
    headerName: "Permanent Address",
    width: 200,
  },
  {
    field: "friend_name",
    headerName: "Friends Name",
    width: 200,
  },
  {
    field: "friend_phone",
    headerName: "Friends Contact Details",
    width: 200,
  },
];

function Index() {
  const [rows, setRows] = useState<Student[]>([]);
  const { token } = useStore();

  useEffect(() => {
    const fetch = async () => {
      const students = await AdminStudentRequest.getAll(token).catch(() => []);

      setRows(students);
    };
    fetch();
  }, [token]);

  return (
    <div>
      <DataGrid rows={rows} columns={columns} getRowId={(row) => row.ID} />
    </div>
  );
}

Index.layout = "adminDashBoard";
export default Index;
