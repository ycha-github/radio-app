import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuthStore,  } from '../../../hooks';
import { useCambiarStore } from '../../../hooks/useCambiarStore';
import Swal from 'sweetalert2';
import { useForm2 } from '../../../hooks/useForm2';


export const PasswordUpdate = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);

    const {onResetForm, formState, onInputChange } = useForm2({
        bpassword:'',
            password:'',
            confirmNewPassword:'',
    });

    const {  bpassword, password, confirmNewPassword,} = formState;
    const {user}= useAuthStore();

    const id= user.idusers

    const { startCambiarPass, errorMessage }=useCambiarStore();
   // const handleInputChange = ({target}) => {
   //     setFormValues({
   //         ...formValues,
   //         [target.name]: target.value,
   //     });
   // };

    const onSubmit = async(event) => {
        event.preventDefault();
        setFormSubmitted(true);

        if (password.length <= 5 )return;
        //TODO:
        await startCambiarPass(formState, id);
        setFormSubmitted(false);
        onResetForm();
    };

    useEffect(() => {
        if (errorMessage !== undefined){
          Swal.fire('Error al actualizar contraseña', errorMessage, 'error');
        }
      }, [errorMessage])

    return (
        <>
          <h2 className='colorChange'>CAMBIAR CONTRASEÑA</h2>
                <form onSubmit={onSubmit}>
                        <Grid container alignItems="center" justify="center" direction="column">
                          <Grid item>
                              <TextField
                                id="bpassword-input"
                                sx={{ border: 'none', mb: 4, mt: 20, width: 500 }}
                                type="password"
                                name="bpassword"
                                color='success'
                                required
                                label="Contraseña Anterior"
                                variant="outlined"
                                value={bpassword}
                                onChange={onInputChange} />
                          </Grid>
                        <Grid item>
                            <TextField
                                id="password-input"
                                sx={{ border: 'none', mb: 4, mt: 2, width: 500 }}
                                type="password"
                                name="password"
                                color='success'
                                required
                                label="Nueva Contraseña"
                                variant="outlined"
                                value={password}
                                onChange={onInputChange} />
                        </Grid>
                        <Grid container alignItems="center" justify="center" direction="column">
                        <Grid item>
                            <TextField
                                id="confirmNewPassword-input"
                                sx={{ border: 'none', mb: 4, mt: 2, width: 500 }}
                                type="password"
                                name="confirmNewPassword"
                                color='success'
                                required
                                label="Confirmar Nueva Contraseña"
                                variant="outlined"
                                value={confirmNewPassword}
                                onChange={onInputChange} />
                        </Grid>
                        <Button variant="contained" color="success" type="submit" 
                        sx={{  width: 500 }} >
                        ACTUALIZAR
                        </Button>
                    </Grid>
                    </Grid>
                </form>
        </>
    )
}