import React from 'react';
// Icons
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

export default ({ children, onClick, title, btnClassName, tipClassName }) => (
  <Tooltip title={title} className={tipClassName} placement='top'>
    <IconButton onClick={onClick} className={btnClassName} data-testid='icon'>
      {children}
    </IconButton>
  </Tooltip>
);