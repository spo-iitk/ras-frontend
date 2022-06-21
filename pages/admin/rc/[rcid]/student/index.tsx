import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Modal, Stack } from "@mui/material";

import DataGrid from "@components/DataGrid";
import useStore from "@store/store";
import getStudents, { Student } from "@callbacks/admin/rc/student/getStudents";
import { errorNotification } from "@callbacks/notifcation";
import EditStudent from "@components/Modals/EditStudentDetails";
import ActiveButton from "@components/Buttons/ActiveButton";

function DeleteStudents(props: { id: string }) {
  const { token } = useStore();
  const { id } = props;
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  return (
    <IconButton
      onClick={() => {
        getStudents.deleteStudent(token, rid, id);
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
}

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
  {
    field: "options",
    headerName: "",
    width: 100,
    renderCell: (cellValues) => (
      <DeleteStudents id={cellValues.id.toString()} />
    ),
  },
];
function Index() {
  const [rows, setRows] = React.useState<any>([]);
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const { token } = useStore();
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
              ID: student.ID,
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
  const [openNew, setOpenNew] = useState(false);
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleCloseNew = () => {
    setOpenNew(false);
  };
  return (
    <div>
      <Stack direction="row" justifyContent="space-between">
        <h2>Students</h2>
        <ActiveButton onClick={handleOpenNew}>EDIT</ActiveButton>
        <Modal open={openNew} onClose={handleCloseNew}>
          <EditStudent
            handleCloseNew={handleCloseNew}
            setRows={setRows}
            studentData={rows}
            rcid={rid}
          />
        </Modal>
      </Stack>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
Index.layout = "adminPhaseDashBoard";
export default Index;
