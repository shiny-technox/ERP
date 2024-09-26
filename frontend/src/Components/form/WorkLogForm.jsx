import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Select, InputLabel, OutlinedInput, MenuItem, FormControl, FormHelperText, Grid, CircularProgress, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosClient from "../../axiosClient";
import { useNavigate, useParams } from 'react-router-dom'; 
import { useStateContext } from '../../contexts/contextprovider';
import useFetchManageProject from '../list/useFetchManageProject';

const useFormValidation = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newValues = [...values];
    newValues[index][name] = value;
    setValues(newValues);
  };
  
  const validate = () => {
    const newErrors = values.map((row, index) => {
      const rowErrors = {};
      if (!row.projId) rowErrors.projId = "Select Project is required";
      if (!row.taskTitle) rowErrors.taskTitle = "Task Title is required";
      if (!row.taskDescription) rowErrors.taskDescription = "Task Description is required";
      if (!row.taskTime) rowErrors.taskTime = "Task Time is required";
      if (!row.workStatusId) rowErrors.workStatusId = "Work Status is required";
      if (!row.taskTime) {
        rowErrors.taskTime = "Task Time is required";
      } else {
        const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
        if (!regex.test(row.taskTime)) {
          rowErrors.taskTime = "Time must be in the format HH:MM:SS";
        }
      }
      return rowErrors;
    });

    setErrors(newErrors);
    return newErrors.every(rowErrors => Object.keys(rowErrors).length === 0);
  };

  return { values, errors, handleChange, validate, setErrors, setValues };
};

export default function ManageTaskForm() {

  const { user, attendanceId, setUser, setAttendanceId } = useStateContext();
  

  const initialFormState = [
    { emp_id: user.id, projId: "", taskTitle: "", taskDescription: "", taskTime: "", workStatusId: "" }
  ];

  
  const { values, errors, handleChange, validate, setErrors, setValues } = useFormValidation(initialFormState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        setLoading(true);
        try {
          const { data } = await axiosClient.get(`/work_log/${id}`);
         // console.log(data);
          setValues([{
            emp_id: data.WorkLog[0].emp_id,
            projId: data.WorkLog[0].proj_id,
            taskTitle: data.WorkLog[0].task_title,
            taskDescription: data.WorkLog[0].task_desc,
            taskTime: data.WorkLog[0].task_time,
            workStatusId: data.WorkLog[0].task_status,
          }]);
        } catch (err) {
          console.error('Failed to fetch project data:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    }
  }, [id, setValues]);

  const handleAddRow = () => {
    setValues([...values, { emp_id: user.id, projId: "", taskTitle: "", taskDescription: "", taskTime: "", workStatusId: "" }]);
  };

  const { manageProjectData } = useFetchManageProject();

  const handleDeleteRow = (index) => {
    if (values.length > 1) {
      setValues(values.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (event) => {

    event.preventDefault();
    if (!validate()) return;
    setLoading(true);
   
    try {
      if (id) {
        await axiosClient.post(`/work_log/update/${id}`, values);
        navigate('/employee/work-log', { state: { message: 'Work Log updated successfully!' } });
      } else {
        await axiosClient.post('/work_log/store', values);
        navigate('/employee/work-log', { state: { message: 'Work Log created successfully!' } });
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
          <h2>{id ? 'Edit' : 'Manage'} Work-Log</h2>
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
              <Grid item xs={12} sm={3}>
            
              </Grid>
            </Grid>
            
            {values.map((row, index) => (
              
              <Grid container spacing={2} key={index}>
                    <TextField
                    required
                    id="emp_id"
                    name="emp_id"
                    value='1'
                    type='hidden'
                  />
                <Grid item xs={12} sm={2}>
                  <FormControl required variant="outlined" error={!!errors[index]?.projId}>
                    <InputLabel id={`selectProject-${index}`}>Select Project</InputLabel>
                    <Select
                      labelId={`selectProject-${index}`}
                      id={`projId-${index}`}
                      name="projId"
                      value={row.projId}
                      onChange={(e) => handleChange(index, e)}
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
                    <FormHelperText>{errors[index]?.projId}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    required
                    id={`taskTitle-${index}`}
                    name="taskTitle"
                    value={row.taskTitle}
                    onChange={(e) => handleChange(index, e)}
                    label="Task Title"
                    error={!!errors[index]?.taskTitle}
                    helperText={errors[index]?.taskTitle || ''}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    required
                    id={`taskDescription-${index}`}
                    name="taskDescription"
                    value={row.taskDescription}
                    onChange={(e) => handleChange(index, e)}
                    label="Task Description"
                    error={!!errors[index]?.taskDescription}
                    helperText={errors[index]?.taskDescription || ''}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    required
                    id={`taskTime-${index}`}
                    name="taskTime"
                    value={row.taskTime}
                    onChange={(e) => handleChange(index, e)}
                    label="Task Time (HH:MM:SS)"
                    type="text"
                    error={!!errors[index]?.taskTime}
                    helperText={errors[index]?.taskTime || ''}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <FormControl required variant="outlined" error={!!errors[index]?.workStatusId}>
                    <InputLabel id={`selectWorkStatus-${index}`}>Select Status</InputLabel>
                    <Select
                      labelId={`selectWorkStatus-${index}`}
                      id={`workStatusId-${index}`}
                      name="workStatusId"
                      value={row.workStatusId}
                      onChange={(e) => handleChange(index, e)}
                      label="Select Status"
                      input={<OutlinedInput label="Select Status" />}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                      <MenuItem value="Progress">Progress</MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                    </Select>
                    <FormHelperText>{errors[index]?.workStatusId}</FormHelperText>
                  </FormControl>
                </Grid>
                    <>
                    { id ? null : (
                <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center', columnGap: '5px' }}>
                  <Button title='Add Row' variant="outlined" onClick={handleAddRow}><AddIcon /></Button>
                  <Button title='Delete Row' variant="outlined" onClick={() => handleDeleteRow(index)}><DeleteIcon /></Button>
                </Grid>
                 ) }
                </>

              </Grid>
            ))}

            <Grid item xs={12}>
              <div className="employee-form-submit">
                <Button variant="contained" type="submit" disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : id ? 'Update' : 'Submit'}
                </Button>
              </div>
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
}
