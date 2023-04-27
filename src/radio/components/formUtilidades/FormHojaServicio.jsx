import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Grid, Select, TextField, Typography } from '@mui/material';
import { useHojaServicioStore } from '../../../hooks/hooksUtilidades/useHojaServicioStore';
import { useModalHook } from '../../../hooks/useModalHook';
import axios from 'axios';

let hoy = new Date();
let options = { day: 'numeric', month: 'long', year: 'numeric' }
let fechaActual = hoy.toLocaleString('es-MX', options);
// let fechaActual = hoy.getDate() + ' de ' + (hoy.getMonth()+1) + ' de ' + hoy.getFullYear();

export const FormHojaServicio = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [asignacionUsuarioRadio, setAsignacionUsuarioRadio] = useState([0]);
    const [selectCorporacion, setSelectCorporacion] = useState([0]);
    const { isActualizar, mostrarGuardar, isVer } = useModalHook();
    const { activeEvent, startSavingEvent } = useHojaServicioStore();
   
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        // fecha_servicio:'',
        fk_idasignacion_ur:'',
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

    

    useEffect(() => {

        axios.get('http://localhost:8000/api/v0/asig_usuarios').
        then((response)=>{
            setAsignacionUsuarioRadio(response.data);
        });

        axios.get('http://localhost:8000/api/v0/corporaciones').
        then((response)=>{
            setSelectCorporacion(response.data);
        });

    }, [])

 

    console.log( asignacionUsuarioRadio  )
    

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

    const handleChangeAutocomplete = (event, value, name) => {
        console.log(value.idusuarios);
        setFormValues((prevState) => ({
          ...prevState,
          [name]: value.idusuarios
        }));
        // console.log(encuesta);
      };

    const onSubmit = async (event) => {
        //console.log(event)
        event.preventDefault();
        setFormSubmitted(true);
        // if (formValues.encabezado_carta.length <= 0) return;
        // console.log(formValues);
        //TODO:
        await startSavingEvent(formValues);
        setFormSubmitted(false);
    };

    const btn =()=>{
        // mostrarGuardar()
        // isVer === true 
        navigate('hoja-servicio')

    }

    const cerrar = () => {
        onVer(false);
        navigate('../hoja-servicio');
      }


    

    return (
        <>
            {/* <ModalRadio > */}
                <Typography variant='h5' color={'secondary'} sx={{ pl:4}}> { isActualizar ? 'Actualizar Hoja de Servicios' : 'Nueva Hoja de Servicios' }</Typography>
                <Box /* overflow={ 'scroll'} maxHeight={700}*/ sx={{ border: '1px solid', borderRadius: 2, borderColor: 'rgb(192, 192, 192)', ml: 1, mb: 1, mt: 2, pl:1 }} >
                    <Typography sx={{ textAlign: 'center', fontSize: '16px', }} > <b> CENTRO DE MANDO Y COMUNICACIONES C4 </b> </Typography>
                    <Typography  sx={{ textAlign: 'center', fontSize: '16px', }} > <b> DIRECCIÓN TÉCNICA </b> </Typography>
                    <Typography  sx={{ textAlign: 'center', fontSize: '16px', }} > DEPARTAMENTO DE RADIOCOMUNICACIONES </Typography><br/>
                    <Typography  sx={{ textAlign: 'center', fontSize: '16px', }} > <b> REPORTE DE SERVICIO </b> </Typography><br />
                    <form  onSubmit={onSubmit}>
                        <Grid container justify="center"  sx={{pr: 4 }}>
                            <Grid item xs={12} sx={{ textAlign: 'right'}} >
                                <TextField  variant='filled' value={'Villahermosa, Tab. A '+ fechaActual } sx={{ width: 330}} /><br /><br />
                            </Grid>
                            <Box sx={{width: 1550, border: '1px solid', borderRadius: 2, borderColor: 'rgb(192, 192, 192)', ml: 2, mb: 2, mt: 2, pl:1, pb: 1}} >
                                <Typography  sx={{ textAlign: 'center', fontSize: '16px', }} > Datos del Usuario </Typography><br/>
                                <Grid item xs={3}>
                                    <Autocomplete
                                        // sx={{ width: 300}}
                                        // disabled={isVer}
                                        //name="fk_usuario"
                                        // value={selectUsuario[formValues.fk_usuario-1]}
                                        // defaultValue={selectUsuario}
                                        options={asignacionUsuarioRadio}
                                        getOptionLabel={ (asignacionUsuarioRadio) => asignacionUsuarioRadio.rfsi || ""}
                                        onChange={(event, newFormValues) => {
                                            setFormValues({
                                                ...formValues,
                                                ['fk_idasignacion_ur']: newFormValues.asignacion_usuario_radiocol,
                                            });
                                        }}
                                        // onSelect={
                                        //     asignacionUsuarioRadio.map( ({usuarios_idusuarios}) => { 
                                        //         return <Select variant="outlined" value={usuarios_idusuarios} /> 
                                        //        // return FormHojaServicio(asigUSerRadio.usuarios_idusuarios)
                                        //     }) 
                                        // }
                                       
                                        renderInput={(params) => ( 
                                            <TextField {...params} label="RFSI" variant="outlined" />
                                        )
                                    }
                                    />

                                 
                                </Grid>
                               
                            </Box>
                        </Grid>
                        <Grid container justifyContent={'center'} >
                          <Button variant="contained" color="secondary"  type="submit" sx={{ width: 628, pl:1, pr:1}}>
                            { !isVer ? (isActualizar ? 'Actualizar' : 'Guardar') : 'Cerrar' }
                          </Button>
                        </Grid>
                    </form>
                </Box>
            {/* </ModalRadio> */}
        </>
    )
}
