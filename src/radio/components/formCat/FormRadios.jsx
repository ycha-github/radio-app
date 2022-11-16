import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';

import { useRadiosStore } from '../../../hooks/hooksCatalogo/useRadiosStore';
import { useModalHook } from '../../../hooks/useModalHook';


export const FormRadios = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        fk_tipoequipo: '',
        serie: '',
        logico: '',
        inventario_interno: '',
        inventario_segpub: '',
        fk_propietario: '',
        fk_recurso_compra: '',
        contrato_compra: '',
        rfsi: '',
        fk_tiporadio: '',
        fk_marca: '',
        fecha_actualizacion: '',
        fecha_asignacion: '',
        observaciones: '',
        fecha_recepcion: '',
        fk_sue: '',
        estatus: '',
        createdAt: '',
        updatedAt: '',
    });

    const { CloseModal, isActualizar } = useModalHook();
    const { activeEvent, startSavingEvent } = useRadiosStore();

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

        if (formValues.serie.length <= 0) return;
        console.log(formValues);
        //TODO:
        await startSavingEvent(formValues);
        CloseModal();
        setFormSubmitted(false);
    };

    return (
        <>
            <ModalRadio >
                <Typography variant='h5'> Nueva Radio </Typography>
                <form onSubmit={onSubmit}>
                <Stack  noValidate spacing={3}>
                    <Grid container alignItems="center" justify="center" direction="column" >
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="fk_tipoequipo-input" color='info'>Tipo Equipo</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                    labelId="demo-simple-select-label"
                                    id="fk_tipoequipo-input"
                                    name="fk_tipoequipo"
                                    color='info'
                                    value={formValues.fk_tipoequipo}
                                    label="Tipo Equipo"
                                    onChange={handleInputChange}>
                                    <MenuItem value={1}>Activo</MenuItem>
                                    <MenuItem value={2}>Inactivo</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="serie-input"
                                sx={{ border: 'none', mb: 1, width: 300}}
                                type="text"
                                name="serie"
                                color='info'
                                label="serie"
                                variant="outlined"
                                value={formValues.serie}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="logico-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                type="text"
                                name="logico"
                                color='info'
                                label="logico"
                                variant="outlined"
                                value={formValues.logico}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="inventario_interno-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                type="text"
                                name="inventario_interno"
                                color='info'
                                label="inventario_interno"
                                variant="outlined"
                                value={formValues.inventario_interno}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="inventario_segpub-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                type="text"
                                name="inventario_segpub"
                                color='info'
                                label="inventario_segpub"
                                variant="outlined"
                                value={formValues.inventario_segpub}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="fk_propietario-input" color='info'>Propietario</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                    labelId="demo-simple-select-label"
                                    id="fk_propietario-input"
                                    name="fk_propietario"
                                    color='info'
                                    value={formValues.fk_propietario}
                                    onChange={handleInputChange}>
                                    <MenuItem value={1}>Activo</MenuItem>
                                    <MenuItem value={2}>Inactivo</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="fk_recurso_compra-input" color='info'>Recurso Compra</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                    labelId="demo-simple-select-label"
                                    id="fk_recurso_compra-input"
                                    name="fk_recurso_compra"
                                    color='info'
                                    value={formValues.fk_recurso_compra}
                                    label="Tipo Equipo"
                                    onChange={handleInputChange}>
                                    <MenuItem value={1}>Activo</MenuItem>
                                    <MenuItem value={2}>Inactivo</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="contrato_compra-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                type="text"
                                name="contrato_compra"
                                color='info'
                                label="contrato_compra"
                                variant="outlined"
                                value={formValues.contrato_compra}
                                onChange={handleInputChange} />
                        </Grid><Grid item xs={6}>
                            <TextField
                                id="rfsi-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                type="text"
                                name="rfsi"
                                color='info'
                                label="rfsi"
                                variant="outlined"
                                value={formValues.rfsi}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="fk_tiporadio-input" color='info'>Tipo Radio</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                    labelId="demo-simple-select-label"
                                    id="fk_tiporadio-input"
                                    name="fk_tiporadio"
                                    color='info'
                                    value={formValues.fk_tiporadio}
                                    onChange={handleInputChange}>
                                    <MenuItem value={1}>Activo</MenuItem>
                                    <MenuItem value={2}>Inactivo</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="fk_marca-input" color='info'>Marca</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                    labelId="demo-simple-select-label"
                                    id="fk_marca-input"
                                    name="fk_marca"
                                    color='info'
                                    value={formValues.fk_marca}
                                    onChange={handleInputChange}>
                                    <MenuItem value={1}>Activo</MenuItem>
                                    <MenuItem value={2}>Inactivo</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="fecha_actualizacion-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                name='fecha_actualizacion'
                                color='info'
                                label="Fecha Actualizacion"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formValues.fecha_actualizacion}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="fecha_asignacion-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                type="date"
                                name="fecha_asignacion"
                                color='info'
                                label="fecha_asignacion"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formValues.fecha_asignacion}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="observaciones-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                type="text"
                                name="observaciones"
                                color='info'
                                label="observaciones"
                                variant="outlined"
                                value={formValues.observaciones}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="fecha_recepcion-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                name="fecha_recepcion"
                                color='info'
                                label="fecha_recepcion"
                                variant="outlined"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formValues.fecha_recepcion}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="fk_sue-input" color='info'>SUE</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                    labelId="demo-simple-select-label"
                                    id="fk_sue-input"
                                    name="fk_sue"
                                    color='info'
                                    value={formValues.fk_sue}
                                    onChange={handleInputChange}>
                                    <MenuItem value={1}>Activo</MenuItem>
                                    <MenuItem value={2}>Inactivo</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
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
                        </Grid>
                        <Button variant="contained"   color="info" type="submit" >
                            {isActualizar ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </Grid>
                    </Stack>
                </form>
            </ModalRadio>
        </>
    )
}