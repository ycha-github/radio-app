import { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { ModalRadio } from '../ModalRadio';
import { useAccesoriosStore } from '../../../hooks/hooksCatalogo/useAccesoriosStore';
import { useModalHook } from '../../../hooks/useModalHook';
import axios from 'axios';
import { radioApi } from '../../../api';

export const FormAccesorios = (customStyles) => {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [marcasTipo, setMarcasTipo] = useState([]);
    const [vacio, setVacio] = useState(false);
    const [inputValue, setInputValue] = useState('');


    const selectMarcasTipos = async() => {
        await radioApi.get(`/marcas/tipo/${3}`).
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
        accesorio:'',
        serie_bateria: '',
        serie_cargador: '',
        serie_gps: '',
        marcas_idMarcas:'',
        inventario_interno:'',
        inventario_segpub:'',
        contrato_compra:'',
        observaciones:'',
        fecha_recepcion:'',
        estatus:'',
        createdAt:'',
        updatedAt:'',
    }); 

    const {CloseModal, isActualizar, mostrarGuardar}=useModalHook();
    const { activeEvent, startSavingEvent }=useAccesoriosStore();

    useEffect(() => {
        if ( activeEvent !== null ) {
            setFormValues({ ...activeEvent });
        }
      }, [ activeEvent ])

    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    };

    const onSubmit = async(event) => {
        event.preventDefault();
        setFormSubmitted(true);
        console.log(formValues);
        //TODO:
        await startSavingEvent(formValues);
        CloseModal();
        setFormSubmitted(false);
    }

    return ( 
        <>
            <ModalRadio >
                <Box sx={{...customStyles, maxWidth: '670px' }}>
                    <Typography variant='h5'> {isActualizar? 'Actualizando Accesorio' : 'Nuevo Accesorio'} </Typography>
                    <form onSubmit={onSubmit}>
                        <Stack  noValidate spacing={3}>

                            <Grid container alignItems="center" justify="center" direction="column">
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                {
                                    isActualizar ? (
                                    <Grid item xs={6}>
                                        <FormControl fullWidth  >
                                            <InputLabel id="accesorio-input" color='warning'>Tipo Accesorio</InputLabel>
                                            <Select
                                                sx={{ border: 'none', mt: 2, width: 300 }}
                                                labelId="demo-simple-select-label"
                                                id="accesorio-input"
                                                name="accesorio"
                                                required
                                                color='warning'
                                                value={formValues.accesorio}
                                                label="Tipo Accesorio"
                                                onChange={ 
                                                    (event, newFormValues, value) => {
                                                        setFormValues({
                                                            ...formValues,
                                                            ['accesorio']: newFormValues.props.value,
                                                        })
                                                    }
                                                }
                                            >
                                                <MenuItem value={'Bateria'} >Bateria</MenuItem>
                                                <MenuItem value={'Cargador'} >Cargador</MenuItem>
                                                <MenuItem value={'Gps'} >Gps</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid >
                                    )  :  (
                                    <Grid item xs={6}>
                                        <FormControl fullWidth  >
                                            <InputLabel id="accesorio-input" color='warning'>Tipo Accesorio</InputLabel>
                                            <Select
                                                sx={{ border: 'none', mt: 2, width: 300 }}
                                                labelId="demo-simple-select-label"
                                                id="accesorio-input"
                                                required
                                                name="accesorio"
                                                color='warning'
                                                value={formValues.accesorio}
                                                label="Tipo Accesorio"
                                                onChange={ handleInputChange}
                                            >
                                                <MenuItem value={'Bateria'} onClick={ ()=>setVacio(true) } >Bateria</MenuItem>
                                                <MenuItem value={'Cargador'} onClick={ ()=>setVacio(true) } >Cargador</MenuItem>
                                                <MenuItem value={'Gps'} onClick={ ()=>setVacio(true) } >Gps</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid >
                                    )}

                                    {/* Item vacío para control de diseño del modal, relación tipo de accesorio con el campo a mostrar para llenado de la serie */}
                                    
                                        <Grid item xs={6} hidden={ isActualizar ? true : vacio=== true ? true : false}>
                                            <TextField
                                                id="serie_vacio-input"
                                                sx={{ border: 'none', mb: 1, mt: 2, width: 300 }}
                                                type="text"
                                                required
                                                name="serie_vacio"
                                                color='warning'
                                                disabled
                                                />
                                        </Grid>
                                        <Grid item xs={6} hidden={ formValues.accesorio === 'Bateria' ? false : true }>
                                        <TextField
                                            id="serie_bateria-input"
                                            sx={{ border: 'none', mb: 1, mt: 2, width: 300 }}
                                            type="text"
                                            name="serie_bateria"
                                            color='warning'
                                            required
                                            label="Numero de serie bateria"
                                            variant="outlined"
                                            value={  formValues.serie_bateria }
                                            onChange={ ({target} ) =>{
                                                console.log(target)
                                                setFormValues({
                                                                 ...formValues,
                                                                 ['serie_bateria']: target.value,
                                                                 ['serie_cargador']: "",
                                                                 ['serie_gps']: "",
                                                             })
                                            }  

                                        }
                                        />
                                    </Grid>
                                    <Grid item xs={6} hidden={ formValues.accesorio === 'Cargador' ? false : true }>
                                        <TextField
                                            id="serie_cargador-input"
                                            sx={{ border: 'none', mb: 1, mt: 2, width: 300 }}
                                            type="text"
                                            required
                                            name="serie_cargador"
                                            color='warning'
                                            label="Numero de serie cargador"
                                            variant="outlined"
                                            value={ formValues.serie_cargador }
                                            onChange={
                                                ( {target} ) =>{
                                                    setFormValues({
                                                                     ...formValues,
                                                                     ['serie_bateria']: "",
                                                                     ['serie_cargador']: target.value,
                                                                     ['serie_gps']: "",
                                                                 })
                                                } 
                                            } 
                                        />
                                    </Grid>
                                    <Grid item xs={6} hidden={ formValues.accesorio === 'Gps' ? false : true }>
                                        <TextField
                                            id="serie_gps-input"
                                            sx={{ border: 'none', mb: 1, mt: 2, width: 300 }}
                                            type="text"
                                            name="serie_gps"
                                            required
                                            color='warning'
                                            label="Numero de serie gps"
                                            variant="outlined"
                                            value={ formValues.serie_gps }
                                            onChange={
                                                ( event, newFormValues ) =>{
                                                    setFormValues({
                                                                     ...formValues,
                                                                     ['serie_bateria']: "",
                                                                     ['serie_cargador']: "",
                                                                     ['serie_gps']: newFormValues.props.value,
                                                                 })
                                                } 
                                            } 
                                        />
                                    </Grid>
                                    {
                                        isActualizar ? (
                                            <Grid item xs={6}>
                                                <Autocomplete 
                                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                                    id="marcas_idmarcas-input"
                                                    name={'marcas_idMarcas'}
                                                    value={formValues}
                                                    required
                                                    onChange={(event, newFormValues) => {
                                                        setFormValues(
                                                            { 
                                                                ...formValues,
                                                                ['marcas_idMarcas']: newFormValues.idmarcas,
                                                                ['nombreMarcas']: newFormValues.nombreMarcas,
                                                                ['nombreModelos']: newFormValues.nombreModelos
                                                            }
                                                        );
                                                        console.log(newFormValues)
                                                    }}
                                                    options={marcasTipo}
                                                    inputValue={inputValue}
                                                    onInputChange={(event, newInputValue) => {
                                                        setInputValue(
                                                            newInputValue
                                                        )
                                                    }}
                                                    getOptionLabel={ (options) => options.nombreMarcas + " / " + options.nombreModelos }
                                                    renderInput={(params) => (
                                                        <TextField {...params} label="Marcas / Modelos" />
                                                    )}
                                                />  
                                            </Grid>
                                        )  :  (
                                            <Grid item xs={6}>
                                                <Autocomplete 
                                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                                    id="marcas_idmarcas-input"
                                                    name={'marcas_idMarcas'}
                                                    required
                                                    onChange={(event, newFormValues) => {
                                                        setFormValues(
                                                            { 
                                                                ...formValues,
                                                                ['marcas_idMarcas']: newFormValues.idmarcas,
                                                            }
                                                        );
                                                        console.log(newFormValues)
                                                    }}
                                                    options={marcasTipo}
                                                    getOptionLabel={ (options) => options.nombreMarcas + " / " + options.nombreModelos }
                                                    renderInput={(params) => (
                                                        <TextField {...params} label="Marcas / Modelos" />
                                                    )}
                                                />  
                                            </Grid>
                                        )
                                    }
                                    <Grid item xs={6}>
                                        <TextField
                                            id="inventario_interno-input"
                                            sx={{ border: 'none', mb: 1,  width: 300 }}
                                            type="text"
                                            name="inventario_interno"
                                            color='warning'
                                            label="Inventario interno"
                                            variant="outlined"
                                            value={formValues.inventario_interno}
                                            onChange={handleInputChange} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="inventario_segpub-input"
                                            sx={{ border: 'none', mb: 1,  width: 300 }}
                                            type="text"
                                            name="inventario_segpub"
                                            color='warning'
                                            label="Inventario Seguridad Pública"
                                            variant="outlined"
                                            value={formValues.inventario_segpub}
                                            onChange={handleInputChange} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="contrato_compra-input"
                                            sx={{ border: 'none', mb: 1,  width: 300 }}
                                            type="text"
                                            name="contrato_compra"
                                            color='warning'
                                            required
                                            label="Contrato compra"
                                            variant="outlined"
                                            value={formValues.contrato_compra}
                                            onChange={handleInputChange} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="observaciones-input"
                                            sx={{ border: 'none', mb: 1,  width: 300 }}
                                            type="text"
                                            name="observaciones"
                                            multiline
                                            color='warning'
                                            label="Descripción"
                                            variant="outlined"
                                            value={formValues.observaciones}
                                            onChange={handleInputChange} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="fecha_recepcion-input"
                                            sx={{ border: 'none',  width: 300 }}
                                            type="date"
                                            name='fecha_recepcion'
                                            required
                                            color='warning'
                                            label="Fecha de recepción"
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={formValues.fecha_recepcion}
                                            onChange={handleInputChange}
                                        />
                                    </Grid> 
                                    <Grid item xs={6}>
                                        <FormControl fullWidth  >
                                            <InputLabel id="estatus-input" color='warning'>Estatus</InputLabel>
                                            <Select
                                                sx={{ border: 'none', mb: 1, width: 300 }}
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
                                    </Grid>
                                </Grid>
                                <Button variant="contained" color="warning" type="submit" onClick={mostrarGuardar}  fullWidth >
                                {isActualizar? 'Actualizar' : 'Guardar'}
                                </Button>
                            </Grid>
                                        
                        </Stack>
                    </form>
                </Box>
            </ModalRadio>
        </>
    )
}