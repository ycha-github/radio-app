import { DataGrid,  esES, GridActionsCellItem, GridToolbarQuickFilter  } from '@mui/x-data-grid';
import { Box, Button, createTheme, IconButton, Stack, Switch, ThemeProvider } from '@mui/material';
import { AddCircleOutlineOutlined, Block, Close, Done, Edit } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { useMarcasStore } from '../../../hooks/hooksCatalogo/useMarcasStore';
import { useEffect, useState } from 'react';
import { FormMarcas } from '../../components/formCat/FormMarcas';

const colorClose=()=>{
  return <Close color='error'/>
}
const colorDone=()=>{
  return <Done color='success'/>
}

export const Marcas= () => {
  const { events, setActiveEvent, startLoadingEvents, deleteEvent } = useMarcasStore();
  const { OpenModal, mostrarActualizar } = useModalHook();
  const [state, setState] =useState([]);

  useEffect(() => {
    startLoadingEvents()
  }, [])

  const newRow =()=>{
    setActiveEvent({
      nombreMarcas:'',
      nombreModelos:'',
      tipo: "",
      estatus:1,
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

// const newTipo = 

const columns = [

  { field: 'idmarcas', headerClassName: "super", headerName: 'ID', flex: 1, minWidth: 90 },
  { field: 'nombreMarcas',headerClassName: "super", headerName: 'Marcas', flex: 1, minWidth: 90 },
  { field: 'nombreModelos',headerClassName: "super", headerName: 'Línea', flex: 1, minWidth: 90 },
  { field: 'tipo', valueGetter: ({ value }) => value===1 ? "Vehiculo" : value===2 ? "Radio" : value===3 ? "Accesorio": "No existe" , headerClassName: "super", headerName: 'Tipo', flex: 1, minWidth: 90 },
  { field: 'createdAt',headerClassName: "super",headerName: 'Fecha de creacion',flex: 1, minWidth: 90 },
  { field: 'updatedAt',headerClassName: "super", headerName: 'Fecha de actualizacion',flex: 1, minWidth: 90 },
  { field: 'estatus',type: 'boolean',headerClassName: "super", headerName: 'Estatus', flex: 1, minWidth: 90 },
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
        color="warning"
        onClick={cambiar}
      />,
      <IconButton
      color="inherit"
      size="small"
      aria-label="delete"
      >
        <Switch color='warning' checked={evento.row.estatus} name="estatus" onChange={(event)=>handleChange(event, evento.row.idmarcas)} />
     </IconButton> 
  ], 
  }, 
];

  return (
    <>
     <h2 className='colorCat'>MARCAS</h2>
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
        <FormMarcas/>
        <Stack direction="row" spacing={1} marginBottom={2}>
                <Button onClick={newRow} color={'warning'} variant="outlined" startIcon={<AddCircleOutlineOutlined />}>
                    Nuevo
                </Button>
            </Stack>
            <ThemeProvider theme={theme}>
      <DataGrid
      onCellClick={onSelect}
      getRowId={(row) => row.idmarcas}
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