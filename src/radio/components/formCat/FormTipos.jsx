import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useTiposStore } from '../../../hooks/hooksCatalogo/useTiposStore';
import { useModalHook } from '../../../hooks/useModalHook';

export const FormTipos = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        nombreTipo:'',
      descripcionTipo:'',
      subNombre:'',
      subDescripcion:'',
      estatus:'',
      createdAt:'',
      updatedAt:'',
    });

    const { CloseModal, isActualizar, mostrarGuardar } = useModalHook();
    const { activeEvent, startSavingEvent } = useTiposStore();

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

        if (formValues.nombreTipo.length <= 0) return;
        console.log(formValues);
        //TODO:
        await startSavingEvent(formValues);
        CloseModal();
        setFormSubmitted(false);
    };

    return (
        <>
            <ModalRadio >
                <Typography variant='h5'> Nuevo Tipo </Typography>
                <form onSubmit={onSubmit}>
                    <Grid container alignItems="center" justify="center" direction="column">
                        <Grid item>
                            <TextField
                                id="nombreTipo-input"
                                sx={{ border: 'none', mb: 1, mt: 2, width: 300 }}
                                type="text"
                                name="nombreTipo"
                                color='warning'
                                label="Tipo"
                                variant="outlined"
                                value={formValues.nombreTipo}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="descripcionTipo-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                type="text"
                                name="descripcionTipo"
                                color='warning'
                                label="descripcionTipo"
                                variant="outlined"
                                value={formValues.descripcionTipo}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="subNombre-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                type="text"
                                name="subNombre"
                                color='warning'
                                label="subNombre"
                                variant="outlined"
                                value={formValues.subNombre}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="subDescripcion-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                type="text"
                                name="subDescripcion"
                                color='warning'
                                label="subDescripcion"
                                variant="outlined"
                                value={formValues.subDescripcion}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
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
                        </Grid>
                        <Button variant="contained" color="warning" type="submit" onClick={()=>mostrarGuardar()} >
                            {isActualizar ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </Grid>
                </form>
            </ModalRadio>
        </>
    )
}