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
    if (!values.domainName) newErrors.domainName = "Domain Name required";
    if (!values.domainProvider) newErrors.domainProvider = "Domain Provider required";
    if (!values.domainExpired) newErrors.domainExpired = "Domain Expired required";
    if(values.domainExpired){
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(values.domainExpired)) {
            newErrors.domainExpired = "Date must be in the format YYYY-MM-DD";
          }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { values, errors, handleChange, validate, setErrors, setValues };
};


function ManageDomainForm() {
    const initialFormState = {
        domainName: "",
        domainProvider: "",
        domainExpired: "",
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
              const { data } = await axiosClient.get(`/manage_domain/${id}`);
              console.log(data);
              setValues({
                domainName: data.manageDomain.domain_name,
                domainProvider: data.manageDomain.domain_provider,
                domainExpired: data.manageDomain.domain_expired_date,
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
            await axiosClient.post(`/manage_domain/update/`+id, values);
            navigate('/manage_domain', { state: { message: 'Project updated successfully!' } });
          }else{
            await axiosClient.post(`/manage_domain/store`, values);
            navigate('/manage_domain', { state: { message: 'Project stored successfully!' } });
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
              <h2>{id ? 'Edit' : 'Manage'} Domain</h2>
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
                      id="domainName"
                      name="domainName"
                      value={values.domainName}
                      onChange={handleChange}
                      label="Domain Name"
                      error={!!errors.domainName}
                      helperText={errors.domainName ? errors.domainName : ''}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="domainProvider"
                      name="domainProvider"
                      value={values.domainProvider}
                      onChange={handleChange}
                      label="Domain Provider"
                      error={!!errors.domainProvider}
                      helperText={errors.domainProvider ? errors.domainProvider : ''}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="domainExpired"
                      name="domainExpired"
                      value={values.domainExpired}
                      onChange={handleChange}
                      label="Domain Expired (YYYY-MM-DD)"
                      type="text"
                      error={!!errors.domainExpired}
                      helperText={errors.domainExpired ? errors.domainExpired : ''}
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

export default ManageDomainForm