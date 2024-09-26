import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Select, InputLabel, OutlinedInput, MenuItem, FormControl, CircularProgress, Grid } from '@mui/material';
import axiosClient from "../../../axiosClient";
import { useStateContext } from '../../../contexts/contextprovider';
import { useNavigate, useParams } from 'react-router-dom';

const useFormValidation = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!values.empName) newErrors.empName = "Employee Name is required";
    if (!values.empId) newErrors.empId = "Employee ID is required";
    if (!values.contactNumber) {
      newErrors.contactNumber = "Contact Number is required";
    } else if (!/^\d{10}$/.test(values.contactNumber)) {
      newErrors.contactNumber = "Contact Number must be 10 digits";
    }
    if (!values.emergencyContactNumber) {
      newErrors.emergencyContactNumber = "Emergency Contact Number is required";
    } else if (!/^\d{10}$/.test(values.emergencyContactNumber)) {
      newErrors.emergencyContactNumber = "Emergency Contact Number must be 10 digits";
    }
    if (!values.dob) newErrors.dob = "Date of Birth is required";
    if (!values.addressLine1) newErrors.addressLine1 = "Address Line 1 is required";
    if (!values.city) newErrors.city = "City is required";
    if (!values.state) newErrors.state = "State is required";
    if (!values.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(values.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { values, errors, handleChange, validate, setValues, setErrors };
};

export default function EmployeeProfileForm() {
   const { id } = useParams();
  const initialFormState = {
    empName: "",
    empId: "",
    contactNumber: "",
    emergencyContactNumber: "",
    dob: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  };
   const { values, errors, handleChange, validate, setValues, setErrors } = useFormValidation(initialFormState);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeResponse = await axiosClient.get(`/employee/${id}`);
        setValues({
          empName: employeeResponse.data.user.name || "",
          empId: employeeResponse.data.user.emp_id || "",
          contactNumber: employeeResponse.data.user.contact_number || "",
          emergencyContactNumber: employeeResponse.data.user.emergency_contact_number || "",
          dob: employeeResponse.data.user.dob || "",
          addressLine1: employeeResponse.data.user.address_line_1 || "",
          addressLine2: employeeResponse.data.user.address_line_2 || "",
          city: employeeResponse.data.user.city || "",
          state: employeeResponse.data.user.state || "",
          pincode: employeeResponse.data.user.pincode || "",
        });

        const rolesResponse = await axiosClient.post('/manage_role/fetch');
       // setRoles(rolesResponse.data.roles);
      } catch (err) {
        console.error(err);
        if (err.response) {
          console.error(err.response.data);
        }
      }
    };

    fetchData();
  }, [id,  setValues]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {

      const { data } = await axiosClient.post(`employee/profile_update/${id}`, values);

      navigate('/employee/profile', { state: { message: 'Employee updated successfully!' } });

    } catch (err) {
      if (err.response) {
        const response = err.response;
        if (response.status === 422) {
          setErrors(response.data.errors);
        }
      }
      console.log('Error config:', err.config);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="employee-form">
      <div className="employee-form-inlayout">
        <div className="employee-form-title">
          <h2>Employee Update</h2>
        </div>
        <div className="employee-inner-form">
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { mt: 1, width: '100%' },
              '& .MuiFormControl-root': { mt: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="empName"
                  name="empName"
                  value={values.empName}
                  onChange={handleChange}
                  label="Employee Name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.empName}
                  helperText={errors.empName ? errors.empName : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="empId"
                  name="empId"
                  value={values.empId}
                  onChange={handleChange}
                  label="Employee ID"
                  error={!!errors.empId}
                  helperText={errors.empId ? errors.empId : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="contactNumber"
                  name="contactNumber"
                  value={values.contactNumber}
                  onChange={handleChange}
                  label="Contact Number"
                  error={!!errors.contactNumber}
                  helperText={errors.contactNumber ? errors.contactNumber : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="emergencyContactNumber"
                  name="emergencyContactNumber"
                  value={values.emergencyContactNumber}
                  onChange={handleChange}
                  label="Emergency Contact Number"
                  error={!!errors.emergencyContactNumber}
                  helperText={errors.emergencyContactNumber ? errors.emergencyContactNumber : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="dob"
                  name="dob"
                  value={values.dob}
                  onChange={handleChange}
                  label="Date of Birth"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.dob}
                  helperText={errors.dob ? errors.dob : ''}
                 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="addressLine1"
                  name="addressLine1"
                  value={values.addressLine1}
                  onChange={handleChange}
                  label="Address Line 1"
                  error={!!errors.addressLine1}
                  helperText={errors.addressLine1 ? errors.addressLine1 : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="addressLine2"
                  name="addressLine2"
                  value={values.addressLine2}
                  onChange={handleChange}
                  label="Address Line 2"
                  error={!!errors.addressLine2}
                  helperText={errors.addressLine2 ? errors.addressLine2 : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="city"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  label="City"
                  error={!!errors.city}
                  helperText={errors.city ? errors.city : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="state"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  label="State"
                  error={!!errors.state}
                  helperText={errors.state ? errors.state : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="pincode"
                  name="pincode"
                  value={values.pincode}
                  onChange={handleChange}
                  label="Pincode"
                  error={!!errors.pincode}
                  helperText={errors.pincode ? errors.pincode : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <div className="employee-form-submit">
                  <Button variant="contained" type="submit" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Update'}
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
}
