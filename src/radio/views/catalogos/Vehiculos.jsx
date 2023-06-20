import { useEffect, useState } from 'react';
import { DataGrid,  esES, GridActionsCellItem  } from '@mui/x-data-grid';
import { Box, Button, createTheme, IconButton, Stack, Switch, ThemeProvider } from '@mui/material';
import { AddCircleOutlineOutlined, Close, Done, Edit } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { useVehiculosStore } from '../../../hooks/hooksCatalogo/useVehiculosStore';
import { FormVehiculos } from '../../components/formCat/FormVehiculos';

const colorClose=()=>{
  return <Close color='error'/>
}
const colorDone=()=>{
  return <Done color='success'/>
}

export const Vehiculos=()=> { 

  const { events, setActiveEvent, startLoadingEvents, deleteEvent } = useVehiculosStore();
  const { OpenModal, mostrarActualizar } = useModalHook();
  const [state, setState] =useState([]);

  useEffect(() => {
    startLoadingEvents()
  }, [])

  const newRow =()=>{
    setActiveEvent({
      marcas_idmarcas:'',
      anio:'',
      tipo:'',
      color:'',
      placa:'',
      unidad:'',
      fk_zonaregion:'',
      estatus:'',
      createdAt:'',
      updatedAt:'',
    })
    OpenModal();
  }

  const handleChange =async (event,r) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    await deleteEvent(r);
  };

  const cambiar = ( ) =>  {
    OpenModal();
    mostrarActualizar();
  }

  const onSelect = ( event ) =>  {
    console.log(event.row)
    setActiveEvent( event.row );
  }
 const theme = createTheme(
  esES,
);


  const columns = [

    { field: 'idvehiculo' ,headerClassName: "super", headerName: 'ID', flex: 1, minWidth: 90 },
    { field: 'nombreMarcas', headerClassName: "super", headerName: 'Marca', flex: 1, minWidth: 90 },
    { field: 'nombreModelos', headerClassName: "super", headerName: 'Línea', flex: 1, minWidth: 90 },
    { field: 'anio', headerClassName: "super", headerName: 'Año', flex: 1, minWidth: 90 },
    { field: 'tipo', headerClassName: "super", headerName: 'Tipo', flex: 1, minWidth: 90 },
    { field: 'color', headerClassName: "super", headerName: 'Color', flex: 1, minWidth: 90 },
    { field: 'placa', headerClassName: "super", headerName: 'Placa', flex: 1, minWidth: 90 },
    { field: 'unidad', headerClassName: "super", headerName: 'Unidad', flex: 1, minWidth: 90 },
    { field: 'nombreZonasRegiones', headerClassName: "super", headerName: 'Zona/Región', flex: 1, minWidth: 90 },
    { field: 'createdAt', headerClassName: "super", headerName: 'Fechadecreacion', flex: 1, minWidth: 90 },
    { field: 'updatedAt', headerClassName: "super", headerName: 'Fechadeactualizacion', flex: 1, minWidth: 90 },
    { field: 'estatus', type: 'boolean', headerClassName: "super", headerName: 'Estatus', flex: 1, minWidth: 90 },
    {
      field: 'actions',
      type: 'actions',
      headerClassName: "super",
      flex: 1,
      minWidth: 120,
      getActions: (evento) => [
        <GridActionsCellItem
        icon={<Edit />}
        label="Editar"
        color='warning'
        onClick={cambiar}
      />,
      
      <IconButton
      color="inherit"
      size="small"
      aria-label="delete"
      >
        <Switch color='warning' checked={evento.row.estatus} name="estatus" onChange={(event)=>handleChange(event, evento.row.idvehiculo)} />
     </IconButton> 
      ],
    },
  ];

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
        pageSize={12}
        rowsPerPageOptions={[12]}
        components={{
          BooleanCellFalseIcon:colorClose,
          BooleanCellTrueIcon:colorDone
        }}
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
