import { Autocomplete, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useModalHook } from '../../../hooks/useModalHook';
import axios from 'axios';
import { useAsignacionesStore } from '../../../hooks/hooksUtilidades/useAsignacionesStore';

export const FormAsigAccesorio = ({usuario, radio}) => {

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        usuarios_idusuarios:'',
        radios_idradios:'1',
        estatus:'',
        createdAt:'',
        updatedAt:'',
    });

    const { CloseModal, isActualizar, mostrarGuardar } = useModalHook();
    const { activeEvent, startSavingEvent } = useAsignacionesStore();

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
        if (formValues.usuarios_idusuarios.length <= 0) return;
        console.log(formValues);
        //TODO:
        await startSavingEvent(formValues);
        CloseModal();
        setFormSubmitted(false);
    };

    return (
        <>
            <Typography justify="center" variant='h5' sx={{ mb: 1 }}> {isActualizar ? 'Actualizando Asignacion Accesorio' : 'Nueva Asignacion Accesorio'} </Typography>
            <form onSubmit={onSubmit}>
                <Grid container alignItems="center" justify="center" direction="column">
                {isActualizar?
                    (<Grid item>
                        <Autocomplete
                                name="radios_idradios"
                                value={radio[formValues.radios_idradios-1]}
                                 //value={[radio[0]]}
                                //defaultValue={radio}
                                options={radio}
                                getOptionLabel={(radio) => radio.rfsi || ""}
                                //isOptionEqualToValue={(option, value) =>
                                //    option.rfsi === value.rfsi
                                //}
                                sx={{ width: 400, mb:1 }}
                                onChange={(event, newFormValues) => {
                                    setFormValues({
                                        ...formValues,
                                        ['radios_idradios']: newFormValues.idradios,
                                    });
                                }}
                                renderInput={(params) => <TextField {...params} variant="outlined" label="RFSI" />}
                           />
                        </Grid>):
                        (<Grid item>
                            <Autocomplete
                                    name="radios_idradios"
                                    //value={radio[formValues.radios_idradios]}
                                    // defaultValue={radio}
                                    options={radio}
                                    getOptionLabel={(radio) => radio.rfsi || ""}
                                    sx={{ width: 400, mb:1 }}
                                    onChange={(event, newFormValues) => {
                                        setFormValues({
                                            ...formValues,
                                            ['radios_idradios']: newFormValues.idradios,
                                        });
                                    }}
                                    renderInput={(params) => <TextField  {...params} variant="outlined" label="RFSI" />}
                               />
                            </Grid>)
                        }
                    {/* <Grid item>
                        <FormControl fullWidth>
                            <InputLabel id="usuarios_idusuarios-input" color='secondary'>Usuario</InputLabel>
                            <Select
                                sx={{ border: 'none', mb: 1, width: 400 }}
                                labelId="demo-simple-select-label"
                                id="usuarios_idusuarios-input"
                                name="usuarios_idusuarios"
                                color='secondary'
                                value={formValues.usuarios_idusuarios}
                                label="Usuario"
                                onChange={handleInputChange}>
                                {
                                    tableData.map(elemento => {
                                        return <MenuItem key={elemento.idusuarios} value={elemento.idusuarios} >{elemento.nombre}</MenuItem>
                                    })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <InputLabel id="radios_idradios-input" color='secondary'>Radio</InputLabel>
                            <Select
                                sx={{ border: 'none', mb: 1, width: 400 }}
                                labelId="demo-simple-select-label"
                                id="radios_idradios-input"
                                name="radios_idradios"
                                color='secondary'
                                value={formValues.radios_idradios}
                                label="Radio"
                                onChange={handleInputChange}>
                                {
                                    tableSue.map(elemento => {
                                        return <MenuItem key={elemento.idradios} value={elemento.idradios} >{elemento.serie}</MenuItem>
                                    })}
                            </Select>
                        </FormControl>
                    </Grid> */}
                    <Grid item>
                        <FormControl fullWidth>
                            <InputLabel id="estatus-input" color='secondary'>Estatus</InputLabel>
                            <Select
                                sx={{ border: 'none', mb: 1, width: 400 }}
                                labelId="demo-simple-select-label"
                                id="estatus-input"
                                name="estatus"
                                color='secondary'
                                value={formValues.estatus}
                                label="Estatus"
                                onChange={handleInputChange}>
                                <MenuItem value={true}>Activo</MenuItem>
                                <MenuItem value={false}>Inactivo</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Button variant="contained" color="secondary" type="submit" onClick={mostrarGuardar} sx={{ width: 400 }} >
                        {isActualizar ? 'Actualizar' : 'Guardar'}
                    </Button>
                </Grid>
            </form>
        </>
    )
}