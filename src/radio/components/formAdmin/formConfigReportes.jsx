import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useConfigReportesStore } from '../../../hooks/hooksAdministracion/useConfigReportesStore';
import { useModalHook } from '../../../hooks/useModalHook';

export const FormConfigReportes = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        encabezado_carta:'',
        encabezado2:'',
        encabezado_hservicio:'',
        logo1:'',
        logo2:'',
        articulo1:'',
        articulo2:'',
        articulo3:'',
        revisor:'',
        responsable_entrega:'',
        pie_carta:'',
        pie_hservicio:'',
        fecha_inicial:'',
        fecha_final:'',
        fecha_creacion:'',
        estatus:'',
    });

    const { CloseModal, isActualizar, mostrarGuardar } = useModalHook();
    const { activeEvent, startSavingEvent } = useConfigReportesStore();

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

        if (formValues.encabezado_carta.length <= 0) return;
        console.log(formValues);
        //TODO:
        await startSavingEvent(formValues);
        CloseModal();
        setFormSubmitted(false);
    };

    return (
        <>
            <ModalRadio >
                <Typography variant='h5'> Nueva configuración Hoja de Servicios y Cartas de Asignación </Typography>
                <form onSubmit={onSubmit}>
                    <Grid container alignItems="center" justify="center" direction="column">
                        <Grid item>
                            <TextField
                                id="encabezado_carta-input"
                                sx={{ border: 'none', mb: 1, mt: 2, width: 300 }}
                                type="text"
                                name="encabezado_carta"
                                color='warning'
                                label="Encabezado de carta 1ra parte"
                                variant="outlined"
                                value={formValues.encabezado_carta}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="encabezado2-input"
                                sx={{ border: 'none', mb: 1, mt: 2, width: 300 }}
                                type="text"
                                name="encabezado2"
                                color='warning'
                                label="Encabezado de carta 2da parte"
                                variant="outlined"
                                value={formValues.encabezado2}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="encabezado_hservicio-input"
                                sx={{ border: 'none', mb: 1, mt: 2, width: 300 }}
                                type="text"
                                name="encabezado_hservicio"
                                color='warning'
                                label="Encabezado de hoja de servicio"
                                variant="outlined"
                                value={formValues.encabezado_hservicio}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="logo1-input"
                                sx={{ border: 'none', mb: 1, mt: 2, width: 300 }}
                                type="text"
                                name="logo1"
                                color='warning'
                                label="Logo 1"
                                variant="outlined"
                                value={formValues.logo1}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="logo2-input"
                                sx={{ border: 'none', mb: 1, mt: 2, width: 300 }}
                                type="text"
                                name="logo2"
                                color='warning'
                                label="Logo 2"
                                variant="outlined"
                                value={formValues.logo2}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="logo3-input"
                                sx={{ border: 'none', mb: 1, mt: 2, width: 300 }}
                                type="text"
                                name="logo3"
                                color='warning'
                                label="Logo 3"
                                variant="outlined"
                                value={formValues.logo3}
                                onChange={handleInputChange} />
                        </Grid>
                        {/* <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="fk_encargado_revision-input" color='warning'>Recurso Compra</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                    labelId="demo-simple-select-label"
                                    id="fk_encargado_revision-input"
                                    name="fk_encargado_revision"
                                    color='warning'
                                    value={formValues.fk_encargado_revision}
                                    label="Encargado de revisión"
                                    onChange={handleInputChange}>
                                    {
                                        selectRevisor.map(elemento=>{
                                          return <MenuItem key={elemento.idrecursoCompras} value={elemento.idrecursoCompras} >{elemento.nombreRecursoCompra}</MenuItem> 
                                        })}
                                </Select>
                            </FormControl>
                        </Grid> */}
                        <Grid item>
                            <FormControl fullWidth>
                                <InputLabel id="estatus-input" color='warning'>Estatus</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                    labelId="demo-simple-select-label2"
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
                        <Button variant="contained" color="warning" type="submit" onClick={ () => mostrarGuardar() } >
                            {isActualizar ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </Grid>
                </form>
            </ModalRadio>
        </>
    )
}
