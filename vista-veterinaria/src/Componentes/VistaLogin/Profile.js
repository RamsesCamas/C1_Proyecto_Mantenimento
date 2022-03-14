import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  out:{
    textAlign: 'right',
  }
}));

export default function Profile() {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('user'));


  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className={classes.root}>

      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5">
          Bienvenido {user} 
          </Typography>
        </CardContent>
      </Card>
      <div className={classes.out}>

        <h2 onClick={handleLogout}>Logout</h2>

        </div>
    </div>
       
  );
}