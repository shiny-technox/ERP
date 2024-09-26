import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Avatar, Button, Divider, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Login from "../../views/login";
import LeadActivityForm from "./LeadActivityForm";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import EventIcon from "@mui/icons-material/Event";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function ManageLeadStatus() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <LeadActivityForm open={open} onClose={handleClose} />
      <h2 className="manageLead-title">Manage Leads Overview</h2>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Grid item sx={{ background: "#FFF", display: "flex" }}>
              <Grid item sx={{ p: 2 }} xs={2} md={2}>
                <Box sx={{ border: "1px solid #E8E8E8" }}>
                  <img
                    width={150}
                    height={150}
                    src="../../public/images/logo/fav-2.png"
                  ></img>
                </Box>
              </Grid>
              <Grid item sx={{ p: 2 }} xs={8} md={8}>
                <Box>
                  <Typography sx={{ ml: 2, p: 1 }} variant="h6" component="div">
                    Technox Technologies
                  </Typography>
                  <Typography sx={{ ml: 2, p: 1 }} variant="p" component="div">
                    Sridharan S
                  </Typography>
                  <Typography sx={{ ml: 2, p: 1 }} variant="p" component="div">
                    Lead Type : Facebook
                  </Typography>
                  <Typography
                    sx={{ ml: 2, p: 1, display: "flex", alignItems: "center" }}
                    variant="p"
                    component="div"
                  >
                    <CalendarMonthIcon />
                    <Typography variant="p" sx={{ gap: "5" }}>
                      Date : 01-01-2024
                    </Typography>
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                sx={{ p: 1, display: "flex", alignItems: "center" }}
                xs={2}
                md={2}
              >
                <Button
                  startIcon={<AddIcon />}
                  onClick={handleClickOpen}
                  variant="contained"
                >
                  Add Activity
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={4} md={4}>
            <Grid item sx={{ background: "#FFF", display: "flex" }}>
              <Typography sx={{ ml: 2, p: 1 }} variant="h6" component="div">
                Basic Information
              </Typography>
            </Grid>
            <Divider />
            <Box component="div" className="info-contain">
              <Typography className="info-list" component="p">
                <MailOutlineIcon /> sridharan@technox.in
              </Typography>
              <Typography className="info-list" component="p">
                <PhoneEnabledIcon /> 7339601285
              </Typography>
              <Typography className="info-list" component="p">
                <PhoneEnabledIcon /> 7339601288
              </Typography>
              <Typography className="info-list" component="p">
                <EventIcon /> Created at 01 july 2024
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={8} md={8}>
            <Grid item sx={{ background: "#FFF" }}>
              <Box className="activityBox">
                <Typography sx={{ ml: 2, p: 1 }} variant="h6" component="div">
                  Activity
                </Typography>
                <Divider />

                <Box className="activity-date-box">
                  <Typography
                    className="activity-calendar"
                    sx={{ ml: 2, mt: 2, mb: 2, p: 1 }}
                    variant="p"
                    component="div"
                  >
                    <CalendarMonthIcon /> 29 July 2024
                  </Typography>
                  <Box component="div" className="activity-commend">
                    <Box component="div" className="activity-body">
                      <Box component="div" className="Image">
                        <img src="../../public/images/logo/fav-2.png" />
                      </Box>
                      <Box component="div" className="activity-text">
                        <Typography>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Ratione officiis veniam harum, ut at quam
                          incidunt, sapiente ullam porro optio quo ipsum laborum
                          tenetur eos?
                        </Typography>
                      </Box>
                    </Box>
                    <Typography component="div" className="body-buttons">
                      <Button variant="contained" startIcon={<EditNoteIcon />}>
                        Edit
                      </Button>
                    </Typography>
                  </Box>

                  <Box component="div" className="activity-commend">
                    <Box component="div" className="activity-body">
                      <Box component="div" className="Image">
                        <img src="../../public/images/logo/fav-2.png" />
                      </Box>
                      <Box component="div" className="activity-text">
                        <Typography>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Ratione officiis veniam harum, ut at quam
                          incidunt, sapiente ullam porro optio quo ipsum laborum
                          tenetur eos?
                        </Typography>
                      </Box>
                    </Box>
                    <Typography component="div" className="body-buttons">
                      <Button variant="contained" startIcon={<EditNoteIcon />}>
                        Edit
                      </Button>
                    </Typography>
                  </Box>

                  <Box component="div" className="activity-commend">
                    <Box component="div" className="activity-body">
                      <Box component="div" className="Image">
                        <img src="../../public/images/logo/fav-2.png" />
                      </Box>
                      <Box component="div" className="activity-text">
                        <Typography>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Ratione officiis veniam harum, ut at quam
                          incidunt, sapiente ullam porro optio quo ipsum laborum
                          tenetur eos?
                        </Typography>
                      </Box>
                    </Box>
                    <Typography component="div" className="body-buttons">
                      <Button variant="contained" startIcon={<EditNoteIcon />}>
                        Edit
                      </Button>
                    </Typography>
                  </Box>
                </Box>

                <Box className="activity-date-box">
                  <Typography
                    className="activity-calendar"
                    sx={{ ml: 2, mt: 2, mb: 2, p: 1 }}
                    variant="p"
                    component="div"
                  >
                    <CalendarMonthIcon /> 28 July 2024
                  </Typography>
                  <Box component="div" className="activity-commend">
                    <Box component="div" className="activity-body">
                      <Box component="div" className="Image">
                        <img src="../../public/images/logo/fav-2.png" />
                      </Box>
                      <Box component="div" className="activity-text">
                        <Typography>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Ratione officiis veniam harum, ut at quam
                          incidunt, sapiente ullam porro optio quo ipsum laborum
                          tenetur eos?
                        </Typography>
                      </Box>
                    </Box>
                    <Typography component="div" className="body-buttons">
                      <Button variant="contained" startIcon={<EditNoteIcon />}>
                        Edit
                      </Button>
                    </Typography>
                  </Box>

                  <Box component="div" className="activity-commend">
                    <Box component="div" className="activity-body">
                      <Box component="div" className="Image">
                        <img src="../../public/images/logo/fav-2.png" />
                      </Box>
                      <Box component="div" className="activity-text">
                        <Typography>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Ratione officiis veniam harum, ut at quam
                          incidunt, sapiente ullam porro optio quo ipsum laborum
                          tenetur eos?
                        </Typography>
                      </Box>
                    </Box>
                    <Typography component="div" className="body-buttons">
                      <Button variant="contained" startIcon={<EditNoteIcon />}>
                        Edit
                      </Button>
                    </Typography>
                  </Box>

                  <Box component="div" className="activity-commend">
                    <Box component="div" className="activity-body">
                      <Box component="div" className="Image">
                        <img src="../../public/images/logo/fav-2.png" />
                      </Box>
                      <Box component="div" className="activity-text">
                        <Typography>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Ratione officiis veniam harum, ut at quam
                          incidunt, sapiente ullam porro optio quo ipsum laborum
                          tenetur eos?
                        </Typography>
                      </Box>
                    </Box>
                    <Typography component="div" className="body-buttons">
                      <Button variant="contained" startIcon={<EditNoteIcon />}>
                        Edit
                      </Button>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default ManageLeadStatus;
