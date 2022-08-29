import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import  {useState , useEffect} from "react";
import axios from "axios";


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'username', headerName: 'Nombre', width: 130 },
  { field: 'rol', headerName: 'Rol', width: 130 },
  {
    field: 'passwd',
    headerName: 'Contraseña',
    type: 'number',
    width: 90,
  },
  {
    field: 'status',
    headerName: 'Estado',
    width: 160,
  
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
    <Stack direction="row" spacing={1} marginBottom={2}>
      <Button variant="outlined" startIcon={<AddCircleOutlineOutlined color="secondary" />}>
        Nuevo
      </Button>
      
    </Stack>
    <div style={{ height: 750, width: '100%' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={12}
        rowsPerPageOptions={[12]}
        checkboxSelection
      />
    </div>
    </>
  );
}
