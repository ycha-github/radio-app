import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useModalHook } from '../../../hooks/useModalHook';
import { useUsersStore } from '../../../hooks/hooksAdministracion/useUsersStore';
import axios from 'axios';

export const FormUser = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [tableData, setTableData] = useState([])

    const [formValues, setFormValues] = useState({
        username: "",
        password: "",
        roles_idrol: "",
        estatus: "",
        createdAt: "",
        updatedAt: "",
    });

    const { CloseModal, isActualizar } = useModalHook();
    const { activeEvent, startSavingEvent } = useUsersStore();

    useEffect(() => {
        axios.get('http://localhost:8000/api/v0/roles').
      then((response)=>{
        setTableData(response.data);
      });
     }, []);

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
                                sx={{ border: 'none', mb: 1, mt: 2, width: 400 }}
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
                                disabled={isActualizar}
                                id="password-input"
                                label="Contrase??a"
                                sx={{ border: 'none', mb: 1, width: 400 }}
                                type="password"
                                placeholder='Contrase??a'
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
                                    sx={{ border: 'none', mb: 1, width: 400 }}
                                    labelId="demo-simple-select-label"
                                    id="rol-input"
                                    name="roles_idrol"
                                    color='info'
                                    value={formValues.roles_idrol}
                                    label="Rol"
                                    onChange={handleInputChange}>
                                     {
                                        tableData.map(elemento=>{
                                          return <MenuItem key={elemento.idrol} value={elemento.idrol} >{elemento.rol}</MenuItem> 
                                        })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
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
                        </Grid>
                        <Button variant="contained" color="info" type="submit" sx={{  width: 400 }} >
                            {isActualizar ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </Grid>
                </form>
            </ModalRadio>
        </>
    )
}