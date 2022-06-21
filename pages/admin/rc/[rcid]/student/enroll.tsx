import React from "react";
import { Card, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import ActiveButton from "@components/Buttons/ActiveButton";
import InactiveButton from "@components/Buttons/InactiveButton";
import Meta from "@components/Meta";
import postEmails, { Emails } from "@callbacks/admin/rc/student/enrollStudents";
import useStore from "@store/store";

interface EnrollForm {
  email: string;
}

function Enroll() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnrollForm>();
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();

  const { token } = useStore();
  const onSubmit = async (data: EnrollForm) => {
    const tosend: Emails = {
      email: [...data.email.split(",")],
    };

    const response = await postEmails.post(token, rid, tosend);
    if (response) {
      reset({
        email: "",
      });
    }
  };

  return (
    <div className="container">
      <Meta title="Enroll - Admin" />
      <h1>Internship 2022-23 Phase 1</h1>
      <div style={{ marginTop: 50 }}>
        <Card
          elevation={5}
          sx={{
            padding: 3,
            width: { xs: "330px", sm: "500px", margin: "0px auto" },
          }}
        >
          <Stack spacing={3}>
            <h1>Enroll (Group)</h1>
            <TextField
              multiline
              error={errors.email !== undefined}
              label="Enter Email Ids"
              id="emails"
              variant="standard"
              {...register("email", { required: true })}
            />
            <Stack
              direction="row"
              spacing={2}
              style={{ justifyContent: "center" }}
            >
              <ActiveButton
                sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
                onClick={handleSubmit(onSubmit)}
              >
                Enroll
              </ActiveButton>
              <InactiveButton
                sx={{ borderRadius: 5, fontSize: 16, width: "100%" }}
                onClick={() => {
                  reset({
                    email: "",
                  });
                }}
              >
                Reset
              </InactiveButton>
            </Stack>
          </Stack>
        </Card>
      </div>
    </div>
  );
}

Enroll.layout = "adminPhaseDashBoard";
export default Enroll;
