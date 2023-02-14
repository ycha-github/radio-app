import { DataGrid,  esES  } from '@mui/x-data-grid';
import { Box, Button, createTheme, IconButton, Stack, Switch, ThemeProvider } from '@mui/material';
import { AddCircleOutlineOutlined, Block, Edit } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { useVehiculosStore } from '../../../hooks/hooksCatalogo/useVehiculosStore';
import { useEffect, useState } from 'react';
import { FormVehiculos } from '../../components/formCat/FormVehiculos';

const columns = [

  { field: 'idvehiculo', headerClassName: "super", headerName: 'ID', flex: 1, minWidth: 90 },
  { field: 'nombreVehiculo', headerClassName: "super", headerName: 'Modelo', flex: 1, minWidth: 90 },
  { field: 'placa', headerClassName: "super", headerName: 'Placa', flex: 1, minWidth: 90 },
  { field: 'color', headerClassName: "super", headerName: 'Color', flex: 1, minWidth: 90 },
  { field: 'anio', headerClassName: "super", headerName: 'Año', flex: 1, minWidth: 90 },
  { field: 'marcas_idmarcas', headerClassName: "super", headerName: 'IdMarca', flex: 1, minWidth: 90 },
  { field: 'estatus', headerClassName: "super", headerName: 'Estatus', flex: 1, minWidth: 90 },
  { field: 'createdAt', headerClassName: "super", headerName: 'Fechadecreacion', flex: 1, minWidth: 90 },
  { field: 'updatedAt', headerClassName: "super", headerName: 'Fechadeactualizacion', flex: 1, minWidth: 90 },
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
  const {deleteEvent}= useVehiculosStore();
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

export const Vehiculos=()=> { 
  const { events, setActiveEvent, startLoadingEvents } = useVehiculosStore();
  
  const { OpenModal } = useModalHook();
  const newRow =()=>{
    setActiveEvent({
      nombreVehiculo:'',
      placa:'',
      color:'',
      anio:'',
      marcas_idmarcas:'',
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
     <h2 className='colorCat'>VEHICULOS</h2>
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
        <FormVehiculos/>
        <Stack direction="row" spacing={1} marginBottom={2}>
                <Button onClick={newRow} color={'warning'} variant="outlined" startIcon={<AddCircleOutlineOutlined />}>
                    Nuevo
                </Button>
            </Stack>
            <ThemeProvider theme={theme}>
      <DataGrid
      onCellClick={onSelect}
      getRowId={(row) => row.idvehiculo}
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
