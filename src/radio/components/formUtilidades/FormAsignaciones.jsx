import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useModalHook } from '../../../hooks/useModalHook';
import { useAsignacionesStore } from '../../../hooks/hooksUtilidades/useAsignacionesStore';
import axios from 'axios';
import { useRadiosStore } from '../../../hooks/hooksCatalogo/useRadiosStore';

export const FormAsignaciones = ({usuario, radio}) => {

    const { CloseModal, isActualizar, mostrarGuardar } = useModalHook();
    const { activeEvent, startSavingEvent, cambiarSue } = useAsignacionesStore();
    //const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        nombre:'',
        idusuarios: "1",
        rfsi: "",
        serie:"",
        idradios: "1",
        estatus:  "",
        createdAt: "",
        updatedAt: "",
    }); 

    const onResetForm = ()=>{
        setFormValues({
            nombre:'',
            usuarios_idusuarios: "1",
            rfsi: "",
            radios_idradios: "1",
            estatus:  "",
            createdAt: "",
            updatedAt: "",
        });
        }

    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({ ...activeEvent });
        }
    }, [activeEvent])

   const handleInputChange = (event) => {
       setFormValues({
           ...formValues,
           [event.target.name]: event.target.value,
        });
    };

   //const handleChangeAutocomplete = (event, value, name) => {
   //    console.log(value.idusuarios);
   //    setFormValues((prevState) => ({
   //      ...formValues,
   //      [name]: value.idusuariosv
   //    }));
   //  };
   //const handleChangeAutocompleteRadio = (event, value, name) => {
   //    
   //    setFormValues((prevState) => ({
   //      ...formValues,
   //      [name]: value.idradios
   //    }));
   //  };

    const onSubmit = async (event) => {
        event.preventDefault();
        //setFormSubmitted(true);
        if (formValues.estatus.length <= 0) return;
        console.log(formValues.radios_idradios);
        await startSavingEvent(formValues);
        await cambiarSue(formValues.radios_idradios);
        onResetForm();
       // CloseModal();
       // setFormSubmitted(false);
    };

    return (
        <>
            <Typography justify="center" variant='h5' sx={{ mb: 1 }}> {isActualizar ? 'Actualizando Asignacion a Usuario' : 'Nueva Asignacion a Usuario'} </Typography>
            <form onSubmit={onSubmit}>
                <Grid container alignItems="center" justify="center" direction="column">
                    {/* <Grid item>
                        <FormControl fullWidth>
                            <InputLabel id="usuarios_idusuarios-input" color='secondary'>Usuario</InputLabel>
                            <Select
                                sx={{ border: 'none', mb: 1, width: 400 }}
                                labelId="demo-simple-select-label"
                                id="usuarios_idusuarios-input"
                                name="usuarios_idusuarios"
                                color='secondary'
                                value={formValues.usuarios_idusuarios}
                                label="Usuario"
                                onChange={handleInputChange}>
                                {
                                    usuario.map(elemento => {
                                        return <MenuItem key={elemento.idusuarios} value={elemento.idusuarios} >{elemento.nombre}</MenuItem>
                                    })}
                            </Select>
                        </FormControl>
                    </Grid> */}
                     { isActualizar? 
                    (<Grid item>
                        <Autocomplete
                        name="usuarios_idusuarios"
                        value={usuario[formValues.idusuarios-1]}
                        //value={usuario[0]} 
                        //defaultValue={usuario}
                        options={usuario}
                        getOptionLabel={(usuario) => usuario.nombre || ""}
                        //isOptionEqualToValue={(option, value) =>
                        //    option.nombre === value.nombre
                        //}
                        sx={{ width: 400, mb:1 }}
                        onChange={(event, newFormValues) => {
                            setFormValues({
                                ...formValues,
                                ['usuarios_idusuarios']: newFormValues.idusuarios,
                            });
                        }}
                        renderInput={(params) => <TextField  {...params} variant="outlined" label="Usuario" />}
                                    />
                        </Grid>):
                        (<Grid item>
                            <Autocomplete
                            name="usuarios_idusuarios"
                           //value={usuario[formValues.usuarios_idusuarios-1]}
                           // defaultValue={usuario}
                            options={usuario}
                            getOptionLabel={(usuario) => usuario.nombre || ""}
                            sx={{ width: 400, mb:1 }}
                            onChange={(event, newFormValues) => {
                                setFormValues({
                                    ...formValues,
                                    ['usuarios_idusuarios']: newFormValues.idusuarios,
                                });
                            }}
                            renderInput={(params) => <TextField  {...params} variant="outlined" label="Usuario" />}
                                        />
                            </Grid>)
                            } 
                    {/* <Grid item>
                        <FormControl fullWidth>
                            <InputLabel id="radios_idradios-input" color='secondary'>Radio</InputLabel>
                            <Select
                                sx={{ border: 'none', mb: 1, width: 400 }}
                                labelId="demo-simple-select-label"
                                id="radios_idradios-input"
                                name="radios_idradios"
                                color='secondary'
                                value={formValues.radios_idradios}
                                label="Radio"
                                onChange={handleInputChange}>
                                {
                                    radio.map(elemento => {
                                        return <MenuItem key={elemento.idradios} value={elemento.idradios} >{elemento.serie}</MenuItem>
                                    })}
                            </Select>
                        </FormControl>
                    </Grid> */}
                     {isActualizar?
                    (<Grid item>
                        <Autocomplete
                                name="radios_idradios"
                                value={radio[formValues.idradios-1]}
                                 //value={[radio[0]]}
                                //defaultValue={radio}
                                options={radio}
                                getOptionLabel={(radio) => radio.serie || ""}
                                //isOptionEqualToValue={(option, value) =>
                                //    option.rfsi === value.rfsi
                                //}
                                sx={{ width: 400, mb:1 }}
                                onChange={(event, newFormValues) => {
                                    setFormValues({
                                        ...formValues,
                                        ['radios_idradios']: newFormValues.idradios,
                                    });
                                }}
                                
                                renderInput={(params) => <TextField  {...params} variant="outlined" label="Serie" />}       
                           />
                        </Grid>):
                        (<Grid item>
                            <Autocomplete
                                    name="radios_idradios"
                                    //value={radio[formValues.radios_idradios]}
                                    // defaultValue={radio}
                                    options={radio}
                                    getOptionLabel={(radio) => radio.serie || ""}
                                    sx={{ width: 400, mb:1 }}
                                    onChange={(event, newFormValues) => {
                                        setFormValues({
                                            ...formValues,
                                            ['radios_idradios']: newFormValues.idradios,
                                        });
                                    }}
                                    
                                    renderInput={(params) => <TextField  {...params} variant="outlined" label="Serie" />}       
                               />
                            </Grid>)
                        }
                        <Grid item >
                            <TextField
                                id="rfsi-input"
                                label="RFSI"
                                sx={{ border: 'none', mb: 1, width: 400 }}
                                fullWidth
                                name='rfsi'
                                color='secondary'
                                value={formValues.rfsi}
                                onChange={handleInputChange}
                            />
                        </Grid>

                    <Grid item>
                        <FormControl fullWidth>
                            <InputLabel id="estatus-input" color='secondary'>Estatus</InputLabel>
                            <Select
                                sx={{ border: 'none', mb: 1, width: 400 }}
                                labelId="demo-simple-select-label"
                                id="estatus-input"
                                name="estatus"
                                color='secondary'
                                value={formValues.estatus}
                                label="Estatus"
                                onChange={handleInputChange}>
                                <MenuItem value={true}>Activo</MenuItem>
                                <MenuItem value={false}>Inactivo</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Button variant="contained" color="secondary" type="submit" onClick={mostrarGuardar} sx={{ width: 400 }} >
                        {isActualizar ? 'Actualizar' : 'Guardar'}
                    </Button>
                </Grid>
            </form>
        </>
    )
}