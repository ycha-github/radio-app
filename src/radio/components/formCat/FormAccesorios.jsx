import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useModalHook } from '../../../hooks/useModalHook';
import { useAccesoriosStore } from '../../../hooks/hooksCatalogo/useAccesoriosStore';
import axios from 'axios';

export const FormAccesorios = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [tableData, setTableData] = useState([])
    const [tableSue, setTableSue] = useState([])

    const [formValues, setFormValues] = useState({
        accesorio:'',
        num_serie: '',
        marcas_idMarcas: '',
        inventario_interno: '',
        inventario_segpub: '',
        contrato_compra: '',
        observaciones: '',
        fecha_recepcion: '',
        fk_sue: '',
        estatus: '',
        createdAt: '',
        updatedAt: '',
    });

    useEffect(() => {
       axios.get('http://localhost:8000/api/v0/marcas').
       then((response)=>{
         setTableData(response.data);
       });

       axios.get('http://localhost:8000/api/v0/sue').
       then((response)=>{
         setTableSue(response.data);
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

    return ( 
        <>
            <ModalRadio >
                <Typography variant='h5'> {isActualizar? 'Actualizando Accesorio' : 'Nuevo Accesorio'} </Typography>
                    <form onSubmit={onSubmit}>
                    <Stack  noValidate spacing={3}>
                    
                        <Grid container alignItems="center" justify="center" direction="column">
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {/* <Grid container justify="center" maxHeight={600}> */}
                        <Grid item xs={6}>
                            <TextField
                                id="zona-input"
                                sx={{ border: 'none', mt:2,  width: 300 }}
                                type="text"
                                name="accesorio"
                                color='warning'
                                label="Tipo Accesorio"
                                variant="outlined"
                                value={formValues.accesorio}
                                onChange={handleInputChange} />
                        </Grid >
                        <Grid item xs={6}>
                            <TextField
                                id="zona-input"
                                sx={{ border: 'none', mb: 1, mt:2, width: 300 }}
                                type="text"
                                name="num_serie"
                                color='warning'
                                label="Numero de serie"
                                variant="outlined"
                                value={formValues.num_serie}
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
                            <FormControl fullWidth >
                                <InputLabel  id="fk_sue-input" color='warning'>SUE</InputLabel>
                                <Select
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                    labelId="demo-simple-select-label"
                                    id="fk_sue-input"
                                    name="fk_sue"
                                    color='warning'
                                    value={formValues.fk_sue}
                                    label="SUE"
                                    onChange={handleInputChange}>
                                        {
                                        tableSue.map(elemento=>{
                                          return <MenuItem key={elemento.id_sue} value={elemento.id_sue} >{elemento.nombreStatus}</MenuItem> 
                                        })}
                                </Select>
                            </FormControl>
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