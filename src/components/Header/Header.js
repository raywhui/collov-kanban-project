import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import logo from '../../assets/logo_white.png';

import './Header.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = ({ setAuth }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img className="header-logo" src={logo} alt="Logo" />
          <Typography variant="h6" className={classes.title}>
            Hiring Kanban
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              setAuth(false);
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
