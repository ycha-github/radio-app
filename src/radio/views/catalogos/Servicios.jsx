import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Box, IconButton, Switch } from '@mui/material';

import { ModalRadio } from '../../components/ModalRadio';
import { FormUser } from '../../components/formAdmin/FormUser';
import { Block, Edit } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import {FormUpdateUser} from '../../../radio/components/formAdmin/FormUpdateUser'
import { FormServicio } from '../../components/formCat/FormServicio';



const columns = [
  { field: 'idservicios', headerClassName: "super", headerName: 'ID', flex:1, minWidth: 90 },
  { field: 'nombreServicios', headerClassName: "super", headerName: 'Nombre', flex:1, minWidth: 90 },
  { field: 'descripcion', headerClassName: "super", headerName: 'Descripción', flex:1, minWidth: 90 },
  { field: 'estatus', headerClassName: "super", headerName: 'Estado', flex:1, minWidth: 90 },
  {
    field: 'actions',
    headerName: 'Actions',
    renderCell: RowMenuCell,
    sortable: false,
    width: 100,
    headerClassName: "super",
    headerAlign: 'center',
    filterable: false,
    align: 'center',
    disableColumnMenu: true,
    disableReorder: true,
  },
];



function RowMenuCell(props) { 

  const { OpenModal}=useModalHook();
  
  const [checked, setChecked] = useState(true);
  // const [isActualizar, setIsActualizar]     = useState(true);
  const  isActualizar  = useSelector( state => state.servicios );
//   const [idActualizar, setIdActualizar]     = useState('');
  
//   const actualizar = () => {
//     console.log('guardado!');
//     setIdActualizar()
//     setIsActualizar(true)
//     let datosServicios = {
//       nombreServicios: nombreServicio,
//       descripcion: descripcionServicio,
//       estatus: estatusServicio
//     };
//     console.log(datosServicios);
    
//     axios.put('http://localhost:8000/api/v0/servicios', datosServicios).then((response)=> {
//         if(response.data.actualizarId){
//           alert('Guardado!');
//           e.prevent.default;
//         }            
//     });
// };


const handleChangeEst = (e) => {
  setChecked(e.target.checked);
};

const handleChangeAct = (e) => {
    //setIsActualizar(true);
    OpenModal();
    // isActualizar
    //console.log(isActualizar)
};



  const mensaje = () => {
    console.log("mensaje");
  };
  return (
    <div>
      <IconButton
        onClick={handleChangeAct}
        color="inherit"
        size="small"
        aria-label="edit" >
        <Edit fontSize="small" color='warning'  />
      </IconButton>
     
      <IconButton
        
        color="inherit"
        size="small"
        aria-label="delete"
      >
        <Switch color='warning' checked={checked} onChange={handleChangeEst} inputProps={{ 'aria-label': 'controlled' }} />
        {/* <Block fontSize="small" /> */}
      </IconButton>
    </div>
  );
}


export const Servicios = () => {

  const {CloseModal}=useModalHook();
  const [elementos, setElementos] = useState([]);
  // const [isActualizar, setIsActualizar]     = useState();

  const nuevo = (elementos.length) + 1;
 
  const handleChangeClose = async () => {
    setIsActualizar(false);
    CloseModal();
   console.log(isActualizar)
  };

    const consultar = async() =>{
      await axios.get('http://localhost:8000/api/v0/servicios').then((response)=>{
           return setElementos((response.data).reverse());
      });
     };
     useEffect(()=>{
      consultar();
     }, []);

    
  return (
    <>
      <h2 className='colorCat'>SERVICIOS</h2>
      
      <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <Box
              sx={{
                height:750,
                width: "100%",
                "& .super":{
                  backgroundColor: "rgba(228, 125, 35, 1)",
                  color:'white',
                }
              }}> 
            {/* <Visibility color='warning'/> <Edit color='warning'/> <Block color='warning'/>  */}
            <FormServicio nombre={'Servicio'} color={'warning'} nuevo={nuevo} /*opcion={isActualizar}*/ close={handleChangeClose} />
        
            <DataGrid
              getRowId={(row) => row.idservicios}
              autoHeight={true}
              rows={elementos}
              columns={columns}
              pageSize={12}
              rowsPerPageOptions={[12]}
              sx={{
                boxShadow:5,
                border:4,
                borderColor:'rgba(228, 125, 35, 1)',
                  '& .MuiDataGrid-cell:hover':{
                  color:'rgba(228, 125, 35, 1)',
                },
              }}
            />
            </Box>    
          </div>
        </div>
      </div>
    </>
  );
}
