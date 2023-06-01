import { Autocomplete, Box, Button, Checkbox, FormControlLabel, Grid, Select, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useHojaServicioStore } from '../../../hooks/hooksUtilidades/useHojaServicioStore';
import { useModalHook } from '../../../hooks/useModalHook';
import axios from 'axios';

let hoy = new Date();
let options = { day: 'numeric', month: 'long', year: 'numeric' }
let fechaActual = hoy.toLocaleString('es-MX', options);
// let fechaActual = hoy.getDate() + ' de ' + (hoy.getMonth()+1) + ' de ' + hoy.getFullYear();

export const FormHojaServicio = (customStyles) => {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const { CloseModal, isActualizar, mostrarGuardar, isVer } = useModalHook();
    const { activeEvent, startSavingEvent } = useHojaServicioStore();

    const [usuarios, setUsuarios] = useState([0]);
    const [idUsuario, setIdUsuario] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [inputValue2, setInputValue2] = useState('');
    const [ rfsiBuscar, setRfsiBuscar ] = useState([]);
    
    const [ usuarioBuscar, setUsuarioBuscar ] = useState("");

    // let fechaService = fecha_servicio.toLocaleString('es-MX', options);
    const [formValues, setFormValues] = useState({
        // fechaService: `fecha_servicio.toLocaleString('es-MX', options)`,
        fecha_servicio: '',
        fk_idasignacion_ur: '',
        usuarios_idusuarios: "",
        nombre_completo: '',
        rfsi: '',
        tipo: '',
        // fk_corporacion: '1',
        // fk_idservicios:'1',
        // fk_idradios:'1',
        // fk_accesorios:'1',
        // descripcion:'',
        // entrego_equipo:'',
        // fecha_entrega:'',
        // fk_supervisortec:'1',
        // usuario_servicio:'',
        // usuario_entrega:'',
        // fk_tecnico_entrega:'1',
        // estatus:'',
        // createdAt: '',
        // updatedAt: '',
    });
    const [asignaciones, setAsignaciones] = useState({
        unidad: "",
        nombre: "",
        nombreZonasRegiones: "",
        nombreCorporacion: "",
        //rfsi: "",

    });

    const [ radioRfsi, setRadioRfsi ] = useState({
        tipo:"",
        serie:"",
        inventario_interno:"",
    });

    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({ ...activeEvent });
        }
    }, [activeEvent])


    const selectUsuarios = async () => {
        await axios.get(`http://localhost:8000/api/v0/usuarios/`).
            then((response) => {
                setUsuarios(response.data);
                //console.log(response.data);
            }).catch(error => {
                console.log(error);
            });
    }
    //console.log(formValues)
    const selectAsignacionesPorUsuario = (nombre) => {
        axios.get(`http://localhost:8000/api/v0/asig_usuarios/usuarios/${nombre}`).
            then((response) => {
                setAsignaciones({ ...response.data[0] });
                setRfsiBuscar(response.data)
                //console.log(response.data)
            }).catch(error => {
                console.log(error);
            });
    }
    const selectAsignacionesPorRfsi = (rfsi, usuarioBuscar) => {
        axios.get(`http://localhost:8000/api/v0/asig_usuarios/radio/${rfsi}/${usuarioBuscar}`).
            then((response) => {
                setRadioRfsi({...response.data[0]})
                //console.log(response.data)
            }).catch(error => {
                console.log(error);
            });
    }

    console.log(formValues);
    console.log(radioRfsi);

    useEffect(() => {
        selectUsuarios();

    }, [])
    // useEffect(() => {

    //      selectAsignacionesPorUsuario(inputValue);
    // }, [])

    // const buscarPorUsername = async () => {
    //     await axios.get(`http://localhost:8000/api/v0/asig_usuarios/${rfsiBuscar}`).then((response) => {
    //         return setUsers(response.data);
    //     });
    // };


    //let c="";
    //console.log(idUsuario)
    //console.log(asignaciones);
    //const mostrarUsuario=()=>{
    //    setIdUsuario(formValues.usuarios_idusuarios)
    //};



    // const handleInputChange = ({ target }) => {
    //     setFormValues({
    //         ...formValues,
    //         [target.name]: target.value,
    //     });
    // };

    // const handleChangeAutocomplete = (event, value, name) => {
    //     console.log(value.idusuarios);
    //     setFormValues((prevState) => ({
    //       ...prevState,
    //       [name]: value.idusuarios
    //     }));
    //     // console.log(encuesta);
    //   };

    // const handleChangeUsuario = (event, value, name) => {
    //     console.log(value.idusuario);
    //     setFormValues((prevState) => ({
    //       ...prevState,
    //       [name]: value.idusuario
    //     }));
    //     // console.log(encuesta);
    //   };



    // let usuario='';

    // const recibir = (id, nombre) => {
    //     usuario={id,nombre}
    //     console.log(usuario);
    // }


    // asignaciones.map((asig) => { 
    //     return recibir(asig.idusuario, asig.nombre_completo)
    // });



    const onSubmit = async (event) => {
        //console.log(event)
        event.preventDefault();
        setFormSubmitted(true);

        if (formValues.rfsi.length <= 0) return;
        console.log(formValues);
        //TODO:
        await startSavingEvent(formValues);
        CloseModal();
        setFormSubmitted(false);
    };

    const btn = () => {
        mostrarGuardar()
    }

    const cerrar = () => {
        CloseModal();
    }


    return (
        <>
            <ModalRadio >
                <Box sx={{ ...customStyles, maxWidth: '900px' }}>
                    <Typography variant='h5' color={'secondary'} sx={{ pl: 4 }}> {isActualizar ? 'Actualizar Hoja de Servicios' : 'Nueva Hoja de Servicios'}</Typography>
                    <Box overflow={'scroll'} maxHeight={650} sx={{ border: '1px solid', borderRadius: 2, borderColor: 'rgb(192, 192, 192)', ml: 1, mb: 1, mt: 2, pl: 1 }} >
                        <Typography sx={{ textAlign: 'center', fontSize: '16px', }} > <b> CENTRO DE MANDO Y COMUNICACIONES C4 </b> </Typography>
                        <Typography sx={{ textAlign: 'center', fontSize: '16px', }} > <b> DIRECCIÓN TÉCNICA </b> </Typography>
                        <Typography sx={{ textAlign: 'center', fontSize: '16px', }} > DEPARTAMENTO DE RADIOCOMUNICACIONES </Typography><br />
                        <Typography sx={{ textAlign: 'center', fontSize: '16px', }} > <b> REPORTE DE SERVICIO </b> </Typography><br />
                        <form onSubmit={onSubmit}>

                            <Grid container justify="center" sx={{ pr: 4 }}>
                                <Grid item xs={12} sx={{ textAlign: 'right' }} >
                                    <TextField variant='filled' value={!isActualizar ? 'Villahermosa, Tab. A ' + fechaActual : formValues.fechaService} sx={{ width: 330 }} /><br /><br />
                                </Grid>
                                <Box sx={{ width: 1850, border: '1px solid', borderRadius: 2, borderColor: 'rgb(192, 192, 192)', ml: 2, mb: 2, mt: 2, pl: 1, pb: 1 }} >
                                    <Typography sx={{ textAlign: 'center', fontSize: '16px', }} > Datos del Usuario </Typography><br />
                                    <Stack noValidate spacing={3}>
                                        <Grid container alignItems="center" justify="center" direction="column" >
                                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                {isActualizar ? (
                                                    <Grid item xs={6}>
                                                        <Autocomplete
                                                            sx={{ width: 400, mb: 1 }}
                                                            id="usuarios_idusuarios-input"
                                                            name="usuarios_idusuarios"
                                                            options={usuarios}
                                                            getOptionLabel={(usuarios) => usuarios.nombre + " " + usuarios.apellido_pat + " " + usuarios.apellido_mat || ""}
                                                            //getOptionLabel={(usuarios) => usuarios.nombre || ""}                
                                                            value={formValues}
                                                            inputValue={inputValue}
                                                            onChange={(event, newFormValues) => {
                                                                setFormValues({
                                                                    ...formValues,
                                                                    ['usuarios_idusuarios']: newFormValues.idusuarios,
                                                                    ['nombre']: newFormValues.nombre,
                                                                    ['apellido_pat']: newFormValues.apellido_pat,
                                                                    ['apellido_mat']: newFormValues.apellido_mat,
                                                                });
                                                            }}
                                                            onInputChange={(e, newInputValue) => {
                                                                setInputValue(newInputValue)
                                                                selectAsignacionesPorUsuario(newInputValue)
                                                            }}
                                                            renderInput={(params) => <TextField  {...params} variant="outlined" label="Usuario" />}
                                                        />
                                                        {console.log(inputValue)}
                                                    </Grid>
                                                ) : (
                                                    <Grid item xs={6}>
                                                        <Autocomplete
                                                            sx={{ width: 400, mb: 1 }}
                                                            id="usuarios_idusuarios-input"
                                                            name="usuarios_idusuarios"
                                                            options={usuarios}
                                                            getOptionLabel={(usuarios) => usuarios.nombre + " " + usuarios.apellido_pat + " " + usuarios.apellido_mat || ""}
                                                            onChange={(event, newFormValues) => {
                                                                setFormValues({
                                                                    ...formValues,
                                                                    ['usuarios_idusuarios']: newFormValues.idusuarios,
                                                                });

                                                            }}
                                                            onInputChange={(e, newInputValue) => {
                                                                setInputValue(
                                                                    newInputValue
                                                                )
                                                                selectAsignacionesPorUsuario(newInputValue)
                                                                setUsuarioBuscar(newInputValue)
                                                            }}
                                                            renderInput={(params) => <TextField  {...params} variant="outlined" label="Usuario" />}
                                                        />
                                                    </Grid>
                                                )}
                                                <Grid item xs={6}>
                                                    <TextField
                                                        disabled={true}
                                                        // size='normal'
                                                        sx={{ border: 'none', mb: 1, width: 380, pr: 1 }}
                                                        type="text"
                                                        id="unidad-input"
                                                        name="unidad"
                                                        label="Unidad"
                                                        variant="outlined"
                                                        value={
                                                            asignaciones.unidad
                                                        }
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    // onChange={handleInputChange} 
                                                    />
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <TextField
                                                        disabled={true}
                                                        // size='normal'
                                                        sx={{ border: 'none', mb: 1, width: 408, pr: 1 }}
                                                        type="text"
                                                        id="corporacion-input"
                                                        name="nombreCorporacion"
                                                        label="Corporación"
                                                        variant="outlined"
                                                        value={
                                                            asignaciones.nombreCorporacion
                                                        }
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    // value={formValues.ccp_carta}
                                                    // onChange={handleInputChange} 
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        disabled={true}
                                                        // size='normal'
                                                        sx={{ border: 'none', mb: 1, width: 380, pr: 1 }}
                                                        type="text"
                                                        id="zona_region-input"
                                                        name="nombreZonasRegiones"
                                                        label="Zona / Región"
                                                        variant="outlined"
                                                        value={
                                                            asignaciones.nombreZonasRegiones
                                                        }
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    // value={formValues.ccp_carta}
                                                    // onChange={handleInputChange} 
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        disabled={true}
                                                        // size='normal'
                                                        sx={{ border: 'none', mb: 1, width: 408, pr: 1 }}
                                                        type="text"
                                                        id="cargo-input"
                                                        name="nombre"
                                                        label="Cargo"
                                                        variant="outlined"
                                                        value={
                                                            asignaciones.nombre
                                                        }
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    // value={formValues.ccp_carta}
                                                    // onChange={handleInputChange} 
                                                    />
                                                </Grid>


                                            </Grid>
                                        </Grid>
                                    </Stack>

                                </Box>
                                <Box sx={{ width: 1550, border: '1px solid', borderRadius: 2, borderColor: 'rgb(192, 192, 192)', ml: 2, mb: 2, mt: 2, pl: 1, pb: 1 }} >
                                    <Typography sx={{ textAlign: 'center', fontSize: '16px', }} > Datos del Equipo </Typography><br />

                                    <Stack noValidate spacing={3}>
                                        <Grid container alignItems="center" justify="center" direction="column" >
                                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                            {isActualizar ? (
                                                    <Grid item xs={6}>
                                                       <Autocomplete
                                                            sx={{ width: 400, mb: 1 }}
                                                            id="rfsi-input"
                                                            name="rfsi"
                                                            options={rfsiBuscar}
                                                            getOptionLabel={(rfsiBuscar) => rfsiBuscar.rfsi || ""}
                                                            //getOptionLabel={(usuarios) => usuarios.nombre || ""}
                                                            value={formValues}
                                                            inputValue={inputValue2}
                                                            onChange={(event, newFormValues2) => {
                                                                setFormValues({
                                                                    ...formValues,
                                                                    ['rfsi']: newFormValues2.rfsi,
                                                                    
                                                                });
                                                            }}
                                                            onInputChange={(e, newInputValue2) => {
                                                                setInputValue2(newInputValue2)
                                                                selectAsignacionesPorUsuario(newInputValue2)
                                                            }}
                                                            renderInput={(params) => <TextField  {...params} variant="outlined" label="RFSI" />}
                                                        />
                                                    </Grid>
                                                ) : (
                                                    <Grid item xs={6}>
                                                        <Autocomplete
                                                            sx={{ width: 400, mb: 1 }}
                                                            id="rfsi-input"
                                                            name="rfsi"
                                                            options={rfsiBuscar}
                                                            getOptionLabel={(rfsiBuscar) => rfsiBuscar.rfsi || ""}
                                                            onChange={(event, newFormValues2) => {
                                                                setFormValues({
                                                                    ...formValues,
                                                                    ['rfsi']: newFormValues2.rfsi,
                                                                })
                                                                //setFormValues({
                                                                //    ...formValues,
                                                                //    ['rfsi']: newFormValues.rfsi,
                                                                //})

                                                            }}
                                                            //inputValue={inputValue2}
                                                            onInputChange={(e, newInputValue2) => {
                                                                setInputValue2(
                                                                    newInputValue2
                                                                )
                                                                selectAsignacionesPorRfsi(newInputValue2,usuarioBuscar)

                                                            }}
                                                            renderInput={(params) => <TextField  {...params} variant="outlined" label="RFSI" />}
                                                        />
                                                    </Grid>
                                                )}
                                                 <Grid item xs={6}>
                                                    <TextField
                                                        disabled={true}
                                                        // size='normal'
                                                        sx={{ border: 'none', mb: 1, width: 380, pr: 1 }}
                                                        type="text"
                                                        id="tipo-input"
                                                        name="tipo"
                                                        label="Tipo"
                                                        variant="outlined"
                                                        value={
                                                            radioRfsi.tipo
                                                        }
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    // onChange={handleInputChange} 
                                                    />
                                                </Grid>
                                                 <Grid item xs={6}>
                                                    <TextField
                                                        disabled={true}
                                                        // size='normal'
                                                        sx={{ border: 'none', mb: 1, width: 408, pr: 1 }}
                                                        type="text"
                                                        id="serie-input"
                                                        name="serie"
                                                        label="Serie"
                                                        variant="outlined"
                                                        value={
                                                            radioRfsi.serie
                                                        }
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    // onChange={handleInputChange} 
                                                    />
                                                </Grid>
                                                 <Grid item xs={6}>
                                                    <TextField
                                                        disabled={true}
                                                        // size='normal'
                                                        sx={{ border: 'none', mb: 1, width: 380, pr: 1 }}
                                                        type="text"
                                                        id="inventario_interno-input"
                                                        name="inventario_interno"
                                                        label="Inventario Interno"
                                                        variant="outlined"
                                                        value={
                                                            radioRfsi.inventario_interno
                                                        }
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    // onChange={handleInputChange} 
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Stack>
                                </Box>
                                <Box sx={{ width: 1550, border: '1px solid', borderRadius: 2, borderColor: 'rgb(192, 192, 192)', ml: 2, mb: 2, mt: 2, pl: 1, pb: 1 }} >
                                    <Typography sx={{ textAlign: 'center', fontSize: '16px', }} > Tipo de Intervencion </Typography><br />
                                    <Stack noValidate spacing={3}>
                                        <Grid container alignItems="center" justify="center" direction="column" >
                                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                            <Grid item xs={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="funda"
                                        value={formValues.funda}
                                        checked={formValues.funda}
                                        //onChange={handleChange}
                                        onChange={(event, newFormValues) => {
                                            console.log(newFormValues)
                                            setFormValues({
                                                ...formValues,
                                                ['funda']: newFormValues,
                                            });
                                        }}
                                    />
                                }
                                label="Funda"
                            />
                            </Grid>
                                            </Grid>
                                        </Grid>
                                    </Stack>
                                </Box>
                            </Grid>
                            <Grid container justifyContent={'center'} >
                                <Button variant="contained" color="secondary" type="submit" sx={{ width: 628, pl: 1, pr: 1 }}>
                                    {!isVer ? (isActualizar ? 'Actualizar' : 'Guardar') : 'Cerrar'}
                                </Button>
                            </Grid>
                        </form>
                    </Box>
                </Box>
            </ModalRadio>
        </>
    )
}
