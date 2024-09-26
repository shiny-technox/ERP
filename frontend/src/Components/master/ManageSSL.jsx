import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import Button from '@mui/material/Button';
import { Grid, Snackbar, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import axiosClient from '../../axiosClient';
import useFetchManageSSL from '../list/UseFetchManageSSL';
 

function ManageSSL() {
  const { manageSSLData, loading, error, setManageSSLData } = useFetchManageSSL();
  console.log(manageSSLData);
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSSL, setSelectedSSL] = useState(null);

  const columns = [
    {
      name: 'ID',
      options: {
        display: false,
      },
    },
    'SSL Name',
    'SSL Provider',
    'SSL Expiry',
    {
      name: 'Edit',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<BorderColorIcon />}
            onClick={() => handleEdit(tableMeta.rowData)}
          >
            Edit
          </Button>
        ),
      },
    },
    {
      name: 'Delete',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => confirmDelete(tableMeta.rowData)}
          >
            Delete
          </Button>
        ),
      },
    },
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
    // Redirect to the edit page with the SSL data
    navigate(`/manage_ssl/${id}`);
  };

  const handleDelete = () => {
    axiosClient
      .delete(`/manage_ssl/delete/${selectedSSL[0]}`)
      .then((data) => {
        setManageSSLData((prevData) => prevData.filter((ssl) => ssl[0] !== selectedSSL[0]));
        setDeleteDialogOpen(false);
      })
      .catch((err) => {
        const response = err.response;
        console.log(response);
      });
  };

  const confirmDelete = (rowData) => {
    setSelectedSSL(rowData);
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
          <div className="add-btn">
            <Link to="/manage_ssl/create">
              <Button startIcon={<AddIcon />} variant="outlined">
                Add SSL 
              </Button>
            </Link>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="empTable">
            <MUIDataTable title={'Manage SSL Certificates'} data={manageSSLData} columns={columns} options={options} />
          </div>
        </Grid>
      </Grid>
      {error && (
        <Snackbar open autoHideDuration={6000}>
          <Alert severity="error">{error.message || 'Something went wrong!'}</Alert>
        </Snackbar>
      )}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete SSL Certificate</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this SSL Certificate?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ManageSSL;
