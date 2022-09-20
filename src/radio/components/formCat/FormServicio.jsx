
import { useState } from 'react';
import { Box, Button, Checkbox, Container, FormGroup, FormLabel, Input, Stack, Switch, TextField } from '@mui/material';
import { ModalRadio } from '../ModalRadio';
import { AddCircleOutlineOutlined,  Save } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import axios from "axios";

export const FormServicio = (props) => {
    //const [isOpen1, onCloseModal1, onOpenModal1] = useModalHook();
    const {OpenModal}=useModalHook();
    const [nombreServicio, setNombreServicio] = useState('');
    const [descripcionServicio, setDescripcionServicio] = useState('');
    const [estatusServicio, setEstatusServicio] = useState(true);
    const [checked, setChecked] = useState(true);
    
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

  const guardar = () => {
    console.log('guardado!');
    let datosServicios = {
        nombreServicios: nombreServicio,
        descripcion: descripcionServicio,
        estatus: estatusServicio
    };
    console.log(datosServicios);
    
    axios.post('http://localhost:8000/api/v0/servicios', datosServicios).then((response)=> {
        if(response.data.insertId){
          alert('Guardado!');
          e.prevent.default;
        }            
    });
};


  return (
      <>
        <Stack direction="row" spacing={1} marginBottom={2}>
            <Button onClick={OpenModal} color={props.color} variant="outlined" startIcon={<AddCircleOutlineOutlined />}>
                Nuevo
            </Button>
        </Stack>
        <ModalRadio  className='modal2' >
            <Box className='box-modal'>
            <h3 className='alinear-c franja'> Nuevo {props.nombre} </h3>
            <br />

            <form className='container'>
                <FormGroup>
                    <Input id="my-input" type='text' placeholder="Nombre" name='nombre' required autoFocus 
                        onChange={handleChangeNom}/>
                </FormGroup>
                <FormGroup>
                    <Input id="my-input" type='text' placeholder="Descripción" name='descripcion' required 
                        onChange={handleChangeDes } />
                </FormGroup>
                <FormGroup>
                    <div className='alineado-c'>
                    {/* <FormLabel>Estatus:</FormLabel>
                    <Checkbox onChange={(e) => { setEstatusServicio(e.target.checked); } }/>Activo */}
                    <FormLabel > Estatus: </FormLabel>
                    <Switch color='warning' checked={checked} onChange={handleChangeEst} inputProps={{ 'aria-label': 'controlled' }} /> 
                    </div>
                </FormGroup>
                <div className='alineado-c'>
                <Button type={'submit'}  color='warning' className='btn-modal-cat' onClick={guardar} ><Save />Guardar</Button>
                <br />
                </div>
            </form>
            </Box>
            
        </ModalRadio>
    </>
  )
}
