import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useConfigReportesStore } from '../../../hooks/hooksAdministracion/useConfigReportesStore';
import { useModalHook } from '../../../hooks/useModalHook';


export const FormConfigReportes = (width) => {

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
        fecha_creacion:'',
        fecha_inicial:'',
        fecha_final:'',
        estatus:'',
        createdAt: '',
        updatedAt: '',
    });

    const { CloseModal, isActualizar, mostrarGuardar, isVer } = useModalHook();
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

    const btn =()=>{
        mostrarGuardar()
    }

    const cerrar = () => {
        CloseModal();
      }


    

    return (
        <>
            <ModalRadio width={width} >
                <Typography variant='h5'> { isActualizar ? 'Actualizar configuración Hoja de Servicios y Cartas de Asignación' : 'Nueva configuración Hoja de Servicios y Cartas de Asignación' } </Typography>
                <form onSubmit={onSubmit} >
                    {/* <Stack  noValidate spacing={3}> */}
                        <Grid container  justify="center"  overflow={ 'scroll'} maxHeight={600}  >
                            <Grid item xs={6}>
                                <TextField
                                    disabled={isVer}
                                    id="encabezado_carta-input"
                                    sx={{ border: 'none', mb: 1, mt: 2, width: 300, pl:1, pr:1 }}
                                    type="text"
                                    name="encabezado_carta"
                                    color={"info"}
                                    label="Encabezado de carta 1ra parte"
                                    variant="outlined"
                                    value={formValues.encabezado_carta}
                                    onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={isVer}
                                    id="encabezado2-input"
                                    sx={{ border: 'none', mb: 1, mt: 2, width: 300, pl:1, pr:1 }}
                                    type="text"
                                    name="encabezado2"
                                    color={"info"}
                                    label="Encabezado de carta 2da parte"
                                    variant="outlined"
                                    value={formValues.encabezado2}
                                    onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={isVer}
                                    id="encabezado_hservicio-input"
                                    sx={{ border: 'none', mb: 1, mt: 2, width: 300, pl:1, pr:1 }}
                                    type="text"
                                    name="encabezado_hservicio"
                                    color={"info"}
                                    label="Encabezado de hoja de servicio"
                                    variant="outlined"
                                    value={formValues.encabezado_hservicio}
                                    onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                { isVer
                                    ? (
                                        <TextField
                                            disabled
                                            id="logo1-input"
                                            sx={{ border: 'none', ml: 1, mb: 1, mr: 1, mt: 2, width: 284}}
                                            type="text"
                                            name="logo1"
                                            color={"info"}
                                            label="Logo 1"
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={handleInputChange} 
                                            value={formValues.logo1}
                                        />
                                    ) : ( 
                                        <Box sx={{ border: '1px solid', width: 280, borderRadius: 2, borderColor: 'rgb(192, 192, 192)', ml: 1, mb: 1, mt: 2, pl:1 }}>
                                            <TextField
                                                id="logo1-input"
                                                type="file"
                                                name="logo1"
                                                color={"info"}
                                                label="Logo 1"
                                                variant="standard"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    disableUnderline: true,
                                                }}
                                                onChange={handleInputChange} 
                                            /> 
                                            <TextField 
                                                disabled
                                                id='logo1a-input'
                                                type="text"
                                                variant='standard'
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    disableUnderline: true,
                                                }}
                                                value={formValues.logo1}
                                            />
                                        </Box>
                                    )
                                }
                            </Grid>
                            <Grid item xs={6}>
                                { isVer
                                    ? (
                                        <TextField
                                            disabled
                                            id="logo2-input"
                                            sx={{ border: 'none', ml: 1, mb: 1, mr: 1, mt: 2, width: 284}}
                                            type="text"
                                            name="logo2"
                                            color={"info"}
                                            label="Logo 2"
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={handleInputChange} 
                                            value={ formValues.logo2 }
                                        />
                                    ):(
                                        <Box sx={{ border: '1px solid', width: 280, borderRadius: 2, borderColor: 'rgb(192, 192, 192)', ml: 1, mb: 1, mt: 2, pl:1 }}>
                                            <TextField
                                                id="logo2-input"
                                                type="file"
                                                name="logo2"
                                                color={"info"}
                                                label="Logo 2"
                                                variant="standard"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    disableUnderline: true,
                                                }}
                                                onChange={handleInputChange} 
                                            />
                                            <TextField 
                                                disabled
                                                id='logo2a-input'
                                                type="text"
                                                variant='standard'
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    disableUnderline: true,
                                                }}
                                                value={formValues.logo2}
                                            />
                                        </Box>
                                    )
                                }
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={isVer}
                                    multiline
                                    maxRows={5}
                                    minRows={5}
                                    id="articulo1-input"
                                    sx={{ 
                                        border: 'none', 
                                        mb: 1, 
                                        mt: 2, 
                                        width: 300,
                                        pl:1, pr:1
                                    }}
                                    type="text"
                                    name="articulo1"
                                    color={"info"}
                                    label="Artículo 1"
                                    variant="outlined"
                                    value={formValues.articulo1}
                                    onChange={handleInputChange} />
                            </Grid>
                        {/* </Grid>
                        <Grid container alignItems="flex-end" justify="center" > */}
                            <Grid item xs={6}>
                                <TextField
                                    disabled={isVer}
                                    multiline
                                    maxRows={5}
                                    minRows={5}
                                    id="articulo2-input"
                                    sx={{ 
                                        border: 'none', 
                                        mb: 1, 
                                        mt: 2, 
                                        width: 300,
                                        pl:1, pr:1
                                    }}
                                    type="text"
                                    name="articulo2"
                                    color={"info"}
                                    label="Artículo 2"
                                    variant="outlined"
                                    value={formValues.articulo2}
                                    onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={isVer}
                                    multiline
                                    maxRows={5}
                                    minRows={5}
                                    id="articulo3-input"
                                    sx={{ 
                                        border: 'none', 
                                        mb: 1, 
                                        mt: 2, 
                                        width: 300,
                                        pl:1, pr:1
                                    }}
                                    type="text"
                                    name="articulo3"
                                    color={"info"}
                                    label="Artículo 3"
                                    variant="outlined"
                                    value={formValues.articulo3}
                                    onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={isVer}
                                    size='normal'
                                    id="revisor-input"
                                    sx={{ border: 'none', mb: 1, mt: 2, width: 300, pl:1, pr:1 }}
                                    type="text"
                                    name="revisor"
                                    color={"info"}
                                    label="Revisor"
                                    variant="outlined"
                                    value={formValues.revisor}
                                    onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={isVer}
                                    size='normal'
                                    id="responsable_entrega-input"
                                    sx={{ border: 'none', mb: 1, mt: 2, width: 300, pl:1, pr:1 }}
                                    type="text"
                                    name="responsable_entrega"
                                    color={"info"}
                                    label="Responsable Entrega"
                                    variant="outlined"
                                    value={formValues.responsable_entrega}
                                    onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={isVer}
                                    size='normal'
                                    id="pie_carta-input"
                                    sx={{ border: 'none', mb: 1, mt: 2, width: 300, pl:1, pr:1 }}
                                    type="text"
                                    name="pie_carta"
                                    color={"info"}
                                    label="Pie de Carta"
                                    variant="outlined"
                                    value={formValues.pie_carta}
                                    onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={isVer}
                                    size='normal'
                                    id="pie_hservicio-input"
                                    sx={{ border: 'none', mb: 1, mt: 2, width: 300, pl:1, pr:1 }}
                                    type="text"
                                    name="pie_hservicio"
                                    color={"info"}
                                    label="Pie Hoja de Servicio"
                                    variant="outlined"
                                    value={formValues.pie_hservicio}
                                    onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={isVer}
                                    size='normal'
                                    id="fecha_creacion-input"
                                    sx={{ border: 'none', mb: 1, mt: 2, width: 300, pl:1, pr:1 }}
                                    type="date"
                                    name="fecha_creacion"
                                    color={"info"}
                                    label="Fecha de Creación"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={formValues.fecha_creacion}
                                    onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={isVer}
                                    size='normal'
                                    id="fecha_inicial-input"
                                    sx={{ border: 'none', mb: 1, mt: 2, width: 300, pl:1, pr:1 }}
                                    type="date"
                                    name="fecha_inicial"
                                    color={"info"}
                                    label="Fecha de Inicio"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={formValues.fecha_inicial}
                                    onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={isVer}
                                    size='normal'
                                    id="fecha_final-input"
                                    sx={{ border: 'none', mb: 1, mt: 2, width: 300, pl:1, pr:1 }}
                                    type="date"
                                    name="fecha_final"
                                    color={"info"}
                                    label="Fecha de Fin"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={formValues.fecha_final}
                                    onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="estatus-input" color={"info"}>Estatus</InputLabel>
                                    <Select
                                        disabled={isVer}
                                        sx={{ border: 'none', mb: 1, mt:2, width: 300, pl:1, pr:1 }}
                                        labelId="demo-simple-select-label2"
                                        id="estatus-input"
                                        name="estatus"
                                        color={"info"}
                                        value={formValues.estatus}
                                        label="Estatus"
                                        onChange={handleInputChange}>
                                        <MenuItem value={true}>Activo</MenuItem>
                                        <MenuItem value={false}>Inactivo</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent={'center'} >
                        {/* { !isVer ? (
                            <Button variant="contained" color="info" type="submit" onClick={ btn } sx={{ width: 628, pl:1, pr:1}}>
                                {isActualizar ? 'Actualizar' : 'Guardar'}
                            </Button> ) : <Close onClick={ cerrar} />
                        } */}
                        <Button variant="contained" color="info" type="submit" onClick={ btn } sx={{ width: 628, pl:1, pr:1}}>
                                { !isVer ? (isActualizar ? 'Actualizar' : 'Guardar') : 'Cerrar' }
                            </Button> 
                        </Grid>
                    {/* </Stack> */}
                </form>
            </ModalRadio>
        </>
    )
}
