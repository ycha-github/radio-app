import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import axios from "axios";
import { useModalHook } from '../../../hooks/useModalHook';
import { useAuthStore, useForm } from '../../../hooks';

    const registerFormFields={
        username: "",
        password: "",
        rol: "",
        estado: "",
    }

export const FormUser = (props) => {
    //const [isOpen1, onCloseModal1, onOpenModal1] = useModalHook();
    
        //const {startRegister}= useAuthStore();
        const { username, password, onInputChange } = useForm(registerFormFields);
   // const [idActualizar, setIdActualizar]= useState('');
    const {isActualizar}= useModalHook();
   //const handleInputChange = (e) => {
   //    const { name, value } = e.target;
   //    setFormValues({
   //        ...formValues,
   //        [name]: value,
   //    });
   //};

    const onSubmit = (event) => {
        event.preventDefault();
        //if (formValues.name.length <= 0) return;
        //console.log(formValues);
        //startRegister( username, password, rol, estado )
    };
    const guardar = () => {
        console.log('lajddhfkjadshf')
    }

//    const guardar = () => {
//        console.log('guardado!');
//        let datosUser = {
//        username: formValues.name,
//        password: formValues.passwd,
//        email: formValues.email,
//        roles_idrol: formValues.rol,
//        estatus: formValues.estado,
//        };
//        console.log(datosUser);
//        if(isActualizar){
//            ejecutarActualizacion(datosUser);
//        }else{
//        axios.post('http://localhost:8000/api/v0/users', datosUser).then((response)=> {
//            if(response.data.insertId){
//              alert('Guardado!');
//              e.prevent.default;
//            }            
//        });
//    }
//};
//const actualizar = (userId, username, email, estatus, roles_idrol) => {
//
//    setIsActualizar(true);
//
//    setIdActualizar(userId);
//
//    let inputUserName = document.getElementById('name-input');
//    let inputEmail = document.getElementById('email-input');
//    let userStatus = document.getElementById('estado-input');
//    let inputRol = document.getElementById('rol-input');
//
//    inputUserName.value = username;
//    inputEmail.value = email;
//    userStatus.value = estatus;
//    inputRol.value = roles_idrol;
//
//};
//const ejecutarActualizacion = (datosDeUsuario) => {        
//
//    datosDeUsuario['id'] = idActualizar;
//
//    axios.put(`http://localhost:8000/api/v0/users/:id`, datosUser).then((response)=> {
//        if(response.data.affectedRows){
//            consultar();
//            setIsActualizar(false);
//            alert('Actualizado!');
//            document.getElementById('myform').reset();                
//        }
//    });
//};
    const handleChange = (prop) => (event) => {
        setFormValues({ ...formValues, [prop]: event.target.value });
      };
    const handleClickShowPasswd = () => {
        setFormValues({
          ...formValues,
          showPasswd: !formValues.showPasswd,
        });
      };
      const handleMouseDownPasswd = (event) => {
        event.preventDefault();
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
                                value={username}
                                onChange={onInputChange} />
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
                        
                        <Grid item>
                            <FormControl fullWidth>
                                <InputLabel id="rol-input" color='info'>Rol</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                    labelId="demo-simple-select-label"
                                    id="rol-input"
                                    name="rol"
                                    color='info'
                                    
                                    label="Rol"
                                    onChange={onInputChange}>
                                    <MenuItem value={1}>Addministrador</MenuItem>
                                    <MenuItem value={2}>Invitado</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth>
                                <InputLabel id="estado-input" color='info'>Estado</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                    labelId="demo-simple-select-label"
                                    id="estado-input"
                                    name="estado"
                                    color='info'
                                    
                                    label="Estado"
                                    onChange={onInputChange}>
                                    <MenuItem value={1}>Activo</MenuItem>
                                    <MenuItem value={0}>Inactivo</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Button variant="contained" color="info" type="submit" onClick={guardar}>
                        {isActualizar? 'Actualizar' : 'Guardar'}
                        </Button>
                    </Grid>
                </form>
            </ModalRadio>
        </>
    )
}