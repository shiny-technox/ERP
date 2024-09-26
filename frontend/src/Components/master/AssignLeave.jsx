import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useStateContext } from '../../contexts/contextprovider';

const leaveTypes = ['Vacation', 'Sick Leave', 'Personal Leave'];

function AssignLeave() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [duration, setDuration] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [comments, setComments] = useState('');
  const { user } = useStateContext(); // Destructuring user from context

  const handleSubmit = (event) => {
    event.preventDefault();

    // Format duration and leaveType to match the specified format
    const formattedDuration = duration.toLowerCase().replace(' ', '_');
    const formattedLeaveType = leaveType.toLowerCase().replace(' ', '_');

    // Construct the data object in the desired format
    const data = {
      fromDate,
      toDate,
      duration: formattedDuration,
      leaveType: formattedLeaveType,
      fromTime,
      toTime,
      comments,
    };

    // Example console log to verify the data
    console.log('Formatted data:', data);
    setFromDate('');
    setToDate('');
    setDuration('');
    setFromTime('');
    setToTime('');
    setLeaveType('');
    setComments('');
  
  };

  return (
    <Box m={3}>
      <Typography variant="h4" gutterBottom>
        Assign Leave
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} marginTop={2}>
          <Grid item xs={6}>
            <TextField
              id="from-date"
              label="From Date"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="to-date"
              label="To Date"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="duration"
              select
              label="Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              fullWidth
              required
            >
              <MenuItem value="Full day">Full day</MenuItem>
              <MenuItem value="Half day">Half day</MenuItem>
              <MenuItem value="Specific time">Specific time</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="leave-type"
              select
              label="Leave Type"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              fullWidth
              required
            >
              {leaveTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="from-time"
              label="From Time"
              type="time"
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="to-time"
              label="To Time"
              type="time"
              value={toTime}
              onChange={(e) => setToTime(e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="comments"
              label="Comments"
              multiline
              rows={4}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} container justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
            >
              Assign Leave
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default AssignLeave;
