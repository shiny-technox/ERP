import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import CircleIcon from '@mui/icons-material/Circle';

const NotifyPopover = ({ open, anchorEl, handleClose, notifications }) => {
    
    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            PaperProps={{
                sx: {
                    width: '280px',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                },
            }}
        >
            <div style={{ padding: '16px' }}>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    style={{ position: 'absolute', top: '8px', right: '8px', color: '#808080' }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" sx={{ color: '#808080', marginBottom: '16px' }}>
                    Notifications
                </Typography>
                <Divider sx={{ marginBottom: '10px' }} />
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <React.Fragment key={notification.id}>
                            <div style={{ backgroundColor: '#e0f7fa', borderRadius: '4px', padding: '8px' }}>
                                <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CircleIcon sx={{ color: 'blue', marginRight: '8px', fontSize: '10px' }} />
                                    {notification.message}
                                </Typography>
                            </div>
                            <Divider sx={{ marginBottom: '10px', marginTop: '10px' }} />
                        </React.Fragment>
                    ))
                ) : (
                    <Typography sx={{ marginBottom: '8px' }}>
                        No new notifications.
                    </Typography>
                )}
            </div>
        </Popover>
    );
};

export default NotifyPopover;
