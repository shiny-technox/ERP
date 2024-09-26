import React, { useState } from 'react';
import { Box, TextField, Button, Snackbar, Alert } from '@mui/material';
import axiosClient from '../../axiosClient';

export default function ManageRole() {
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleAddRole = async () => {
    if (role.trim()) {
      try {
        await axiosClient.post('/manage_role/store', { role: role.trim() });
        setRole('');
        setError('');
        setSuccessMessage('Role added successfully');
      } catch (error) {
        console.error('Failed to add role:', error);
        setError('Role already exists');
      }
    } else {
      setError('Role name cannot be empty');
    }
  };

  const handleCloseSnackbar = () => {
    setError('');
    setSuccessMessage('');
  };

  return (
    <Box mt={4} ml={4}>
      <h2>Manage Roles</h2>
      <Box display="flex" alignItems="center" mt={2}>
        <TextField
          label="New Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <Button onClick={handleAddRole} variant="contained" style={{ marginLeft: '10px' }}>
          Add Role
        </Button>
      </Box>

      {successMessage && (
        <Snackbar
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success">
            {successMessage}
          </Alert>
        </Snackbar>
      )}

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}
