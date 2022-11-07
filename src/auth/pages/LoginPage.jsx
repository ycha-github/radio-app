import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { checkingAuthentication } from '../../store/auth';
import { useAuthStore, useForm } from '../../hooks';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const loginFormFields={
  username:'',
  password:'',
}

export const LoginPage = () => {

  //const dispatch = useDispatch();
  const {startLogin, errorMessage}= useAuthStore();

  const { username, password, onInputChange } = useForm(loginFormFields);

  const onSubmit = ( event ) => {
    event.preventDefault();
    startLogin({ username, password });

    //dispatch( checkingAuthentication() );
  }

  useEffect(() => {
    if (errorMessage !== undefined){
      Swal.fire('Error en la autenticacion', errorMessage, 'error');
    }
  }, [errorMessage])

  return (
    <AuthLayout title="Login">
          <form onSubmit={ onSubmit }>
            <Grid container>
              <Grid item xs={ 12 } sx={{ mt: 2 }}>
                <TextField 
                  label="Usuario" 
                  type="text" 
                  placeholder='Usuario'
                  fullWidth
                  name='username'
                  value={username} 
                  onChange={ onInputChange }
                />
              </Grid>
              <Grid item xs={ 12 } sx={{ mt: 2 }}>
                <TextField 
                  label="Contraseña" 
                  type="password" 
                  placeholder='Contraseña'
                  fullWidth
                  name='password'
                  value={password} 
                  onChange={ onInputChange }
                />
              </Grid>
              <Grid container  sx={{ mt: 2, mb: 1 }} >
                  <Button type='submit' variant='contained' fullWidth >
                    Login
                  </Button>
              </Grid>              
            </Grid>        
          </form>
    </AuthLayout>
  )
}