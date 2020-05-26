import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { userLogin } from '../../apis';
// import './Login.css';

const Login = ({ setAuth }) => {
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  return (
    <div className="login-page">
      <Typography className="login-title" variant="h3" color="primary">
        Collov Kanban
      </Typography>
      <TextField
        className="login-input"
        fullWidth
        id="filled-basic"
        label="Username"
        variant="filled"
        onChange={(e) => {
          setLogin({ ...login, username: e.target.value });
        }}
      />
      <TextField
        className="login-input"
        fullWidth
        id="filled"
        label="Password"
        variant="filled"
        type="password"
        onChange={(e) => {
          setLogin({ ...login, password: e.target.value });
        }}
      />
      <Button
        size="large"
        variant="outlined"
        color="primary"
        onClick={async () => {
          const loggedIn = await userLogin(login);
          if (loggedIn.message === 'success') {
            setAuth(loggedIn.message);
          }
        }}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
