import {
  Button,
  Card,
  CardContent,
  Grid,
  List,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Meta from "@components/Meta";
import countData, { APPCount, RCCount } from "@callbacks/admin/rc/count";
import useStore from "@store/store";
import noticeRequest, { NoticeParams } from "@callbacks/admin/rc/notice";

const RecCompany = [
  { id: 1, Name: "Company Name: Registered", data: "4238" },
  { id: 1, Name: "Company Name: Registered", data: "4238" },
  { id: 1, Name: "Company Name: Registered", data: "4238" },
  { id: 2, Name: "Company Name: Uploaded", data: "4238" },
];
const EventSchd = [
  { id: 1, Name: "Company Name: Test", data: "4238" },
  { id: 2, Name: "Company Name: Interview", data: "4238" },
  { id: 2, Name: "Company Name: GD", data: "4238" },
  { id: 2, Name: "Company Name: PPT", data: "4238" },
];
const EventNotSchd = [
  { id: 1, Name: "Company Name: PPT", data: "4238" },
  { id: 2, Name: "Company Name: Test", data: "4238" },
  { id: 1, Name: "Company Name: PPT", data: "4238" },
  { id: 2, Name: "Company Name: Test", data: "4238" },
];
function Index() {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const [rcdata, setData] = React.useState<RCCount>({
    registered_student: 0,
    registered_company: 0,
  });
  const [notices, setNotice] = React.useState<NoticeParams[]>([
    {
      ID: 0,
      recruitment_cycle_id: 0,
      title: "I",
      description: "",
      tags: "",
      attachment: "",
      created_by: "",
      CreatedAt: "",
      last_reminder_at: 0,
    },
  ]);
  const [appdata, setApp] = React.useState<APPCount>({ roles: 0, ppo_pio: 0 });
  const { token, rcName } = useStore();
  useEffect(() => {
    const fetch = async () => {
      const comapny_res = await countData.getRC(token, rid);
      const app_res = await countData.getApplications(token, rid);
      setData(comapny_res);
      setApp(app_res);
    };
    if (rid !== "") fetch();
    const fetchNotice = async () => {
      const notice: NoticeParams[] = await noticeRequest.getAll(token, rid);
      setNotice(notice);
    };
    if (rid !== "") fetchNotice();
  }, [rid, token]);

  const handleClick = () => {
    router.push(`/admin/rc/${rid}/notice`);
  };
  return (
    <div className="container">
      <Meta title={`Admin Dashboard - ${rcName}`} />
      <Stack>
        {/* <h1>{rcName}</h1> */}

        <Stack
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
          direction="row"
          sx={{ m: 5 }}
        >
          <Button
            variant="contained"
            endIcon={<EditIcon />}
            sx={{ width: "150px" }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            endIcon={<DeleteIcon />}
            sx={{ width: "150px" }}
          >
            Delete
          </Button>
        </Stack>
        <Grid container justifyContent="space-evenly" spacing={2}>
          <Grid item xs={6} md={3} sx={{ padding: 0 }}>
            <Card
              sx={{
                height: { xs: 100, md: 200 },
                border: "2px solid blue",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardContent>
                <Typography
                  color="text.secondary"
                  sx={{
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: { xs: "1rem", md: "1.5rem" },
                  }}
                >
                  Total Enrolled
                </Typography>

                <Typography
                  gutterBottom
                  sx={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: { xs: "1rem", md: "3rem" },
                  }}
                >
                  {rcdata.registered_student}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card
              sx={{
                height: { xs: 100, md: 200 },
                border: "2px solid blue",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: { xs: "1rem", md: "1.5rem" },
                  }}
                >
                  Total Placed
                </Typography>

                <Typography
                  gutterBottom
                  sx={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: { xs: "1rem", md: "3rem" },
                  }}
                >
                  {appdata.ppo_pio}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card
              sx={{
                height: { xs: 100, md: 200 },
                border: "2px solid blue",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: { xs: "1rem", md: "1.5rem" },
                  }}
                >
                  Total Company
                </Typography>

                <Typography
                  gutterBottom
                  sx={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: { xs: "1rem", md: "3rem" },
                  }}
                >
                  {rcdata.registered_company}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card
              sx={{
                height: { xs: 100, md: 200 },
                border: "2px solid blue",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: { xs: "1rem", md: "1.5rem" },
                  }}
                >
                  No of Roles
                </Typography>

                <Typography
                  gutterBottom
                  sx={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: { xs: "1rem", md: "3rem" },
                  }}
                >
                  {appdata.roles}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="space-evenly">
          <Grid item xs={12} md={6}>
            <Card sx={{ margin: "2rem 0px", borderRadius: 5 }} elevation={5}>
              <Grid container spacing={1} sx={{ padding: "10px 3ch" }}>
                <Grid item xs={6}>
                  <h3>Notices</h3>
                  <h5 style={{ position: "relative", bottom: "1rem" }}>
                    Posted by: SPO Team
                  </h5>
                </Grid>
                <Grid item xs={6}>
                  <h5
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      color: "blue",
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                      onClick={handleClick}
                    >
                      View All
                    </Button>
                  </h5>
                </Grid>
              </Grid>
              <hr />
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  padding: "1rem",
                }}
              >
                <div style={{ margin: "15px 0px", minHeight: "9rem" }}>
                  {notices.map((value, i) => {
                    if (i < 4) {
                      return (
                        <Grid
                          container
                          sx={{ padding: "0px 1ch", marginBottom: "1rem" }}
                        >
                          <Grid item xs={6}>
                            <Typography>{value.title}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                color: "blue",
                              }}
                            >
                              {new Date(value.CreatedAt).toLocaleDateString()}
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                    }
                    return null;
                  })}
                </div>
              </List>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ margin: "2rem 0px", borderRadius: 5 }} elevation={5}>
              <Grid container spacing={1} sx={{ padding: "10px 3ch" }}>
                <Grid item xs={6}>
                  <h3>Recent Company Added</h3>
                  <h5 style={{ position: "relative", bottom: "1rem" }}>
                    Posted by: SPO Team
                  </h5>
                </Grid>
                <Grid item xs={6}>
                  <h5
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      color: "blue",
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                    >
                      View All
                    </Button>
                  </h5>
                </Grid>
              </Grid>
              <hr />
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  padding: "1rem",
                }}
              >
                {RecCompany.map((value) => (
                  <div key={value.id} style={{ margin: "15px 0px" }}>
                    <Grid container sx={{ padding: "0px 1ch" }}>
                      <Grid item xs={6}>
                        <Typography>{value.Name}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            color: "blue",
                          }}
                        >
                          {value.data}
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="space-evenly">
          <Grid item xs={12} md={6}>
            <Card sx={{ margin: "2rem 0px", borderRadius: 5 }} elevation={5}>
              <Grid container spacing={1} sx={{ padding: "10px 3ch" }}>
                <Grid item xs={6}>
                  <h3>Notices</h3>
                  <h5 style={{ position: "relative", bottom: "1rem" }}>
                    Posted by: SPO Team
                  </h5>
                </Grid>
                <Grid item xs={6}>
                  <h5
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      color: "blue",
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                    >
                      View All
                    </Button>
                  </h5>
                </Grid>
              </Grid>
              <hr />
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  padding: "1rem",
                }}
              >
                {EventSchd.map((value) => (
                  <div key={value.id} style={{ margin: "15px 0px" }}>
                    <Grid container sx={{ padding: "0px 1ch" }}>
                      <Grid item xs={6}>
                        <Typography>{value.Name}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            color: "blue",
                          }}
                        >
                          {value.data}
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                ))}
              </List>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ margin: "2rem 0px", borderRadius: 5 }} elevation={5}>
              <Grid container spacing={1} sx={{ padding: "10px 3ch" }}>
                <Grid item xs={6}>
                  <h3>Recent Company Added</h3>
                  <h5 style={{ position: "relative", bottom: "1rem" }}>
                    Posted by: SPO Team
                  </h5>
                </Grid>
                <Grid item xs={6}>
                  <h5
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      color: "blue",
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                    >
                      View All
                    </Button>
                  </h5>
                </Grid>
              </Grid>
              <hr />
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  padding: "1rem",
                }}
              >
                {EventNotSchd.map((value) => (
                  <div key={value.id} style={{ margin: "15px 0px" }}>
                    <Grid container sx={{ padding: "0px 1ch" }}>
                      <Grid item xs={6}>
                        <Typography>{value.Name}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            color: "blue",
                          }}
                        >
                          {value.data}
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </div>
  );
}

Index.layout = "adminPhaseDashBoard";
export default Index;
