import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import axiosClient from "../../../axiosClient";
import { CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ManageRoleStoreValidation } from "../../validation/ManageRoleFormStoreValidation";

const leadTypes = ["Google", "Facebook", "Reference", "SEO", "Local SEO", "Cold call"];
const requirements = ["Website", "Digital marketing", "SEO", "Design"];
const statuses = ["Onprogress", "Loss", "Completed"];

function EmployeeRoleForm() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        role: "",
    });
    const navigate = useNavigate();
  
    useEffect(() => {
      if (id) {
        setIsLoading(true);
        axiosClient.get(`/manage_role/edit/${id}`)
          .then((response) => {
            console.log(response);
            const fetchedData = response.data.EmployeeRole;
           // setInitialValues(response.data.ManageLeads);
           setInitialValues({
            role: fetchedData.role || "",
          });
          })
          .catch((error) => {
            console.error("There was an error fetching the lead data!", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }, [id]);
  
    const formik = useFormik({
      initialValues,
      enableReinitialize: true,
      validationSchema: ManageRoleStoreValidation,
      onSubmit: async (values) => {
        setIsLoading(true);
        try {
          const response = id
            ? await axiosClient.put(`/manage_role/update/${id}`, values)
            : await axiosClient.post("/manage_role/store", values);
          console.log(response.data);
          navigate('/employee/role', { state: { message: 'Data saved successfully!' } });
        } catch (error) {
          console.error("There was an error saving the data!", error);
        } finally {
          setIsLoading(false);
        }
      },
    });
    return (
      <Box m={3}>
        <div className="employee-form-title">
          <h2>{id ? 'Edit' : 'Add' } Employee Role</h2>
        </div>
      
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} marginTop={2}>

              <Grid item xs={6}>
                <TextField
                  id="role"
                  name="role"
                  label="Employee Role"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.role}
                  type="text"
                  fullWidth
                  error={!!formik.errors.role}
                  helperText={formik.errors.role}
                />
              </Grid>
            
              <Grid item xs={12} container justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : id ? "Update Role" : "Add Role"}
                </Button>
              </Grid>
            </Grid>
          </form>
     
      </Box>
    );
}

export default EmployeeRoleForm