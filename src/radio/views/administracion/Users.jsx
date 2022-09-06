import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import { Box, IconButton } from '@mui/material';

import { ModalRadio } from '../../components/ModalRadio';
import { FormUser } from '../../components/formAdmin/FormUser';
import axios from 'axios';
import { Block} from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { FormUpdateUser } from '../../../radio/components/formAdmin/FormUpdateUser'
const columns = [

  { field: 'idusers', headerClassName: "super", headerName: 'ID', flex: 1, minWidth: 90 },
  { field: 'username', headerClassName: "super", headerName: 'Nombre', flex: 1, minWidth: 90 },
  { field: 'email', headerClassName: "super", headerName: 'Rol', flex: 1, minWidth: 90 },
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

  const { onOpenModal } = useModalHook();
  return (
    <div>
      <FormUpdateUser />
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
export const Users = () => {

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
  return (
    <>
      <h2 className='colorAdmin'>USUARIOS</h2>

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
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}