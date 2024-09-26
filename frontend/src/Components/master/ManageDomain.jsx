import React, { useState, useEffect } from 'react';
import { Grid, Button, CircularProgress, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { Link, useNavigate } from 'react-router-dom'; 
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddIcon from '@mui/icons-material/Add';
import { Alert } from '@mui/material';
import useFetchManageDomain from '../list/useFetchManageDomain';
import axiosClient from '../../axiosClient';
import { useStateContext } from '../../contexts/contextprovider';
import pushNotification from '../../notification/pushNotification'; 
import axios from 'axios';

function ManageDomain() {
    const { manageDomainData, loading, error, setManageDomainData } = useFetchManageDomain();
    const { setNotifications } = useStateContext();
    const navigate = useNavigate();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        updateNotifications(manageDomainData);
    }, [manageDomainData]);

    const updateNotifications = async (data) => {
        const today = new Date();
        const newNotifications = data.reduce((acc, domain) => {
            const domainExpiry = new Date(domain[3]);
            const diffTime = domainExpiry.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
                const action = `The domain ${domain[1]} is expiring tomorrow.`;
                acc.push({
                    message: action,
                    id: domain[0],
                    domain_provider: domain[2]
                });
                pushNotification(domain[0], 'Domain Expiry Reminder', action, false);
            }
            return acc;
        }, []);
    
        if (newNotifications.length > 0) {
            console.log("noti start"  , newNotifications);
            try {
                await axiosClient.post('/notifications/store', {
                    notifications: newNotifications.map(notification => ({
                        notification_type: notification.domain_provider,
                        description: notification.message,
                        seen: 0,
                    }))
                });
            } catch (error) {
                console.error('Failed  to store notifications:', error);
            }
        }
    
        setNotifications(newNotifications);
    };
    
    const handleEdit = (rowData) => {
        const id = rowData[0];
        navigate(`/manage_domain/${id}`);
    };

    const handleDelete = () => {
        axiosClient.delete(`/manage_domain/delete/${selectedProject[0]}`).then(() => {
            setManageDomainData(prevDatas => prevDatas.filter(domain => domain[0] !== selectedProject[0]));
            updateNotifications(prevDatas.filter(domain => domain[0] !== selectedProject[0])); 
        }).catch(err => {
            console.log(err.response);
        }).finally(() => {
            setDeleteDialogOpen(false); 
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

    const columns = [
        {
            name: "ID",
            options: {
                display: false,
            }
        },
        "Domain Name", 
        "Domain Provider", 
        {
            name: "Domain Expired",
            options: {
                customBodyRender: (value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString();
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

    return (
        <div className="employee-table-outlet">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className="add-btn">
                        <Link to='/manage_domain/create'>
                            <Button startIcon={<AddIcon />} variant="outlined">Add Domain</Button>
                        </Link>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="empTable">
                        <MUIDataTable
                            title={"Manage Domain"}
                            data={manageDomainData}
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
                <DialogTitle>{"Delete Domain"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this domain?
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

export default ManageDomain;
