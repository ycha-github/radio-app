import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useZonasStore } from '../../../hooks/hooksCatalogo/useZonasStore';
import { useModalHook } from '../../../hooks/useModalHook';

export const FormZonasReg = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        nombreZonasRegiones: "",
        descripcionZonasRegiones: "",
        estatus: "",
        createdAt: "",
        updatedAt: "",
    });

    const {CloseModal}=useModalHook();
    const { activeEvent, startSavingEvent }=useZonasStore();

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

        if (formValues.nombreZonasRegiones.length <= 0 )return;
        console.log(formValues);
        //TODO:
        await startSavingEvent(formValues);
        CloseModal();
        setFormSubmitted(false);
    };

    return (
        <>
            <ModalRadio >
                <Typography variant='h5'> Nueva Zonas-Regiones </Typography>
                <form onSubmit={onSubmit}>
                        <Grid container alignItems="center" justify="center" direction="column">
                        <Grid item>
                            <TextField
                                id="zona-input"
                                sx={{ border: 'none', mb: 1, mt: 2, width: 300 }}
                                type="text"
                                name="nombreZonasRegiones"
                                color='info'
                                label="Zona"
                                variant="outlined"
                                value={formValues.nombreZonasRegiones}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="descripcion-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                type="text"
                                name="descripcionZonasRegiones"
                                color='info'
                                label="Descripcion"
                                variant="outlined"
                                value={formValues.descripcionZonasRegiones}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth>
                                <InputLabel id="estatus-input" color='info'>Estatus</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                    labelId="demo-simple-select-label"
                                    id="estatus-input"
                                    name="estatus"
                                    color='info'
                                    value={formValues.estatus}
                                    label="Estatus"
                                    onChange={handleInputChange}>
                                    <MenuItem value={true}>Activo</MenuItem>
                                    <MenuItem value={false}>Inactivo</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <TextField
                                id="fechaCrea-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                type="text"
                                name="createdAt"
                                color='info'
                                label="Fecha de creacion"
                                variant="outlined"
                                value={formValues.createdAt}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="fechaAct-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                type="text"
                                name="updatedAt"
                                color='info'
                                label="Fecha de Actualizacion"
                                variant="outlined"
                                value={formValues.updatedAt}
                                onChange={handleInputChange} />
                        </Grid>
                        <Button variant="contained" color="info" type="submit" >
                            Submit
                        </Button>
                    </Grid>
                </form>
            </ModalRadio>
        </>
    )
}