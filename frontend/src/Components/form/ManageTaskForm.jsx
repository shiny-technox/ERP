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
    if (!values.projId) newErrors.projId = "Select Project is required";
    if (!values.empId) newErrors.empId = "Select Client is required";
    if (!values.taskTitle) newErrors.taskTitle = "Task Title is required";
    if (!values.taskDescription) newErrors.taskDescription = "Task Description is required";
    if (!values.taskTime) newErrors.taskTime = "Task Time is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { values, errors, handleChange, validate, setErrors, setValues };
};

export default function ManageTaskForm() {
  const initialFormState = {
    projId: "",
    empId: "",
    taskTitle: "",
    taskDescription: "",
    taskTime: "",
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
          const { data } = await axiosClient.get(`/manage_project/${id}`);
          setValues({
            projId: data.ManageProject.projId,
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


  const { manageProjectData } = useFetchManageProject();
  const { datas } = useFetchEmployees();


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setLoading(true);
    console.log(values);
    try {
      if (id) {
        await axiosClient.post(`/manage_task/update/${id}`, values);
        navigate('/manage_task', { state: { message: 'Project updated successfully!' } });
      } else {
        await axiosClient.post('/manage_task/store', values);
        navigate('/manage_task', { state: { message: 'Project created successfully!' } });
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
          <h2>{id ? 'Edit' : 'Manage'} Task</h2>
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
                  id="taskTitle"
                  name="taskTitle"
                  value={values.taskTitle}
                  onChange={handleChange}
                  label="Task Title"
                  error={!!errors.taskTitle}
                  helperText={errors.taskTitle ? errors.taskTitle : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="taskDescription"
                  name="taskDescription"
                  value={values.taskDescription}
                  onChange={handleChange}
                  label="Task Description"
                  error={!!errors.taskDescription}
                  helperText={errors.taskDescription ? errors.taskDescription : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl required variant="outlined" error={!!errors.projId}>
                  <InputLabel id="selectProject">Select Project</InputLabel>
                  <Select
                    labelId="selectProject"
                    id="projId"
                    name="projId"
                    value={values.projId}
                    onChange={handleChange}
                    label="Select Project"
                    input={<OutlinedInput label="Select Project" />}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {manageProjectData.map((project) => (
                      <MenuItem key={project[0]} value={project[0]}>
                        {project[1]}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.projId}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl required variant="outlined" error={!!errors.empId}>
                  <InputLabel id="selectEmployee">Select Employee</InputLabel>
                  <Select
                    labelId="selectEmployee"
                    id="empId"
                    name="empId"
                    value={values.empId}
                    onChange={handleChange}
                    label="Select Employee"
                    input={<OutlinedInput label="Select Employee" />}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {datas.map((dataEmployee) => (
                      <MenuItem key={dataEmployee[0]} value={dataEmployee[0]}>
                        {dataEmployee[1]}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.empId}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="taskTime"
                  name="taskTime"
                  value={values.taskTime}
                  onChange={handleChange}
                  label="Task Time (hh:mm)"
                  type="text"
                  error={!!errors.taskTime}
                  helperText={errors.taskTime ? errors.taskTime : ''}
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
