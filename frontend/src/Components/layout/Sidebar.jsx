import React, { useState, useEffect } from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
  BsBoxArrowInLeft,
  BsFillAlarmFill,
} from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useStateContext } from "../../contexts/contextprovider";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Move useStateContext inside the functional component
  const { user, userRole, token, setUser, setToken, setUserRole } =
    useStateContext();

  const onLogout = (ev) => {
    ev.preventDefault();
    axiosClient.get("/logout").then(({ data }) => {
      setUser(null);
      setToken(null);
      setUserRole(null);
      navigate("/login");
    });
  };
  // console.log(userRole);
  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = (e) => {
    if (!e.target.closest(".dropdown")) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", closeDropdown);
    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  const pathname = location.pathname;

  const pathSegments = pathname.split('/').filter(segment => segment);
  
  const [activeSideMenu, activeTopMenu] = pathSegments.slice(0,2);
  // console.log(activeSideMenu, activeTopMenu);
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar">
        <div className="sidebar-title">
          <div className="sidebar-brand">
            <img
              className="sidebar-logo"
              src="../images/logo/logo_white.png"
              style={{ width: "185px" }}
              alt="technox logo"
            />
          </div>
          <span className="icon close_icon" onClick={OpenSidebar}>
            X
          </span>
        </div>


      <ul className="sidebar-list">
        {userRole === "ceo" && (
          <>
            <li
              className={`sidebar-list-item ${
                isActive("/dashboard") ? "active" : ""
              }`}
            >
              <Link to="/dashboard">
                <BsGrid1X2Fill className="icon sidebar-icon" /> Dashboard
              </Link>
            </li>
            <li
              className={`sidebar-list-item ${
                activeSideMenu==="employee" ? "active" : ""
              }`}
            >
              <Link to="/employee/dashboard">
                <BsFillArchiveFill className="icon sidebar-icon" /> Employee Management
              </Link>
            </li>
            <li
              className={`sidebar-list-item ${
                activeSideMenu==="leads" ? "active" : ""
              }`}
            >
              <Link to="/leads/dashboard">
                <BsFillArchiveFill className="icon sidebar-icon" /> Leads Management
              </Link>
            </li>
            <li
              className={`sidebar-list-item ${
                isActive("/manage_attendance") ? "active" : ""
              }`}
            >
              <Link to="/manage_attendance">
                <BsFillArchiveFill className="icon sidebar-icon" /> Manage Attendance
              </Link>
            </li>

              <li
                className={`sidebar-list-item ${isActive("/manage_task") ? "active" : ""
                  }`}
              >
                <Link to="/manage_task">
                  <BsPeopleFill className="icon sidebar-icon" /> Manage Task
                </Link>
              </li>
              <li className="sidebar-list-item">
                <Link to="/manage_domain" >
                  <BsListCheck className="icon sidebar-icon" /> Manage Domain
                </Link>
              </li>

              <li className="sidebar-list-item">
                <Link to="/manage_ssl" >
                  <BsListCheck className="icon sidebar-icon" /> Manage SSL
                </Link>
              </li>
              <li className="sidebar-list-item">
                <Link to="/manage_hosting" >
                  <BsListCheck className="icon sidebar-icon" /> Manage Hosting
                </Link>
              </li>

              <li className="sidebar-list-item">
                <Link to="/manage_profile">
                  <BsListCheck className="icon sidebar-icon" /> Profile
                </Link>
              </li>
              <li
                className={`sidebar-list-item dropdown ${dropdownOpen ? "open" : ""
                  }`}
              >
                <a href="#" className="dropdown-toggle" onClick={toggleDropdown}>
                  <BsMenuButtonWideFill className="icon sidebar-icon" /> Reports
                </a>
                <ul className="dropdown-menu">
                  <li
                    className={`sidebar-list-item ${isActive("/page1") ? "active" : ""
                      }`}
                  >
                    <Link to="/attendance_report">
                      <BsFillArchiveFill className="icon" /> Attendance
                    </Link>
                  </li>
                  <li
                    className={`sidebar-list-item ${isActive("/page2") ? "active" : ""
                      }`}
                  >
                    <Link to="/page2">
                      <BsGrid1X2Fill className="icon" /> Report 2
                    </Link>
                  </li>
                  <li
                    className={`sidebar-list-item ${isActive("/page3") ? "active" : ""
                      }`}
                  >
                    <Link to="/page3">
                      <BsFillGrid3X3GapFill className="icon" /> Report 3
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className={`sidebar-list-item ${isActive("/setting") ? "active" : ""
                  }`}
              >
                <a href="#">
                  <BsFillGearFill className="icon sidebar-icon" /> Setting
                </a>
              </li>
            </>
          )}
          ;
          {userRole != "ceo" && (
            <>
              <li className="sidebar-list-item">
                <Link to="/employee_dashboard">
                  <BsPeopleFill className="icon sidebar-icon" /> Attendance
                </Link>
              </li>
            </>
          )};
          <li
            className={`sidebar-list-item ${isActive("/manage_project") ? "active" : ""
              }`}
          >
            <Link to="/manage_project">
              <BsFillGrid3X3GapFill className="icon sidebar-icon" /> Manage
              Project
            </Link>
          </li>
          <li
            className={`sidebar-list-item ${isActive("/manage_sales") ? "active" : ""
              }`}
          >
            <Link to="/manage_sales">
              <BsFillGrid3X3GapFill className="icon sidebar-icon" /> Sales Management
              
            </Link>
          </li>

          <li className="sidebar-list-item">
            <Link to="/employee/work-log">
              <BsFillAlarmFill className="icon sidebar-icon" /> Work Log
            </Link>
          </li>
          <li
            onClick={onLogout}
            className={`sidebar-list-item ${isActive("/logout") ? "active" : ""}`}
          >
            <a href="">
              <BsBoxArrowInLeft className="icon sidebar-icon" /> Logout
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
