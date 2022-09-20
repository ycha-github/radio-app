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
        email: "",
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
        username: formValues.name,
        password: formValues.passwd,
        email: formValues.email,
        roles_idrol: formValues.rol,
        estatus: formValues.estado,
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
                                sx={{ border: 'none', mb: 1, mt: 2, width: 300 }}
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
                                sx={{ border: 'none', mb: 1, width: 300 }}
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
                                id="email-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                type="email"
                                color='info'
                                name="email"
                                label="Correo"
                                variant="outlined"
                                value={formValues.email}
                                onChange={handleInputChange} />
                        </Grid>
                        
                        <Grid item>
                            <FormControl fullWidth>
                                <InputLabel id="rol-input">Rol</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                    labelId="demo-simple-select-label"
                                    id="rol-input"
                                    name="rol"
                                    color='info'
                                    value={formValues.rol}
                                    label="Rol"
                                    onChange={handleInputChange}>
                                    <MenuItem value={1}>Addministrador</MenuItem>
                                    <MenuItem value={2}>Invitado</MenuItem>
                                    
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth>
                                <InputLabel id="estado-input">Estado</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 300 }}
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