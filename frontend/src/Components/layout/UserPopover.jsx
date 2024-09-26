import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { BsBoxArrowRight, BsPersonWorkspace } from 'react-icons/bs';
import { useStateContext } from '../../contexts/contextprovider';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient';

export function UserPopover({ anchorEl, onClose, open }) {
  const { user, setUser, setToken, setUserRole } = useStateContext();
  const navigate = useNavigate();

  const onLogout = async (ev) => {
    ev.preventDefault();
    try {
      await axiosClient.get("/logout");
      setUser(null);
      setToken(null);
      setUserRole(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleProfileClick = () => {
    onClose(); // Close the popover when Profile link is clicked
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '240px' } } }}
    >
      <Box sx={{ p: '16px 20px ' }}>
        <Typography variant="subtitle1">{user.name}</Typography>
        <Typography color="text.secondary" variant="body2">
          {user.email}
        </Typography>
      </Box>
      <Divider />
      <MenuList>
        <MenuItem>
          <Link to="/manage_profile" onClick={handleProfileClick}>
            <ListItemIcon>
              <BsPersonWorkspace />
            </ListItemIcon>
            Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <BsBoxArrowRight />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
}

export default UserPopover;
