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
    if (!values.sslCertificate) newErrors.sslCertificate = "SSL  Name required";
    if (!values.sslProvider) newErrors.sslProvider = "SSL Provider required";
    if (!values.sslExpired) newErrors.sslExpired = "SSL Expired required";
    if(values.sslExpired){
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(values.sslExpired)) {
            newErrors.sslExpired = "Date must be in the format YYYY-MM-DD";
          }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { values, errors, handleChange, validate, setErrors, setValues };
};


function ManageSSLForm() {
    const initialFormState = {
     
        sslCertificate:"",
            sslProvider:"",
            sslExpired:"",
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
              const { data } = await axiosClient.get(`/manage_ssl/${id}`);
              console.log(data);
              setValues({
           
                sslCertificate: data.manageSSL.ssl_certificate,
                sslProvider: data.manageSSL.ssl_provider,
                sslExpired: data.manageSSL.ssl_expiry_date,
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
            await axiosClient.post(`/manage_ssl/update/`+id, values);
            navigate('/manage_ssl', { state: { message: 'Project updated successfully!' } });
          }else{
            await axiosClient.post(`/manage_ssl/store`, values);
            navigate('/manage_ssl', { state: { message: 'Project stored successfully!' } });
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
            <h2>{id ? 'Edit' : 'Manage'} SSL Certificate</h2>
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
                    id="sslCertificate"
                    name="sslCertificate"
                    value={values.sslCertificate}
                    onChange={handleChange}
                    label="SSL Certificate"
                    error={!!errors.sslCertificate}
                    helperText={errors.sslCertificate ? errors.sslCertificate : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="sslProvider"
                    name="sslProvider"
                    value={values.sslProvider}
                    onChange={handleChange}
                    label="SSL Provider"
                    error={!!errors.sslProvider}
                    helperText={errors.sslProvider ? errors.sslProvider : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="sslExpired"
                    name="sslExpired"
                    value={values.sslExpired}
                    onChange={handleChange}
                    label="SSL Expired (YYYY-MM-DD)"
                    type="text"
                    error={!!errors.sslExpired}
                    helperText={errors.sslExpired ? errors.sslExpired : ''}
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
  
  

export default ManageSSLForm