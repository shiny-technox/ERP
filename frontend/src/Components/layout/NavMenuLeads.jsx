import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

function NavMenuLeads() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const handleLeadsHome = () => {
    navigate('/leads/dashboard');
  }

  const handleManageLeads = () => {
    navigate('../leads/list');
  }

  return (
    <>
      <nav>
        <div className="menulist">
          <div onClick={handleLeadsHome} className={`icon ${isActive('/leads/dashboard') ? 'Active' : '' }`}  >
            <HomeOutlinedIcon />
          </div>

          <ul className="list">
            <li onClick={handleManageLeads} className={isActive('/leads/list') ? "Active" : "" }> 
              Manage Leads
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

export default NavMenuLeads;
