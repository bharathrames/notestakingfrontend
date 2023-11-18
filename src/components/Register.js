import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = ({ username, password, handleUsernameChange, handlePasswordChange, handleRegister }) => {

  const showToast = (message) => {
    toast.error(message, { position: toast.POSITION.TOP_CENTER });
  };

  const showToaster = (message) => {
    toast.success(message, { position: toast.POSITION.TOP_CENTER });
  };

  const validateAndRegister = () => {
    if (username.trim() === '' || password.trim() === '') {
      showToast('Username and password cannot be empty.');
    } else if (username.length < 3) {
      showToast('Username must be at least 3 characters long.');
    } else if (password.length < 8) {
      showToast('Password must be at least 8 characters long.');
    } else {
      handleRegister();
      showToaster('User registered successfully!');
    }
  };

  return (
    <div>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={handleUsernameChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={handlePasswordChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={validateAndRegister}>
        Register
      </Button>
    </div>
  );
};

export default Register;
