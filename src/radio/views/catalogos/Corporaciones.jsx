import { DataGrid,  esES, GridActionsCellItem  } from '@mui/x-data-grid';
import { Box, Button, createTheme, IconButton, Stack, Switch, ThemeProvider } from '@mui/material';
import { AddCircleOutlineOutlined, Block, Close, Done, Edit } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { useEffect, useState } from 'react';
import { useCorporacionesStore } from '../../../hooks/hooksCatalogo/useCorporacionesStore';
import { FormCorporaciones } from '../../components/formCat/FormCorporaciones';

const colorClose=()=>{
  return <Close color='error'/>
}
const colorDone=()=>{
  return <Done color='success'/>
}

export const Corporaciones= () => {
  const { events, setActiveEvent, startLoadingEvents, deleteEvent } = useCorporacionesStore();
  const { OpenModal, mostrarActualizar } = useModalHook();
  const [state, setState] =useState([]);

  useEffect(() => {
    startLoadingEvents()
  }, [])

  const newRow =()=>{
    setActiveEvent({
      nombreCorporacion: '',
      siglasCorporacion: '',
      estatus: '',
      createdAt: '',
      updatedAt: '',
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
  
  esES,
);

const columns = [

  { field: 'idcorporaciones', headerClassName: "super", headerName: 'ID', Width: 90 },
  { field: 'nombreCorporacion',headerClassName: "super", headerName: 'Corporacion', flex: 1, minWidth: 230 },
  { field: 'siglasCorporacion',headerClassName: "super", headerName: 'Siglas', flex: 1, minWidth: 90 },
  { field: 'createdAt',headerClassName: "super",headerName: 'Fecha de creacion',flex: 1, minWidth: 90 },
  { field: 'updatedAt',headerClassName: "super",headerName: 'Fecha de actualizacion',flex: 1, minWidth: 90 },
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
        <Switch color='warning' checked={evento.row.estatus} name="estatus" onChange={(event)=>handleChange(event, evento.row.idcorporaciones)} />
     </IconButton> 
     
  ], 
  }, 
];

  return (
    <>
     <h2 className='colorCat'>CORPORACIONES</h2>
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
        <FormCorporaciones/>
        <Stack direction="row" spacing={1} marginBottom={2}>
                <Button onClick={newRow} color={'warning'} variant="outlined" startIcon={<AddCircleOutlineOutlined />}>
                    Nuevo
                </Button>
            </Stack>
            <ThemeProvider theme={theme}>
      <DataGrid
      onCellClick={onSelect}
      getRowId={(row) => row.idcorporaciones}
      autoHeight={true}
        rows={events}
        columns={columns}
        pageSize={11}
        rowsPerPageOptions={[11]}
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