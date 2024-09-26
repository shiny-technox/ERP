import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Stack,
  Avatar,
  CardContent,
  Typography,
  TextField,
  Divider,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  FormHelperText
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useStateContext } from "../../contexts/contextprovider";
import axiosClient from "../../axiosClient";
import { useSelector } from "react-redux";

const useFormValidation = (initialState) => {
  const [errors, setErrors] = useState({});
  const [errorsPassword, setErrorsPassword] = useState({});
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.profName) newErrors.profName = "Name is required";
    if (!formData.empId) newErrors.empId = "Employee ID is required";
    if (!formData.empEmail) newErrors.empEmail = "Email is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCurrentPassword = () => {
    const { newPassword, newPassword_confirmation } = formData;
    const passwordErrors = {};

    if (newPassword !== newPassword_confirmation && newPassword.length < 8 ) {
      passwordErrors.newPassword = "New password must be at least 8 characters long";
    }

  
   
    setErrorsPassword(passwordErrors);
    return Object.keys(passwordErrors).length === 0;
  };

  return { formData, errors, errorsPassword, handleChange, validate, setErrors, setFormData, validateCurrentPassword, setErrorsPassword };
};

export default function ManageProfile() {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useStateContext();
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const initialFormState = {
    profName: user?.name || "",
    empId: user?.emp_id || "",
    empEmail: user?.email || "",
    currentPassword: "",
    newPassword: "",
    newPassword_confirmation: ""
  };

  const { formData, errors, errorsPassword, handleChange, validate, setErrors, setFormData, validateCurrentPassword, setErrorsPassword } =
    useFormValidation(initialFormState);

  useEffect(() => {
    if (user) {
      setFormData({
        profName: user.name,
        empId: user.emp_id,
        empEmail: user.email,
        currentPassword: "",
        newPassword: "",
        newPassword_confirmation: ""
      });
    }
  }, [user, setFormData]);

  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowCurrentPassword = () => setShowCurrentPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const handleMouseDownPassword = (event) => event.preventDefault();

  const [successMsg, setSuccessMsg] = useState("Profile updated successfully");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    if (user.id) {
      setLoadingProfile(true);
      try {
        const { data } = await axiosClient.post(`/employee/profile/${user.id}`, formData);
        if (data.code === 200) {
          setSuccessMsg("Profile updated successfully");
          setOpen(true);
        }
      } catch (err) {
        if (err.response && err.response.status === 422) {
          setErrors(err.response.data.errors);
        }
        console.log("Error config:", err.config);
      } finally {
        setLoadingProfile(false);
      }
    }
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
  
    const { currentPassword, newPassword, newPassword_confirmation } = formData;
  
    // Validate current password format
    if (!validateCurrentPassword()) {
      return;
    }
  
    // Validate new password length
    if (newPassword.length < 8) {
      const passwordErrors = {
        newPassword: 'Password must be at least 8 characters long'
      };
      setErrorsPassword(passwordErrors);
      return;
    }
  
    setLoadingPassword(true);
  
    try {
      // Attempt to change password via API request
      const { data } = await axiosClient.post(`/employee/change-password/${user.id}`, {
        currentPassword,
        newPassword,
        newPassword_confirmation
      });
  
      // Handle successful response
      if (data.code === 200) {
        setSuccessMsg("Password updated successfully");
        setOpen(true);
      }
    } catch (err) {
      // Handle errors from API response
      const passwordErrors = {};
  
      if (err.response && err.response.status === 422) {
        if (err.response.data.message === 'Current password does not match.') {
          passwordErrors.currentPassword = 'Current password is incorrect';
        } else if (err.response.data.message === 'New password confirmation does not match.') {
          passwordErrors.newPassword_confirmation = 'New password and confirm password do not match';
        }
      } else if (err.response && err.response.status === 500) {
        console.log('Internal server error:', err.response.data.message);
      } else {
        console.log('Unexpected error:', err);
      }
  
      // Set password errors based on API response
      setErrorsPassword(passwordErrors);
      console.log('Error config:', err.config);
    } finally {
      // Always stop loading state after request completes
      setLoadingPassword(false);
    }
  };
  

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  useEffect(() => {
    validateCurrentPassword();
  }, [formData.newPassword, formData.newPassword_confirmation]);

  return (
    <div className="employee-table-outlet">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
          {successMsg}
        </Alert>
      </Snackbar>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4} sx={{ margin: "0px" }}>
          <Box
            sx={{
              boxShadow: 1,
              width: "100%",
              height: "250px",
              bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "#fff"),
              color: (theme) => (theme.palette.mode === "dark" ? "grey.300" : "grey.800"),
              p: 1,
              m: 1,
              borderRadius: 2,
              textAlign: "center",
              fontSize: "0.875rem",
              fontWeight: "700"
            }}
          >
            <CardContent>
              <Stack spacing={2} sx={{ alignItems: "center" }}>
                <Avatar src={user.avatar} sx={{ height: "80px", width: "80px" }} />
                <Stack spacing={1} sx={{ textAlign: "center" }}>
                  <Typography variant="h5">{user.name}</Typography>
                  <Typography color="text.secondary" variant="body2">
                    {user.emp_role}, Technox
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {user.emp_id}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Box>
        </Grid>
        <Grid item xs={12} lg={8} sx={{ margin: "0px" }}>
        <Box
  sx={{
    boxShadow: 2,
    width: "100%",
    bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "#fff"),
    color: (theme) => (theme.palette.mode === "dark" ? "grey.300" : "grey.800"),
    p: 4,
    m: 1,
    borderRadius: 2,
    textAlign: "center",
    fontSize: "0.875rem",
    fontWeight: "700",
    mb: 2// Reduced margin-bottom
  }}
