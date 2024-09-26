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
import useFetchManageLeads from '../list/useFetchManageLeads';
import CloudSyncSharpIcon from '@mui/icons-material/CloudSyncSharp';
import NavMenuLeads from "../layout/NavMenuLeads";
import AddIcon from '@mui/icons-material/Add';

function ManageLeads() {
  const { manageLeadsData, loading, error, setDatas } = useFetchManageLeads();
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const columns = [
  {
      name: "ID",
      options: {
          display: false,
      }
  },
  "Date", 
  "Lead Name", 
  "Company",
  'Lead Type',
  {
     name: "Status",
     options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
            <Button
                variant="outlined"
                color="secondary"
                startIcon={<CloudSyncSharpIcon />}
                onClick={() => handleStatus(tableMeta.rowData)}
            >
                Status
            </Button>
        );
    } 
     }
  },
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

  const handleStatus = (rowData) => {
    console.log(rowData);
    const leadId = rowData[0];
    navigate(`/leads/status/${leadId}`);
  }

  const handleEdit = (rowData) => {
      console.log('Edit', rowData);
      const projectId = rowData[0];
      navigate(`/leads/edit/${projectId}`);
  };

  const handleDelete = () => {

       axiosClient.delete(`/manage_project/delete/${selectedProject[0]}`).then(data => {
          setDatas(prevDatas => prevDatas.filter(ManageProjects => ManageProjects[0] !== selectedProject[0]));
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
          <Grid item xs={12}>
            <NavMenuLeads />
          </Grid>
      <Grid container spacing={3}>
      <Grid item xs={12}>
          <div className="add-btn" >
          <Link to='/leads/create' > 
          <Button startIcon={<AddIcon />} variant="contained">Add Leads</Button>
          </Link>
          </div>
          </Grid>
          <Grid item xs={12}>
          <div className="empTable"> 
          <MUIDataTable
              title={"Manage Leads"}
              data={manageLeadsData}
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

export default ManageLeads;
