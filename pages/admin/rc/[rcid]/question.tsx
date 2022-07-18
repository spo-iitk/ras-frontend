import AddIcon from "@mui/icons-material/Add";
import { IconButton, Modal, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import UpdateQuestion, { QuestionType } from "@callbacks/admin/addquestion";
import DataGrid from "@components/DataGrid";
import Meta from "@components/Meta";
import AddRCQuestion from "@components/Modals/AddRCQuestion";
import useStore from "@store/store";
import DeleteConfirmation from "@components/Modals/DeleteConfirmation";

function DeleteQues(props: { id: string }) {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const { token } = useStore();
  const { id } = props;
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const handleOpenDeleteModal = () => {
    setDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };

  useEffect(() => {
    if (confirmation) {
      UpdateQuestion.deleteQues(token, rid, id);
    }
  }, [confirmation, id, rid, token]);
  return (
    <>
      <IconButton
        onClick={() => {
          handleOpenDeleteModal();
        }}
      >
        <DeleteIcon />
      </IconButton>
      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <DeleteConfirmation
          handleClose={handleCloseDeleteModal}
          setConfirmation={setConfirmation}
        />
      </Modal>
    </>
  );
}
const columns: GridColDef[] = [
  {
    field: "ID",
    headerName: "ID",
    width: 150,
  },
  {
    field: "type",
    headerName: "Question Type",
    width: 300,
  },
  {
    field: "question",
    headerName: "Question",
    width: 300,
  },
  {
    field: "options",
    headerName: "Options",
    width: 300,
  },
  {
    field: "mandatory",
    headerName: "Mandatory",
    width: 100,
  },
  {
    field: "delete",
    headerName: "",
    renderCell: (params) => <DeleteQues id={params.row.ID} />,
    width: 50,
    align: "center",
  },
];

function RecruitmentCycle() {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const [Ques, setQues] = useState<QuestionType[]>([]);
  const { token } = useStore();
  const [loading, setLoading] = useState(true);
  const getQuestions = async () => {
    if (rid === undefined || rid === "") return;
    const questions = await UpdateQuestion.get(token, rid);
    setQues(questions);
    setLoading(false);
  };

  useEffect(() => {
    if (router.isReady) getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const [openNew, setOpenNew] = useState(false);
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleCloseNew = () => {
    setOpenNew(false);
  };

  return (
    <div>
      <Meta title="Add Questions - Recruitment Cycle" />
      <Stack>
        <Stack
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
          direction="row"
        >
          <h2>Questions</h2>
          <div>
            <IconButton onClick={handleOpenNew}>
              <AddIcon />
            </IconButton>
          </div>
        </Stack>
        <DataGrid
          rows={Ques}
          getRowId={(row: any) => row.ID}
          columns={columns}
          loading={loading}
        />

        <Modal open={openNew} onClose={handleCloseNew}>
          <AddRCQuestion
            getQuestions={getQuestions}
            handleCloseNew={handleCloseNew}
          />
        </Modal>
      </Stack>
    </div>
  );
}

RecruitmentCycle.layout = "adminPhaseDashBoard";
export default RecruitmentCycle;
