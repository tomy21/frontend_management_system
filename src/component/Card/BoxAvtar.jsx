import React from 'react';
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';

const BoxAvatar = () => {
  return (
    <Box display="flex" alignItems="center">
      <AvatarGroup max={4}>
        <Avatar alt="User 1" src="/static/images/avatar/1.jpg" />
        <Avatar alt="User 2" src="/static/images/avatar/2.jpg" />
        <Avatar alt="User 3" src="/static/images/avatar/3.jpg" />
        <Avatar alt="User 4" src="/static/images/avatar/4.jpg" />
        <Avatar alt="User 5" src="/static/images/avatar/5.jpg" />
      </AvatarGroup>
      
    </Box>
  );
};

export default BoxAvatar;
