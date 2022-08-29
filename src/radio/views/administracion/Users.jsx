import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import  {useState , useEffect} from "react";
import axios from "axios";
import { Box } from '@mui/material';

const columns = [

  { field: 'id', headerClassName: "super", headerName: 'ID', width: 70, color: 'info' },
  { field: 'username',headerClassName: "super", headerName: 'Nombre', width: 200 },
  { field: 'rol',headerClassName: "super", headerName: 'Rol', width: 130 },
  { field: 'passwd',headerClassName: "super", headerName: 'Contraseña', width: 200 },
  {
    field: 'status',headerClassName: "super",
    headerName: 'Estado',
    width: 500,
  
  },
];

export const Users=()=> {

 
  
  const [tableData, setTableData] = useState([])

 useEffect(() => {
   fetch("http://localhost:3001/usuario")
     .then((data) => data.json())
     .then((data) => setTableData(data))
 }, [])
  console.log(tableData)
  ;
// useEffect(() => {
//    axios.get("http://localhost:3001/usuario")
//  .then((response) => {
//      setTableData = response.data.json();
//      console.log(setTableData);
//   });
//});

  return (
    <>
     <h2 className='colorAdmin'>USUARIOS</h2>
    <Stack direction="row" spacing={1} marginBottom={2}>
      <Button color={'info'} variant="outlined" startIcon={<AddCircleOutlineOutlined  />}>
        Nuevo
      </Button>
      
    </Stack>
    <div style={{ height: 750, width: '100%' }}>
      <Box
       sx={{
        height: 300,
        width: "100%",
        "& .super":{
          backgroundColor: "rgba(15, 163, 248, 0.8)",
        }
      }}>
      <DataGrid
        colo
        rows={tableData}
        columns={columns}
        pageSize={12}
        rowsPerPageOptions={[12]}
        checkboxSelection
      />
      </Box>
    </div>
    </>
  );
}
