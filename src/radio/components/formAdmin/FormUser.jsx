import { AddCircleOutlineOutlined } from '@mui/icons-material';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useModalHook } from '../../../hooks/useModalHook';
import { ModalRadio } from '../ModalRadio';
import axios from "axios";

export const FormUser = () => {
    //const [isOpen1, onCloseModal1, onOpenModal1] = useModalHook();

    const [formValues, setFormValues] = useState({
        name: "",
        passwd: "",
        confirmPasswd: "",
        rol: "",
        estado: "",
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formValues.name.length <= 0) return;
        //console.log(formValues);
    };

    const guardar = () => {
        console.log('guardado!');
        let datosUser = {
        name: formValues.name,
        passwd: formValues.passwd,
        confirmPasswd: formValues.confirmPasswd,
        rol: formValues.rol,
        estado: formValues.estado,
        };
        console.log(datosUser);
        
        axios.post('http://localhost:8000/api/v0/users', datosUser).then((response)=> {
            if(response.data.insertId){
              alert('Guardado!');
              e.prevent.default;
            }            
        });
    };
    

    return (
        <>
            
            <ModalRadio >
                <Typography variant='h4'> Nuevo Usuario </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container alignItems="center" justify="center" direction="column">
                        <Grid item>
                            <TextField
                                id="name-input"
                                sx={{ border: 'none', mb: 1, mt: 2, width: 400 }}
                                type="text"
                                name="name"
                                color='info'
                                label="Nombre de Usuario"
                                variant="outlined"
                                value={formValues.name}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="passwd-input"
                                sx={{ border: 'none', mb: 1, width: 400 }}
                                type="password"
                                color='info'
                                name="passwd"
                                label="contraseña"
                                variant="outlined"
                                value={formValues.passwd}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="confirmPasswd-input"
                                sx={{ border: 'none', mb: 1, width: 400 }}
                                type="password"
                                color='info'
                                name="confirmPasswd"
                                label="Confirmar Contraseña"
                                variant="outlined"
                                value={formValues.confirmPasswd}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="rol-input"
                                sx={{ border: 'none', mb: 1, width: 400 }}
                                type="text"
                                name="rol"
                                color='info'
                                label="Rol"
                                variant="outlined"
                                value={formValues.rol}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth>
                                <InputLabel id="estado-input">Estado</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 400 }}
                                    labelId="demo-simple-select-label"
                                    id="estado-input"
                                    name="estado"
                                    color='info'
                                    value={formValues.estado}
                                    label="Estado"
                                    onChange={handleInputChange}>
                                    <MenuItem value={1}>Activo</MenuItem>
                                    <MenuItem value={0}>Inactivo</MenuItem>
                                    
                                </Select>
                            </FormControl>
                        </Grid>
                        <Button variant="contained" color="info" type="submit" onClick={guardar}>
                            Submit
                        </Button>
                    </Grid>
                </form>
            </ModalRadio>
        </>
    )
}