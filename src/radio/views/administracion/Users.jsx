import { DataGrid, gridClasses, esES, GridActionsCellItem, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { Box, Button, IconButton, styled, Stack, Switch } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormUser } from '../../components/formAdmin/FormUser';
import { AddCircleOutlineOutlined, Block, Close, Done, Edit} from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { useUsersStore } from '../../../hooks/hooksAdministracion/useUsersStore';
 
const colorClose=()=>{
  return <Close color='error'/>
}
const colorDone=()=>{
  return <Done color='success'/>
}

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
  }
}));

export const Users = () => {
  const { events, setActiveEvent, startLoadingEvents,deleteEvent } = useUsersStore();
  const { OpenModal, mostrarActualizar } = useModalHook();
  const [state, setState] =useState([]);

  useEffect(() => {
    startLoadingEvents()
  }, [])

  const newRow =()=>{
    setActiveEvent({
      username: '',
      password: "",
      roles_idrol: '',
      estatus: 1,
      createdAt:'',
      updatedAt:'',
    })
    OpenModal();
  }
  
  function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          p: 0.5,
          pb: 0,
        }}
      >
        <GridToolbarQuickFilter />
      </Box>
    );
  }

  const handleChange =async (event,r) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    //setState(event.target.checked);
    await deleteEvent(r);
  };

  const cambiar = ( ) =>  {
    OpenModal();
    mostrarActualizar();
  }

  const onSelect = ( event ) =>  {
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

  const columns = [

    { field: 'idusers', headerClassName: "super", headerName: 'ID', flex: 1, minWidth: 90 },
    { field: 'username', headerClassName: "super", headerName: 'Usuario', flex: 1, minWidth: 90 },
    { field: 'rol', headerClassName: "super", headerName: 'Rol', flex: 1, minWidth: 90 },
    { field: 'createdAt',headerClassName: "super",headerName: 'Fecha de creacion',flex: 1, minWidth: 90 },
    { field: 'updatedAt',headerClassName: "super",headerName: 'Fecha de actualizacion',flex: 1, minWidth: 90 },
    { field: 'estatus',type: 'boolean', headerClassName: "super", headerName: 'Estado', flex: 1, minWidth: 90 },
    {
      field: 'actions',
      type: 'actions',
      headerClassName: "super",
      flex: 1,
      minWidth: 120,
      getActions: (evento) => [
        <GridActionsCellItem
        color="info"
          icon={<Edit />}
          label="Delete"
          onClick={cambiar}
        />,
        <IconButton
        color="inherit"
        size="small"
        aria-label="delete"
        >
          <Switch color='info' checked={evento.row.estatus} name="estatus" onChange={(event)=>handleChange(event, evento.row.idusers)} />
       </IconButton> 
       
    ], 
    },
  ];
  

  return (
    <>
      <h2 className='colorAdmin'>USUARIOS DEL SISTEMA</h2>
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

                <StripedDataGrid
                  onCellClick={onSelect}
                  getRowId={(row) => row.idusers}
                  getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 !== 0 ? 'even' : 'odd'
                  }
                  autoHeight={true}
                  rows={events}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  components={{
                    Toolbar: QuickSearchToolbar ,
                    BooleanCellFalseIcon:colorClose,
                    BooleanCellTrueIcon:colorDone
                  }}
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