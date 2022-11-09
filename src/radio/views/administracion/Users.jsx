import { DataGrid, esES } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { Box, Button, IconButton,Stack, Switch } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormUser } from '../../components/formAdmin/FormUser';
import { AddCircleOutlineOutlined, Block, Edit} from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { useUsersStore } from '../../../hooks/hooksAdministracion/useUsersStore';

const columns = [

  { field: 'idusers', headerClassName: "super", headerName: 'ID', flex: 1, minWidth: 90 },
  { field: 'username', headerClassName: "super", headerName: 'Usuario', flex: 1, minWidth: 90 },
  { field: 'roles_idrol', headerClassName: "super", headerName: 'Rol', flex: 1, minWidth: 90 },
  { field: 'estatus', headerClassName: "super", headerName: 'Estado', flex: 1, minWidth: 90 },
  { field: 'createdAt',headerClassName: "super",headerName: 'Fecha de creacion',flex: 1, minWidth: 90 },
  { field: 'updatedAt',headerClassName: "super",headerName: 'Fecha de actualizacion',flex: 1, minWidth: 90 },
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
function RowMenuCell(event) {  
 
  const { deleteEvent}= useUsersStore();
  const {OpenModal,mostrarActualizar}= useModalHook();
  
  const [state, setState] =useState(
    event.row
  );

  
  const handleChange =async (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    await deleteEvent(state);
  };
  const cambiar =()=>{
    OpenModal();
    mostrarActualizar();

  }
  return (
    <div>
      <IconButton
        onClick={cambiar}
        color="inherit"
        size="small"
        aria-label="edit">
        <Edit color='info'fontSize="small"/>
      </IconButton>
      <IconButton
        color="inherit"
        size="small"
        aria-label="delete">
       <Switch color='info' name="estatus" checked={state.estatus}  onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
      </IconButton>
    </div>
  );
}

export const Users = () => {
  const { events, setActiveEvent, startLoadingEvents } = useUsersStore();

  const { OpenModal } = useModalHook();
  const newRow =()=>{
    setActiveEvent({
      username: '',
      password: "",
      roles_idrol: '',
      estatus: '',
      createdAt:'',
      updatedAt:'',
    })
    OpenModal();
  }
  const onSelect = ( event ) =>  {
    console.log(event.row)
    setActiveEvent( event.row );
  }
  const theme = createTheme(
    {
      palette: {
      primary: { main: '#1976d2' },
      },
    },
    esES,
  );

  useEffect(() => {
    startLoadingEvents()
  }, [])

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
              <FormUser  />
              <Stack direction="row" spacing={1} marginBottom={2}>
                <Button onClick={newRow} color={'info'} variant="outlined" startIcon={<AddCircleOutlineOutlined />}>
                    Nuevo
                </Button>
            </Stack>
              <ThemeProvider theme={theme}>
                <DataGrid
                onCellClick={onSelect}
                  getRowId={(row) => row.idusers}
                  autoHeight={true}
                  rows={events}
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