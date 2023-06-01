import { Autocomplete, Box,Stack, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useModalHook } from '../../../hooks/useModalHook';
import { useAsignacionesStore } from '../../../hooks/hooksUtilidades/useAsignacionesStore';
import axios from 'axios';

export const FormAsignaciones = ({usuario, radio}, customStyles) => {

    const { CloseModal, isActualizar, mostrarGuardar } = useModalHook();
    const { activeEvent, startSavingEvent, cambiarSue, filtrarAccesorio, accesoriosFiltrado,filtrarAccesorioBateria,accesoriosFiltradoBateria,filtrarAccesorioGps,accesoriosFiltradoGps } = useAsignacionesStore();

   const [formValues, setFormValues] = useState({
       usuarios_idusuarios:"",
       radios_idradios:"",
       rfsi:"",
       fk_accesorio_bateria:"",
       fk_accesorio_cargador:"",
       fk_accesorio_gps:"",
       funda: false,
       antena: false,
       bocina: false,
       c2h: false,
       cable_principal: false,
       caratula: false,
       micro: false,
       cofre: false,
       porta_caratula: false,
       cuello_cisne: false,
       fk_vehiculo:"",
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

    useEffect(() => {
        accesoriosFiltrado
    }, [accesoriosFiltrado])

    useEffect(() => {
        axios.get('http://localhost:8000/api/v0/usuarios').
            then((response) => {
                setTableData(response.data);
            });
        }, []);

        useEffect(() => {
            axios.get('http://localhost:8000/api/v0/radios/filtrado').
                then((response) => {
                    setTableSue(response.data);
                });
            }, []);

        useEffect(() => {
            axios.get('http://localhost:8000/api/v0/vehiculos/estatus').
                then((response) => {
                    setTableVehi(response.data);
                });
            }, []);

   const handleInputChange = (event) => {
       setFormValues({
           ...formValues,
           [event.target.name]: event.target.value,
        });
       
    };
    const handleChange = (event) => {
        console.log(event.target.checked);
        setFormValues({
          ...formValues,
          [event.target.name]: event.target.checked
        });
      };

    const onSubmit = async (event) => {
        event.preventDefault();
        //setFormSubmitted(true);
        //console.log(formValues)
        if (formValues.estatus.length <= 0) return;
        console.log(formValues)
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
                        (<Grid item xs={6}>
                            <Autocomplete
                            name="usuarios_idusuarios"
                            value={formValues}
                            sx={{ width: 300, mb:1 }}
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
                            getOptionLabel={(tableData) => tableData.nombre +" "+ tableData.apellido_pat +" "+ tableData.apellido_mat || ""}
                            //isOptionEqualToValue={(option, value) =>
                        //    option.nombre === value.nombre
                        //}
                            renderInput={(params) => <TextField  {...params} variant="outlined" label="Usuario" />}
                                        />
                            </Grid>):
                            (<Grid item xs={6}>
                                <Autocomplete
                                name="usuarios_idusuarios"
                                options={tableData}
                                getOptionLabel={(tableData) => tableData.nombre +" "+ tableData.apellido_pat +" "+ tableData.apellido_mat || ""}
                                sx={{ width: 300, mb:1 }}
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
                                    name="radios_idradios"
                                    value={formValues}
                                    sx={{ width: 300, mb:1 }}
                                    onChange={(event, newFormValues1) => {
                                        setFormValues({
                                            ...formValues,
                                            ['radios_idradios']: newFormValues1.idradios,
                                            ['serie']: newFormValues1.serie,
                                        });
                                    }}
                                    inputValue={inputValue1}
                                    onInputChange={(event, newInputValue1) => {
                                        setInputValue1(newInputValue1);
                                    }}
                                    options={tableSue}
                                    getOptionLabel={(tableSue) => tableSue.serie || ""}
                                    //isOptionEqualToValue={(option, value) =>{
                                    //    option.serie === value.serie
                                    //    //console.log(option.serie);
                                    //    //console.log(value.serie_radio);
                                    //}}
                                    renderInput={(params) => <TextField  {...params} variant="outlined" label="Serie Radio" />}       
                            />
                            </Grid>):
                            (<Grid item xs={6}>
                                <Autocomplete
                                        name="radios_idradios"
                                        options={tableSue}
                                        getOptionLabel={(tableSue) => tableSue.serie || ""}
                                        sx={{ width: 300, mb:1 }}
                                        onChange={(event, newFormValues) => {
                                            setFormValues({
                                                ...formValues,
                                                ['radios_idradios']: newFormValues.idradios,
                                            });
                                        }}
                                        renderInput={(params) => <TextField  {...params} variant="outlined" label="Serie Radio" />}       
                                />
                                </Grid>)
                            } 
                            <Grid item xs={6} >
                                <TextField
                                    id="rfsi"
                                    sx={{ border: 'none', mb:1,  width: 300 }}
                                    type="text"
                                    name="rfsi"
                                    color='secondary'
                                    label="RFSI"
                                    variant="outlined"
                                    value={formValues.rfsi}
                                    onChange={handleInputChange} />
                            </Grid >
                            {isActualizar?
                        (<Grid item xs={6}>
                            <Autocomplete
                                name="fk_accesorio_bateria"
                                    value={formValues}
                                    onClick={filtrarAccesorioBateria('Bateria')}
                                    sx={{ width: 300, mb:1 }}
                                onChange={(event, newFormValues) => {
                                    console.log(newFormValues);
                                    setFormValues({
                                        ...formValues,
                                        ['fk_accesorio_bateria']: newFormValues.idaccesorios,
                                        ['serie_bateria']:newFormValues.serie_bateria,
                                    });
                                    }}
                                    inputValue={inputValue}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValue(newInputValue);
                                    }}
                                    options={accesoriosFiltradoBateria}
                                    getOptionLabel={(accesoriosFiltradoBateria) => accesoriosFiltradoBateria.serie_bateria || ""}
                                    //isOptionEqualToValue={(option, value) =>{
                                    //    option.num_serie === value.serie_bateria
                                    //    //console.log(option.num_serie);
                                    //    //console.log(value);
                                    //}}
                                    renderInput={(params) => <TextField  {...params} variant="outlined" label="Bateria" />}       
                            />
                            </Grid>):
                            (<Grid item xs={6}>
                                <Autocomplete
                                        name="fk_accesorio_bateria"
                                        onClick={filtrarAccesorioBateria('Bateria')}
                                        options={accesoriosFiltradoBateria}
                                        getOptionLabel={(accesoriosFiltradoBateria) => accesoriosFiltradoBateria.serie_bateria || ""}
                                        sx={{ width: 300, mb:1 }}
                                        onChange={(event, newFormValues) => {
                                            setFormValues({
                                                ...formValues,
                                                ['fk_accesorio_bateria']: newFormValues.idaccesorios,
                                            });
                                        }}
                                        renderInput={(params) => <TextField  {...params} variant="outlined" label="Bateria" />}       
                                />
                                </Grid>)
                            }
                            
                            {isActualizar?
                        (<Grid item xs={6}>
                            <Autocomplete
                                name="fk_accesorio_cargador"
                                    value={formValues}
                                    onClick={filtrarAccesorio('Cargador')}
                                    sx={{ width: 300, mb:1 }}
                                onChange={(event, newFormValues3) => {
                                    console.log(newFormValues3.serie_cargador);
                                    setFormValues({
                                        ...formValues,
                                        ['fk_accesorio_cargador']: newFormValues3.idaccesorios,
                                        ['serie_cargador']:newFormValues3.serie_cargador
                                    });
                                    }}
                                    inputValue={inputValue3}
                                    onInputChange={(event, newInputValue3) => {
                                        console.log(newInputValue3);
                                        setInputValue3(newInputValue3);
                                    }}
                                    options={accesoriosFiltrado}
                                    getOptionLabel={(accesoriosFiltrado) => accesoriosFiltrado.serie_cargador || ""}
                                    //isOptionEqualToValue={(option, value) =>{
                                    //    option.serie_cargador === value.serie_cargador
                                    //    //console.log(option.num_serie);
                                    //    console.log(value);
                                    //}}
                                    renderInput={(params) => <TextField  {...params} variant="outlined" label="Cargador" />}       
                            />
                            </Grid>):
                            (<Grid item xs={6}>
                                <Autocomplete
                                        name='fk_accesorio_cargador'
                                        options={accesoriosFiltrado}
                                        onClick={filtrarAccesorio('Cargador')}
                                        getOptionLabel={(accesoriosFiltrado) => accesoriosFiltrado.serie_cargador || ""}
                                        sx={{ width: 300, mb:1 }}
                                        onChange={(event, newFormValues) => {
                                            setFormValues({
                                                ...formValues,
                                                ['fk_accesorio_cargador']: newFormValues.idaccesorios,
                                            });
                                        }}
                                        renderInput={(params) => <TextField  {...params} variant="outlined" label="Cargador" />}       
                                />
                                </Grid>)
                            }
                            {isActualizar?
                        (<Grid item xs={6}>
                            <Autocomplete
                                name="fk_accesorio_gps"
                                    value={formValues}
                                    onClick={filtrarAccesorioGps('Gps')}
                                    sx={{ width: 300, mb:1 }}
                                onChange={(event, newFormValues4) => {
                                    setFormValues({
                                        ...formValues,
                                        ['fk_accesorio_gps']: newFormValues4.idaccesorios,
                                        ['serie_gps']:newFormValues4.serie_gps,
                                    });
                                    }}
                                    inputValue={inputValue4}
                                    onInputChange={(event, newInputValue4) => {
                                        setInputValue4(newInputValue4);
                                    }}
                                    options={accesoriosFiltradoGps}
                                    getOptionLabel={(accesoriosFiltradoGps) => accesoriosFiltradoGps.serie_gps || ""}
                                    //isOptionEqualToValue={(option, value) =>{
                                    //    option.num_serie === value.num_serie
                                    //    //console.log(option.num_serie);
                                    //    //console.log(value);
                                    //}}
                                    renderInput={(params) => <TextField  {...params} variant="outlined" label="Gps" />}       
                            />
                            </Grid>):
                            (<Grid item xs={6}>
                                <Autocomplete
                                        name="fk_accesorio_gps"
                                        onClick={filtrarAccesorioGps('Gps')}
                                        options={accesoriosFiltradoGps}
                                        getOptionLabel={(accesoriosFiltradoGps) => accesoriosFiltradoGps.serie_gps || ""}
                                        sx={{ width: 300, mb:1 }}
                                        onChange={(event, newFormValues) => {
                                            setFormValues({
                                                ...formValues,
                                                ['fk_accesorio_gps']: newFormValues.idaccesorios,
                                            });
                                        }}
                                        renderInput={(params) => <TextField  {...params} variant="outlined" label="Gps" />}       
                                />
                                </Grid>)
                            }
                            
                        <Grid item xs={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="funda"
                                        value={formValues.funda}
                                        checked={formValues.funda}
                                        //onChange={handleChange}
                                        onChange={(event, newFormValues) => {
                                            console.log(newFormValues)
                                            setFormValues({
                                                ...formValues,
                                                ['funda']: newFormValues,
                                            });
                                        }}
                                    />
                                }
                                label="Funda"
                            />
                            </Grid>
                            <Grid item xs={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="antena"
                                        value={formValues.antena}
                                        checked={formValues.antena}
                                        //onChange={handleChange}
                                        onChange={(event, newFormValues) => {
                                            console.log(newFormValues)
                                            setFormValues({
                                                ...formValues,
                                                ['antena']: newFormValues,
                                            });
                                        }}
                                    />
                                }
                                label="Antena"
                            />
                                </Grid>
                                <Grid item xs={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="bocina"
                                        value={formValues.bocina}
                                        checked={formValues.bocina}
                                        //onChange={handleChange}
                                        onChange={(event, newFormValues) => {
                                            console.log(newFormValues)
                                            setFormValues({
                                                ...formValues,
                                                ['bocina']: newFormValues,
                                            });
                                        }}
                                    />
                                }
                                label="Bocina"
                            />
                                </Grid>
                                <Grid item xs={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="c2h"
                                        value={formValues.c2h}
                                        checked={formValues.c2h}
                                        //onChange={handleChange}
                                        onChange={(event, newFormValues) => {
                                            console.log(newFormValues)
                                            setFormValues({
                                                ...formValues,
                                                ['c2h']: newFormValues,
                                            });
                                        }}
                                    />
                                }
                                label="C2H"
                            />
                                </Grid>
                                <Grid item xs={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="cable_principal"
                                        value={formValues.cable_principal}
                                        checked={formValues.cable_principal}
                                        //onChange={handleChange}
                                        onChange={(event, newFormValues) => {
                                            console.log(newFormValues)
                                            setFormValues({
                                                ...formValues,
                                                ['cable_principal']: newFormValues,
                                            });
                                        }}
                                    />
                                }
                                label="Cable Principal"
                            />
                                </Grid>
                                <Grid item xs={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="caratula"
                                        value={formValues.caratula}
                                        checked={formValues.caratula}
                                        //onChange={handleChange}
                                        onChange={(event, newFormValues) => {
                                            console.log(newFormValues)
                                            setFormValues({
                                                ...formValues,
                                                ['caratula']: newFormValues,
                                            });
                                        }}
                                    />
                                }
                                label="Caratula"
                            />
                                </Grid>
                                <Grid item xs={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="micro"
                                        value={formValues.micro}
                                        checked={formValues.micro}
                                        //onChange={handleChange}
                                        onChange={(event, newFormValues) => {
                                            console.log(newFormValues)
                                            setFormValues({
                                                ...formValues,
                                                ['micro']: newFormValues,
                                            });
                                        }}
                                    />
                                }
                                label="Micro"
                            />
                                </Grid>
                                <Grid item xs={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="cofre"
                                        value={formValues.cofre}
                                        checked={formValues.cofre}
                                        //onChange={handleChange}
                                        onChange={(event, newFormValues) => {
                                            console.log(newFormValues)
                                            setFormValues({
                                                ...formValues,
                                                ['cofre']: newFormValues,
                                            });
                                        }}
                                    />
                                }
                                label="Cofre"
                            />
                                </Grid>
                                <Grid item xs={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="porta_caratula"
                                        value={formValues.porta_caratula}
                                        checked={formValues.porta_caratula}
                                        //onChange={handleChange}
                                        onChange={(event, newFormValues) => {
                                            console.log(newFormValues)
                                            setFormValues({
                                                ...formValues,
                                                ['porta_caratula']: newFormValues,
                                            });
                                        }}
                                    />
                                }
                                label="Porta Caratula"
                            />
                                </Grid>
                                <Grid item xs={9}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="cuello_cisne"
                                        value={formValues.cuello_cisne}
                                        checked={formValues.cuello_cisne}
                                        //onChange={handleChange}
                                        onChange={(event, newFormValues) => {
                                            console.log(newFormValues)
                                            setFormValues({
                                                ...formValues,
                                                ['cuello_cisne']: newFormValues,
                                            });
                                        }}
                                    />
                                }
                                label="Micro Cuelllo de Cisne"
                            />
                                </Grid>
                            
                                
                            {isActualizar?
                        (<Grid item>
                            <Autocomplete
                                name="fk_vehiculo"
                                    value={formValues}
                                    //onClick={filtrarAccesorioGps('Gps')}
                                    sx={{ width: 300, mb:1 }}
                                onChange={(event, newFormValues5) => {
                                    setFormValues({
                                        ...formValues,
                                        ['fk_vehiculo']: newFormValues5.idvehiculo,
                                        ['placa']:newFormValues5.placa,
                                    });
                                    }}
                                    inputValue={inputValue5}
                                    onInputChange={(event, newInputValue5) => {
                                        setInputValue5(newInputValue5);
                                    }}
                                    options={tableVehi}
                                    getOptionLabel={(tableVehi) => tableVehi.placa || ""}
                                    //isOptionEqualToValue={(option, value) =>{
                                    //    option.num_serie === value.num_serie
                                    //    //console.log(option.num_serie);
                                    //    //console.log(value);
                                    //}}
                                    renderInput={(params) => <TextField  {...params} variant="outlined" label="Placa Vehiculo" />}       
                            />
                            </Grid>):
                            (<Grid item xs={6}>
                                <Autocomplete
                                        name="fk_vehiculo"
                                        //onClick={filtrarAccesorioGps('Gps')}
                                        options={tableVehi}
                                        getOptionLabel={(tableVehi) => tableVehi.placa || ""}
                                        sx={{ width: 300, mb:1 }}
                                        onChange={(event, newFormValues) => {
                                            setFormValues({
                                                ...formValues,
                                                ['fk_vehiculo']: newFormValues.idvehiculo,
                                            });
                                        }}
                                        renderInput={(params) => <TextField  {...params} variant="outlined" label="Placa Vehiculo" />}       
                                />
                                </Grid>)
                            }
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="estatus-input" color='secondary'>Estatus</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 300 }}
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
                        
                    </Grid>
                    <Button variant="contained" color="secondary" type="submit" onClick={mostrarGuardar} sx={{ width: 628 }} >
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