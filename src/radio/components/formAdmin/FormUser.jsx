import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useModalHook } from '../../../hooks/useModalHook';
import { useUsersStore } from '../../../hooks/hooksAdministracion/useUsersStore';
import axios from 'axios';

export const FormUser = () => {

    const { CloseModal, isActualizar, mostrarGuardar } = useModalHook();
    const { activeEvent, startSavingEvent } = useUsersStore();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [tableData, setTableData] = useState([])
    const [formValues, setFormValues] = useState({
        username: "",
        password: "",
        roles_idrol: "",
        nombrerol: "",
        estatus: "",
        createdAt: "",
        updatedAt: "",
    });

 useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({ ...activeEvent });
        }
    }, [activeEvent])

    useEffect(() => {
        axios.get('http://localhost:8000/api/v0/roles').
      then((response)=>{
        setTableData(response.data);
      });
     }, []);

   
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    };

console.log(formValues);

    const handleChangeAutocomplete = (event, value, name) => {
        console.log(value.idrol);
        setFormValues((prevState) => ({
          ...formValues,
          [name]: value.idrol
        }));
      };

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (formValues.username.length <= 0) return;
        console.log(formValues);
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
                                value={formValues.password}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item>
                            <Autocomplete 
                                name="roles_idrol"
                                color='info'
                                // value={formValues.roles_idrol}
                                isOptionEqualToValue={(formValues, target ) => formValues.rol === target.rol}
                                
                                onChange={handleInputChange}
                                options={tableData}
                                // noOptionsText={'Escoge el rol'}
                                // defaultValues
                                renderOption={(props, tableData) => (
                                    <Box component='li' {...props} key={tableData.idrol}>
                                            {tableData.rol}
                                        </Box>
                                    )}
                                getOptionLabel={(tableData) => tableData.rol || ""}
                                renderInput={params =>
                                    <TextField

                                        sx={{ border: 'none', width: 400 }}
                                        color='info'
                                        label="Rol"
                                        {...params}
                                        variant="outlined" /> }
                                    
                            />
                        {/* <FormControl fullWidth> */}
                                {/* <Autocomplete
                                    //disablePortal
                                    name="roles_idrol"
                                    value={formValues.roles_idrol}
                                    // value={formValues.roles_idrol}
                                    //value={tableData[formValues.roles_idrol-1]}
                                    options={tableData}
                                    getOptionLabel={(tableData) => tableData.rol || ""}
                                    //onChange={handleInputChange}
                                    onChange={handleInputChange}
                                    sx={{ border: 'none', mb: 1, width: 400 }}
                                    //isOptionEqualToValue={(option, value) =>
                                      //  option.rol === value.rol
                                    //}

                                    // onChange={(event, value) =>
                                    //     handleChangeAutocomplete(event, value, "roles_idrol")
                                    // }
                                    noOptionsText={'Escoge el rol'}
                                    renderOption={(props, tableData) => (
                                        <Box component='li' {...props} key={tableData.idrol}>
                                            {tableData.rol}
                                        </Box>
                                    )}
                                    //renderInput={<TextField/>}

                                    renderInput={params =>
                                        <TextField

                                            sx={{ border: 'none', width: 400 }}
                                            color='info'
                                            label="Rol"
                                            {...params}
                                            variant="outlined"
                                        />
                            }
                           /> */}
                    {/* </FormControl>  */}
                        </Grid>
                        {/* <Grid item>
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
                                     {/* {
                                        tableData.map(elemento=>{
                                          return <MenuItem key={elemento.idrol} value={elemento.idrol} >{elemento.rol}</MenuItem> 
                                        })} */}
                                {/* /</Select> */}
                            {/* </FormControl> */}
                        {/* </Grid> */} 
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
                        <Button variant="contained" color="info" type="submit" onClick={mostrarGuardar} sx={{  width: 400 }} >
                            {isActualizar ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </Grid>
                </form>
            </ModalRadio>
        </>
    )
}