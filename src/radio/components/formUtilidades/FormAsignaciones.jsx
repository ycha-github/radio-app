import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useModalHook } from '../../../hooks/useModalHook';
import { useAsignacionesStore } from '../../../hooks/hooksUtilidades/useAsignacionesStore';
import axios from 'axios';

export const FormAsignaciones = ({usuario, radio}) => {

    const { CloseModal, isActualizar, mostrarGuardar } = useModalHook();
    const { activeEvent, startSavingEvent, cambiarSue, filtrarAccesorio, accesoriosFiltrado } = useAsignacionesStore();

   
   const [formValues, setFormValues] = useState({
       usuarios_idusuarios:"",
       radios_idradios:"",
       fk_accesorio_bateria:"",
       fk_accesorio_cargador:"",
       fk_accesorio_gps:"",
       estatus:  "",
       createdAt: "",
       updatedAt: "",
   }); 
   const [tableData, setTableData] = useState([]);
   const [tableSue, setTableSue] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [inputValue3, setInputValue3] = useState('');
    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({ ...activeEvent });
        }
    }, [activeEvent])

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

   const handleInputChange = (event) => {
       setFormValues({
           ...formValues,
           [event.target.name]: event.target.value,
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
    
    console.log(formValues);
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
                           //value={usuario[formValues.usuarios_idusuarios-1]}
                           // defaultValue={usuario}
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
                                renderInput={(params) => <TextField  {...params} variant="outlined" label="Serie" />}       
                           />
                        </Grid>):
                        (<Grid item>
                            <Autocomplete
                                    name="radios_idradios"
                                    //value={radio[formValues.radios_idradios]}
                                    // defaultValue={radio}
                                    options={tableSue}
                                    getOptionLabel={(tableSue) => tableSue.serie || ""}
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
                        {isActualizar?
                    (<Grid item>
                        <Autocomplete
                               name="fk_accesorio_bateria"
                                value={formValues}
                                onClick={filtrarAccesorio('Bateria')}
                               
                                sx={{ width: 400, mb:1 }}
                               onChange={(event, newFormValues) => {
                                   //console.log(newFormValues.idaccesorios);
                                   setFormValues({
                                      ...formValues,
                                      ['fk_accesorio_bateria']: newFormValues.idaccesorios,
                                      ['num_serie']:newFormValues.num_serie,
                                   });
                                   }}
                                inputValue={inputValue}
                                onInputChange={(event, newInputValue) => {
                                    //console.log(newInputValue);
                                    setInputValue(newInputValue);
                                  }}
                                options={accesoriosFiltrado}
                                getOptionLabel={(accesoriosFiltrado) => accesoriosFiltrado.num_serie || ""}
                                //isOptionEqualToValue={(option, value) =>{
                                //    option.num_serie === value.num_serie
                                //    //console.log(option.num_serie);
                                //    //console.log(value);
                                //}}
                                renderInput={(params) => <TextField  {...params} variant="outlined" label="Bateria" />}       
                           />
                        </Grid>):
                        (<Grid item>
                            <Autocomplete
                                    name="fk_accesorio_bateria"
                                    //value={radio[formValues.radios_idradios]}
                                    // defaultValue={radio}
                                    options={accesoriosFiltrado}
                                    onClick={filtrarAccesorio('Bateria')}
                                    getOptionLabel={(accesoriosFiltrado) => accesoriosFiltrado.num_serie || ""}
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
                                   console.log(newFormValues);
                                   setFormValues({
                                      ...formValues,
                                      ['fk_accesorio_cargador']: newFormValues3.idaccesorios,
                                      ['serie_cargador']:newFormValues3.num_serie,
                                   });
                                   }}
                                inputValue={inputValue3}
                                onInputChange={(event, newInputValue3) => {
                                    //console.log(newInputValue);
                                    setInputValue3(newInputValue3);
                                  }}
                                options={accesoriosFiltrado}
                                getOptionLabel={(accesoriosFiltrado) => accesoriosFiltrado.num_serie || ""}
                                //isOptionEqualToValue={(option, value) =>{
                                //    option.num_serie === value.num_serie
                                //    //console.log(option.num_serie);
                                //    //console.log(value);
                                //}}
                                renderInput={(params) => <TextField  {...params} variant="outlined" label="Cargador" />}       
                           />
                        </Grid>):
                        (<Grid item>
                            <Autocomplete
                                    name="fk_accesorio_cargador"
                                    //value={radio[formValues.radios_idradios]}
                                    // defaultValue={radio}
                                    options={accesoriosFiltrado}
                                    onClick={filtrarAccesorio('Cargador')}
                                    getOptionLabel={(accesoriosFiltrado) => accesoriosFiltrado.num_serie || ""}
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
                        {/* {isActualizar?
                    (<Grid item>
                        <Autocomplete
                               name="fk_accesorio_cargador"
                                value={formValues}
                                onClick={filtrarAccesorio('Cargador')}
                                sx={{ width: 400, mb:1 }}
                               onChange={(event, newFormValues3) => {
                                   //console.log(newFormValues.idaccesorios);
                                   setFormValues({
                                      ...formValues,
                                      ['fk_accesorio_bateria']: newFormValues3.idaccesorios,
                                      ['num_serie']:newFormValues3.num_serie,
                                   });
                                   }}
                                inputValue={inputValue3}
                                onInputChange={(event, newInputValue3) => {
                                    //console.log(newInputValue);
                                    setInputValue3(newInputValue3);
                                  }}
                                options={accesoriosFiltrado}
                                getOptionLabel={(accesoriosFiltrado) => accesoriosFiltrado.num_serie || ""}
                                //isOptionEqualToValue={(option, value) =>{
                                //    option.num_serie === value.num_serie
                                //    //console.log(option.num_serie);
                                //    //console.log(value);
                                //}}
                                renderInput={(params) => <TextField  {...params} variant="outlined" label="Bateria" />}       
                           />
                        </Grid>):
                        (<Grid item>
                            <Autocomplete
                                    name="fk_accesorio_bateria"
                                    //value={radio[formValues.radios_idradios]}
                                    // defaultValue={radio}
                                    options={accesoriosFiltrado}
                                    onClick={filtrarAccesorio('Bateria')}
                                    getOptionLabel={(accesoriosFiltrado) => accesoriosFiltrado.num_serie || ""}
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
                        } */}
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