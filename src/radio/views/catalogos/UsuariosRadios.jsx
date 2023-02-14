import { DataGrid,  esES  } from '@mui/x-data-grid';
import { Box, Button, createTheme, IconButton, Stack, Switch, ThemeProvider } from '@mui/material';
import { AddCircleOutlineOutlined, Block, Edit } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { useUsuariosStore } from '../../../hooks/hooksCatalogo/useUsuariosStore';
import { useEffect, useState } from 'react';
import { FormUsuarios } from '../../components/formCat/FormUsuarios';

const columns = [

  { field: 'idusuarios', headerClassName: "super", headerName: 'ID', flex: 1, minWidth: 90 },
  { field: 'nombre',headerClassName: "super", headerName: 'Nombre', flex: 1, minWidth: 90 },
  { field: 'apellido_pat',headerClassName: "super", headerName: 'Apellido Paterno', flex: 1, minWidth: 90 },
  { field: 'apellido_mat',headerClassName: "super", headerName: 'Apellido Materno', flex: 1, minWidth: 90 },
  { field: 'cuip',headerClassName: "super", headerName: 'Cuip', flex: 1, minWidth: 90 },
  { field: 'clave_elector',headerClassName: "super", headerName: 'Clave Elector', flex: 1, minWidth: 90 },
  { field: 'imagen_ine',headerClassName: "super", headerName: 'Imagen Ine', flex: 1, minWidth: 90 },
  { field: 'imagen_cuip',headerClassName: "super", headerName: 'Imagen Cuip', flex: 1, minWidth: 90 },
  { field: 'titulo',headerClassName: "super", headerName: 'Titulo', flex: 1, minWidth: 90 },
  { field: 'estatus',headerClassName: "super", headerName: 'Estatus', flex: 1, minWidth: 90 },
  { field: 'createdAt',headerClassName: "super",headerName: 'Fecha de creacion',flex: 1, minWidth: 90 },
  { field: 'updatedAt',headerClassName: "super",headerName: 'Fecha de actualizacion',flex: 1, minWidth: 90 },
  {
    field: 'actions',
    headerName: 'Actions',
    renderCell: RowMenuCell,
    sortable: false,
    width: 140,
    headerClassName: "super",
    headerAlign: 'center',
    filterable: false,
    align: 'center',
    disableColumnMenu: true,
    disableReorder: true,
  },
];

function RowMenuCell( event) {
  const {deleteEvent}= useUsuariosStore();
  const {OpenModal, mostrarActualizar}=useModalHook();
  const [state, setState] =useState(
    event.row
  );
  
  const handleChange =async (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    await deleteEvent(state);
  };

  const cambiar = ( ) =>  {
    OpenModal();
    mostrarActualizar();
  }
  return (
    <div>
      <IconButton
        onClick={ cambiar }
        color="inherit"
        size="small"
        aria-label="edit">
        <Edit fontSize="small"/>
      </IconButton>
      <IconButton
      onClick={deleteEvent}
        color="inherit"
        size="small"
        aria-label="delete">
        <Block fontSize="small"/>
      </IconButton>
      <IconButton
        color="inherit"
        size="small"
        aria-label="delete">
       <Switch color='warning' name="estatus" checked={state.estatus}  onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
      </IconButton>
    </div>
  );
}

export const UsuariosRadios= () => {
  const { events, setActiveEvent, startLoadingEvents } = useUsuariosStore();
  
  const { OpenModal } = useModalHook();
  const newRow =()=>{
    setActiveEvent({
      nombre:'',
      apellido_pat:'',
      apellido_mat:'',
      cuip:'',
      clave_elector:'',
      imagen_ine:'',
      imagen_cuip:'',
      titulo:'',
      estatus:'',
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
     <h2 className='colorCat'>Usuarios</h2>
     <div style={{ height: 400, width: '100%' }}>
    <div style={{ height: 'flex', width: '100%' }}>
    <div style={{ flexGrow: 1 }}>
      <Box
       sx={{
        height:750,
        width: "100%",
        "& .super":{
          backgroundColor: "rgba(228, 125, 35, 1)",
        }
      }}>
      {/* <Visibility color='warning'/> <Edit color='warning'/> <Block color='warning'/>  */}
        <FormUsuarios/>
        <Stack direction="row" spacing={1} marginBottom={2}>
                <Button onClick={newRow} color={'warning'} variant="outlined" startIcon={<AddCircleOutlineOutlined />}>
                    Nuevo
                </Button>
            </Stack>
            <ThemeProvider theme={theme}>
      <DataGrid
      onCellClick={onSelect}
      getRowId={(row) => row.idusuarios}
      autoHeight={true}
        rows={events}
        columns={columns}
        pageSize={11}
        rowsPerPageOptions={[11]}
        sx={{
          boxShadow:5,
          border:4,
          borderColor:'rgba(228, 125, 35, 1)',
          '& .MuiDataGrid-cell:hover':{
          color:'rgba(228, 125, 35, 1)',
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
