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
import { EmployeeScheduleInterviewValidation } from "../../validation/EmployeeScheduleInterviewValidation";

const leadTypes = ["Google", "Facebook", "Reference", "SEO", "Local SEO", "Cold call"];
const requirements = ["Website", "Digital marketing", "SEO", "Design"];
const statuses = ["Onprogress", "Loss", "Completed"];

function EmployeeScheduleInterviewForm() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        interviewerName: "",
        interviewerEmail:"",
        interviewerPhone:"",
        interviewScheduleDate:"",
        interviewScheduleTime:"",
    });
    const navigate = useNavigate();
  
    useEffect(() => {
      if (id) {
        setIsLoading(true);
        axiosClient.get(`/schedule-interview/edit/${id}`)
          .then((response) => {
            console.log(response);
            const fetchedData = response.data.scheduleInterview;
           // setInitialValues(response.data.ManageLeads);
           setInitialValues({
            interviewerName: fetchedData.interviewer_name || "",
            interviewerEmail: fetchedData.interviewer_email || "",
            interviewerPhone: fetchedData.interviewer_phone || "",
            interviewScheduleDate: fetchedData.interview_schedule_date || "",
            interviewScheduleTime: fetchedData.interview_schedule_time || "",
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
      validationSchema: EmployeeScheduleInterviewValidation,
      onSubmit: async (values) => {
        setIsLoading(true);
        console.log(values);
        try {
          const response = id
            ? await axiosClient.put(`/schedule-interview/update/${id}`, values)
            : await axiosClient.post("/schedule-interview/store", values);
         // console.log(response.data);
          navigate('/employee/schedule-interview', { state: { message: 'Data saved successfully!' } });
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
          <h2>{ id ? 'Edit' : 'Add'} Interview</h2>
        </div>
      
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} marginTop={2}>

              <Grid item xs={6}>
                <TextField
                  id="interviewerName"
                  name="interviewerName"
                  label="Interviewer Name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.interviewerName}
                  type="text"
                  fullWidth
                  error={!!formik.errors.interviewerName}
                  helperText={formik.errors.interviewerName}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="interviewerEmail"
                  name="interviewerEmail"
                  label="Interviewer Email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.interviewerEmail}
                  type="text"
                  fullWidth
                  error={!!formik.errors.interviewerEmail}
                  helperText={formik.errors.interviewerEmail}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="interviewerPhone"
                  name="interviewerPhone"
                  label="Interviewer Phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.interviewerPhone}
                  type="text"
                  fullWidth
                  error={!!formik.errors.interviewerPhone}
                  helperText={formik.errors.interviewerPhone}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="interviewScheduleDate"
                  name="interviewScheduleDate"
                  label="Interviewe Date"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.interviewScheduleDate}
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!formik.errors.interviewScheduleDate}
                  helperText={formik.errors.interviewScheduleDate}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="interviewScheduleTime"
                  name="interviewScheduleTime"
                  label="Interviewe Time"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.interviewScheduleTime}
                  type="time"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  error={!!formik.errors.interviewScheduleTime}
                  helperText={formik.errors.interviewScheduleTime}
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
                  {isLoading ? <CircularProgress size={24} /> : id ? "Update Interview" : "Add Interview"}
                </Button>
              </Grid>
            </Grid>
          </form>
     
      </Box>
    );
}

export default EmployeeScheduleInterviewForm