import React from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import Logo from '../../../public/logo2.png'; // Update the relative path according to your project structure

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ top: 0, backgroundColor: '#d45800' }}> {/* Changed color here */}
      <Toolbar variant="dense" sx={{ justifyContent: 'center' }}>
        <IconButton edge="start" aria-label="logo">
          <img src={Logo} alt="Logo" style={{ height: '24px' }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
