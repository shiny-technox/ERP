import React from "react";
import MUIDataTable from "mui-datatables";
import { Grid, CircularProgress, Snackbar, Alert } from '@mui/material';
import NavMenuEmployee from "../../layout/NavMenuEmployee";
import useFetchEmployees from "../../list/useFetchEmployees";

function EmployeeBirthday() {
    const { datas, loading, error } = useFetchEmployees();

    const filteredData = datas.map(employee => [
        employee[1], // Employee Name
        employee[0], // Employee ID
        employee[4]  // Date of Birth
    ]);

    const columns = [
        "Employee Name",
        "Employee ID",
        "Date of Birth"
    ];

    const options = {
        filterType: 'checkbox',
        responsive: 'standard',
        tableBodyHeight: '400px',
        fixedHeader: true,
    };

    return (
        <div className="employee-table-outlet">
            <Grid item xs={12}>
                <NavMenuEmployee />
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className="empTable">
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <MUIDataTable
                                title={"Employee List"}
                                data={filteredData}
                                columns={columns}
                                options={options}
                            />
                        )}
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

export default EmployeeBirthday;
