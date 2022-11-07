
import { DataGrid,  esES  } from '@mui/x-data-grid';
import { Box, Button, createTheme, IconButton, Stack, ThemeProvider } from '@mui/material';
import { AddCircleOutlineOutlined, Block, Edit } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { FormZonasReg } from '../../components/formCat/FormZonasReg';
import { useZonasStore } from '../../../hooks/hooksCatalogo/useZonasStore';
import { useEffect } from 'react';

const columns = [

  { field: 'idzonasregiones', headerClassName: "super", headerName: 'ID', flex: 1, minWidth: 90 },
  { field: 'nombreZonasRegiones',headerClassName: "super", headerName: 'Zona', flex: 1, minWidth: 90 },
  { field: 'descripcionZonasRegiones',headerClassName: "super", headerName: 'Descripcion', flex: 1, minWidth: 90 },
  { field: 'estatus',headerClassName: "super", headerName: 'Estatus', flex: 1, minWidth: 90 },
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

function RowMenuCell( event) {
  const { deleteEvent}= useZonasStore();
  const {OpenModal, mostrarActualizar}=useModalHook();

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
    </div>
  );
}

export const ZonasRegiones= () => {
  const { events, setActiveEvent, startLoadingEvents } = useZonasStore();
  const { OpenModal } = useModalHook();
  const newRow =()=>{
    setActiveEvent({
      nombreZonasRegiones:'',
      descripcionZonasRegiones:'',
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
     <h2 className='colorAdmin'>ZONAS-REGIONES</h2>
     <div style={{ height: 400, width: '100%' }}>
    <div style={{ height: 'flex', width: '100%' }}>
    <div style={{ flexGrow: 1 }}>
      <Box
       sx={{
        height:750,
        width: "100%",
        "& .super":{
          backgroundColor: "rgba(15, 163, 248, 0.8)",
        }
      }}>
      {/* <Visibility color='warning'/> <Edit color='warning'/> <Block color='warning'/>  */}
        <FormZonasReg/>
        <Stack direction="row" spacing={1} marginBottom={2}>
                <Button onClick={newRow} color={'info'} variant="outlined" startIcon={<AddCircleOutlineOutlined />}>
                    Nuevo
                </Button>
            </Stack>
            <ThemeProvider theme={theme}>
      <DataGrid
      onCellClick={onSelect}
      getRowId={(row) => row.idzonasregiones}
      autoHeight={true}
        rows={events}
        columns={columns}
        pageSize={12}
        rowsPerPageOptions={[12]}
        sx={{
          boxShadow:5,
          border:4,
          borderColor:'rgba(15, 163, 248, 0.8)',
          '& .MuiDataGrid-cell:hover':{
          color:'rgba(15, 163, 248, 0.8)',
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
