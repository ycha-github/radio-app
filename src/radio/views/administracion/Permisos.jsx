import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import  {useState , useEffect} from "react";
import { Box } from '@mui/material';
import { ModalRadio } from '../../components/ModalRadio';
import { FormUser } from '../../components/formAdmin/FormUser';
import axios from 'axios';


const columns = [

  { field: 'idusers', headerClassName: "super", headerName: 'ID', width: 90,  },
  { field: 'username',headerClassName: "super", headerName: 'Nombre', width: 200 },
  { field: 'email',headerClassName: "super", headerName: 'Rol', width: 130 },
  { field: 'password',headerClassName: "super", headerName: 'Contraseña', width: 200 },
  {field: 'estatus',headerClassName: "super",headerName: 'Estado',width: 1009,},

];

export const Permisos=()=> { 

  const [tableData, setTableData] = useState([])

//  useEffect(() => {
//    fetch("http://localhost:8000/api/v0/users")
//      .then((data) => data.json())
//      .then((data) => setTableData(data))
//  }, [])
//   console.log(tableData);
 

const consultar = async() =>{
 await axios.get('http://localhost:8000/api/v0/users').then((response)=>{
     return setTableData(response.data);
  
 });console.log(tableData);
};
useEffect(()=>{
 consultar();
}, []);
 //const rows= Object.entries(tableData);
  return (
    <>
     <h2 className='colorAdmin'>USUARIOS</h2>
     
    <div style={{ height: '100%', width: '100%' }}>
      <Box
       sx={{
        height:750,
        width: "100%",
        "& .super":{
          backgroundColor: "rgba(15, 163, 248, 0.8)",
        }

      }}> 
      {/* <Visibility color='warning'/> <Edit color='warning'/> <Block color='warning'/>  */}
        <FormUser/>
      
      <DataGrid
      getRowId={(row) => row.idusers}
      autoHeight={true}
        rows={tableData}
        columns={columns}
        pageSize={12}
        rowsPerPageOptions={[12]}
        sx={{
          boxShadow:5,
          border:4,
          borderColor:'rgba(15, 163, 248, 0.8)',
          '& .MuiDataGrid-cell:hover':{
          color:'rgba(15, 163, 248, 0.8)',
        },
      }}
      />
      </Box>
     
        
    </div>
    </>
  );
}

