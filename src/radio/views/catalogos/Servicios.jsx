import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Box, IconButton, Select } from '@mui/material';

import { ModalRadio } from '../../components/ModalRadio';
import { FormUser } from '../../components/formAdmin/FormUser';
import { Block } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import {FormUpdateUser} from '../../../radio/components/formAdmin/FormUpdateUser'
import { FormServicio } from '../../components/formCat/FormServicio';
import { maxHeight } from '@mui/system';

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

  const { onOpenModal}=useModalHook();
  
  const mensaje = () => {
    console.log("mensaje");
  };
  return (
    <div>
     <FormUpdateUser/>
      <IconButton
        onClick={onOpenModal}
        color="inherit"
        size="small"
        aria-label="delete"
      >
        <Block fontSize="small" />
      </IconButton>
    </div>
  );
}


export const Servicios = () => {

  const [elementos, setElementos] = useState([]);

    const consultar = async() =>{
      await axios.get('http://localhost:8000/api/v0/servicios').then((response)=>{
          //  return setElementos(response.data);
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
              <FormServicio nombre={'Servicio'} color={'warning'}/>
        
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
