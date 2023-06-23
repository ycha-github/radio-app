import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useModalHook } from '../../../hooks/useModalHook';
import { useServiciosStore } from '../../../hooks/hooksCatalogo/useServiciosStore';

export const FormServicio = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        nombreServicios:'',
        descripcion:'',
        estatus:'',
        createdAt:'',
        updatedAt:'',
    });

    const {CloseModal, isActualizar, mostrarGuardar}=useModalHook();
    const { activeEvent, startSavingEvent }=useServiciosStore();

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

        if (formValues.nombreServicios.length <= 0 )return;
        console.log(formValues);

        //TODO:
        await startSavingEvent(formValues);
        CloseModal();
        setFormSubmitted(false);
    };

    return (
        <>
            <ModalRadio >
                <Typography variant='h5'> {isActualizar? 'Actualizando Servicio' : 'Nuevo Servicio'} </Typography>
                <form onSubmit={onSubmit}>
                        <Grid container alignItems="center" justify="center" direction="column">
                        <Grid item>
                            <TextField
                                id="nombreServicios-input"
                                sx={{ border: 'none', mb: 1, mt: 2, width: 300 }}
                                type="text"
                                name="nombreServicios"
                                required
                                color='warning'
                                label="Nombre de servicio"
                                variant="outlined"
                                value={formValues.nombreServicios}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="descripcion-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                type="text"
                                name="descripcion"
                                color='warning'
                                multiline
                                label="Descripcion"
                                variant="outlined"
                                value={formValues.descripcion}
                                onChange={handleInputChange} />
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
                        <Button variant="contained" color="warning" type="submit" sx={{  width: 300 }} onClick={ () => mostrarGuardar() } >
                        {isActualizar? 'Actualizar' : 'Guardar'}
                        </Button>
                    </Grid>
                </form>
            </ModalRadio>
        </>
    )
}
