import { Autocomplete, Box, Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalRadio } from '../ModalRadio';
import { useHojaServicioStore } from '../../../hooks/hooksUtilidades/useHojaServicioStore';
import { useModalHook } from '../../../hooks/useModalHook';
import axios from 'axios';
import radioApi from '../../../api/radioApi';
import { TextareaAutosize } from '@mui/base';
import { styled } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

let hoy = new Date();
let options = { day: 'numeric', month: 'long', year: 'numeric' }
let fechaActual = hoy.toLocaleString('es-MX', options);
// let fechaActual = hoy.getDate() + ' de ' + (hoy.getMonth()+1) + ' de ' + hoy.getFullYear();

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const FormHojaServicio = (customStyles) => {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const { CloseModal, isActualizar, mostrarGuardar, isVer } = useModalHook();
    const { activeEvent, startSavingEvent, consultarUltimoRegistro } = useHojaServicioStore();

    const [usuarios, setUsuarios] = useState([0]);
    const [supervisores, setSupervisores] = useState([0]);
    const [tecnicos, setTecnicos] = useState([0]);
    const [inputValue, setInputValue] = useState("");
    const [inputValue2, setInputValue2] = useState('');
    const [inputValue3, setInputValue3] = useState('');
    const [inputValue4, setInputValue4] = useState('');
    const [ rfsiBuscar, setRfsiBuscar ] = useState([]);
    const [ selectServicio, setSelectServicio ] = useState([]);
    const [ servicio, setServicio ] = useState([]);
    
    const [ usuarioBuscar, setUsuarioBuscar ] = useState("");

    const [formValues, setFormValues] = useState({
        fecha_servicio: null,
        fk_idasignacion_ur: '',
        servicios: null,
        descripcion: '',
        entrego_equipo: false,
        fecha_entrega: null,
        fk_supervisortec: '',
        usuario_servicio: '',
        usuario_entrega: '',
        fk_tecnico_entrega: null,
        estatus: '',
        folio:'',
    });
    const [asignaciones, setAsignaciones] = useState({
        nombreCorporacion: "",
        nombre: "",
        unidad: "",
        nombreZonasRegiones: "",
        //rfsi: "",
    });

    const [ radioRfsi, setRadioRfsi ] = useState({
        tipo:"",
        serie:"",
        inventario_segpub:"",
    });
    

    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({ ...activeEvent });
        }
    }, [activeEvent])


    useEffect(() => {
      
        radioApi.get(`/servicios/estatus/`).
        then((response) => {
            setSelectServicio(response.data);
            //console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
       
    }, [])
    

    const selectUsuarios = async () => {
        await radioApi.get(`/usuarios/`).
            then((response) => {
                setUsuarios(response.data);
                //console.log(response.data);
            }).catch(error => {
                //console.log(error);
            });
    }

    const selectSupervisores = async () => {
        await radioApi.get(`/usuarios/supervisores/${1}`).
            then((response) => {
                setSupervisores(response.data);
                //console.log(response.data);
            }).catch(error => {
                console.log(error);
            });
    }

    const selectTecnicos = async () => {
        await radioApi.get(`/usuarios/responsables/${1}`).
            then((response) => {
                setTecnicos(response.data);
                //console.log(response.data);
            }).catch(error => {
                console.log(error);
            });
    }

    //console.log(formValues)
    const selectAsignacionesPorUsuario = (nombre) => {
        radioApi.get(`/asig_usuarios/usuarios/${nombre}`).
            then((response) => {
                setAsignaciones({ ...response.data[0] });
                setRfsiBuscar(response.data)
                //console.log(response.data)
            }).catch(error => {
                console.log(error);
            });
    }
    const selectAsignacionesPorRfsi = (rfsi, usuarioBuscar) => {
        console.log(rfsi)
        console.log(usuarioBuscar)
        radioApi.get(`/asig_usuarios/radio/${rfsi}/${usuarioBuscar}`).
            then((response) => {
                setFormValues({
                    ...formValues,
                    ['tipo']: response.data[0].tipo,
                    ['serie']: response.data[0].serie,
                    ['inventario_segpub']: response.data[0].inventario_segpub,
                    ['fk_idasignacion_ur']: response.data[0].idasignacion,
                    ['serie_bateria']: response.data[0].serie_bateria,
                    // ['inventario_segpub_bateria']: response.data[0].inventario_sp_bateria,
                    ['serie_cargador']: response.data[0].serie_cargador,
                    // ['inventario_segpub_cargador']: response.data[0].inventario_segpub_cargador,
                    ['serie_gps']: response.data[0].serie_gps,
                    // ['inventario_segpub_gps']: response.data[0].inventario_segpub_gps,
                })
                // console.log(response.data[0].idasignacion)
            }).catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        selectUsuarios();
        selectSupervisores();
        selectTecnicos();
        // selectAsignacionesPorRfsi(inputValue2,inputValue);

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



     const handleInputChange = ({ target }) => {
         setFormValues({
             ...formValues,
             [target.name]: target.value,
         });
     };

     const handleChange = (event) => {
        
        const {
            target: { value },
        } = event;
        setServicio(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(', ') : value,
            );
            setFormValues({
                ...formValues,
                ['servicios'] : `${value}`,
            });
            console.log([value])
            // console.log(servicio)
      };

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
    const morado = {
        100: '#5B4080',
        200: '#5B4080',
        400: '#5B4080',
        500: '#5B4080',
        600: '#5B4080',
        900: '#5B4080',
      };
    
      const grey = {
        50: '#f6f8fa',
        100: '#eaeef2',
        200: '#d0d7de',
        300: '#afb8c1',
        400: '#8c959f',
        500: '#6e7781',
        600: '#57606a',
        700: '#424a53',
        800: '#32383f',
        900: '#24292f',
      };

    const StyledTextarea = styled(TextareaAutosize)(
        ({ theme }) => `
        width: 370px;
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px;
        border-radius: 12px 12px 0 12px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        
      
        &:hover {
          border-color: ${morado[400]};
        }
      
        &:focus {
          border-color: ${morado[400]};
          box-shadow: 0 0 0 .5px ${theme.palette.mode === 'dark' ? morado[600] : morado[200]};
        }
      
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `,
      );

    const onSubmit = async (event) => {
        //console.log(event)
        event.preventDefault();
        setFormSubmitted(true);

       // if (formValues.rfsi.length <= 0) return;
        console.log(formValues);
        //TODO:
        isActualizar === true ? "":consultarUltimoRegistro();
        await startSavingEvent(formValues);
        CloseModal();
        setFormSubmitted(false);
    };
    
    //console.log(supervisores)
    //console.log(tecnicos)
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
                                    <TextField variant='filled' value={!isActualizar ? 'Villahermosa, Tab. A ' + fechaActual : formValues.fecha_servicio === null ? 'Sin fecha de Servicio' :'Villahermosa, Tab. A ' + new Date(formValues.fecha_servicio.split('-').join('/')).toLocaleString('es-MX', options) } sx={{ width: 335 }} /><br /><br />
                                </Grid>
                                <Box sx={{ width: 1850, border: '1px solid', borderRadius: 2, borderColor: 'rgb(192, 192, 192)', ml: 2, mb: 2, mt: 2, pl: 1, pb: 1 }} >
                                    <Typography sx={{ textAlign: 'center', fontSize: '16px', }} > Datos del Usuario </Typography><br />
                                    <Stack noValidate spacing={3}>
                                        <Grid container alignItems="center" justify="center" direction="column" >
                                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                {isActualizar ? ( 
                                                    <Grid item xs={6}>
                                                        <Autocomplete
                                                            disabled={isVer}
                                                            sx={{ width: 400, mb: 1 }}
                                                            id="usuarios_idusuarios-input"
                                                            name="usuarios_idusuarios"
                                                            options={usuarios}
                                                            getOptionLabel={(usuarios) => usuarios.nombre + " " + usuarios.apellido_pat + " " + usuarios.apellido_mat || ""}     
                                                            value={formValues}
                                                            inputValue={inputValue}
                                                            onChange={(event, newFormValues) => {
                                                                setFormValues({
                                                                    ...formValues,
                                                                    ['usuarios_idusuarios']: newFormValues.idusuarios,
                                                                    ['nombre']: newFormValues.nombre,
                                                                    ['apellido_pat']: newFormValues.apellido_pat,
                                                                    ['apellido_mat']: newFormValues.apellido_mat,
                                                                    ['tipo']: "",
                                                                    ['serie']: "",
                                                                    ['inventario_segpub']: "",
                                                                });
                                                                setAsignaciones({
                                                                    ...asignaciones,
                                                                    ["nombreCorporacion"]:newFormValues.nombreCorporacion,
                                                                    ["nombre"]: newFormValues.nombrePuesto,
                                                                    ["unidad"]: "",
                                                                    ["nombreZonasRegiones"]: "",
                                                                   
                                                                });
                                                                setRadioRfsi({
                                                                    ["tipo"]:"",
                                                                    ["serie"]:"",
                                                                    ["inventario_segpub"]:"",
                                                                });
                                                                
                                                            }}
                                                            onInputChange={(e, newInputValue) => {
                                                                
                                                                setInputValue(newInputValue)
                                                                selectAsignacionesPorUsuario(newInputValue)
                                                                setUsuarioBuscar(newInputValue)
                                                            }}
                                                            renderInput={(params) => <TextField  {...params} variant="outlined" label="Usuario" />}
                                                        />
                                                       
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
                                                                    ['tipo']: "",
                                                                    ['serie']: "",
                                                                    ['inventario_segpub']: "",
                                                                });
                                                                setAsignaciones({
                                                                    ...asignaciones,
                                                                    ["nombreCorporacion"]:newFormValues.nombreCorporacion,
                                                                    ["nombre"]: newFormValues.nombrePuesto,
                                                                    ["unidad"]: "",
                                                                    ["nombreZonasRegiones"]: "",
                                                                   
                                                                })
                                                                setRadioRfsi({
                                                                    ["tipo"]:"",
                                                                    ["serie"]:"",
                                                                    ["inventario_segpub"]:"",
                                                                });
                                                                

                                                            }}
                                                            onInputChange={(e, newInputValue) => {
                                                               
                                                                setInputValue(newInputValue)
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
                                                            disabled={isVer}
                                                            sx={{ width: 390, mb: 1 }}
                                                            id="rfsi-input"
                                                            name="rfsi"
                                                            options={rfsiBuscar}
                                                            getOptionLabel={(rfsiBuscar) => rfsiBuscar.rfsi || ""}
                                                            //getOptionLabel={(usuarios) => usuarios.nombre || ""}
                                                            value={formValues}
                                                            inputValue={inputValue2}
                                                            onChange={(event, newFormValues2) => {
                                                                //console.log(newFormValues2)
                                                                setFormValues({
                                                                    ...formValues,
                                                                    ['rfsi']: newFormValues2.rfsi,
                                                                    ['tipo']: newFormValues2.tipo,
                                                                    ['serie']: newFormValues2.serie,
                                                                    ['inventario_segpub']: newFormValues2.inventario_segpub,
                                                                    ['fk_idasignacion_ur']: newFormValues2.fk_idasignacion_ur,
                                                                });
                                                                //setRadioRfsi({
                                                                //    ...radioRfsi,
                                                                //   
                                                                //})
                                                            }}
                                                            onInputChange={(e, newInputValue2) => {
                                                                
                                                                
                                                                setInputValue2(newInputValue2)
                                                                selectAsignacionesPorRfsi(newInputValue2,inputValue)
                                                            }}
                                                            renderInput={(params) => <TextField  {...params} variant="outlined" label="RFSI" />}
                                                        />
                                                    </Grid>
                                                ) : (
                                                    <Grid item xs={6}>
                                                        <Autocomplete
                                                            sx={{ width: 390, mb: 1 }}
                                                            id="rfsi-input"
                                                            name="rfsi"
                                                            options={rfsiBuscar}
                                                            getOptionLabel={(rfsiBuscar) => rfsiBuscar.rfsi || ""}
                                                            onChange={(event, newFormValues2) => {
                                                                setFormValues({
                                                                    ...formValues,
                                                                    ['rfsi']: newFormValues2.rfsi,
                                                                    ['fk_idasignacion_ur']: newFormValues2.fk_idasignacion_ur,
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
                                                                selectAsignacionesPorRfsi(newInputValue2,inputValue)

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
                                                            formValues.tipo
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
                                                        sx={{ border: 'none', mb: 1, width: 400, pr: 1 }}
                                                        type="text"
                                                        id="serie-input"
                                                        name="serie"
                                                        label="Serie"
                                                        variant="outlined"
                                                        value={
                                                            formValues.serie
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
                                                        id="inventario_segpub-input"
                                                        name="inventario_segpub"
                                                        label="Inventario SSyPC"
                                                        variant="outlined"
                                                        value={
                                                            formValues.inventario_segpub
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
                                                        sx={{ border: 'none', mb: 1, width: 400, pr: 1 }}
                                                        type="text"
                                                        id="serie_bateria-input"
                                                        name="serie_bateria"
                                                        label="Serie bateria"
                                                        variant="outlined"
                                                        value={
                                                            formValues.serie_bateria
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
                                                        id="serie_cargador-input"
                                                        name="serie_cargador"
                                                        label="Serie cargador"
                                                        variant="outlined"
                                                        value={
                                                            formValues.serie_cargador
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
                                                        sx={{ border: 'none', mb: 1, width: 400, pr: 1 }}
                                                        type="text"
                                                        id="serie_gps-input"
                                                        name="serie_gps"
                                                        label="Serie Gps"
                                                        variant="outlined"
                                                        value={
                                                            formValues.serie_gps
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
                                    <Typography sx={{ textAlign: 'center', fontSize: '16px', }} > Servicios </Typography><br />
                                    <Stack noValidate spacing={3}>
                                        <Grid container alignItems="center" justify="center" direction="column" >
                                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                <Grid item xs={6}>
                                                        <FormControl sx={{ border: 'none', mb: 1, width: 400 }}>
                                                            <InputLabel id="demo-multiple-checkbox-label"  >Servicios</InputLabel>
                                                            <Select
                                                                disabled={isVer}
                                                                labelId="demo-multiple-checkbox-label"
                                                                id="demo-multiple-checkbox"
                                                                multiple
                                                                value={servicio}
                                                                onChange={handleChange}
                                                                input={<OutlinedInput label="Servicios" />}
                                                                renderValue={(selected) => selected.join(', ')}
                                                                MenuProps={MenuProps}
                                                                color='secondary'
                                                            >
                                                                {
                                                                selectServicio.map((service) => 
                                                                    { return <MenuItem key={service.nombreServicios} value={service.nombreServicios} > 
                                                                        <Checkbox  checked={ servicio.indexOf(service.nombreServicios) > - 1 } />
                                                                        <ListItemText primary={service.nombreServicios} />
                                                                    </MenuItem> }
                                                                )}  
                                                            </Select>
                                                        </FormControl>
                                                </Grid>
                                                {/* <Grid item xs={3}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                name="entrego_equipo"
                                                                value={formValues.entrego_equipo}
                                                                checked={formValues.entrego_equipo}
                                                                //onChange={handleChange}
                                                                onChange={(event, newFormValues) => {
                                                                    console.log(newFormValues)
                                                                    setFormValues({
                                                                        ...formValues,
                                                                        ['entrego_equipo']: newFormValues,
                                                                    });
                                                                }}
                                                            />
                                                        }
                                                        label="Entrego Equipo"
                                                    />
                                                </Grid> */}
                                                <Grid item xs={12}>
                                                    <TextField
                                                        disabled={isVer}
                                                        name='descripcion'
                                                        sx={{ border: 'none', mb: 1, width: 780, pr: 1 }}
                                                        value={formValues.descripcion}
                                                        onChange={handleInputChange}
                                                        variant="outlined"
                                                        multiline
                                                        label="Descripcion de las actividades"
                                                        rows={3}
                                                        inputProps={{ maxLength: 250 }}
                                                    />
                                                </Grid>
                                                {/* <Grid item xs={6}>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="estatus-input" color='secondary'>Estatus</InputLabel>
                                                        <Select
                                                            disabled={isVer}
                                                            sx={{ border: 'none', mb: 1, width: 300 }}
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
                                                </Grid> */}
                                            </Grid>
                                        </Grid>
                                    </Stack>
                                </Box>

                                <Box sx={{ width: 1550, border: '1px solid', borderRadius: 2, borderColor: 'rgb(192, 192, 192)', ml: 2, mb: 2, mt: 2, pl: 1, pb: 1 }} >
                                    <Typography sx={{ textAlign: 'center', fontSize: '16px', }} > Recepción de Equipo </Typography><br />
                                    <Stack noValidate spacing={3}>
                                        <Grid container alignItems="center" justify="center" direction="column" >
                                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                {isActualizar ? (
                                                    <Grid item xs={6}>
                                                        <Autocomplete
                                                            disabled={isVer}
                                                            sx={{ width: 400, mb: 1 }}
                                                            id="fk_supervisortec-input"
                                                            name="fk_supervisortec"
                                                            options={supervisores}
                                                            getOptionLabel={(usuarios) => usuarios.nombreSup + " " + usuarios.appatSup + " " + usuarios.apmatSup || ""}     
                                                            value={formValues}
                                                            inputValue={inputValue3}
                                                            onChange={(event, newFormValues2) => {
                                                                setFormValues({
                                                                    ...formValues,
                                                                    ['fk_supervisortec']: newFormValues2.idSup,
                                                                    ['nombreSup']: newFormValues2.nombreSup,
                                                                    ['appatSup']: newFormValues2.appatSup,
                                                                    ['apmatSup']: newFormValues2.apmatSup,
                                                                }); 
                                                            }}
                                                            onInputChange={(e, newInputValue2) => {
                                                                setInputValue3(newInputValue2)
                                                            }}
                                                            renderInput={(params) => <TextField  {...params} variant="outlined" label="Supervisor Técnico" />}
                                                        />
                                                    </Grid>
                                                ) : (
                                                    <Grid item xs={6}>
                                                        <Autocomplete
                                                            sx={{ width: 400, mb: 1 }}
                                                            id="fk_supervisortec-input"
                                                            name="fk_supervisortec"
                                                            options={supervisores}
                                                            getOptionLabel={(usuarios) => usuarios.nombreSup + " " + usuarios.appatSup + " " + usuarios.apmatSup || ""}
                                                            onChange={(event, newFormValues2) => {
                                                                setFormValues({
                                                                    ...formValues,
                                                                    ['fk_supervisortec']: newFormValues2.idSup,
                                                                });
                                                            }}
                                                            onInputChange={(e, newInputValue2) => {
                                                                setInputValue(newInputValue2)
                                                            }}
                                                            renderInput={(params) => <TextField  {...params} variant="outlined" label="Supervisor Técnico" />}
                                                        />
                                                    </Grid>
                                                )}
                                                <Grid item xs={6}>
                                                    <TextField
                                                        disabled={isVer}
                                                        sx={{ border: 'none', mb: 1, width: 380, pr: 1 }}
                                                        type="text"
                                                        id="usuario_servicio-input"
                                                        name="usuario_servicio"
                                                        label="Usuario"
                                                        variant="outlined"
                                                        onChange={handleInputChange}
                                                        value={
                                                            formValues.usuario_servicio
                                                        }
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Stack>
                                </Box>
                                {isActualizar == true?
                                <Box sx={{ width: 1550, border: '1px solid', borderRadius: 2, borderColor: 'rgb(192, 192, 192)', ml: 2, mb: 2, mt: 2, pl: 1, pb: 1 }} >
                                    <Typography sx={{ textAlign: 'center', fontSize: '16px', }} > Entrega de Equipo </Typography><br />
                                    <Stack noValidate spacing={3}>
                                        <Grid container alignItems="center" justify="center" direction="column" >
                                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        disabled={isVer}
                                                        sx={{ border: 'none', mb: 1, width: 380}}
                                                        type="text"
                                                        id="usuario_entrega-input"
                                                        name="usuario_entrega"
                                                        label="Usuario"
                                                        variant="outlined"
                                                        onChange={handleInputChange}
                                                        value={
                                                            formValues.usuario_entrega
                                                        }
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </Grid>
                                                {isActualizar ? (
                                                    <Grid item xs={6}>
                                                        <Autocomplete
                                                            disabled={isVer}
                                                            sx={{ width: 380, mb: 1 }}
                                                            id="fk_tecnico_entrega-input"
                                                            name="fk_tecnico_entrega"
                                                            options={tecnicos}
                                                            getOptionLabel={(usuarios) => usuarios.nombreRes + " " + usuarios.appatRes + " " + usuarios.apmatRes || ""}     
                                                            value={formValues}
                                                            inputValue={inputValue4}
                                                            onChange={(event, newFormValues4) => {
                                                                setFormValues({
                                                                    ...formValues,
                                                                    ['fk_tecnico_entrega']: newFormValues4.idRes,
                                                                    ['nombreRes']: newFormValues4.nombreRes,
                                                                    ['appatRes']: newFormValues4.appatRes,
                                                                    ['apmatRes']: newFormValues4.apmatRes,
                                                                });
                                                                console.log(inputValue4)
                                                            }}
                                                            onInputChange={(e, newInputValue4) => {
                                                                setInputValue4(newInputValue4)
                                                            }}
                                                            renderInput={(params) => <TextField  {...params} variant="outlined" label="Técnico" />}
                                                        />
                                                    </Grid>
                                                ) : (
                                                    <Grid item xs={6}>
                                                        <Autocomplete
                                                            sx={{ width: 380, mb: 1 }}
                                                            id="fk_tecnico_entrega-input"
                                                            name="fk_tecnico_entrega"
                                                            options={tecnicos}
                                                            getOptionLabel={(usuarios) => usuarios.nombreRes + " " + usuarios.appatRes + " " + usuarios.apmatRes || ""}
                                                            onChange={(event, newFormValues4) => {
                                                                setFormValues({
                                                                    ...formValues,
                                                                    ['fk_tecnico_entrega']: newFormValues4.idRes,
                                                                });
                                                                // console.log( newFormValues.idusuarios )
                                                            }}
                                                                onInputChange={(e, newInputValue4) => {
                                                                setInputValue(newInputValue4)
                                                            }}
                                                            renderInput={(params) => <TextField  {...params} variant="outlined" label="Técnico" />}
                                                        />
                                                    </Grid>
                                                )}
                                                <Grid item={6}>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateTimePicker
                                                  label="Controlled picker"
                                                  name = "fecha_entrega"
                                                  //inputFormat="DD/MM/YYYY HH:mm"
                                                  color="secondary"
                                                  value={dayjs(formValues.fecha_entrega)}
                                                  onChange={(newValue) => {
                                                    console.log(newValue);
                                                    console.log(formValues.fecha_entrega)
                                                    let x= (newValue.$M+1)+"-"+newValue.$D+"-"+newValue.$y+" "+newValue.$H+":"+newValue.$m+":"+newValue.$s
                                                    console.log(x);
                                                    let y= new Date(x);
                                                    let options = { day: '2-digit', month: '2-digit', year: 'numeric' }
                                                    let optionsTime={h24: true, hour:'2-digit', minute:'2-digit', second:'2-digit'}
                                                    let fechaAsignacion = y.toLocaleString('es-MX', options); 
                                                    let horaAsignacion = y.toLocaleString('es-MX', optionsTime); 
                                                    let info = fechaAsignacion.split('/').reverse().join('-');
                                                    console.log(fechaAsignacion);
                                                    //setValueFecha(newValue);
                                                    setFormValues({
                                                        ...formValues,
                                                        ['fecha_entrega']: info+" "+horaAsignacion,
                                                    })}}
                                                />
                                                </LocalizationProvider>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Stack>
                                </Box>
                                :
                                ""
                                };
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
