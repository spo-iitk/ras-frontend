import { Card, Stack, TextField } from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import ActiveButton from "@components/Buttons/ActiveButton";
import Meta from "@components/Meta";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const info = [
  {
    field: "Academic Year",
    value: "Select Academic Year",
  },
  {
    field: "Type of Recruitment",
    value: "Select type of recruitment",
  },
  {
    field: "Phase",
    value: "Select Phase",
  },
];

const Policy = [
  {
    field: "Max No. of Applications",
    value: "",
  },
];
function RecruitmentCycle() {
  const [RecruitmentType, setAge] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <div style={{ padding: "0 2rem" }}>
      <Meta title="Student Dashboard - Create New Recruitment Cycle" />
      <Stack spacing={2}>
        <div style={{ textAlign: "center", fontSize: "1.5rem" }}>
          <h1>Create New Recruitment Cycle</h1>
        </div>
        <div style={{ marginTop: 50 }}>
          <Card
            elevation={5}
            sx={{
              padding: 3,
              width: { xs: "30rem", sm: "100rem", margin: "0px auto" },
            }}
          >
            <Stack spacing={2} justifyContent="center" alignItems="center">
              <TableContainer>
                <Table>
                  <TableBody>
                    {info.map((item) => {
                      if (item.field === "Type of Recruitment")
                        return (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                            key={item.field}
                          >
                            <TableCell
                              align="left"
                              component="th"
                              scope="row"
                              sx={{
                                fontSize: "1.5em",
                                fontWeight: "600",
                                paddingLeft: "7vw",
                              }}
                            >
                              {item.field}:
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{ fontSize: "1.5em", padding: 0 }}
                            >
                              <FormControl sx={{ m: 1, minWidth: "20rem" }}>
                                <InputLabel id="Types-of-Recruitment">
                                  {item.value}
                                </InputLabel>
                                <Select
                                  labelId="Types-of-Recruitment"
                                  id="demo-simple-select"
                                  value={RecruitmentType}
                                  label={item.value}
                                  onChange={handleChange}
                                  autoWidth
                                >
                                  <MenuItem value={10}>Intern</MenuItem>
                                  <MenuItem value={20}>Placement</MenuItem>
                                </Select>
                              </FormControl>
                            </TableCell>
                          </TableRow>
                        );
                      return (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          key={item.field}
                        >
                          <TableCell
                            align="left"
                            component="th"
                            scope="row"
                            sx={{
                              fontSize: "1.5em",
                              fontWeight: "600",
                              paddingLeft: "7vw",
                            }}
                          >
                            {item.field}:
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{ fontSize: "1.5em", padding: 0 }}
                          >
                            <TextField
                              id={item.field}
                              variant="standard"
                              value={item.value}
                              size="small"
                              sx={{
                                m: 3,
                                width: { xs: "30ch", sm: "27ch", lg: "35ch" },
                                padding: 0,
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow>
                      <TableCell>
                        <p
                          style={{
                            fontSize: "1.7em",
                            fontWeight: "600",
                            paddingLeft: "7vw",
                          }}
                        >
                          Policies:
                        </p>
                        <ol>
                          {Policy.map((item) => (
                            <li style={{ display: "flex" }} key={item.field}>
                              <p
                                style={{
                                  fontSize: "1.7em",
                                  paddingLeft: "7vw",
                                }}
                              >
                                {item.field}
                              </p>
                              <TextField
                                id="Max no. of Applications"
                                value={item.value}
                                variant="standard"
                                size="small"
                                sx={{
                                  m: 3,
                                  width: { xs: "30ch", sm: "27ch", lg: "35ch" },
                                  padding: 0,
                                }}
                              />
                            </li>
                          ))}
                        </ol>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <p
                          style={{
                            fontSize: "1.7em",
                            fontWeight: "600",
                            paddingLeft: "7vw",
                          }}
                        >
                          Additional Questions:
                        </p>
                        <br />
                        <br />
                        <div
                          style={{ alignItems: "center", marginLeft: "10vw" }}
                        >
                          <TableContainer sx={{ minWidth: 300, maxWidth: 700 }}>
                            <Table sx={{ "& td": { border: 0 } }}>
                              <TableBody>
                                <TableRow
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell>QUESTION TYPE</TableCell>
                                  <TableCell>
                                    <TextField
                                      id="Question Type"
                                      variant="standard"
                                      size="small"
                                      sx={{
                                        m: 3,
                                        width: {
                                          xs: "40ch",
                                          sm: "35ch",
                                          lg: "50ch",
                                        },
                                        padding: 0,
                                      }}
                                    />
                                  </TableCell>
                                </TableRow>
                                <TableRow
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell>QUESTION</TableCell>
                                  <TableCell>
                                    <TextField
                                      id="Question"
                                      variant="standard"
                                      size="small"
                                      sx={{
                                        m: 3,
                                        width: {
                                          xs: "40ch",
                                          sm: "35ch",
                                          lg: "50ch",
                                        },
                                        padding: 0,
                                      }}
                                    />
                                  </TableCell>
                                </TableRow>
                                <TableRow
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell>OPTION 1</TableCell>
                                  <TableCell>
                                    <TextField
                                      id="Opt1"
                                      variant="standard"
                                      size="small"
                                      sx={{
                                        m: 3,
                                        width: {
                                          xs: "30ch",
                                          sm: "27ch",
                                          lg: "35ch",
                                        },
                                        padding: 0,
                                      }}
                                    />
                                  </TableCell>
                                </TableRow>
                                <TableRow
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell>OPTION 2</TableCell>
                                  <TableCell>
                                    <TextField
                                      id="Opt1"
                                      variant="standard"
                                      size="small"
                                      sx={{
                                        m: 3,
                                        width: {
                                          xs: "30ch",
                                          sm: "27ch",
                                          lg: "35ch",
                                        },
                                        padding: 0,
                                      }}
                                    />
                                  </TableCell>
                                </TableRow>
                                <TableRow
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell>OPTION 3</TableCell>
                                  <TableCell>
                                    <TextField
                                      id="Opt1"
                                      variant="standard"
                                      size="small"
                                      sx={{
                                        m: 3,
                                        width: {
                                          xs: "30ch",
                                          sm: "27ch",
                                          lg: "35ch",
                                        },
                                        padding: 0,
                                      }}
                                    />
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <ActiveButton sx={{ width: "max-content" }}>
                CREATE RECRUITMENT DRIVE
              </ActiveButton>
            </Stack>
          </Card>
        </div>
      </Stack>
    </div>
  );
}

RecruitmentCycle.layout = "studentDashboard";
export default RecruitmentCycle;
