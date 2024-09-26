import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Avatar, Divider, CircularProgress, Alert } from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import AddchartIcon from '@mui/icons-material/Addchart';
import { Link } from "react-router-dom";
import "../../assets/employee/dashboard.css";
import axiosClient from "../../axiosClient";
import { useStateContext } from "../../contexts/contextprovider";
import { useDispatch } from "react-redux";
import { setAttendance } from "../../../slices/attendanceSlice";
import toast, { Toaster } from 'react-hot-toast';
import pushNotification from "../../notification/pushNotification";


function EmployeeDashboard() {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalWorkingTime, setTotalWorkingTime] = useState(0);
  const { user, attendanceId, setAttendanceId } = useStateContext();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;
  const dispatch = useDispatch();

  const values = {
    user_id: user.id,
    date: formattedDate,
  };

  useEffect(() => {
    checkUserAtten(user.id);
  }, [user.id]);

  const checkUserAtten = async (user_id) => {
    try {
      const { data } = await axiosClient.get(`/manage_attendance/show/${user_id}`);
      if (data.code === 200 && data.ManageAttendance !== null) {
        setAttendanceId(data.ManageAttendance.id);
        setIsPunchedIn(true);
      }
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  const handlePunch = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (attendanceId) {
        const { data } = await axiosClient.post(`/manage_attendance/update/${attendanceId}`, values);
        if (data.code === 200) {
          setTotalWorkingTime(data.workingTimeEnd);
          setAttendanceId(null);
          setIsPunchedIn(false);
          dispatch(setAttendance(data));
          const action = "were logged out";
          toast.success(`${user.name} ${action} at ${formattedTime}`);
          pushNotification(user.name, action);
        }
      } else {
        const { data } = await axiosClient.post("/manage_attendance/store", values);
        if (data.code === 200) {
          setAttendanceId(data.ManageAttendance.id);
          setIsPunchedIn(true);
          dispatch(setAttendance(data));
          const action = "were logged in";
          toast.success(`${user.name} ${action} at ${formattedTime}`);
          pushNotification(user.name, action);
        }
      }
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>Employee Dashboard</h3>
      </div>

      <div className="main-cards">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <div className="card-header">
              <AccessAlarmIcon />
              <p>Time At Work</p>
            </div>
            <Divider />
            <div className="card-profile">
              <div className="card-profile-img">
                <Avatar className={isPunchedIn ? "activeEmployeeImg" : "inactiveEmployeeImg"} sx={{ height: "30px", width: "30px" }} />
              </div>
              <div className="card-profile-title">{user.name}</div>
            </div>
            <div className="card-punchin">
              <div className="card-counter"></div>
              <div className="counter-start-button">
                <Button
                  className="counter-punch-in"
                  variant="contained"
                  onClick={handlePunch}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : isPunchedIn ? "Punch OUT" : "Punch IN"}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardActions>
            {totalWorkingTime !== 0 ? (
              <Alert severity="success">Total Working Time is {totalWorkingTime}</Alert>
            ) : null}
          </CardActions>
          <Toaster position='top-right' />
        </Card>

        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <div className="card-header">
              <AddchartIcon />
              <p>Quick Access</p>
            </div>
            <Divider />
            <div
              className="quick-access-icons"
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <div
                className="quick-access-item"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Link to="/assign_leave" style={{ textDecoration: "none", color: "inherit"}}>
                  <Avatar sx={{ bgcolor: "#f44336", height: "60px", width: "60px" }}>
                    <DomainVerificationIcon />
                  </Avatar>
                  <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>Assign Leave</p>
                </Link>
              </div>
              <div
                className="quick-access-item"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Link to="/apply_leave" style={{ textDecoration: "none", color: "inherit" }}>
                  <Avatar sx={{ bgcolor: "#4caf50", height: "60px", width: "60px" }}>
                    <TextSnippetIcon />
                  </Avatar>
                  <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>Apply Leave</p>
                </Link>
              </div>
              <div
                className="quick-access-item"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
                  <Avatar sx={{ bgcolor: "#2196f3", height: "60px", width: "60px" }}>
                    <RequestPageIcon />
                  </Avatar>
                  <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>My Leave</p>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <div className="card-header">
              <AddchartIcon />
              <p>Manage Leads</p>
            </div>
            <Divider />
            <div
              className="quick-access-icons"
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <div
                className="quick-access-item"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
                  <Avatar sx={{ bgcolor: "#ff9800", height: "60px", width: "60px" }}>
                    <DomainVerificationIcon />
                  </Avatar>
                  <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>Add Leads</p>
                </Link>
              </div>
              <div
                className="quick-access-item"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
                  <Avatar sx={{ bgcolor: "#9c27b0", height: "60px", width: "60px" }}>
                    <TextSnippetIcon />
                  </Avatar>
                  <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>Manage Leads</p>
                </Link>
              </div>
              <div
                className="quick-access-item"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
                  <Avatar sx={{ bgcolor: "#03a9f4", height: "60px", width: "60px" }}>
                    <RequestPageIcon />
                  </Avatar>
                  <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>View Leads</p>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default EmployeeDashboard;
