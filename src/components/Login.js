import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = ({ username, password, handleUsernameChange, handlePasswordChange, handleLogin }) => (
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
    <Button variant="contained" color="primary" onClick={handleLogin}>
      Login
    </Button>
  </div>
);

export default Login;
