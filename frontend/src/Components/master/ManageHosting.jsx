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
import AddIcon from '@mui/icons-material/Add';
import useFetchManageHosting from "../list/useFetchHosting";

function ManageHosting() {
    const { manageHostingData, loading, error, setManageHostingData } = useFetchManageHosting();
   // console.log(manageHostingData);
    const navigate = useNavigate();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [datas, setDatas] = useState();

    const columns = [
    {
        name: "ID",
        options: {
            display: false,
        }
    },
    "Hosting Name", 
    "Hosting Provider", 
    "Hosting Expired",

    {
        name: "Edit",
        options: {
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<BorderColorIcon />}
                        onClick={() => handleEdit(tableMeta.rowData)}
                    >
                        Edit
                    </Button>
                );
            }
        }
    },
    {
        name: "Delete",
        options: {
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => confirmDelete(tableMeta.rowData)}
                    >
                        Delete
                    </Button>
                );
            }
        }
    }
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
        const id = rowData[0];
        // Redirect to the edit page with the employee data
        navigate(`/manage_hosting/${id}`);
    };

    const handleDelete = () => {

         axiosClient.delete(`/manage_hosting/delete/${selectedProject[0]}`).then(data => {
          setManageHostingData(prevDatas => prevDatas.filter(manageHostingData => manageHostingData[0] !== selectedProject[0]));
            setDeleteDialogOpen(false);
         }).catch(err => {
            const response = err.response;
            console.log(response);
        });
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
            
        <Grid container spacing={3}>
        <Grid item xs={12}>
            <div className="add-btn" >
            <Link to='/manage_hosting/create' > 
            <Button startIcon={<AddIcon />}  variant="outlined">Add Hosting</Button>
            </Link>
            </div>
            </Grid>
            <Grid item xs={12}>
            <div className="empTable"> 
            <MUIDataTable
                title={"Manage Hosting"}
                data={manageHostingData}
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
            Are you sure you want to delete this Project?
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

export default ManageHosting