import { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { ModalRadio } from '../ModalRadio';
import { useConfigReportesStore } from '../../../hooks/hooksAdministracion/useConfigReportesStore';
import { useModalHook } from '../../../hooks/useModalHook';
import axios from 'axios';


export const FormConfigReportes = (width) => {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [usuariosRevisores, setUsuariosRevisores] = useState([]);
    const [usuariosResponsables, setUsuariosResponsables] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');

    const selectUsuariosRevisores = async() => {
        await axios.get(`http://localhost:8000/api/v0/usuarios/revisores/${1}`).
        then((response)=>{
            setUsuariosRevisores(response.data);
            // console.log(response.data);
        }).catch(error=>{
            console.log(error);
        });
    }

    const selectUsuariosResposables = async() => {
        await axios.get(`http://localhost:8000/api/v0/responsables/`).
        then((response)=>{
            setUsuariosResponsables(response.data);
            // console.log(response.data);
        }).catch(error=>{
            console.log(error);
        });
    }
    useEffect(() => {
        selectUsuariosRevisores();
        selectUsuariosResposables();
    }, [])

    const [formValues, setFormValues] = useState({
        encabezado_carta:'',
        articulo1:'',
        articulo2:'',
        articulo3:'',
        articulo4:'',
        articulo5:'',
        articulo6:'',
        articulo7:'',
        logoc4:'',
        logo_ssypc:'',
        fk_revisor:'',
        fk_responsable_entrega: '',
        ccp_carta:'',
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
    console.log(formValues)
    

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
                <Typography variant='h5'> { isActualizar ? 'Actualizar configuración Cartas de Asignación' : 'Nueva configuración Cartas de Asignación' } </Typography>
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
                                    label="Encabezado de carta"
                                    variant="outlined"
                                    value={formValues.encabezado_carta}
                                    onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={isVer}
                                    id="articulo1-input"
                                    sx={{ border: 'none', mb: 1, mt: 2, width: 300, pl:1, pr:1 }}
                                    type="text"
                                    name="articulo1"
                                    color={"info"}
                                    label="Artículo parte 1"
                                    variant="outlined"
                                    value={formValues.articulo1}
                                    onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={isVer}
                                    id="articulo2-input"
                                    sx={{ border: 'none', mb: 1, mt: 2, width: 300, pl:1, pr:1 }}
                                    type="text"
                                    name="articulo2"
                                    color={"info"}
                                    label="Artículo parte 2"
                                    variant="outlined"
                                    value={formValues.articulo2}
                                    onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={isVer}
                                    id="articulo3-input"
                                    sx={{ border: 'none', mb: 1, mt: 2, width: 300, pl:1, pr:1 }}
                                    type="text"
                                    name="articulo3"
                                    color={"info"}
                                    label="Artículo parte 3"
                                    variant="outlined"
                                    value={formValues.articulo3}
                                    onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={isVer}
                                    id="articulo4-input"
                                    sx={{ border: 'none', mb: 1, mt: 2, width: 300, pl:1, pr:1 }}
                                    type="text"
                                    name="articulo4"
                                    color={"info"}
                                    label="Artículo parte 4"
                                    variant="outlined"
                                    value={formValues.articulo4}
                                    onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={isVer}
                                    id="articulo5-input"
                                    sx={{ border: 'none', mb: 1, mt: 2, width: 300, pl:1, pr:1 }}
                                    type="text"
                                    name="articulo5"
                                    color={"info"}
                                    label="Artículo parte 5"
                                    variant="outlined"
                                    value={formValues.articulo5}
                                    onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={isVer}
                                    id="articulo6-input"
                                    sx={{ border: 'none', mb: 1, mt: 2, width: 300, pl:1, pr:1 }}
                                    type="text"
                                    name="articulo6"
                                    color={"info"}
                                    label="Artículo parte 6"
                                    variant="outlined"
                                    value={formValues.articulo6}
                                    onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={isVer}
                                    id="articulo7-input"
                                    sx={{ border: 'none', mb: 1, mt: 2, width: 300, pl:1, pr:1 }}
                                    type="text"
                                    name="articulo7"
                                    color={"info"}
                                    label="Artículo parte 7"
                                    variant="outlined"
                                    value={formValues.articulo7}
                                    onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                { isVer
                                    ? (
                                        <TextField
                                            disabled
                                            id="logoc4-input"
                                            sx={{ border: 'none', ml: 1, mb: 1, mr: 1, mt: 2, width: 284}}
                                            type="text"
                                            name="logoc4"
                                            color={"info"}
                                            label="Logo C4"
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={handleInputChange} 
                                            value={formValues.logoc4}
                                        />
                                    ) : ( 
                                        <Box sx={{ border: '1px solid', width: 280, borderRadius: 2, borderColor: 'rgb(192, 192, 192)', ml: 1, mb: 1, mt: 2, pl:1 }}>
                                            <TextField
                                                id="logoc4-input"
                                                type="file"
                                                name="logoc4"
                                                color={"info"}
                                                label="Logo C4"
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
                                                id='logoc4a-input'
                                                type="text"
                                                variant='standard'
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    disableUnderline: true,
                                                }}
                                                value={formValues.logoc4}
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
                                            id="logo_ssypc-input"
                                            sx={{ border: 'none', ml: 1, mb: 1, mr: 1, mt: 2, width: 284}}
                                            type="text"
                                            name="logo_ssypc"
                                            color={"info"}
                                            label="Logo SSYPC"
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={handleInputChange} 
                                            value={ formValues.logo_ssypc }
                                        />
                                    ):(
                                        <Box sx={{ border: '1px solid', width: 280, borderRadius: 2, borderColor: 'rgb(192, 192, 192)', ml: 1, mb: 1, mt: 2, pl:1 }}>
                                            <TextField
                                                id="logo_ssypc-input"
                                                type="file"
                                                name="logo_ssypc"
                                                color={"info"}
                                                label="Logo SSYPC"
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
                                                id='logo_ssypca-input'
                                                type="text"
                                                variant='standard'
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    disableUnderline: true,
                                                }}
                                                value={formValues.logo_ssypc}
                                            />
                                        </Box>
                                    )
                                }
                            </Grid>
                            
                        {/* </Grid>
                        <Grid container alignItems="flex-end" justify="center" > */}
                             { isActualizar ? (
                                <Grid item xs={6}>
                                    <Autocomplete
                                        sx={{ border: 'none', mb: 1, mt: 2, width: 300, pl:1, pr:1 }}
                                        id="fk_revisor-input"
                                        name="fk_revisor"
                                        value={formValues}
                                        onChange={(event, newFormValues) => {
                                            setFormValues({
                                                ...formValues,
                                                ['fk_revisor']: newFormValues.idusuarios,
                                                ['nombre']: newFormValues.nombre,
                                                ['apellido_pat']: newFormValues.apellido_pat,
                                                ['apellido_mat']: newFormValues.apellido_mat,
                                            });
                                            console.log(newFormValues)
                                        }}
                                        inputValue={inputValue}
                                        onInputChange={(event, newInputValue) => {
                                            setInputValue(newInputValue);
                                        }}
                                        options={usuariosRevisores}

                                        getOptionLabel={(options) => options.nombre_completo || ""}
                                        //isOptionEqualToValue={(option, value) =>
                                    //    option.nombre === value.nombre
                                    //}
                                        renderInput={(params) => <TextField  {...params} variant="outlined" label="Revisor" /> }
                                        
                                    />
                                </Grid> 
                            ) : (
                                <Grid item xs={6}>
                                    <Autocomplete
                                        sx={{ border: 'none', mb: 1, mt: 2, width: 300, pl:1, pr:1 }}
                                        id="fk_revisor-input"
                                        name="fk_revisor"
                                        onChange={(event, newFormValues) => {
                                            setFormValues({
                                                ...formValues,
                                                ['fk_revisor']: newFormValues.idusuarios,
                                            }); console.log(newFormValues)
                                        }}
                                        options={usuariosRevisores}
                                        getOptionLabel={(options) => options.nombre +" "+ options.apellido_pat +" "+ options.apellido_mat || ""}
                                        renderInput={(params) => <TextField  {...params} variant="outlined" label="Revisor" />}
                                    />
                                </Grid>
                            ) }  
                             { isActualizar ? (
                                <Grid item xs={6}>
                                    <Autocomplete
                                        sx={{ border: 'none', mb: 1, mt: 2, width: 300, pl:1, pr:1 }}
                                        id="fk_responsable_entrega-input"
                                        name="fk_responsable_entrega"
                                        value={formValues}
                                        onChange={(event, newFormValues2) => {
                                            console.log( newFormValues2)
                                            setFormValues({
                                                ...formValues,
                                                ['fk_responsable_entrega']: newFormValues2.idResponsable,
                                                ['nombreResponsable']: newFormValues2.nombreResponsable,
                                                ['apellido_patResponsable']: newFormValues2.apellido_patResponsable,
                                                ['apellido_matResponsable']: newFormValues2.apellido_matResponsable,
                                            }); console.log(usuariosResponsables)
                                        }}
                                        options={usuariosResponsables}
                                        inputValue={inputValue2}
                                        onInputChange={(event, newInputValue2) => {
                                            setInputValue2(newInputValue2);
                                        }}
                                        getOptionLabel={(options) => options.nombre_completoResponsable || ""}
                                        //isOptionEqualToValue={(option, value) =>
                                    //    option.nombre === value.nombre
                                    //}
                                        renderInput={(params) => <TextField  {...params} variant="outlined" label="Responsable de Entrega" />}
                                    />
                                </Grid> 
                            ) : (
                                <Grid item xs={6}>
                                    <Autocomplete
                                        sx={{ border: 'none', mb: 1, mt: 2, width: 300, pl:1, pr:1 }}
                                        id="fk_responsable_entrega-input"
                                        name="fk_responsable_entrega"
                                        onChange={(event, newFormValues2) => {
                                            setFormValues({
                                                ...formValues,
                                                ['fk_responsable_entrega']: newFormValues2.idResponsable,
                                            }); console.log(newFormValues2)
                                        }}
                                        options={usuariosResponsables}
                                        getOptionLabel={(options) => options.nombreResponsable +" "+ options.apellido_patResponsable +" "+ options.apellido_matResponsable || ""}
                                        renderInput={(params) => <TextField  {...params} variant="outlined" label="Responsable de Entrega" />}
                                    />
                                </Grid>
                            ) }  
                            <Grid item xs={6}>
                                <TextField
                                    disabled={isVer}
                                    size='normal'
                                    id="ccp_carta-input"
                                    sx={{ border: 'none', mb: 1, mt: 2, width: 300, pl:1, pr:1 }}
                                    type="text"
                                    name="ccp_carta"
                                    color={"info"}
                                    label="Ccp de Carta"
                                    variant="outlined"
                                    value={formValues.ccp_carta}
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
