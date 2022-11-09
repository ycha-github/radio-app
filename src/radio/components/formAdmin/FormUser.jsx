import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useModalHook } from '../../../hooks/useModalHook';
import { useUsersStore } from '../../../hooks/hooksAdministracion/useUsersStore';

export const FormUser = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        username: "",
        password: "",
        roles_idrol: "",
        estatus: '',
        createdAt: "",
        updatedAt: "",
    });

    const { CloseModal, isActualizar } = useModalHook();
    const { activeEvent, startSavingEvent } = useUsersStore();

    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({ ...activeEvent });
        }
    }, [activeEvent])

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    };

    const onSubmit = async (event) => {
        //console.log(event)
        event.preventDefault();
        setFormSubmitted(true);

        if (formValues.username.length <= 0) return;
        console.log(formValues);
        //TODO:
        await startSavingEvent(formValues);
        CloseModal();
        setFormSubmitted(false);
    };

    return (
        <>
            <ModalRadio >
                <Typography variant='h4'> Nuevo Usuario </Typography>
                <form onSubmit={onSubmit}>
                    <Grid container alignItems="center" justify="center" direction="column">
                        <Grid item>
                            <TextField
                                id="name-input"
                                sx={{ border: 'none', mb: 1, mt: 2, width: 300 }}
                                type="text"
                                name="username"
                                color='info'
                                label="Nombre de Usuario"
                                variant="outlined"
                                value={formValues.username}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item >
                            <TextField
                                id="password-input"
                                label="Contraseña"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                type="password"
                                placeholder='Contraseña'
                                fullWidth
                                name='password'
                                color='info'
                                value={formValues.password}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid item>
                            <FormControl fullWidth>
                                <InputLabel id="rol-input" color='info'>Rol</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                    labelId="demo-simple-select-label"
                                    id="rol-input"
                                    name="roles_idrol"
                                    color='info'
                                    value={formValues.roles_idrol}
                                    label="Rol"
                                    onChange={handleInputChange}>
                                    <MenuItem value={1}>Administrador</MenuItem>
                                    <MenuItem value={2}>Invitado</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth>
                                <InputLabel id="estado-input" color='info'>Estado</InputLabel>
                                {/* <Select
                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                    labelId="demo-simple-select-label"
                                    id="estado-input"
                                    name="estatus"
                                    color='info'
                                    value={formValues.estatus}
                                    label="Estado"
                                    onChange={handleInputChange}>
                                    <MenuItem value={1}>Activo</MenuItem>
                                    <MenuItem value={0}>Inactivo</MenuItem>
                                </Select> */}
                            </FormControl>
                        </Grid>
                        <Button variant="contained" color="info" type="submit">
                            {isActualizar ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </Grid>
                </form>
            </ModalRadio>
        </>
    )
}