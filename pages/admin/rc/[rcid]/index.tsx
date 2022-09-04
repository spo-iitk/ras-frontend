import {
  Button,
  Card,
  CardContent,
  Grid,
  List,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import theme from "@components/theme/theme";
import Meta from "@components/Meta";
import countData, { APPCount, RCCount } from "@callbacks/admin/rc/count";
import useStore from "@store/store";
import noticeRequest, { NoticeParams } from "@callbacks/admin/rc/notice";
import requestCompany from "@callbacks/admin/rc/company";
import eventRequest, { Event } from "@callbacks/admin/rc/overview";
import rcRequest from "@callbacks/admin/rc/rc";
import EditRCApplicationCap from "@components/Modals/EditRCApplicationCap";
import DeleteConfirmation from "@components/Modals/DeleteConfirmation";

function Index() {
  const router = useRouter();
  const { rcid } = router.query;
  const rid = (rcid || "").toString();
  const [rcdata, setData] = useState<RCCount>({
    registered_student: 0,
    registered_company: 0,
  });
  const [notices, setNotice] = useState<NoticeParams[]>([
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
  const [appdata, setApp] = useState<APPCount>({
    roles: 0,
    recruited: 0,
  });
  const { token, rcName, role } = useStore();
  const [recCompany, setRecCompany] = useState<string[]>([]);
  const [eventSchd, setEventSchd] = useState<Event[]>([]);
  const [eventNotSchd, setEventNotSchd] = useState<Event[]>([]);
  const [proforma, setProforma] = useState<Event[]>([]);
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
  useEffect(() => {
    const fetchCompany = async () => {
      const response = await requestCompany.getRecent(token);
      setRecCompany(response);
    };
    const fetchEvent = async () => {
      if (router.isReady) {
        const response = await eventRequest.getAll(token, rid);
        const scheduled: Event[] = [];
        const unscheduled: Event[] = [];
        response.forEach((value: Event) => {
          if (value.start_time === 0) unscheduled.push(value);
          else scheduled.push(value);
        });
        setEventSchd(scheduled);
        setEventNotSchd(unscheduled);
      }
    };
    const fetchProforma = async () => {
      if (router.isReady) {
        const response = await eventRequest.getProforma(token, rid);
        setProforma(response);
      }
    };
    if (role === 100 || role === 101) {
      fetchCompany();
    }
    fetchEvent();
    fetchProforma();
  }, [rid, router.isReady, token, role]);

  const handleClick = () => {
    router.push(`/admin/rc/${rid}/notice`);
  };

  const [openNew, setOpenNew] = useState(false);
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  useEffect(() => {
    const close = async () => {
      if (rcid && confirmation) {
        await rcRequest.put(token, {
          ID: parseInt(rcid?.toString(), 10),
          inactive: true,
        });
        router.push("/admin/rc");
      }
    };
    close();
  }, [confirmation, rcid, router, router.isReady, token]);
  const handleOpenNew = () => {
    setOpenNew(true);
  };
  const handleCloseNew = () => {
    setOpenNew(false);
  };
  const handleOpenDeleteModal = () => {
    setDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };

  return (
    <div>
      <Meta title={`Admin Dashboard - ${rcName}`} />
      <Stack>
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
            onClick={handleOpenNew}
          >
            Edit
          </Button>
          <Modal open={openNew} onClose={handleCloseNew}>
            <EditRCApplicationCap handleClose={handleCloseNew} />
          </Modal>
          <Button
            variant="contained"
            endIcon={<DeleteIcon />}
            sx={{ width: "150px" }}
            onClick={() => {
              handleOpenDeleteModal();
            }}
          >
            Delete
          </Button>
          <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
            <DeleteConfirmation
              handleClose={handleCloseDeleteModal}
              setConfirmation={setConfirmation}
            />
          </Modal>
        </Stack>
        <Grid container justifyContent="space-evenly" spacing={2}>
          <Grid item xs={6} md={3} sx={{ padding: 0 }}>
            <Card
              sx={{
                height: { xs: 100, md: 200 },
                border: `2px solid ${theme.palette.secondary.main}`,
                backgroundColor: theme.palette.secondary.light,
                borderRadius: 5,
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
                border: `2px solid ${theme.palette.secondary.main}`,
                backgroundColor: theme.palette.secondary.light,
                borderRadius: 5,
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
                  {appdata.recruited}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card
              sx={{
                height: { xs: 100, md: 200 },
                border: `2px solid ${theme.palette.secondary.main}`,
                backgroundColor: theme.palette.secondary.light,
                borderRadius: 5,
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
                border: `2px solid ${theme.palette.secondary.main}`,
                backgroundColor: theme.palette.secondary.light,
                borderRadius: 5,
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
                    }}
                  >
                    <Button
                      variant="contained"
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
                                color: theme.palette.secondary.main,
                              }}
                            >
                              {new Date(value.CreatedAt).toLocaleDateString(
                                "en-GB"
                              )}
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
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                      href={`/admin/rc/${rid}/company`}
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
                  {recCompany.map((value, i) => {
                    if (i < 4) {
                      return (
                        <Grid
                          container
                          sx={{ padding: "0px 1ch", marginBottom: "1rem" }}
                        >
                          <Grid item xs={6}>
                            <Typography>{value}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                color: theme.palette.secondary.main,
                              }}
                            >
                              Recently Added
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
        </Grid>
        <Grid container spacing={2} justifyContent="space-evenly">
          <Grid item xs={12} md={6}>
            <Card sx={{ margin: "2rem 0px", borderRadius: 5 }} elevation={5}>
              <Grid container spacing={1} sx={{ padding: "10px 3ch" }}>
                <Grid item xs={6}>
                  <h3>Recent Proforma Added</h3>
                  <h5 style={{ position: "relative", bottom: "1rem" }}>
                    Posted by: SPO Team
                  </h5>
                </Grid>
                <Grid item xs={6}>
                  <h5
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                      href={`/admin/rc/${rid}/proforma`}
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
                  {proforma.map((value, i) => {
                    if (i < 4) {
                      return (
                        <Grid container sx={{ padding: "0px 1ch" }}>
                          <Grid item xs={6}>
                            <Typography>
                              {value.company_name} - {value.role}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                color: theme.palette.secondary.main,
                              }}
                            >
                              {new Date(value.CreatedAt).toLocaleString()}
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                    }
                    // eslint-disable-next-line react/jsx-no-useless-fragment
                    return <></>;
                  })}
                </div>
              </List>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ margin: "2rem 0px", borderRadius: 5 }} elevation={5}>
              <Grid container spacing={1} sx={{ padding: "10px 3ch" }}>
                <Grid item xs={6}>
                  <h3>Scheduled Events</h3>
                  <h5 style={{ position: "relative", bottom: "1rem" }}>
                    Posted by: SPO Team
                  </h5>
                </Grid>
                <Grid item xs={6}>
                  <h5
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                      href={`/admin/rc/${rid}/event`}
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
                  {eventSchd.map((value, i) => {
                    if (i < 4) {
                      return (
                        <Grid container sx={{ padding: "0px 1ch" }}>
                          <Grid item xs={6}>
                            <Typography>{value.name}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                color: theme.palette.secondary.main,
                              }}
                            >
                              {new Date(value.UpdatedAt).toLocaleString()}
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                    }
                    // eslint-disable-next-line react/jsx-no-useless-fragment
                    return <></>;
                  })}
                </div>
              </List>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ margin: "2rem 0px", borderRadius: 5 }} elevation={5}>
              <Grid container spacing={1} sx={{ padding: "10px 3ch" }}>
                <Grid item xs={6}>
                  <h3>Unscheduled Events</h3>
                  <h5 style={{ position: "relative", bottom: "1rem" }}>
                    Posted by: SPO Team
                  </h5>
                </Grid>
                <Grid item xs={6}>
                  <h5
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                      href={`/admin/rc/${rid}/event`}
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
                {eventNotSchd.map((value, i) => {
                  if (i < 4) {
                    return (
                      <div key={value.ID} style={{ margin: "15px 0px" }}>
                        <Grid container sx={{ padding: "0px 1ch" }}>
                          <Grid item xs={6}>
                            <Typography>{value.name}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                color: theme.palette.secondary.main,
                              }}
                            >
                              {new Date(value.UpdatedAt).toLocaleString()}
                            </Typography>
                          </Grid>
                        </Grid>
                      </div>
                    );
                  }
                  // eslint-disable-next-line react/jsx-no-useless-fragment
                  return <></>;
                })}
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
