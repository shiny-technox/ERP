import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { MenuItem } from '@mui/material';
import { useFormik } from "formik";
import { LeadActivityStoreValidation } from '../validation/LeadActivityStoreValidation';

function LeadActivityForm({ open, onClose }) {
  const [initialValues, setInitialValues] = React.useState({
    leadStatus: "",
    leadDesc: "",
    next_appointment_date:"",
    next_appointment_time:"",

  });

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const formJson = Object.fromEntries(formData.entries());
  //   console.log(formJson);
  //   onClose();
  // };

  const reqLeadStatus = ["Continue", "Ended"];

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: LeadActivityStoreValidation,
    onSubmit: async (values) => {
      console.log(values);

    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Activity</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the details for the new activity.
        </DialogContentText>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            '& .MuiTextField-root': { mt: 1, width: '100%' },
            '& .MuiFormControl-root': { mt: 1, width: '100%' },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                select
                id="leadStatus"
                name="leadStatus"
                label="Lead Status"
                value={formik.values.leadStatus}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={!!formik.errors.leadStatus}
                helperText={formik.errors.leadStatus}
              >
           {reqLeadStatus.map((leadStatus) => (
            <MenuItem key={leadStatus} value={leadStatus}>
              {leadStatus}
            </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="leadDesc"
                name="leadDesc"
                label="Lead Description"
                value={formik.values.leadDesc}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={!!formik.errors.leadDesc}
                helperText={formik.errors.leadDesc}
              />
            </Grid>
            {formik.values.leadStatus === "Continue" && (
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
          </Grid>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Add Activity</Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default LeadActivityForm;
