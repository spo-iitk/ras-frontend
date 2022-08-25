import { Box, Button, Stack, TextField } from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import RichTextEditor from "@components/Editor/RichText";
import noticeRequest, {
  NoticeParams,
  NoticeResponse,
} from "@callbacks/admin/rc/notice";
import useStore from "@store/store";
import requestCompany, { CompanyRc } from "@callbacks/admin/rc/company";

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
  const [companies, setCompanies] = useState<CompanyRc[]>([]);
  const [company, setCompany] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const getCompanydata = async () => {
      if (rid === undefined || rid === "") return;
      let response = await requestCompany.getall(token, rid);
      setCompanies(response);
    };
    if (rid !== "") getCompanydata();
  }, [token, rid]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NoticeResponse>();
  const handleNewNotice = (data: NoticeResponse) => {
    const newNotice = async () => {
      const finData = {
        ...data,
        title: `${data.subject} - ${company}`,
        recruitment_cycle_id: Number(rid),
        description,
      };
      await noticeRequest.post(token, rid, finData).then(() => {
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
    newNotice();
    reset();
    handleCloseNew();
  };

  return (
    <Box sx={boxStyle}>
      <Stack spacing={3}>
        <h2>Add Notice</h2>
        <Autocomplete
          disablePortal
          id="selectCompany"
          options={companies.map((row) => ({
            id: row.ID,
            label: row.company_name,
          }))}
          renderInput={(params) => (
            <TextField {...params} label="Select Company" />
          )}
          onChange={(e, v) => {
            e.preventDefault();
            if (v != null) setCompany(v.label);
          }}
        />
        <TextField
          label="Subject"
          id="subject"
          variant="standard"
          {...register("subject", { required: true })}
          error={!!errors.subject}
          helperText={errors.subject && "Subject is required"}
        />
        <TextField
          label="Tags (csv)"
          id="tags"
          variant="standard"
          {...register("tags", { required: true })}
          error={!!errors.tags}
          helperText={errors.tags && "Tags are required"}
        />
        <small style={{ fontWeight: 300 }}>Description</small>
        <RichTextEditor
          value={description}
          onChange={setDescription}
          style={{ minHeight: 200 }}
        />
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
