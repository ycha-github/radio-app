import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Stack, Table, TablePagination } from '@mui/material';
import { AddCircleOutlineOutlined, Block, Edit, Visibility } from '@mui/icons-material';


export const Servicios = () => {

  const [elementos, setElementos] = useState([]);
  // const [page, setPage] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState(2);
  
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };
    
    useEffect(()=> {         
        const consultar = async () =>{
            const resp = await axios.get('http://localhost:3001/servicios').then((response)=> {
                return setElementos(response.data);                          
            });
        }; 
        consultar();     
    });

    
  return (
    <>
        <h2 >Servicios</h2>
 
    <Stack direction="row" spacing={1} marginBottom={2}>
      <Button variant="outlined" startIcon={<AddCircleOutlineOutlined />} color="warning" >
        Nuevo
      </Button>
      
    </Stack>

    <div style={{ height: 750, width: '100%' }}>
      <Table>
        <thead align='left' >
          <tr>
            <th >Id</th>
            <th >Nombre</th>
            <th >Descripcion</th>
            <th >Estatus</th>
            <th >Acciones</th>
          </tr>
        </thead>
        <tbody align='left'>
          {
            elementos.map((element) => {
              return (<tr>
                          <td>{ element.id_servicio }</td>
                          <td>{ element.nombre }</td>
                          <td>{ element.descripcion }</td>
                          <td>{ (element.status.data) == 1 ? 'Activo' : 'Inactivo' }</td>
                          <td>  <Visibility color='warning'/> <Edit color='warning'/> <Block color='warning'/> </td>
                      </tr>) 
                     {/* return console.log(element);  */}
            })
          }
        </tbody>
      </Table>
    </div>
    {/* <Stack spacing={2}>
      <TablePagination component="div" count={10} page={page} onPageChange={handleChangePage} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleChangeRowsPerPage} />
    </Stack> */}
  
    </>
  );
}
