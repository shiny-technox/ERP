import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

function NavMenuEmployee() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const handleEmployeeProfile = () => {
      
   navigate('../employee/profile')
  }
  const handleManageEmployee = () => {
    navigate('../employee/list');
  }
  const handleManageEmployeeHome = () => {
    navigate('/employee/dashboard');
  }
  const handleEmployeeAttendance = () => {
    navigate('/employee/attendance');
  }
  const handleEmployeeWorkLog = () => {
    navigate('/employee/work-log');
  }
 const handleEmployeeRole = () => {
  navigate('/employee/role');
 }
 const handleEmployeeScheduleInterview = () => {
  navigate('/employee/schedule-interview');
 }
 const handleEmployeeBirthday = () => {
  navigate('/employee/birthday');
 }
  
  return (
    <>
      <nav>
        <div className="menulist">
          <div onClick={handleManageEmployeeHome} className={`icon ${isActive('/employee/dashboard') ? 'Active' : '' }`}  >
            <HomeOutlinedIcon />
          </div>

          <ul className="list">
            <li onClick={handleManageEmployee} className={isActive('/employee/list') ? "Active" : "" }> 
              Manage Employee
              
              </li>
            <li className={isActive('/employee/profile') ? "Active" : "" } onClick={handleEmployeeProfile}>
              Employee Profile
              </li>
            <li className={isActive('/employee/attendance') ? "Active" : "" } onClick={handleEmployeeAttendance}>
              Attendance
              </li>
            <li className={isActive('/employee/work-log') ? "Active" : "" } onClick={handleEmployeeWorkLog}>
              Work Log
            </li>
            <li className={isActive('/employee/schedule-interview') ? "Active" : "" } onClick={handleEmployeeScheduleInterview}>
            Schedule Interview
            </li>
            <li className={isActive('/employee/birthday') ? "Active" : "" } onClick={handleEmployeeBirthday}>Employee Birtdays</li>
            <li className={isActive('/employee/role') ? "Active" : "" } onClick={handleEmployeeRole}>
              Employee Role
            </li>
            <li>More</li>
          </ul>

          <div className="right-icon">
            <div className="question">
              <QuestionMarkOutlinedIcon />
            </div>

            <div className="share">
              <ReplyOutlinedIcon />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavMenuEmployee;
