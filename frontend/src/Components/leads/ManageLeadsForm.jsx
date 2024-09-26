import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { ManageLeadsStoreValidation } from "../validation/ManageLeadsStoreValidation";
import axiosClient from "../../axiosClient";
import { CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const leadTypes = ["Google", "Facebook", "Reference", "SEO", "Local SEO", "Cold call"];
const requirements = ["Website", "Digital marketing", "SEO", "Design"];
const statuses = ["Onprogress", "Loss", "Completed"];

function ManageLeadsForm() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
      date: "",
      name: "",
      company: "",
      leadType: "",
      contactNumber: "",
      ownerContactNumber: "",
      requirement: "",
      status: "",
    });
    const navigate = useNavigate();
  
    useEffect(() => {
      if (id) {
        setIsLoading(true);
        axiosClient.get(`/manage-leads/edit/${id}`)
          .then((response) => {
            const fetchedData = response.data.ManageLeads;
           // setInitialValues(response.data.ManageLeads);
           setInitialValues({
            date: fetchedData.date || "",
            name: fetchedData.name || "",
            company: fetchedData.company || "",
            leadType: fetchedData.leads_type || "",
            contactNumber: fetchedData.contact_numer || "",
            ownerContactNumber: fetchedData.owner_contact_number || "",
            requirement: fetchedData.requirement || "",
            status: fetchedData.status || "",
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
      validationSchema: ManageLeadsStoreValidation,
      onSubmit: async (values) => {
        setIsLoading(true);
        try {
          const response = id
            ? await axiosClient.put(`/manage-leads/update/${id}`, values)
            : await axiosClient.post("/manage-leads/store", values);
          console.log(response.data);
          navigate('/leads/list', { state: { message: 'Data saved successfully!' } });
        } catch (error) {
          console.error("There was an error saving the data!", error);
        } finally {
          setIsLoading(false);
        }
      },
    });
    return (
      <Box m={3}>
        <Typography variant="h4" gutterBottom>
          {id ? "Edit Lead" : "Add Lead"}
        </Typography>
        {/* {isLoading && <CircularProgress />} */}
      
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} marginTop={2}>
              <Grid item xs={6}>
                <TextField
                  id="date"
                  name="date"
                  label="Date"
                  type="date"
                  fullWidth
                  value={formik.values.date}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!formik.errors.date}
                  helperText={formik.errors.date}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="name"
                  name="name"
                  label="Name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  type="text"
                  fullWidth
                  error={!!formik.errors.name}
                  helperText={formik.errors.name}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="company"
                  name="company"
                  label="Company"
                  type="text"
                  fullWidth
                  value={formik.values.company}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={!!formik.errors.company}
                  helperText={formik.errors.company}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="leadType"
                  name="leadType"
                  select
                  label="Lead Type"
                  fullWidth
                  value={formik.values.leadType}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={!!formik.errors.leadType}
                  helperText={formik.errors.leadType}
                >
                  {leadTypes.map((reqLeadType) => (
                    <MenuItem key={reqLeadType} value={reqLeadType}>
                      {reqLeadType}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="contactNumber"
                  name="contactNumber"
                  label="Contact Number"
                  type="text"
                  fullWidth
                  value={formik.values.contactNumber}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={!!formik.errors.contactNumber}
                  helperText={formik.errors.contactNumber}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="ownerContactNumber"
                  name="ownerContactNumber"
                  label="Owner Contact Number"
                  type="text"
                  fullWidth
                  value={formik.values.ownerContactNumber}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={!!formik.errors.ownerContactNumber}
                  helperText={formik.errors.ownerContactNumber}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="requirement"
                  name="requirement"
                  select
                  label="Requirement"
                  fullWidth
                  value={formik.values.requirement}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={!!formik.errors.requirement}
                  helperText={formik.errors.requirement}
                >
                  {requirements.map((req) => (
                    <MenuItem key={req} value={req}>
                      {req}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="status"
                  name="status"
                  select
                  label="Status"
                  fullWidth
                  value={formik.values.status}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={!!formik.errors.status}
                  helperText={formik.errors.status}
                >
                  {statuses.map((req_status) => (
                    <MenuItem key={req_status} value={req_status}>
                      {req_status}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} container justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : id ? "Update Lead" : "Add Lead"}
                </Button>
              </Grid>
            </Grid>
          </form>
     
      </Box>
    );
}

export default ManageLeadsForm