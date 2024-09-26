import { React } from "react";
import MUIDataTable from "mui-datatables";
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'; 

import BorderColorIcon from '@mui/icons-material/BorderColor';

import { CircularProgress, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

import NavMenuEmployee from "../../layout/NavMenuEmployee";
import AddIcon from '@mui/icons-material/Add';
import useFetchEmployees from "../../list/useFetchEmployees";



function EmployeeProfile() {
   
    const { datas, loading, error, setDatas } = useFetchEmployees();
    const navigate = useNavigate();
  
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const columns = [
    {
        name: "ID",
        options: {
            display: false,
        }
    },
    "Name", 
    "Role", 
    "Email",
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
        const employeeId = rowData[0];
        // Redirect to the edit page with the employee data
        navigate(`/employee/profile/edit/${employeeId}`);
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
            <div className="add-btn" >
            <Link to='/employee/create' > 
            <Button title="Add Employee" startIcon={<AddIcon />} variant="contained">Add Employee</Button>
            </Link>
            </div>
            </Grid>
            
            <Grid item xs={12}>
            <div className="empTable"> 
        <MUIDataTable
            title={"Employee Profile"}
            data={datas}
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
      
        </div>
    );
}

export default EmployeeProfile;