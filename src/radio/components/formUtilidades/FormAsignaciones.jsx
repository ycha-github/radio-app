import { Autocomplete, Box,Stack, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, TextField, Typography, Divider } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useModalHook } from '../../../hooks/useModalHook';
import { useAsignacionesStore } from '../../../hooks/hooksUtilidades/useAsignacionesStore';
import axios from 'axios';
import { radioApi } from '../../../api';
import { useArmarRadioStore } from '../../../hooks/hooksUtilidades/useArmarRadioStore';

export const FormAsignaciones = ({usuario, radio, datoClick}, customStyles) => {

    const { CloseModal, isActualizar, mostrarGuardar,isVer } = useModalHook();
    const { activeEvent, startSavingEvent, cambiarSue, filtrarAccesorio, accesoriosFiltrado,filtrarAccesorioBateria,accesoriosFiltradoBateria,filtrarAccesorioGps,accesoriosFiltradoGps } = useAsignacionesStore();
    const { activeEventarmar, startSavingEventarmar,   } = useArmarRadioStore();

   const [formValues, setFormValues] = useState({
       usuarios_idusuarios:null,
       fk_armar:null,
       observaciones:null,
    //    rfsi:"",
    //    radios_idradios:"",
    //    fk_accesorio_bateria:null,
    //    fk_accesorio_cargador:null, 
    //    fk_accesorio_gps:null,
    //    funda: false,
    //    antena: false,
    //    bocina: false,
    //    c2h: false,
    //    cable_principal: false,
    //    caratula: false,
    //    micro: false,
    //    cofre: false,
    //    porta_caratula: false,
    //    cuello_cisne: false,
    //    fk_vehiculo:null,
       fecha_asignacion:null,
       estatus:  "",
       createdAt: "",
       updatedAt: "",
   }); 
   const [tableData, setTableData] = useState([]);
   const [tableSue, setTableSue] = useState([]);
   const [tableVehi, setTableVehi] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [inputValue3, setInputValue3] = useState('');
    const [inputValue4, setInputValue4] = useState('');
    const [inputValue5, setInputValue5] = useState('');

    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({ ...activeEvent });
        }
    }, [activeEvent]);

    
    // useEffect(() => {
    //     accesoriosFiltrado
    // }, [accesoriosFiltrado])

    useEffect(() => {
        datoClick == true ?
        radioApi.get('/usuarios').
            then((response) => {
                let usuarioActivo=[]
                usuarioActivo =response.data.filter(function(element){
                    return(
                        element.estatus ==true
                    )
                })
                setTableData(usuarioActivo);
            }) :
            null
        }, [datoClick]);

        useEffect(() => {
            datoClick == true ?
            radioApi.get('/armar_radios/estatus').
                then((response) => {
                    setTableSue(response.data);
                }):console.log("sfsdfsdfsdf")
            }, [datoClick]);
            console.log(tableSue)

   const handleInputChange = (event) => {
       setFormValues({
           ...formValues,
           [event.target.name]: event.target.value,
        });
       
    };
    const handleChange = (event) => {
        // console.log(event.target.checked);
        setFormValues({
          ...formValues,
          [event.target.name]: event.target.checked
        });
      };

    const onSubmit = async (event) => {
        event.preventDefault();
        //setFormSubmitted(true);
        // console.log(formValues);
        //if (formValues.estatus.length <= 0) return;
        await startSavingEvent(formValues);
        await cambiarSue(formValues.radios_idradios);
        //onResetForm();
       CloseModal();
       // setFormSubmitted(false);
    };

    return (
        <>
        <ModalRadio >
            <Box sx={{...customStyles, maxWidth: '670px' }}>
                <Typography justify="center" variant='h5' sx={{ mb: 1 }}> {isActualizar ? 'Actualizando Asignacion' : 'Nueva Asignacion'} </Typography>
                <form onSubmit={onSubmit}>
                    <Stack  noValidate spacing={3}>
                        <Grid container alignItems="center" justify="center" direction="column" >
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        { isActualizar? 
                        (<Grid item xs={12}>
                            <Autocomplete
                            name="usuarios_idusuarios"
                            disabled={isVer}
                            value={formValues}
                            sx={{ width: 670, mb:1 }}
                            onChange={(event, newFormValues2) => {
                                setFormValues({
                                    ...formValues,
                                    ['usuarios_idusuarios']: newFormValues2.idusuarios,
                                    ['nombre']: newFormValues2.nombre,
                                    ['apellido_pat']: newFormValues2.apellido_pat,
                                    ['apellido_mat']: newFormValues2.apellido_mat,
                                });
                            }}
                            inputValue={inputValue2}
                                    onInputChange={(event, newInputValue2) => {
                                        setInputValue2(newInputValue2);
                                    }}
                            options={tableData}
                            getOptionLabel={(tableData) => tableData.nombre +" "+ tableData.apellido_pat +" "+ tableData.apellido_mat +" | "+ tableData.nombrePuesto+" | "+tableData.nombreCorporacion || ""}
                            //isOptionEqualToValue={(option, value) =>
                        //    option.nombre === value.nombre
                        //}
                            renderInput={(params) => <TextField  {...params} variant="outlined" label="Usuario" />}
                            />
                            </Grid>):
                            (<Grid item xs={12}>
                                <Autocomplete
                                name="usuarios_idusuarios"
                                options={tableData}
                                getOptionLabel={(tableData) => tableData.nombre +" "+ tableData.apellido_pat +" "+ tableData.apellido_mat+" | "+ tableData.nombrePuesto+" | "+tableData.nombreCorporacion || ""}
                                sx={{ width: 670, mb:1 }}
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
                        {isActualizar?
                        (<Grid item xs={6}>
                            <Autocomplete
                                    name="fk_armar"
                                    disabled={isVer}
                                    value={formValues}
                                    sx={{ width: 300, mb:1 }}
                                    onChange={(event, newFormValues1) => {
                                        setFormValues({
                                            ...formValues,
                                            ['fk_armar']: newFormValues1.idarmar,
                                            ['rfsi']: newFormValues1.rfsi,
                                        });
                                    }}
                                    inputValue={inputValue1}
                                    onInputChange={(event, newInputValue1) => {
                                        setInputValue1(newInputValue1);
                                    }}
                                    options={tableSue}
                                    getOptionLabel={(tableSue) => tableSue.rfsi || ""}
                                    // isOptionEqualToValue={(option, value) =>{
                                    //    option.rfsi === value.rfsi
                                    //    console.log(option.rfsi);
                                    //    console.log(value.rfsi);
                                    // }}
                                    renderInput={(params) => <TextField  {...params} variant="outlined" label="Serie Radio" />}       
                            />
                            </Grid>):
                            (<Grid item xs={6}>
                                <Autocomplete
                                        name="radios_idradios"
                                        options={tableSue}
                                        getOptionLabel={(tableSue) => tableSue.rfsi || ""}
                                        sx={{ width: 300, mb:1 }}
                                        onChange={(event, newFormValues) => {
                                            setFormValues({
                                                ...formValues,
                                                ['fk_armar']: newFormValues.idarmar,
                                            });
                                        }}
                                        renderInput={(params) => <TextField  {...params} variant="outlined" label="RFSI" />}       
                                />
                                </Grid>)
                            }   
                            <Grid item xs={12}>
                                                    <TextField
                                                        disabled={isVer}
                                                        name='observaciones'
                                                        sx={{ border: 'none', mb: 1, width: 680, pr: 1 }}
                                                        value={formValues.observaciones}
                                                        onChange={handleInputChange}
                                                        variant="outlined"
                                                        multiline
                                                        label="Observaciones"
                                                        rows={3}
                                                        inputProps={{ maxLength: 2000 }}
                                                    />
                                                </Grid>
                           
                            {/* <Grid item xs={6}>
                                <TextField
                                    id="fecha_asignacion-input"
                                    disabled={isVer}
                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                    type="date"
                                    name="fecha_asignacion"                                    
                                    label="fecha_asignacion"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={formValues.fecha_asignacion}
                                    onChange={handleInputChange} />
                            </Grid> */}
                        {/* <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="estatus-input" color='secondary'>Estatus</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 200 }}
                                    labelId="demo-simple-select-label"
                                    disabled={isVer}
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
                        </Grid> */}
                        
                    </Grid>
                    <Button variant="contained" color="secondary" type="submit" onClick={mostrarGuardar} sx={{ width: 650}} >
                            {isActualizar ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </Grid>
                    </Stack>
                </form>
                </Box>
            </ModalRadio>
        </>
    )
}