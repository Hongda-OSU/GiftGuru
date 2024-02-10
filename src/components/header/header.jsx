import React from 'react';
import "./header.css";
import { AppBar, Toolbar, IconButton } from '@mui/material';
import Logo from '../../../public/logo2.png';

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ top: 0, background: 'linear-gradient(45deg, #00b859, #007580)', height: '50px' }}> 
      <Toolbar variant="dense" sx={{ justifyContent: 'center' }}>
        <IconButton edge="start" aria-label="logo">
          <img src={Logo} alt="Logo" style={{ height: '24px' }} />
          <p className="header-title">GiftGuru</p>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
