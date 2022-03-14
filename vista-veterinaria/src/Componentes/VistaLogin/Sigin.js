import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90vh',
  },
  image: {
    backgroundImage: 'url(https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/03/31/12/istock-168282777.jpg?width=1200)',
    backgroundSize: 'cover',
  },
  paper: {
    margin: theme.spacing(8, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: '50px'
  },
}));

async function loginUser(credentials) {
  return fetch('http://localhost:18081/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function Signin() {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      const response = await loginUser({
        email,
        password
      });
      if ('token' in response) {
          localStorage.setItem('accessToken', response['token']);
          localStorage.setItem('user', JSON.stringify(response['user']));
          window.location.href = "/auth/me";
      } else {
        swal("Error", "Usuario o Contraseña incorrectos");
      }
    } catch (error) {
      swal("Error", "Usuario o Contraseña incorrectos");
    }
    
  }

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} md={9} className={classes.image} />
      <Grid item xs={9} md={3} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h2" variant="h5">
            Ingresa tu usuario
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Correo electrónico"
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Iniciar Sesión
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}