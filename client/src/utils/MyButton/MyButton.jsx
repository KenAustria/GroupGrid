import React from 'react';
// Icons
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const MyButton = ({ children, onClick, title, btnClassName, tipClassName }) => {
  return (
    <Tooltip title={title} className={tipClassName} placement='top'>
      <IconButton onClick={onClick} className={btnClassName} data-testid='icon'>
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default MyButton;
