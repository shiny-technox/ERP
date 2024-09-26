import { useEffect } from "react";
import { useStateContext } from "../contexts/contextprovider";
import { Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useState } from "react";
import Header from './layout/Header';
import NavMenu from "./layout/NavMenuEmployee";
import Sidebar from './layout/Sidebar';
import Dashboard from "./dashboard";
import '../assets/sidebar/dashboard.css';
import pushNotification from "../notification/pushNotification";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';






export default function DefaultLayout() {
  const [hostingData, setHostingData] = useState();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const { user, userRole, token, setUser, setToken, setUserRole } = useStateContext();
  if (!token) {
    return <Navigate to='/login' />
  }

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }


  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        // console.log(data);
        setUser(data)
        setUserRole(data.emp_role)
        if (data.emp_role === 'ceo') {
          checkHosting();
        }
      });
    checkUserAtten(user.id);
  }, [user.id]);


  const checkUserAtten = async (user_id) => {
    try {
      const { data } = await axiosClient.get(`/manage_attendance/show/${user_id}`);
      if (data.code === 200 && data.ManageAttendance !== null) {
        setUser((prevUser) => ({
          ...prevUser,
          attendanceId: data.ManageAttendance.id
        }));
      }
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };
  const checkHosting = async () => {
    axiosClient.get('/manage_hosting')
      .then(({ data }) => {
        // console.log(data);
        if (data.code === 200) {
          const today = new Date();
          const currentDate = today.toISOString().split('T')[0]; // Format current date as YYYY-MM-DD

          const processedData = data.ManageHosting.map(ManageHostings => {
            const expiredDate = new Date(ManageHostings.hosting_expired_date);
            const isExpired = expiredDate < today;

            return {
              currentDate: currentDate,
              hosting_expired_date: ManageHostings.hosting_expired_date,
              isExpired: isExpired

            };
          });
          setHostingData(processedData);
          //pushNotification();
          //  console.log(hostingData); 
          // setManageHostingData(processedData);
        }
      });
  };

  // console.log(data);
  return (



    <>




      <div className='grid-container'>
        
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

        <Grid>



          <Grid item xs={12}>
            <main>

              <Outlet />

            </main>
          </Grid>

        </Grid>

      </div>

    </>
  )
}