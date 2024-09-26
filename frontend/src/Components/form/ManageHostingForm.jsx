import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, TextField, Button, Select, InputLabel, OutlinedInput, MenuItem, FormControl, FormHelperText, Grid, CircularProgress } from '@mui/material';
import axiosClient from "../../axiosClient";
import { useNavigate, useParams } from 'react-router-dom'; 
import useFetchEmployees from '../list/useFetchEmployees';
import useFetchManageProject from '../list/useFetchManageProject';

const useFormValidation = (initialState) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
    };
  
    const validate = () => {
      const newErrors = {};
      if (!values.hostingName) newErrors.hostingName = "Hosting Name required";
      if (!values.hostingProvider) newErrors.hostingProvider = "Hosting Provider required";
      if (!values.hostingExpired) newErrors.hostingExpired = "Hosting Expired required";
      if(values.hostingExpired){
          const regex = /^\d{4}-\d{2}-\d{2}$/;
          if (!regex.test(values.hostingExpired)) {
              newErrors.hostingExpired = "Date must be in the format YYYY-MM-DD";
            }
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    return { values, errors, handleChange, validate, setErrors, setValues };
  };

function ManageHostingForm() {
    const initialFormState = {
        hostingName: "",
        hostingProvider: "",
        hostingExpired: "",
      };
    
      const { values, errors, handleChange, validate, setErrors, setValues } = useFormValidation(initialFormState);
      const [loading, setLoading] = useState(false);
      const [projects, setProjects] = useState([]);
      const navigate = useNavigate();
      const { id } = useParams();
    
      useEffect(() => {
        if (id) {
          const fetchProject = async () => {
            setLoading(true);
            try {
              const { data } = await axiosClient.get(`/manage_hosting/${id}`);
              console.log(data);
              setValues({
                hostingName: data.ManageHosting.hosting_name,
                hostingProvider: data.ManageHosting.hosting_provider,
                hostingExpired: data.ManageHosting.hosting_expired_date,
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
    
    
      const { manageProjectData } = useFetchManageProject();
      const { datas } = useFetchEmployees();
    
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validate()) return;
        setLoading(true);
        // console.log(values);
     
        try {
          if(id){
            await axiosClient.post(`/manage_hosting/update/`+id, values);
            navigate('/manage_hosting', { state: { message: 'Project updated successfully!' } });
          }else{
            await axiosClient.post(`/manage_hosting/store`, values);
            navigate('/manage_hosting', { state: { message: 'Project stored successfully!' } });
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
              <h2>{id ? 'Edit' : 'Manage'} Hosting</h2>
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
                      id="hostingName"
                      name="hostingName"
                      value={values.hostingName}
                      onChange={handleChange}
                      label="Hosting Name"
                      error={!!errors.hostingName}
                      helperText={errors.hostingName ? errors.hostingName : ''}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="hostingProvider"
                      name="hostingProvider"
                      value={values.hostingProvider}
                      onChange={handleChange}
                      label="Hosting Provider"
                      error={!!errors.hostingProvider}
                      helperText={errors.hostingProvider ? errors.hostingProvider : ''}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="hostingExpired"
                      name="hostingExpired"
                      value={values.hostingExpired}
                      onChange={handleChange}
                      label="Hosting Expired (YYYY-MM-DD)"
                      type="text"
                      error={!!errors.hostingExpired}
                      helperText={errors.hostingExpired ? errors.hostingExpired : ''}
                    />
                  </Grid>
                
    
                  <Grid item xs={12}>
                    <div className="employee-form-submit">
                      <Button variant="contained" type="submit" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : id ? 'Update' : 'Submit'}
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

export default ManageHostingForm