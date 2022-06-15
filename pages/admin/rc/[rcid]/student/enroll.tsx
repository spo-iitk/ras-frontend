import React from "react";
import { Card, Stack, TextField } from "@mui/material";
import ActiveButton from "@components/Buttons/ActiveButton";
import InactiveButton from "@components/Buttons/InactiveButton";
import styles from "@styles/adminPhase.module.css";
import Meta from "@components/Meta";
import postEmails, { Emails } from "@callbacks/admin/rc/student/enrollStudents";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

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

  const onSubmit = async (data: EnrollForm) => {
    console.log(data);
    const token = sessionStorage.getItem("token") || "";
    const tosend: Emails = {
      email: [...data.email.split(",")],
    };
    console.log(tosend);

    const response = await postEmails
      .post(token, rid, tosend)
      .then(() => reset({ email: "" }))
      .catch(() => ({ email: [] } as Emails));
    console.log(response);
  };

  return (
    <div className={styles.container}>
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
                  console.log("Hello");
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
