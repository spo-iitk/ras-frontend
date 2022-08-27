import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import RichTextEditor from "@components/Editor/RichText";
import noticeRequest, {
  NoticeParams,
  NoticeResponse,
} from "@callbacks/admin/rc/notice";
import useStore from "@store/store";

const boxStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "330px", md: "500px" },
  bgcolor: "background.paper",
  border: "white solid 2px",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  alignItems: "center",
  overflowY: "scroll",
  maxHeight: "90vh",
};

function EditNotice({
  handleCloseEdit,
  setNotice,
}: {
  handleCloseEdit: () => void;
  setNotice: React.Dispatch<React.SetStateAction<NoticeParams[]>>;
}) {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const { token } = useStore();
  const [description, setDescription] = useState<string>("");
  const [notices, setNotices] = useState<NoticeParams[]>([]);
  const [currNotice, setCurrNotice] = useState<NoticeParams>({
    ID: 0,
    recruitment_cycle_id: 0,
    title: "",
    description: "",
    tags: "",
    attachment: "",
    created_by: "",
    CreatedAt: "",
    last_reminder_at: 0,
  });
  const [isFetched, setisFetched] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NoticeResponse>();
  const handleEditNotice = (data: NoticeResponse) => {
    const editNotice = async () => {
      const finData = {
        ...data,
        subject: data.title,
        recruitment_cycle_id: 0,
        description,
      };
      await noticeRequest.put(token, rid, finData).then(() => {
        const fetch = async () => {
          if (rid === undefined || rid === "") return;
          const Newnotice: NoticeParams[] = await noticeRequest.getAll(
            token,
            rid
          );
          setNotice(Newnotice);
        };
        fetch();
      });
    };
    editNotice();
    handleCloseEdit();
  };

  useEffect(() => {
    const getAllNotices = async () => {
      if (rid === undefined || rid === "") return;
      const response: NoticeParams[] = await noticeRequest.getAll(token, rid);
      setNotices(response);
    };
    getAllNotices();
  }, [token, rid]);
  const handleChange = (value: any) => {
    for (let i = 0; i < notices.length; i += 1) {
      if (notices[i].ID === value) {
        reset(notices[i]);
        setDescription(notices[i].description);
        setCurrNotice(notices[i]);
        setisFetched(true);
        break;
      }
    }
  };
  return (
    <Box sx={boxStyle}>
      <Stack spacing={3}>
        <h2>Edit Notice</h2>
        <FormControl sx={{ m: 1 }}>
          <InputLabel id="edit-student">Select ID</InputLabel>
          <Select
            label="ID"
            id="ID"
            labelId="edit-notice"
            variant="standard"
            onChange={(e) => {
              handleChange(e.target.value);
            }}
          >
            {notices.map((notice: NoticeParams) => (
              <MenuItem value={notice.ID}>{notice.ID}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Title"
          id="title"
          variant="filled"
          {...register("title", { required: true })}
          error={!!errors.subject}
          helperText={errors.subject && "Title is required"}
        />
        <TextField
          label="Tags (csv)"
          id="tags"
          variant="filled"
          {...register("tags", { required: true })}
          error={!!errors.tags}
          helperText={errors.tags && "Tags are required"}
        />
        <small style={{ fontWeight: 300 }}>Description</small>
        {isFetched && (
          <RichTextEditor onChange={setDescription} value={description} />
        )}
        <Stack direction="row" spacing={2} style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={handleSubmit(handleEditNotice)}
          >
            EDIT
          </Button>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={() => reset(currNotice)}
          >
            RESET
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default EditNotice;
