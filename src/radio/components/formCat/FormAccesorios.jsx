import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useModalHook } from '../../../hooks/useModalHook';
import { useAccesoriosStore } from '../../../hooks/hooksCatalogo/useAccesoriosStore';
import axios from 'axios';

export const FormAccesorios = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [bat, setBat] = useState(false);
    const [car, setCar] = useState(false);
    const [gps, setGps] = useState(false);
    const [vacio, setVacio] = useState(true);


    const [formValues, setFormValues] = useState({
        accesorio:'',
        num_serie: '' ,
        marcas_idMarcas: '',
        inventario_interno: '',
        inventario_segpub: '',
        contrato_compra: '',
        observaciones: '',
        fecha_recepcion: '',
        estatus: '',
        createdAt: '',
        updatedAt: '',
    }); 

    useEffect(() => {
       axios.get(`http://localhost:8000/api/v0/marcas/tipo/${3}`).
       then((response)=>{
         setTableData(response.data);
       });
      }, []);

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
        //console.log(event)
        event.preventDefault();
        setFormSubmitted(true);

        if (formValues.num_serie.length <= 0 )return;
        console.log(formValues);
        //TODO:
        await startSavingEvent(formValues);
        CloseModal();
        setFormSubmitted(false);
    };

    const mostrarSerieBateria = () => { 
        setBat(true); 
        setCar(false); 
        setGps(false); 
        setVacio(false) 
    }

    const mostrarSerieCargador = () => { 
        setBat(false); 
        setCar(true); 
        setGps(false); 
        setVacio(false) 
    }

    const mostrarSerieGps = () => { 
        setBat(false); 
        setCar(false); 
        setGps(true); 
        setVacio(false) 
    }


    return ( 
        <>
            <ModalRadio >
                <Typography variant='h5'> {isActualizar? 'Actualizando Accesorio' : 'Nuevo Accesorio'} </Typography>
                <form onSubmit={onSubmit}>
                    <Stack  noValidate spacing={3}>
                    
                        <Grid container alignItems="center" justify="center" direction="column">
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={6}>
                                    <FormControl fullWidth  >
                                        <InputLabel id="accesorio-input" color='warning'>Tipo Accesorio</InputLabel>
                                        <Select
                                            sx={{ border: 'none', mt: 2, width: 300 }}
                                            labelId="demo-simple-select-label"
                                            id="accesorio-input"
                                            name="accesorio"
                                            color='warning'
                                            value={formValues.accesorio}
                                            label="Tipo Accesorio"
                                            onChange={handleInputChange}
                                        >
                                            <MenuItem value={'Bateria'} onClick={ mostrarSerieBateria } >Bateria</MenuItem>
                                            <MenuItem value={'Cargador'} onClick={ mostrarSerieCargador }>Cargador</MenuItem>
                                            <MenuItem value={'Gps'} onClick={ mostrarSerieGps }>Gps</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid >
                                {/* Item vacío para control de diseño del modal, relación tipo de accesorio con el campo a mostrar para llenado de la serie */}
                                <Grid item xs={6} hidden={ vacio===true ? false : true }>
                                    <TextField
                                        id="serie_vacio-input"
                                        sx={{ border: 'none', mb: 1, mt: 2, width: 300 }}
                                        type="text"
                                        name="serie_vacio"
                                        color='warning'
                                        disabled
                                        />
                                </Grid>
                                <Grid item xs={6} hidden={ bat===true ? false : true }>
                                    <TextField
                                        id="serie_bateria-input"
                                        sx={{ border: 'none', mb: 1, mt: 2, width: 300 }}
                                        type="text"
                                        name="serie_bateria"
                                        color='warning'
                                        label="Numero de serie bateria"
                                        variant="outlined"
                                        value={formValues.serie_bateria}
                                        onChange={handleInputChange} />
                                </Grid>
                                <Grid item xs={6} hidden={ car===true ? false : true }>
                                        <TextField
                                        id="serie_cargador-input"
                                        sx={{ border: 'none', mb: 1, mt: 2, width: 300 }}
                                        type="text"
                                        name="serie_cargador"
                                        color='warning'
                                        label="Numero de serie cargador"
                                        variant="outlined"
                                        value={formValues.serie_cargador}
                                        onChange={handleInputChange} />
                                </Grid>
                                <Grid item xs={6} hidden={ gps===true ? false : true }>
                                        <TextField
                                        id="serie_gps-input"
                                        sx={{ border: 'none', mb: 1, mt: 2, width: 300 }}
                                        type="text"
                                        name="serie_gps"
                                        color='warning'
                                        label="Numero de serie gps"
                                        variant="outlined"
                                        value={formValues.serie_gps}
                                        onChange={handleInputChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth >
                                        <InputLabel  id="marcas_idMarcas-input" color='warning'>Marca</InputLabel>
                                        <Select
                                        sx={{ border: 'none', mb: 1, width: 300 }}
                                            labelId="demo-simple-select-label"
                                            id="marcas_idMarcas-input"
                                            name="marcas_idMarcas"
                                            color='warning'
                                            value={formValues.marcas_idMarcas}
                                            label="Marca"
                                            onChange={handleInputChange}>
                                                {
                                                tableData.map(elemento=>{
                                                return <MenuItem key={elemento.idmarcas} value={elemento.idmarcas} >{elemento.nombreMarcas}</MenuItem> 
                                                })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="inventario_interno-input"
                                        sx={{ border: 'none', mb: 1,  width: 300 }}
                                        type="text"
                                        name="inventario_interno"
                                        color='warning'
                                        label="Inventario"
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
                                        label="inventario_segpub"
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
                                        label="contrato_compra"
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
                                        color='warning'
                                        label="Descripcion"
                                        variant="outlined"
                                        value={formValues.observaciones}
                                        onChange={handleInputChange} />
                                </Grid>
                            
                                <Grid item xs={6}>
                                    <TextField
                                        id="fecha_recepcion-input"
                                        sx={{ border: 'none',  width: 300 }}
                                        type="text"
                                        name="fecha_recepcion"
                                        color='warning'
                                        label="Fecha de recepcion "
                                        variant="outlined"
                                        value={formValues.fecha_recepcion}
                                        onChange={handleInputChange} />
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
                            <Button variant="contained" color="warning" type="submit" onClick={mostrarGuardar} sx={{  width: 528 }} >
                            {isActualizar? 'Actualizar' : 'Guardar'}
                            </Button>
                        </Grid>
                    
                    </Stack>
                </form>
            </ModalRadio>
        </>
    )
}