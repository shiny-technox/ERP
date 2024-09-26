import { React } from "react";
import MUIDataTable from "mui-datatables";
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import axiosClient from "../../axiosClient";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'; 
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import useFetchEmployees from "../list/useFetchEmployees";
import { CircularProgress, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useFetchManageAttendance from "../list/useFetchManageAttendance";
import { useSelector } from "react-redux";
import pushNotification from "../../notification/pushNotification";
import NavMenuEmployee from "../layout/NavMenuEmployee";




function ManageAttendance() {
    const { manageAttendanceData, loading, error, setManageAttendanceData } = useFetchManageAttendance();
    const navigate = useNavigate();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const attendance = useSelector((state) => state.attendanceInfo.attendance);
    console.log(attendance);

    const columns = [
    {
        name: "ID",
        options: {
            display: false,
        }
    },
    "Date",
    "Employee ID", 
    "Employee Name", 
    "In Time",
    "Out Time",
    "Working Hours",

    ];
    const options = {
        filterType: 'checkbox',
        responsive: 'standard', 
        tableBodyHeight: '400px',
        tableBodyMaxHeight: '',
        fixedHeader: true,
    };


    const handleEdit = (rowData) => {
        console.log('Edit', rowData);
        const projectId = rowData[0];
        // Redirect to the edit page with the employee data
        navigate(`/manage_project/edit/${projectId}`);
    };

    const handleDelete = () => {

         axiosClient.delete(`/manage_project/delete/${selectedProject[0]}`).then(data => {
            setManageAttendanceData(prevDatas => prevDatas.filter(ManageAttendanceData => ManageAttendanceData[0] !== selectedProject[0]));
            setDeleteDialogOpen(false);
         }).catch(err => {
            const response = err.response;
            console.log(response);
        });;
    };
    const confirmDelete = (rowData) => {
        setSelectedProject(rowData);
        setDeleteDialogOpen(true);
      };

      if (loading) {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </div>
        );
      }

    return (
        <div className="employee-table-outlet">
         <Grid item xs={12}>
            <NavMenuEmployee />
          </Grid>
        <Grid container spacing={3}>

            <Grid item xs={12}>
            <div className="empTable"> 
            <MUIDataTable
                title={"Employee List"}
                data={manageAttendanceData}
                columns={columns}
                options={options}
            />
        </div>
        </Grid>
        </Grid>
        {error && (
        <Snackbar open autoHideDuration={6000}>
          <Alert severity="error">
            {error.message || "Something went wrong!"}
          </Alert>
        </Snackbar>
      )}
       <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>{"Delete Employee"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    );
}

export default ManageAttendance;