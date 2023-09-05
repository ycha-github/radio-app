import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useMarcasStore } from '../../../hooks/hooksCatalogo/useMarcasStore';
import { useModalHook } from '../../../hooks/useModalHook';

export const FormMarcas = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        nombreMarcas:'',
        nombreModelos:'',
        tipo:'',
        estatus:'',
        createdAt:'',
        updatedAt:'',
    });
 
    const {CloseModal, isActualizar, mostrarGuardar}=useModalHook();
    const { activeEvent, startSavingEvent }=useMarcasStore();

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

        if (formValues.nombreMarcas.length <= 0 )return;
        // console.log(formValues);
        //TODO:
        await startSavingEvent(formValues);
        CloseModal();
        setFormSubmitted(false);
    };

    return (
        <>
            <ModalRadio >
                <Typography variant='h5'>  {isActualizar? 'Actualizando Marca' : 'Nueva Marca'} </Typography>
                <form onSubmit={onSubmit}>
                        <Grid container alignItems="center" justify="center" direction="column">
                        <Grid item>
                            <TextField
                                id="nombreMarcas-input"
                                sx={{ border: 'none', mb: 1, mt: 2, width: 300 }}
                                type="text"
                                name="nombreMarcas"
                                required
                                color='warning'
                                label="Marca"
                                variant="outlined"
                                value={formValues.nombreMarcas}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="nombreModelos-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                type="text"
                                name="nombreModelos"
                                required
                                color='warning'
                                label="Línea"
                                variant="outlined"
                                value={formValues.nombreModelos}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth>
                                <InputLabel id="tipo-input" color='warning'>Tipo</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                    labelId="demo-simple-select-label"
                                    id="tipo-input"
                                    name="tipo"
                                    required
                                    color='warning'
                                    value={formValues.tipo}
                                    label="Tipo"
                                    onChange={handleInputChange}>
                                    <MenuItem value={1}>Vehículo</MenuItem>
                                    <MenuItem value={2}>Radio</MenuItem>
                                    <MenuItem value={3}>Accesorio</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* <Grid item>
                            <FormControl fullWidth>
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
                        </Grid> */}
                        <Button variant="contained" color="warning" type="submit" onClick={mostrarGuardar} sx={{  width: 300 }} >
                        {isActualizar? 'Actualizar' : 'Guardar'}
                        </Button>
                    </Grid>
                </form>
            </ModalRadio>
        </>
    )
}