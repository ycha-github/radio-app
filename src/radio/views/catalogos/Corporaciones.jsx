import { DataGrid, gridClasses,  esES, GridActionsCellItem, GridToolbarQuickFilter  } from '@mui/x-data-grid';
import { Box, Button, createTheme, IconButton, Stack, Switch, ThemeProvider, styled } from '@mui/material';
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

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
  }
}));

export const Corporaciones= () => {
  const { events, setActiveEvent, startLoadingEvents, deleteEvent,user } = useCorporacionesStore();
  const { OpenModal, mostrarActualizar } = useModalHook();
  const [state, setState] =useState([]);

  useEffect(() => {
    startLoadingEvents()
  }, [])

  const newRow =()=>{
    setActiveEvent({
      nombreCorporacion: '',
      siglasCorporacion: '',
      estatus: 1,
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
      <StripedDataGrid
        onCellClick={onSelect}
        getRowHeight={() => 'auto'}
        getRowId={(row) => row.idcorporaciones}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 !== 0 ? 'even' : 'odd'
        }
        autoHeight={true}
        rows={events}
        columns={columns}
        columnVisibilityModel={user.rol==3? {actions:false} : {actions:true}}
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