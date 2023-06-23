import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useModalHook } from '../../../hooks/useModalHook';
import { useUsersStore } from '../../../hooks/hooksAdministracion/useUsersStore';
import axios from 'axios';
import { radioApi } from '../../../api';

export const FormUser = () => {

    const { CloseModal, isActualizar, mostrarGuardar } = useModalHook();
    const { activeEvent, startSavingEvent } = useUsersStore();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [formValues, setFormValues] = useState({
        username: "",
        password: "",
        rol:"",
        roles_idrol: "1",
        estatus: "",
        createdAt: "",
        updatedAt: "",
    });

    
 useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({ ...activeEvent });
        }
    }, [activeEvent]);

    useEffect(() => {
        radioApi.get('/roles/estatus').
      then((response)=>{
        setTableData(response.data);
      });
     }, []);

    const handleInputChange = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value,
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (formValues.username.length <= 0) return;
        await startSavingEvent(formValues);
        CloseModal();
        setFormSubmitted(false);
    };

    return (
        <>
            <ModalRadio >
                <Typography variant='h4'> {isActualizar? 'Actualizando Usuario' : 'Nuevo Usuario'} </Typography>
                <form onSubmit={onSubmit}>
                    <Grid container alignItems="center" justify="center" direction="column">
                        <Grid item>
                            <TextField
                                id="name-input"
                                sx={{ border: 'none', mb: 1, mt: 2, width: 400 }}
                                type="text"
                                name="username"
                                color='info'
                                label="Nombre de Usuario"
                                variant="outlined"
                                required
                                value={formValues.username}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item >
                            <TextField
                                disabled={isActualizar}
                                id="password-input"
                                label="Contraseña"
                                sx={{ border: 'none', mb: 1, width: 400 }}
                                type="password"
                                placeholder='Contraseña'
                                fullWidth
                                name='password'
                                color='info'
                                required
                                value={formValues.password}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth>
                                <InputLabel id="rol-input" color='info'>Rol</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 400 }}
                                    labelId="demo-simple-select-label"
                                    id="rol-input"
                                    name="roles_idrol"
                                    color='info'
                                    value={formValues.roles_idrol}
                                    label="Rol"
                                    required
                                    onChange={handleInputChange}>
                                      {
                                        tableData.map(elemento=>{
                                          return <MenuItem key={elemento.idrol} value={elemento.idrol} >{elemento.rol}</MenuItem> 
                                        })} 
                                /</Select> 
                            </FormControl> 
                        </Grid>
                        {/* <Grid item>
                            <FormControl fullWidth>
                                <InputLabel id="estatus-input" color='info'>Estatus</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 400 }}
                                    labelId="demo-simple-select-label"
                                    id="estatus-input"
                                    name="estatus"
                                    color='info'
                                    value={formValues.estatus}
                                    label="Estatus"
                                    onChange={handleInputChange}>
                                    <MenuItem value={true}>Activo</MenuItem>
                                    <MenuItem value={false}>Inactivo</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid> */}
                        <Button variant="contained" color="info" type="submit" onClick={mostrarGuardar} sx={{  width: 400 }} >
                            {isActualizar ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </Grid>
                </form>
            </ModalRadio>
        </>
    )
}