>
  <div className="profile-form-head" style={{ marginBottom: "16px" }}>
    <h2>Profile</h2>
  </div>
  <Divider />
  <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
    <div className="profile-form" style={{ marginTop: "16px", marginBottom: "24px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} sm={6} lg={6}>
          <TextField
            sx={{ width: "90%" }}
            required
            id="profName"
            name="profName"
            value={formData.profName}
            onChange={handleChange}
            label="Full Name"
            error={!!errors.profName}
            helperText={errors.profName}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={6} lg={6}>
          <TextField
            sx={{ width: "90%" }}
            required
            id="empId"
            name="empId"
            value={formData.empId}
            onChange={handleChange}
            label="Employee ID"
            error={!!errors.empId}
            helperText={errors.empId}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={6} lg={6}>
          <TextField
            sx={{ width: "90%" }}
            required
            id="empEmail"
            name="empEmail"
            value={formData.empEmail}
            onChange={handleChange}
            label="Email"
            error={!!errors.empEmail}
            helperText={errors.empEmail}
          />
        </Grid>
      </Grid>
    </div>
    <Button type="submit" variant="contained" color="primary" disabled={loadingProfile}>
      {loadingProfile ? <CircularProgress size={24} /> : "Update Profile"}
    </Button>
  </Box>
</Box>

<Box
  sx={{
    boxShadow: 2,
    width: "100%",
    bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "#fff"),
    color: (theme) => (theme.palette.mode === "dark" ? "grey.300" : "grey.800"),
    p: 4,
    m: 1,
    borderRadius: 2,
    textAlign: "center",
    fontSize: "0.875rem",
    fontWeight: "700",
    mt: 1 // Reduced margin-top
  }}
>
  <div className="profile-form-head" style={{ marginBottom: "16px" }}>
    <h2>Change Password</h2>
  </div>
  <Divider />
  <Box component="form" noValidate autoComplete="off" onSubmit={handlePasswordChange}>
    <div className="profile-form" style={{ marginTop: "16px", marginBottom: "24px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} sm={6} lg={6}>
          <FormControl sx={{ width: "90%" }} variant="outlined">
            <InputLabel htmlFor="currentPassword" error={!!errorsPassword.currentPassword}>Current Password</InputLabel>
            <OutlinedInput
              required
              id="currentPassword"
              name="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              value={formData.currentPassword}
              onChange={handleChange}
              error={!!errorsPassword.currentPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowCurrentPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Current Password"
            />
            {errorsPassword.currentPassword && <FormHelperText error>{errorsPassword.currentPassword}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} sm={6} lg={6}>
          <FormControl sx={{ width: "90%" }} variant="outlined">
            <InputLabel htmlFor="newPassword" error={!!errorsPassword.newPassword}>New Password</InputLabel>
            <OutlinedInput
              required
              id="newPassword"
              name="newPassword"
              type={showPassword ? "text" : "password"}
              value={formData.newPassword}
              onChange={handleChange}
              error={!!errorsPassword.newPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="New Password"
            />
            {errorsPassword.newPassword && <FormHelperText error>{errorsPassword.newPassword}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} sm={6} lg={6}>
          <FormControl sx={{ width: "90%" }} variant="outlined">
            <InputLabel htmlFor="newPassword_confirmation" error={!!errorsPassword.newPassword_confirmation}>Confirm Password</InputLabel>
            <OutlinedInput
              required
              id="newPassword_confirmation"
              name="newPassword_confirmation"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.newPassword_confirmation}
              onChange={handleChange}
              error={!!errorsPassword.newPassword_confirmation}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
            {errorsPassword.newPassword_confirmation && <FormHelperText error>{errorsPassword.newPassword_confirmation}</FormHelperText>}
          </FormControl>
        </Grid>
      </Grid>
    </div>
    <Button type="submit" variant="contained" color="primary" disabled={loadingPassword}>
      {loadingPassword ? <CircularProgress size={24} /> : "Change Password"}
    </Button>
  </Box>
</Box>

        </Grid>
      </Grid>
    </div>
  );
}
