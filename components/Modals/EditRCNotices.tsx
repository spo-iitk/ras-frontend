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
    deadline: "",
  });
  const [isFetched, setisFetched] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NoticeResponse>();

  const handleEditNotice = async (data: NoticeResponse) => {
    const finData = {
      ...data,
      subject: data.title,
      recruitment_cycle_id: 0,
      description,
    };
    await noticeRequest.put(token, rid, finData).then(async () => {
      if (rid === undefined || rid === "") return;
      const newNotices: NoticeParams[] = await noticeRequest.getAll(token, rid);
      setNotice(newNotices);
    });
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

  const handleChange = (value: unknown) => {
    const selectedNotice = notices.find((notice) => notice.ID === value);
    if (selectedNotice) {
      reset(selectedNotice);
      setDescription(selectedNotice.description);
      setCurrNotice(selectedNotice);
      setisFetched(true);
    }
  };

  const formatDate = (date: string): string =>
    date === "0001-01-01T00:00:00Z" ? "N/A" : new Date(date).toLocaleString();

  const publishedDateAndTime = `${new Date(
    currNotice.CreatedAt
  ).toLocaleDateString("en-GB")} ${new Date(
    currNotice.CreatedAt
  ).toLocaleTimeString()}`;
  const isOpeningTag = currNotice.tags.includes("opening");
  const deadlineDate = formatDate(currNotice.deadline);

  return (
    <Box sx={boxStyle}>
      <Stack spacing={3}>
        <h2>Edit Notice</h2>
        <FormControl sx={{ m: 1 }}>
          <InputLabel id="edit-notice">Select ID</InputLabel>
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
              <MenuItem key={notice.ID} value={notice.ID}>
                {notice.ID}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Title"
          id="title"
          variant="filled"
          {...register("title", { required: true })}
          error={!!errors.title}
          helperText={errors.title && "Title is required"}
        />
        <TextField
          label="Published Date and Time"
          variant="standard"
          value={publishedDateAndTime}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Tags (csv)"
          id="tags"
          variant="filled"
          {...register("tags", { required: true })}
          error={!!errors.tags}
          helperText={errors.tags && "Tags are required"}
        />
        {isOpeningTag && (
          <TextField
            label="Deadline"
            variant="standard"
            value={deadlineDate}
            InputProps={{
              readOnly: true,
            }}
          />
        )}
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
