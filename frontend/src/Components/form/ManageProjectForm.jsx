import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, TextField, Button, Select, InputLabel, OutlinedInput, MenuItem, FormControl, FormHelperText, Grid, CircularProgress } from '@mui/material';
import axiosClient from "../../axiosClient";
import { useStateContext } from '../../contexts/contextprovider';
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
    if (!values.projName) newErrors.projName = "Project Name is required";
    if (!values.clientName) newErrors.clientName = "Client Name is required";
    if (!values.clientPhone) newErrors.clientPhone = "Client Phone is required";
    if (!values.clientEmail) {
      newErrors.clientEmail = "Client Mail is required";
    } else if (!/\S+@\S+\.\S+/.test(values.clientEmail)) {
      newErrors.clientEmail = "Email address is invalid";
    }
    if (!values.projDuration) newErrors.projDuration = "Project Duration is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { values, errors, handleChange, validate, setErrors, setValues };
};

export default function ManageProjectForm() {
  
  const initialFormState = {
    projName: "",
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    projDuration: "",
  };
  const { values, errors, handleChange, validate, setErrors, setValues } = useFormValidation(initialFormState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        setLoading(true);
        try {
          const { data } = await axiosClient.get(`/manage_project/${id}`);

          setValues({
            projName: data.ManageProject.projName,
            clientName: data.ManageProject.clientName,
            clientPhone: data.ManageProject.clientPhone,
            clientEmail: data.ManageProject.clientEmail,
            projDuration: data.ManageProject.projDuration,
          });
        } catch (err) {
          console.error('Failed to fetch project data:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchProject();
    }
  }, [id, setValues]);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
   
    setLoading(true);
    try {
      if (id) {
        const { data } = await axiosClient.post('/manage_project/update/'+id, values);
        // console.log(data);
        navigate('/manage_project', { state: { message: 'Project updated successfully!' } });
      } else {
      const { data } = await axiosClient.post('/manage_project/create', values);
      // console.log(data);
      navigate('/manage_project', { state: { message: 'Project created successfully!' } });
      }
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
          <h2> { id ? 'Edit' : ''} Manage Project</h2>
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
                  id="projName"
                  name="projName"
                  value={values.projName}
                  onChange={handleChange}
                  label="Project Name"
                  error={!!errors.projName}
                  helperText={errors.projName ? errors.projName : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="clientName"
                  name="clientName"
                  value={values.clientName}
                  onChange={handleChange}
                  label="Client Name"
                  error={!!errors.clientName}
                  helperText={errors.clientName ? errors.clientName : ''}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="clientPhone"
                  name="clientPhone"
                  value={values.clientPhone}
                  onChange={handleChange}
                  label="Client Phone"
                  error={!!errors.clientPhone}
                  helperText={errors.clientPhone ? errors.clientPhone : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="clientEmail"
                  name="clientEmail"
                  value={values.clientEmail}
                  onChange={handleChange}
                  label="Client Email"
                  type="email"
                  error={!!errors.clientEmail}
                  helperText={errors.clientEmail ? errors.clientEmail : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="projDuration"
                  name="projDuration"
                  value={values.projDuration}
                  onChange={handleChange}
                  label="Project Duration (in hours)"
                  type="number"
                  error={!!errors.projDuration}
                  helperText={errors.projDuration ? errors.projDuration : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <div className="employee-form-submit">
                  <Button variant="contained" type="submit" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : { id } ? 'Update' : 'Submit'}
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
