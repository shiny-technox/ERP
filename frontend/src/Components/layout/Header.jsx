import React, { useState } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import UserPopover from './UserPopover'; 
import Badge from '@mui/material/Badge';
import NotifyPopover from './NotifyPopover'; 
import { useStateContext } from '../../contexts/contextprovider';


function Header({ OpenSidebar }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifyPopoverOpen, setNotifyPopoverOpen] = useState(false); 
  const [userPopoverOpen, setUserPopoverOpen] = useState(false); 
  const { notifications } = useStateContext();

  const handlePersonClick = (event) => {
    setAnchorEl(event.currentTarget);
    setUserPopoverOpen(true); 
  };

  const handleBadgeClick = (event) => {
    setAnchorEl(event.currentTarget);
    setNotifyPopoverOpen(true); 
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotifyPopoverOpen(false);
    setUserPopoverOpen(false);
  };

  return (
    <header className='header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
      <div className='menu-icon' style={{ marginRight: '10px' }}>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left' style={{ marginRight: '10px' }}>
        <BsSearch className='icon' />
      </div>
      <div className='header-right' style={{ display: 'flex', alignItems: 'center' }}>
        <Badge badgeContent={notifications.length} color="primary" onClick={handleBadgeClick} style={{ marginRight: '15px', cursor: 'pointer' }}>
          <BsFillBellFill className='icon' />
        </Badge>
        <BsFillEnvelopeFill className='icon' style={{ marginRight: '15px' }} />
        <BsPersonCircle className='icon' onClick={handlePersonClick} />
      </div>
      <NotifyPopover open={notifyPopoverOpen} anchorEl={anchorEl} handleClose={handleClose} notifications={notifications} />
      <UserPopover anchorEl={anchorEl} onClose={handleClose} open={userPopoverOpen} />
    </header>
  );
}

export default Header;
