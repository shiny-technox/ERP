import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Select, InputLabel, OutlinedInput, MenuItem, FormControl, FormHelperText, Grid, CircularProgress } from '@mui/material';
import axiosClient from "../axiosClient";
import { useStateContext } from '../contexts/contextprovider';
import { useNavigate } from 'react-router-dom';

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
    if (!values.empRole) newErrors.empRole = "Employee Role is required";
    if (!values.empMail) {
      newErrors.empMail = "Employee Mail is required";
    } else if (!/\S+@\S+\.\S+/.test(values.empMail)) {
      newErrors.empMail = "Email address is invalid";
    }
    if (!values.empSalary) newErrors.empSalary = "Employee Salary is required";
    if (!values.empPass) newErrors.empPass = "Employee Password is required";
    else if (values.empPass.length < 6) {
      newErrors.empPass = "Password must be at least 6 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { values, errors, handleChange, validate, setErrors };
};

export default function CreateEmp() {
  const initialFormState = {
    empName: "",
    empId: "",
    empRole: "",
    empMail: "",
    empSalary: "",
    empPass: "",
  };
  const { values, errors, handleChange, validate, setErrors } = useFormValidation(initialFormState);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosClient.post('/manage_role/fetch'); 
        setRoles(response.data.EmployeeRole); 
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { data } = await axiosClient.post('/employee/create', values);
      navigate('/employee/list', { state: { message: 'Employee created successfully!' } });
    } catch (err) {
      if (err.response) {
        const response = err.response;
        if (response.status === 422) {
          setErrors(response.data.errors);
        }
      }
      console.error('Error config:', err.config);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="employee-form">
      <div className="employee-form-inlayout">
        <div className="employee-form-title">
          <h2>Employee Details</h2>
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
                  error={!!errors.empName}
                  helperText={errors.empName}
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
                  helperText={errors.empId}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl required variant="outlined" error={!!errors.empRole}>
                  <InputLabel id="empRoleLab">Employee Role</InputLabel>
                  <Select
                    labelId="empRoleLab"
                    id="empRole"
                    name="empRole"
                    value={values.empRole}
                    onChange={handleChange}
                    label="Employee Role"
                    input={<OutlinedInput label="Employee Role" />}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {roles.map((role) => (
                      <MenuItem key={role.id} value={role.role}>
                        {role.role}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.empRole}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="empMail"
                  name="empMail"
                  value={values.empMail}
                  onChange={handleChange}
                  label="Employee Mail"
                  error={!!errors.empMail}
                  helperText={errors.empMail}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="empSalary"
                  name="empSalary"
                  value={values.empSalary}
                  onChange={handleChange}
                  label="Employee Salary"
                  error={!!errors.empSalary}
                  helperText={errors.empSalary}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="empPass"
                  name="empPass"
                  value={values.empPass}
                  onChange={handleChange}
                  label="Employee Password"
                  type="password"
                  error={!!errors.empPass}
                  helperText={errors.empPass}
                />
              </Grid>
              <Grid item xs={12}>
                <div className="employee-form-submit">
                  <Button variant="contained" type="submit" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Submit'}
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
