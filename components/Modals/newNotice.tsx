import { Box, Button, Stack, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";

import NoticeReq, {
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
};

const Input = styled("input")({
  display: "none",
});

function NewNotice({
  handleCloseNew,
  setNotice,
}: {
  handleCloseNew: () => void;
  setNotice: React.Dispatch<React.SetStateAction<NoticeParams[]>>;
}) {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const { token } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NoticeResponse>();
  const ext = { tags: "quant", recruitment_cycle_id: Number(rid) };
  const handleNewNotice = (data: NoticeResponse) => {
    const newNotice = async () => {
      const finData = { ...data, ...ext };
      const response = await NoticeReq.post(token, rid, finData).then(() => {
        const fetch = async () => {
          if (rid === undefined || rid === "") return;
          const Newnotice: NoticeParams[] = await NoticeReq.getAll(token, rid);

          setNotice(Newnotice);
        };
        fetch();
      });

      console.log(response);
    };
    newNotice();
    reset();
    handleCloseNew();
  };

  return (
    <Box sx={boxStyle}>
      <Stack spacing={3}>
        <h1>Add Notice</h1>
        <TextField
          label="Company Name"
          id="selectCompany"
          variant="standard"
          error={!!errors.title}
          helperText={errors.title && "Company Name is required"}
          {...register("title", { required: true })}
        />
        <TextField
          label="Subject"
          id="selectActiveHR"
          variant="standard"
          {...register("subject", { required: true })}
          error={!!errors.subject}
          helperText={errors.subject && "Subject is required"}
        />
        <TextField
          variant="standard"
          multiline
          rows={3}
          placeholder="Write your notice here"
          label="Message"
          {...register("description", { required: true })}
          error={!!errors.description}
          helperText={errors.description && "Message is required"}
        />
        <label
          htmlFor="contained-button-file"
          style={{ margin: "30px auto 10px auto" }}
        >
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
          />
          <Button
            variant="outlined"
            component="span"
            sx={{ width: "200px", borderRadius: 5 }}
          >
            Upload
          </Button>
        </label>
        <Stack direction="row" spacing={2} style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={handleSubmit(handleNewNotice)}
          >
            Add
          </Button>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={() => reset({ title: "", subject: "", description: "" })}
          >
            Reset
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default NewNotice;
