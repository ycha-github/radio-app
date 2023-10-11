import { useEffect, useState } from 'react';
import { Autocomplete, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { ModalRadio } from '../ModalRadio';
import { useVehiculosStore } from '../../../hooks/hooksCatalogo/useVehiculosStore';
import { useModalHook } from '../../../hooks/useModalHook';
import axios from 'axios';
import { radioApi } from '../../../api';

export const FormVehiculos = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [marcasTipo, setMarcasTipo] = useState([]);
    const [zonasRegiones, setZonasRegiones] = useState([]);
    const [inputValue, setInputValue] = useState('');
    

    
    const selectMarcasTipos = async() => {
        await radioApi.get(`/marcas/tipo/${1}`).
        then((response)=>{
            setMarcasTipo(response.data);
            // console.log(response.data);
        }).catch(error=>{
            console.log(error);
        });
        
    }
    
    useEffect(() => {
        selectMarcasTipos();
    }, [])


    const [formValues, setFormValues] = useState({
        marcas_idmarcas:null,
        // linea:'',
        anio:'',
        tipo:'',
        color:'',
        placa:'',
        unidad:'',
        fk_zonaregion:null,
        estatus:'',
        createdAt:'',
        updatedAt:'',
    });
    
    useEffect(() => {
        radioApi.get('/zonasregiones/estatus').
        then((response)=>{
            setZonasRegiones(response.data);
        });
    }, [])


    const { CloseModal, isActualizar, mostrarGuardar } = useModalHook();
    const { activeEvent, startSavingEvent } = useVehiculosStore();

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

        // if (formValues.nombreVehiculo.length <= 0) return;
        // console.log(formValues);
        // console.log(marcaId) 
        //TODO:
        await startSavingEvent(formValues);
        CloseModal();
        setFormSubmitted(false);
    };

    return (
        <>
            <ModalRadio >
                <Typography variant='h5'> {isActualizar? 'Actualizando Vehiculo' : 'Nuevo Vehiculo'} </Typography>
                <form onSubmit={onSubmit} >
                    <Grid container alignItems="center" justify="center" direction="column" >
                        { 
                            isActualizar ? (
                                <Grid item>
                                    <Autocomplete 
                                        sx={{ border: 'none', mb: 1, width: 300 }}
                                        id="marcas_idmarcas-input"
                                        name={'marcas_idmarcas'}
                                        value={formValues}
                                        onChange={(event, newFormValues) => {
                                            setFormValues(
                                                { 
                                                    ...formValues,
                                                    ['marcas_idmarcas']: newFormValues.idmarcas,
                                                    ['nombreMarcas']: newFormValues.nombreMarcas,
                                                    ['nombreModelos']: newFormValues.nombreModelos
                                                }
                                            );
                                            // console.log(newFormValues)
                                        }}
                                        options={marcasTipo}
                                    
                                        inputValue={inputValue}
                                        onInputChange={(event, newInputValue) => {
                                            setInputValue(
                                                newInputValue
                                            )
                                        }}
                                        getOptionLabel={ (options) => options.nombreMarcas + " / " + options.nombreModelos }

                                        // isOptionEqualToValue={
                                        //     (option, value) =>{
                                        //         option.nombreModelos === value.nombreModelos
                                        //         console.log(value.nombreModelos);
                                        //     } 
                                        // }
                                        
                                        renderInput={(params) => (
                                            <TextField {...params} label="Marcas / Modelos" color='warning' />
                                        )}
                                    />  
                                </Grid>
                            ) : (
                                <Grid item>
                                    <Autocomplete 
                                        sx={{ border: 'none', mb: 1, width: 300 }}
                                        id="marcas_idmarcas-input"
                                        name={'marcas_idmarcas'}                                       
                                        onChange={(event, newFormValues) => {
                                            setFormValues(
                                                { 
                                                    ...formValues,
                                                    ['marcas_idmarcas']: newFormValues.idmarcas,
                                                }
                                            );
                                            // console.log(newFormValues)
                                        }}
                                        options={marcasTipo}
                                        getOptionLabel={ (options) => options.nombreMarcas + " / " + options.nombreModelos }
                                        renderInput={(params) => (
                                            <TextField {...params} label="Marcas / Modelos" color='warning' />
                                        )}
                                    /> 
                                </Grid> 
                            ) 
                        }
                        <Grid item >
                            <TextField
                                id="anio-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                type="text"
                                name="anio"
                                color='warning'
                                label="Año"
                                variant="outlined"
                                value={formValues.anio}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item >
                            <TextField
                                id="tipo-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                type="text"
                                name="tipo"
                                color='warning'
                                label="Tipo"
                                variant="outlined"
                                value={formValues.tipo}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item >
                            <TextField
                                id="color-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                type="text"
                                name="color"
                                color='warning'
                                label="Color"
                                variant="outlined"
                                value={formValues.color}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item >
                            <TextField
                                id="placa-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                type="text"
                                name="placa"
                                color='warning'
                                label="Placa"
                                variant="outlined"
                                value={formValues.placa}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item >
                            <TextField
                                id="unidad-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                type="text"
                                name="unidad"
                                color='warning'
                                label="Unidad"
                                variant="outlined"
                                value={formValues.unidad}
                                onChange={handleInputChange} />
                        </Grid>
                        {/* <Grid item >
                            <FormControl fullWidth sx={{ border: 'none', mt: 1, mb: 1, width: 300 }}>
                                <InputLabel id="fk_zonaregion-input" color='warning'>Zona / Región</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="fk_zonaRegion-input"
                                    name="fk_zonaregion"
                                    color='warning'
                                    value={formValues.fk_zonaregion}
                                    label="Zona / Región"
                                    onChange={handleInputChange}>
                                        {
                                        zonasRegiones.map(elemento=>{
                                          return <MenuItem key={elemento.idzonasregiones} value={elemento.idzonasregiones} >{elemento.nombreZonasRegiones}</MenuItem> 
                                        })}
                                </Select>
                            </FormControl>
                        </Grid> */}
                        {/* <Grid item >
                            <FormControl fullWidth sx={{ border: 'none', mb: 1, width: 300 }}>
                                <InputLabel id="estatus-input" color='warning'>Estatus</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="estatus-input"
                                    name="estatus"
                                    color='warning'
                                    value={formValues.estatus}
                                    label="Estatus"
                                    onChange={handleInputChange}>
                                    <MenuItem value={true}>Activo</MenuItem>
                                    <MenuItem value={false}>Inactivo</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid> */}
                            <Button fullWidth variant="contained" color="warning" type="submit" onClick={() => mostrarGuardar()} >
                                {isActualizar ? 'Actualizar' : 'Guardar'}
                            </Button>
                    </Grid>
                </form>
            </ModalRadio>
        </>
    )
}