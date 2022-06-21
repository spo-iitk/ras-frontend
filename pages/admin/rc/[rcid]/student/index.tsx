import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

import DataGrid from "@components/DataGrid";
import useStore from "@store/store";
import getStudents, { Student } from "@callbacks/admin/rc/student/getStudents";
import { errorNotification } from "@callbacks/notifcation";
import Meta from "@components/Meta";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "cpi",
    headerName: "CPI",
    width: 100,
  },
  {
    field: "program_department_id",
    headerName: "Department",
    width: 100,
  },
  {
    field: "secondary_program_department_id",
    headerName: "Secondary Department",
    width: 200,
  },
  {
    field: "student_id",
    headerName: "Student ID",
    width: 100,
  },
  {
    field: "is_frozen",
    headerName: "Frozen",
    width: 100,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
];
function Index() {
  const [rows, setRows] = React.useState<any>([]);
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const { token } = useStore();
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const fetch = async () => {
      if (rid === undefined || rid === "") return;
      await getStudents
        .getAllStudents(token, rid)
        .then((res) => {
          setRows(
            res.map((student: Student) => ({
              created_at: student.CreatedAt,
              deleted_at: student.DeletedAt,
              updated_at: student.UpdatedAt,
              comment: student.comment,
              id: student.ID,
              name: student.name,
              email: student.email,
              cpi: student.cpi,
              program_department_id: student.program_department_id,
              secondary_program_department_id:
                student.secondary_program_department_id,
              recruitment_cycle_id: student.recruitment_cycle_id,
              student_id: student.student_id,
              is_frozen: student.is_frozen,
              type: student.type,
            }))
          );
          setLoading(false);
        })
        .catch((err) => {
          errorNotification(
            "Failed to get Students",
            err.response?.data?.message
          );
        });
    };
    fetch();
  }, [rid, token]);
  return (
    <div className="container">
      <Meta title="Students" />
      <h2>Students</h2>
      <DataGrid rows={rows} columns={columns} loading={loading} />
    </div>
  );
}
Index.layout = "adminPhaseDashBoard";
export default Index;
