import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useModalHook } from '../../../hooks/useModalHook';
import { useCorporacionesStore } from '../../../hooks/hooksCatalogo/useCorporacionesStore';

export const FormCorporaciones = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        nombreCorporacion: '',
        siglasCorporacion: '',
        estatus: '',
        createdAt: '',
        updatedAt: '',
    });
 
    const {CloseModal, isActualizar, mostrarGuardar }=useModalHook();
    const { activeEvent, startSavingEvent }=useCorporacionesStore();

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

        if (formValues.nombreCorporacion.length <= 0 )return;
        // console.log(formValues);
        //TODO:
        await startSavingEvent(formValues);
        CloseModal();
        setFormSubmitted(false);
    };

    return (
        <>
            <ModalRadio >
                <Typography variant='h5'>  {isActualizar? 'Actualizando Corporación' : 'Nueva Corporación'} </Typography>
                <form onSubmit={onSubmit}>
                        <Grid container alignItems="center" justify="center" direction="column">
                        <Grid item>
                            <TextField
                                id="nombreCorporacion-input"
                                sx={{ border: 'none', mb: 1, mt: 2, width: 300 }}
                                type="text"
                                name="nombreCorporacion"
                                color='warning'
                                required
                                label="Corporacion"
                                variant="outlined"
                                value={formValues.nombreCorporacion}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="siglasCorporacion-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                type="text"
                                name="siglasCorporacion"
                                required
                                color='warning'
                                label="Siglas"
                                variant="outlined"
                                value={formValues.siglasCorporacion}
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
                        <Button variant="contained" color="warning" type="submit" onClick={mostrarGuardar} sx={{  width: 300 }} >
                        {isActualizar? 'Actualizar' : 'Guardar'}
                        </Button>
                    </Grid>
                </form>
            </ModalRadio>
        </>
    )
}