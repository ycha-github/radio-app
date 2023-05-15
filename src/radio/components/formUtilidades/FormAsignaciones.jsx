import { Autocomplete, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useModalHook } from '../../../hooks/useModalHook';
import { useAsignacionesStore } from '../../../hooks/hooksUtilidades/useAsignacionesStore';
import axios from 'axios';

export const FormAsignaciones = ({usuario, radio}) => {

    const { CloseModal, isActualizar, mostrarGuardar } = useModalHook();
    const { activeEvent, startSavingEvent, cambiarSue, filtrarAccesorio, accesoriosFiltrado,filtrarAccesorioBateria,accesoriosFiltradoBateria,filtrarAccesorioGps,accesoriosFiltradoGps } = useAsignacionesStore();

   const [formValues, setFormValues] = useState({
       usuarios_idusuarios:"",
       radios_idradios:"",
       rfsi:"",
       fk_accesorio_bateria:"",
       fk_accesorio_cargador:"",
       fk_accesorio_gps:"",
       funda:true,
       antena: false,
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
    }, [activeEvent])
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
        setFormValues({
          ...formValues,
          [event.target.name]: event.target.checked
        });
      };

    const onSubmit = async (event) => {
        event.preventDefault();
        //setFormSubmitted(true);
        if (formValues.estatus.length <= 0) return;
        console.log(formValues)
        await startSavingEvent(formValues);
        await cambiarSue(formValues.radios_idradios);
        //onResetForm();
       CloseModal();
       // setFormSubmitted(false);
    };
console.log(formValues)
    return (
        <>
        <ModalRadio >
            <Typography justify="center" variant='h5' sx={{ mb: 1 }}> {isActualizar ? 'Actualizando Asignacion' : 'Nueva Asignacion'} </Typography>
            <form onSubmit={onSubmit}>
                <Grid container alignItems="center" justify="center" direction="column">
                     { isActualizar? 
                    (<Grid item>
                        <Autocomplete
                        name="usuarios_idusuarios"
                        value={formValues}
                        sx={{ width: 400, mb:1 }}
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
                        (<Grid item>
                            <Autocomplete
                            name="usuarios_idusuarios"
                            options={tableData}
                            getOptionLabel={(tableData) => tableData.nombre +" "+ tableData.apellido_pat +" "+ tableData.apellido_mat || ""}
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
                     {isActualizar?
                    (<Grid item>
                        <Autocomplete
                                name="radios_idradios"
                                value={formValues}
                                sx={{ width: 400, mb:1 }}
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
                        (<Grid item>
                            <Autocomplete
                                    name="radios_idradios"
                                    options={tableSue}
                                    getOptionLabel={(tableSue) => tableSue.serie || ""}
                                    sx={{ width: 400, mb:1 }}
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
                        <Grid item xs={6}>
                            <TextField
                                id="rfsi"
                                sx={{ border: 'none', mb:1,  width: 400 }}
                                type="text"
                                name="rfsi"
                                color='secondary'
                                label="RFSI"
                                variant="outlined"
                                value={formValues.rfsi}
                                onChange={handleInputChange} />
                        </Grid >
                        {isActualizar?
                    (<Grid item>
                        <Autocomplete
                               name="fk_accesorio_bateria"
                                value={formValues}
                                onClick={filtrarAccesorioBateria('Bateria')}
                                sx={{ width: 400, mb:1 }}
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
                        (<Grid item>
                            <Autocomplete
                                    name="fk_accesorio_bateria"
                                    onClick={filtrarAccesorioBateria('Bateria')}
                                    options={accesoriosFiltradoBateria}
                                    getOptionLabel={(accesoriosFiltradoBateria) => accesoriosFiltradoBateria.serie_bateria || ""}
                                    sx={{ width: 400, mb:1 }}
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
                    (<Grid item>
                        <Autocomplete
                               name="fk_accesorio_cargador"
                                value={formValues}
                                onClick={filtrarAccesorio('Cargador')}
                                sx={{ width: 400, mb:1 }}
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
                        (<Grid item>
                            <Autocomplete
                                    name='fk_accesorio_cargador'
                                    options={accesoriosFiltrado}
                                    onClick={filtrarAccesorio('Cargador')}
                                    getOptionLabel={(accesoriosFiltrado) => accesoriosFiltrado.serie_cargador || ""}
                                    sx={{ width: 400, mb:1 }}
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
                    (<Grid item>
                        <Autocomplete
                               name="fk_accesorio_gps"
                                value={formValues}
                                onClick={filtrarAccesorioGps('Gps')}
                                sx={{ width: 400, mb:1 }}
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
                        (<Grid item>
                            <Autocomplete
                                    name="fk_accesorio_gps"
                                    onClick={filtrarAccesorioGps('Gps')}
                                    options={accesoriosFiltradoGps}
                                    getOptionLabel={(accesoriosFiltradoGps) => accesoriosFiltradoGps.serie_gps || ""}
                                    sx={{ width: 400, mb:1 }}
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
                        <FormGroup>
                        <Grid item>
                        
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="funda"
                                    value={formValues.funda}
                                    checked={formValues.funda}
                                    onChange={handleChange}
                                />
                            }
                            label="Funda"
                        />
                        </Grid>
                        <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="antena"
                                    value={formValues.antena}
                                    checked={formValues.antena}
                                    onChange={handleChange}
                                />
                            }
                            label="Antena"
                        />
                            </Grid>
                            </FormGroup>
                        {isActualizar?
                    (<Grid item>
                        <Autocomplete
                               name="fk_vehiculo"
                                value={formValues}
                                //onClick={filtrarAccesorioGps('Gps')}
                                sx={{ width: 400, mb:1 }}
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
                        (<Grid item>
                            <Autocomplete
                                    name="fk_vehiculo"
                                    //onClick={filtrarAccesorioGps('Gps')}
                                    options={tableVehi}
                                    getOptionLabel={(tableVehi) => tableVehi.placa || ""}
                                    sx={{ width: 400, mb:1 }}
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
            </ModalRadio>
        </>
    )
}