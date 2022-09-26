
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import { Box, Button, FormGroup, FormLabel, Input, Stack, Switch } from '@mui/material';
import { ModalRadio } from '../ModalRadio';
import { AddCircleOutlineOutlined,  Save } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';

export const FormServicio = (props) => {
    //const [isOpen1, onCloseModal1, onOpenModal1] = useModalHook();
    const {OpenModal}=useModalHook();
    const {CloseModal}=useModalHook();
    const [nombreServicio, setNombreServicio] = useState('');
    const [descripcionServicio, setDescripcionServicio] = useState('');
    const [estatusServicio, setEstatusServicio] = useState(true);
    const [checked, setChecked] = useState(true);
    //const [isActualizar, setIsActualizar]     = useState();

    const [idActualizar, setIdActualizar]     = useState('');

    // const { isActualizar } = useSelector( );



    
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

    

    const guardar = (e) => {
        e.prevent.default;
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
        if(props.isActualizar){
            ejecutarActualizacion(datosServicios);
        }else{
            axios.post('http://localhost:8000/api/v0/servicios', datosServicios).then((response)=> {
                if(response.data.insertId){
                    alert('Guardado!');
                }            
            });
        }
    };

    const ejecutarActualizacion = (datosServicios) => {
        datosServicios['id'] = idActualizar;

        axios.put('http://localhost:8000/api/v0/servicios', datosServicios).then((response) => {
            if(response.data.affectedRows){
                consultar();
               
                alert('Actualizado!');
                document.getElementById('formServ').reset();
            }
        });
    };


    return (
      <>
        <Stack direction="row" spacing={1} marginBottom={2}>
            <Button onClick={OpenModal} color={props.color}  variant="outlined" startIcon={<AddCircleOutlineOutlined />}>
                Nuevo
            </Button>
        </Stack>
        <ModalRadio  className='modal2' >
            <Box className='box-modal'>
                <h3 className='alinear-c franja'> Nuevo {props.nombre} <span className='color-red'>{props.nuevo}</span> </h3>
                <br />

                <form className='container' onSubmit={guardar} id={'formServ'} >
                    <FormGroup>
                        <Input id="my-input" type='text' placeholder="Nombre" name='nombre' required autoFocus 
                            onChange={handleChangeNom} /*disabled={props.isActualizar}*/ />
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
                    <button >Guardar</button>
                    {/* <button onClick={props.close}> Cerrar</button> */}
                    {/* <Button type={'submit'}  color='warning' className='btn-modal-cat' onClick={() => {actualizar} } ><Save />Actualizar</Button> 
                    <Button type={'submit'}  color='warning' className='btn-modal-cat' onClick={() => {guardar}} ><Save />Guardar</Button>  */}
                    <br /> 
                    </div>
                </form>
            </Box>
            
        </ModalRadio>
            </>
        )
    }
