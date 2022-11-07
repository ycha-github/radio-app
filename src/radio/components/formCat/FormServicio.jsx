
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import { Box, Button, FormGroup, FormLabel, Input, Stack, Switch } from '@mui/material';
import { ModalRadio } from '../ModalRadio';
import { AddCircleOutlineOutlined, Close, ResetTv, Save } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';


//import { IsUpdate } from '../../../store';

export const FormServicio = (props) => {
    const { OpenModal, CloseModal, ModalGuardar, ModalActualizar, isActualizar} = useModalHook();
    const [nombreServicio, setNombreServicio] = useState('');
    const [descripcionServicio, setDescripcionServicio] = useState('');
    const [estatusServicio, setEstatusServicio] = useState(true);
    const [checked, setChecked] = useState(true);

    const [idActualizar, setIdActualizar]     = useState('');

    const handleChangeNom = (e) => {
        setNombreServicio(e.target.value);
    };

    const handleChangeDes = (e) => {
        setDescripcionServicio(e.target.value);
    };

    const handleChangeEst = (e) => {
        setChecked(e.target.checked);
        setEstatusServicio(e.target.checked);
    };   

    const cerrarModal = () => {
        ModalGuardar();
        CloseModal();
    }

    const modalGuardar = () => {
        OpenModal();
        ModalGuardar();
    }

    const guardar = () => {
        // e.prevent.default;
        let datosServicios = {
                nombreServicios: nombreServicio,
                descripcion: descripcionServicio,
                estatus: estatusServicio
            };
            console.log(datosServicios);

        // if(!userStatus || userStatus === 'default'){
        //     alert('Incorrecto');
        //     return;
        // }
        // if(ModalActualizar()){
        if(isActualizar == true){
            // ejecutarActualizacion(datosServicios);
            console.log('actualizar');
        }else{
            axios.post('http://localhost:8000/api/v0/servicios', datosServicios).then((response)=> {
                // if(response.data.insertId){
                    // alert('Guardado!');
                    CloseModal();
                    ModalGuardar();
                    console.log('guardar');
                // }            
            });
        }
    };

    return (
      <>
        <Stack direction="row" spacing={1} marginBottom={2}>
            <Button onClick={modalGuardar} color={props.color}  variant="outlined" startIcon={<AddCircleOutlineOutlined />}>
                Nuevo
            </Button>
        </Stack>
        <ModalRadio  className='modal2' >
            <Box className='box-modal'>
                <h3 className='alinear-c franja'> Nuevo {props.nombre} <span className='color-red'>{props.nuevo}</span> </h3>
                <br />

                <form className='container' id={'formServ'} >
                    <FormGroup>
                        <Input id="my-input" type='text' placeholder="Nombre" name='nombre' required autoFocus 
                            onChange={handleChangeNom} hidden/*disabled={props.isActualizar}*/ />
                    </FormGroup>
                    <FormGroup>
                        <Input id="my-input" type='text' placeholder="Descripción" name='descripcion' required 
                            onChange={handleChangeDes} /*disabled={props.isActualizar}*/ />
                    </FormGroup>
                    <FormGroup>
                        <div className='alinear-c'>
                        {/* <FormLabel>Estatus:</FormLabel>
                        <Checkbox onChange={(e) => { setEstatusServicio(e.target.checked); } }/>Activo */}
                        <FormLabel > Estatus: </FormLabel>
                        <Switch color='warning' checked={checked} onChange={handleChangeEst} inputProps={{ 'aria-label': 'controlled' }} /*disabled={props.isActualizar}*/ /> 
                        </div>
                    </FormGroup>
                    <div className='alinear-c'>
                        <Button onClick={guardar} color='warning' className='btn-modal-cat' startIcon={<Save />} > {isActualizar ? 'Actualizar' : 'Guardar'} </Button>  
                        <Button type={'submit'}  color='warning' className='btn-modal-cat' onClick={cerrarModal} ><Close />Cerrar</Button>  
                        <br /> 
                    </div>
                </form>
            </Box>
            
        </ModalRadio>
            </>
        )
    }
