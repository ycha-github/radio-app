import { DataGrid,  esES, GridActionsCellItem  } from '@mui/x-data-grid';
import { Box, Button, createTheme, IconButton, Stack, Switch, ThemeProvider } from '@mui/material';
import { AddCircleOutlineOutlined, Block, Close, Done, Edit } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { useRadiosStore } from '../../../hooks/hooksCatalogo/useRadiosStore';
import { useEffect, useState } from 'react';
import { FormRadios } from '../../components/formCat/FormRadios';

const colorClose=()=>{
  return <Close color='error'/>
}
const colorDone=()=>{
  return <Done color='success'/>
}

export const Radios= () => {
  const { events, setActiveEvent, startLoadingEvents, deleteEvent } = useRadiosStore();
  const { OpenModal, mostrarActualizar } = useModalHook();
  const [state, setState] =useState([]);
  

  useEffect(() => {
    startLoadingEvents()
  }, [])
  
  const newRow =()=>{
    setActiveEvent({
      tipo :'',
      serie :'',
      logico :'',
      inventario_interno :'',
      inventario_segpub :'',
      fk_propietario :'',
      fk_recurso_compra :'',
      contrato_compra :'',
      rfsi :'',
      fk_marca :'',
      fecha_actualizacion :'',
      fecha_asignacion :'',
      observaciones :'',
      fecha_recepcion :'',
      fk_sue :'',
      estatus :'',
      createdAt :'',
      updatedAt :'',
    })
    OpenModal();
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

const columns = [

  { field: 'idradios', headerClassName: "super", headerName: 'ID', width: 90 },
   { field: 'tipo',type: 'string',headerClassName: "super", headerName: 'Tipo Equipo', flex: 1, minWidth: 90 },
  { field: 'serie',headerClassName: "super", headerName: 'Serie', flex: 1, minWidth: 90 },
  { field: 'logico',headerClassName: "super", headerName: 'Logico', flex: 1, minWidth: 90 },
  { field: 'inventario_interno',headerClassName: "super", headerName: 'Invent. Interno', flex: 1, minWidth: 90 },
  { field: 'inventario_segpub',headerClassName: "super", headerName: 'Invent. Seg.Pub.', flex: 1, minWidth: 90 },
  { field: 'nombreCorporacion',headerClassName: "super", headerName: 'Propietario', flex: 1, minWidth: 90 },
  { field: 'nombreRecursoCompra',headerClassName: "super", headerName: 'Recurso Compra', flex: 1, minWidth: 90 },
  { field: 'contrato_compra',headerClassName: "super", headerName: 'Contrato', flex: 1, minWidth: 90 },
  { field: 'rfsi',headerClassName: "super", headerName: 'RFSI', flex: 1, minWidth: 90 },
  { field: 'nombreMarcas',headerClassName: "super", headerName: 'Marca', flex: 1, minWidth: 90 },
  { field: 'fecha_actualizacion',headerClassName: "super", headerName: 'Fecha Actua.', flex: 1, minWidth: 90 },
  { field: 'fecha_asignacion',headerClassName: "super", headerName: 'Fecha Asign.', flex: 1, minWidth: 90 },
  { field: 'observaciones',headerClassName: "super", headerName: 'Observaciones', flex: 1, minWidth: 90 },
  { field: 'fecha_recepcion',headerClassName: "super", headerName: 'Fecha Recepcion', flex: 1, minWidth: 90 },
  { field: 'nombreStatus',headerClassName: "super", headerName: 'SUE', flex: 1, minWidth: 90 },
  { field: 'estatus',type: 'boolean',headerClassName: "super", headerName: 'Estatus', flex: 1, minWidth: 90 },
  { field: 'createdAt',headerClassName: "super",headerName: 'Fecha de creacion',flex: 1, minWidth: 90 },
  { field: 'updatedAt',headerClassName: "super",headerName: 'Fecha de actualizacion',flex: 1, minWidth: 90 },
  {
    field: 'actions',
    type: 'actions',
    headerClassName: "super",
    flex: 1,
    minWidth: 120,
    getActions: (evento) => [
      <GridActionsCellItem
        icon={<Edit />}
        label="Delete"
        onClick={cambiar}
      />,
      
      <IconButton
      color="inherit"
      size="small"
      aria-label="delete"
      >
        <Switch color='warning' checked={evento.row.estatus} name="estatus" onChange={(event)=>handleChange(event, evento.row.idradios)} />
     </IconButton> 
  ], 
  }, 
];

  return (
    <>
     <h2 className='colorCat'>RADIOS</h2>
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
        <FormRadios/>
        <Stack direction="row" spacing={1} marginBottom={2}>
                <Button onClick={newRow} color={'warning'} variant="outlined" startIcon={<AddCircleOutlineOutlined />}>
                    Nuevo
                </Button>
            </Stack>
            <ThemeProvider theme={theme}>
      <DataGrid
      onCellClick={onSelect}
      getRowId={(row) => row.idradios}
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
