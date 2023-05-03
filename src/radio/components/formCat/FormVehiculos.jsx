import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useVehiculosStore } from '../../../hooks/hooksCatalogo/useVehiculosStore';
import { useModalHook } from '../../../hooks/useModalHook';
import axios from 'axios';

export const FormVehiculos = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [tableData, setTableData] = useState([])

    const [formValues, setFormValues] = useState({
        marcas_idmarcas:'',
        // linea:'',
        anio:'',
        tipo:'',
        color:'',
        placa:'',
        unidad:'',
        fk_zonaregion:'',
        estatus:'',
        createdAt:'',
        updatedAt:'',
    });

    useEffect(() => {
        axios.get('http://localhost:8000/api/v0/marcas').
      then((response)=>{
        setTableData(response.data);
      });
     }, []);
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

        if (formValues.nombreVehiculo.length <= 0) return;
        console.log(formValues);
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
                    {/* <Grid container justify="center"  /*overflow={ 'scroll'} maxHeight={600}> */}
                        <Grid item >
                            <FormControl fullWidth sx={{ border: 'none', mt: 1, mb: 1, width: 300 }}>
                                <InputLabel id="marcas_idmarcas-input" color='warning'>Marca / Modelo</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="marcas_idMarcas-input"
                                    name="marcas_idmarcas"
                                    color='warning'
                                    value={formValues.marcas_idmarcas}
                                    label="Marca / Modelo"
                                    onChange={handleInputChange}>
                                        {
                                        tableData.map(elemento=>{
                                          return <MenuItem key={elemento.idmarcas} value={elemento.idmarcas} >{elemento.nombreMarcas + " / " + elemento.nombreModelos}</MenuItem> 
                                        })}
                                </Select>
                            </FormControl>
                        </Grid>
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
                        </Grid>
                            <Button fullWidth variant="contained" color="warning" type="submit" onClick={() => mostrarGuardar()} >
                                {isActualizar ? 'Actualizar' : 'Guardar'}
                            </Button>
                    </Grid>
                </form>
            </ModalRadio>
        </>
    )
}