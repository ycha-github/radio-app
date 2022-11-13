import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { usePuestosStore } from '../../../hooks/hooksCatalogo/usePuestosStore';
import { useModalHook } from '../../../hooks/useModalHook';

export const FormPuestos = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        nombre:'',
        nombreCorporacion:'',
        fk_corporacion:'',
        estatus:'',
        createdAt:'',
        updatedAt:'',
    });
 
    const {CloseModal, isActualizar}=useModalHook();
    const { activeEvent, startSavingEvent }=usePuestosStore();

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

        if (formValues.nombre.length <= 0 )return;
        console.log(formValues);
        //TODO:
        await startSavingEvent(formValues);
        CloseModal();
        setFormSubmitted(false);
    };

    return (
        <>
            <ModalRadio >
                <Typography variant='h5'> Nueva Puestos </Typography>
                <form onSubmit={onSubmit}>
                        <Grid container alignItems="center" justify="center" direction="column">
                        <Grid item>
                            <TextField
                                id="nombre-input"
                                sx={{ border: 'none', mb: 1, mt: 2, width: 300 }}
                                type="text"
                                name="nombre"
                                color='info'
                                label="Nombre"
                                variant="outlined"
                                value={formValues.nombre}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth>
                                <InputLabel id="fk_corporacion-input" color='info'>Corporaciones</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                    labelId="demo-simple-select-label"
                                    id="fk_corporacion-input"
                                    name="fk_corporacion"
                                    color='info'
                                    value={formValues.fk_corporacion}
                                    label="Nombre Corporacion"
                                    onChange={handleInputChange}>
                                    <MenuItem value={1}>C4</MenuItem>
                                    <MenuItem value={2}>SSyPC</MenuItem>
                                </Select>
                            </FormControl>
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
                        <Button variant="contained" color="info" type="submit" >
                        {isActualizar? 'Actualizar' : 'Guardar'}
                        </Button>
                    </Grid>
                </form>
            </ModalRadio>
        </>
    )
}