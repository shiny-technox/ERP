import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { ManageLeadsStatusStoreValidation } from "../validation/ManageLeadsStatusStoreValidation";
import axiosClient from "../../axiosClient";
import { CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const leadTypes = ["Google", "Facebook", "Reference", "SEO", "Local SEO", "Cold call"];
const requirements = ["Website", "Digital marketing", "SEO", "Design"];
const progreses = ["Ended", "Continue"];

function ManageLeadStatusForm() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
      progress: "",
      description: "",
      next_appointment_date: "",
      next_appointment_time: "",
    });
    const navigate = useNavigate();
  
    // useEffect(() => {
    //   if (id) {
    //     setIsLoading(true);
    //     axiosClient.get(`/manage-leads/edit/${id}`)
    //       .then((response) => {
    //         const fetchedData = response.data.ManageLeads;
    //        // setInitialValues(response.data.ManageLeads);
    //        setInitialValues({
    //         date: fetchedData.date || "",
    //         name: fetchedData.name || "",
    //         company: fetchedData.company || "",
    //         leadType: fetchedData.leads_type || "",
    //         contactNumber: fetchedData.contact_numer || "",
    //         ownerContactNumber: fetchedData.owner_contact_number || "",
    //         requirement: fetchedData.requirement || "",
    //         progress: fetchedData.progress || "",
    //       });
    //       })
    //       .catch((error) => {
    //         console.error("There was an error fetching the lead data!", error);
    //       })
    //       .finally(() => {
    //         setIsLoading(false);
    //       });
    //   }
    // }, [id]);
  
    const formik = useFormik({
      initialValues,
      enableReinitialize: true,
      validationSchema: ManageLeadsStatusStoreValidation,
      onSubmit: async (values) => {
        //console.log(values);
        setIsLoading(true);
        try {
          const response = id
            ? await axiosClient.post(`/manage-leads/status/${id}`, values)
            : await axiosClient.post("/manage-leads/store", values);
          console.log(response.data);
          navigate('/manage_leads', { state: { message: 'Data saved successfully!' } });
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
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} marginTop={2}>
            <Grid item xs={6}>
                <TextField
                  id="progress"
                  name="progress"
                  select
                  label="Progress"
                  fullWidth
                  value={formik.values.progress}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={!!formik.errors.progress}
                  helperText={formik.errors.progress}
                >
                  {progreses.map((req_status) => (
                    <MenuItem key={req_status} value={req_status}>
                      {req_status}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="description"
                  name="description"
                  label="Description"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  type="text"
                  fullWidth
                  error={!!formik.errors.description}
                  helperText={formik.errors.description}
                />
              </Grid>
              {formik.values.progress !== "Ended" && (
                <>
              <Grid item xs={6}>
                <TextField
                  id="next_appointment_date"
                  name="next_appointment_date"
                  label="Next Appointment Date"
                  type="date"
                  fullWidth
                  value={formik.values.next_appointment_date}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!formik.errors.next_appointment_date}
                  helperText={formik.errors.next_appointment_date}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="next_appointment_time"
                  name="next_appointment_time"
                  label="Next Appointment Time"
                  type="time"
                  fullWidth
                  value={formik.values.next_appointment_time}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!formik.errors.next_appointment_time}
                  helperText={formik.errors.next_appointment_time}
                />
              </Grid>
              </>
              )}
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

export default ManageLeadStatusForm