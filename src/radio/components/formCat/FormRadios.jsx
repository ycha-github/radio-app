import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useRadiosStore } from '../../../hooks/hooksCatalogo/useRadiosStore';
import { useModalHook } from '../../../hooks/useModalHook';
import axios from 'axios';


export const FormRadios = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);
   
    const [formValues, setFormValues] = useState({
        serie: '',
        logico: '',
        inventario_interno: '',
        inventario_segpub: '',
        fk_propietario: '',
        fk_recurso_compra: '',
        contrato_compra: '',
        rfsi: '',
        fk_marca: '',
        nombreMarcas: '',
        fecha_actualizacion: '',
        fecha_asignacion: '',
        observaciones: '',
        fecha_recepcion: '',
        fk_sue: '',
        estatus: '',
        createdAt: '',
        updatedAt: '',
        tipo:'',
    });

    const [selectTequipo, setSelectTequipo] = useState([]);
    const [selectPropie, setSelectPropie] = useState([]);
    const [selectRecurso, setSelectRecurso] = useState([]);
    const [selectTradio, setSelectTradio] = useState([]);
    const [selectMarca, setSelectMarca] = useState([]);
    const [selectSue, setSelectSue] = useState([]);

    const { CloseModal, isActualizar,mostrarGuardar } = useModalHook();
    const { activeEvent, startSavingEvent } = useRadiosStore();

useEffect(() => {
    axios.get('http://localhost:8000/api/v0/tipos').
    then((response)=>{
      setSelectTequipo(response.data);
      console.log(response.data)
    });
    axios.get('http://localhost:8000/api/v0/corporaciones').
    then((response)=>{
      setSelectPropie(response.data);
    });
    axios.get('http://localhost:8000/api/v0/recursoscompras').
    then((response)=>{
      setSelectRecurso(response.data);
    });
    axios.get('http://localhost:8000/api/v0/tipos').
    then((response)=>{
      setSelectTradio(response.data);
    });
    axios.get('http://localhost:8000/api/v0/marcas').
    then((response)=>{
      setSelectMarca(response.data);
    });
    axios.get('http://localhost:8000/api/v0/sue').
    then((response)=>{
      setSelectSue(response.data);
    });

}, [])

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

    const btn =()=>{
        mostrarGuardar()
    }

    return (
        <>
            <ModalRadio >
                <Typography variant='h5'>  {isActualizar? 'Actualizando Radio' : 'Nuevo Radio'} </Typography>
                <form onSubmit={onSubmit}>
                <Stack  noValidate spacing={3}>
                    <Grid container alignItems="center" justify="center" direction="column" >
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                            <TextField
                                id="tipo-input"
                                sx={{ border: 'none', mb: 1, width: 300}}
                                type="text"
                                name="tipo"
                                color='warning'
                                label="tipo"
                                variant="outlined"
                                value={formValues.tipo}
                                onChange={handleInputChange} />
                        
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="serie-input"
                                sx={{ border: 'none', mb: 1, width: 300}}
                                type="text"
                                name="serie"
                                color='warning'
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
                                color='warning'
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
                                color='warning'
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
                                color='warning'
                                label="inventario_segpub"
                                variant="outlined"
                                value={formValues.inventario_segpub}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="fk_propietario-input" color='warning'>Propietario</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                    labelId="demo-simple-select-label"
                                    id="fk_propietario-input"
                                    name="fk_propietario"
                                    color='warning'
                                    label="Propietario"
                                    value={formValues.fk_propietario}
                                    onChange={handleInputChange}>
                                    {
                                        selectPropie.map(elemento=>{
                                          return <MenuItem key={elemento.idcorporaciones} value={elemento.idcorporaciones} >{elemento.nombreCorporacion}</MenuItem> 
                                        })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="fk_recurso_compra-input" color='warning'>Recurso Compra</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                    labelId="demo-simple-select-label"
                                    id="fk_recurso_compra-input"
                                    name="fk_recurso_compra"
                                    color='warning'
                                    value={formValues.fk_recurso_compra}
                                    label="Recurso Compra"
                                    onChange={handleInputChange}>
                                    {
                                        selectRecurso.map(elemento=>{
                                          return <MenuItem key={elemento.idrecursoCompras} value={elemento.idrecursoCompras} >{elemento.nombreRecursoCompra}</MenuItem> 
                                        })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="contrato_compra-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                type="text"
                                name="contrato_compra"
                                color='warning'
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
                                color='warning'
                                label="rfsi"
                                variant="outlined"
                                value={formValues.rfsi}
                                onChange={handleInputChange} />
                        </Grid>
                        {/* <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="fk_tiporadio-input" color='warning'>Tipo Radio</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                    labelId="demo-simple-select-label"
                                    id="fk_tiporadio-input"
                                    name="fk_tiporadio"
                                    color='warning'
                                    label='Tipo Radio'
                                    value={formValues.fk_tiporadio}
                                    onChange={handleInputChange}>
                                   <MenuItem value={1}>Activo</MenuItem>
                                    <MenuItem value={2}>Inactivo</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid> */}
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="fk_marca-input" color='warning'>Marca</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                    labelId="demo-simple-select-label"
                                    id="fk_marca-input"
                                    name="fk_marca"
                                    color='warning'
                                    label='Marca'
                                    value={formValues.fk_marca}
                                    onChange={handleInputChange}>
                                  {
                                        selectMarca.map(elemento=>{
                                          return <MenuItem key={elemento.idmarcas} value={elemento.idmarcas} >{elemento.nombreMarcas}</MenuItem> 
                                        })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="fecha_actualizacion-input"
                                sx={{ border: 'none', mb: 1, width: 300 }}
                                name='fecha_actualizacion'
                                color='warning'
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
                                color='warning'
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
                                color='warning'
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
                                color='warning'
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
                                <InputLabel id="fk_sue-input" color='warning'>SUE</InputLabel>
                                <Select
                                    sx={{ border: 'none', mb: 1, width: 300 }}
                                    labelId="demo-simple-select-label"
                                    id="fk_sue-input"
                                    name="fk_sue"
                                    color='warning'
                                    label="SUE"
                                    value={formValues.fk_sue}
                                    onChange={handleInputChange}>
                                   {
                                        selectSue.map(elementos=>{
                                          return <MenuItem key={elementos.id_sue} value={elementos.id_sue} >{elementos.nombreStatus}</MenuItem> 
                                        })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
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
                        </Grid>
                        <Button variant="contained"   color="warning" type="submit"  onClick={btn} sx={{  width: 628 }} >
                            {isActualizar ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </Grid>
                    </Stack>
                </form>
            </ModalRadio>
        </>
    )
}