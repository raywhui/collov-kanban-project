import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { userLogin, addNewUser } from '../../apis';
import './Login.css';

const Login = ({ setAuth }) => {
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  const [currentStatus, setCurrentStatus] = useState();

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
        value={login.username}
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
        value={login.password}
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
          } else {
            setCurrentStatus(loggedIn.message);
          }
        }}
      >
        Login
      </Button>
      <Button
        size="large"
        color="primary"
        onClick={async () => {
          const newUser = await addNewUser(login);
          setCurrentStatus(newUser.message);
          setLogin({
            username: '',
            password: '',
          });
        }}
      >
        Sign Up
      </Button>
      {currentStatus === 'success' ? (
        <Typography className="login-title" variant="body1">
          You're now registered!
        </Typography>
      ) : (
        ''
      )}
      {currentStatus === 'username taken' ? (
        <Typography className="login-title" variant="body1">
          Username already taken. :(
        </Typography>
      ) : (
        ''
      )}
      {currentStatus === 'The username does not exist' ? (
        <Typography className="login-title" variant="body1">
          Username doesn't exist. Sign up now!
        </Typography>
      ) : (
        ''
      )}
      {currentStatus === 'passwordInvalid' ? (
        <Typography className="login-title" variant="body1">
          Incorrect Password.
        </Typography>
      ) : (
        ''
      )}
    </div>
  );
};

export default Login;
