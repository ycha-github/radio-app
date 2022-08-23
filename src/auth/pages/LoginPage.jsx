import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { checkingAuthentication } from '../../store/auth';
import { useForm } from '../../hooks';


export const LoginPage = () => {

  const dispatch = useDispatch();

  const { email, password, user, onInputChange } = useForm({
    email: 'nombre@google.com',
    password: '123456',
    user: 'usuario12'
  });

  const onSubmit = ( event ) => {
    event.preventDefault();
    console.log({ email, password });
    dispatch( checkingAuthentication() );
  }

  return (
    <AuthLayout title="Login">
          <form onSubmit={ onSubmit }>
            <Grid container>
              <Grid item xs={ 12 } sx={{ mt: 2 }}>
                <TextField 
                  label="Correo" 
                  type="email" 
                  placeholder='correo@google.com'
                  fullWidth
                  name='email' 
                  value={ email }
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
                  value={ password }
                  onChange={ onInputChange } 
                />
              </Grid>
              <Grid container  sx={{ mt: 2, mb: 1 }} >
                  <Button type='submit' variant='contained' fullWidth >
                    Login
                  </Button>
              </Grid>
              <Grid  container direction='row' justifyContent='end' >
                <Link component={ RouterLink } color="inherit" to="/auth/register">
                  Crear una cuenta
                </Link>
              </Grid>
            </Grid>
            
          </form>
    </AuthLayout>

  )
}
