import * as React from 'react';
import { DataGrid, esES } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import { Box, Button, IconButton,Stack } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormUser } from '../../components/formAdmin/FormUser';
import axios from 'axios';
import { AddCircleOutlineOutlined, Block, Edit} from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';

const columns = [

  { field: 'idusers', headerClassName: "super", headerName: 'ID', flex: 1, minWidth: 90 },
  { field: 'username', headerClassName: "super", headerName: 'Usuario', flex: 1, minWidth: 90 },
  { field: 'email', headerClassName: "super", headerName: 'Correo', flex: 1, minWidth: 90 },
  { field: 'password', headerClassName: "super", headerName: 'Contraseña', flex: 1, minWidth: 90 },
  { field: 'estatus', headerClassName: "super", headerName: 'Estado', flex: 1, minWidth: 90 },
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
  const {OpenModal}=useModalHook();
  return (
    <div>
      <IconButton
        onClick={OpenModal}
        color="inherit"
        size="small"
        aria-label="edit">
        <Edit fontSize="small"/>
      </IconButton>
      <IconButton
        color="inherit"
        size="small"
        aria-label="delete"
      >
        <Block fontSize="small" />
      </IconButton>
    </div>
  );
}
export const Users = () => {
  const { OpenModal } = useModalHook();
  const [tableData, setTableData] = useState([]);
  
  const consultar = async () => {
    await axios.get('http://localhost:8000/api/v0/users').then((response) => {
      return setTableData(response.data);
    });
  };
  useEffect(() => {
    consultar();
  }, []);
  //const rows= Object.entries(tableData);
  const theme = createTheme(
    {
      palette: {
      primary: { main: '#1976d2' },
      },
    },
    esES,
  );
  return (
    <>
      <h2 className='colorAdmin'>USUARIOS
      </h2>
      <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <Box
              sx={{
                height: 750,
                width: "100%",
                "& .super": {
                backgroundColor: "rgba(15, 163, 248, 0.8)",
                }
              }}>
              {/* <Visibility color='warning'/> <Edit color='warning'/> <Block color='warning'/>  */}
              <FormUser />
              <Stack direction="row" spacing={1} marginBottom={2}>
                <Button onClick={OpenModal} color={'info'} variant="outlined" startIcon={<AddCircleOutlineOutlined />}>
                    Nuevo
                </Button>
            </Stack>

              <ThemeProvider theme={theme}>
                <DataGrid
                  getRowId={(row) => row.idusers}
                  autoHeight={true}
                  rows={tableData}
                  columns={columns}
                  pageSize={12}
                  rowsPerPageOptions={[12]}
                  sx={{
                    boxShadow: 5,
                    border: 4,
                    borderColor: 'rgba(15, 163, 248, 0.8)',
                    '& .MuiDataGrid-cell:hover': {
                      color: 'rgba(15, 163, 248, 0.8)',
                    },
                  }}
                />
              </ThemeProvider>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}