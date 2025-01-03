import  {useState , useEffect} from "react";
import { DataGrid, gridClasses, esES, GridActionsCellItem, GridToolbarQuickFilter } from '@mui/x-data-grid'; 
import { Box, IconButton,createTheme, Switch,ThemeProvider, Stack, Button, styled } from '@mui/material';
import { AddCircleOutlineOutlined, Block, Close, Done, Edit } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { useAccesoriosStore } from '../../../hooks/hooksCatalogo/useAccesoriosStore';
import { FormAccesorios } from '../../components/formCat/FormAccesorios';

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

  export const Accesorios=()=> {
  const { events, setActiveEvent, startLoadingEvents,deleteEvent,user } = useAccesoriosStore();
  const {OpenModal, mostrarActualizar}=useModalHook();
  const [state, setState] =useState([]);

  useEffect(() => {
    startLoadingEvents()
  }, [])

  const newRow =()=>{
    setActiveEvent({
      accesorio:'',
      serie_bateria: null,
      serie_cargador: null,
      serie_gps: null,
      marcas_idMarcas:'',
      inventario_interno:'',
      inventario_segpub:'',
      contrato_compra:'',
      observaciones:'',
      fecha_recepcion:'',
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
      primary: {main:'#1976d2'},
      },
    },
   esES,
  );




const columns =  [
  
  { field: 'idaccesorios', headerClassName: "super", headerName: 'ID',width: 100,  },
  { field: 'accesorio', headerClassName: "super", headerName: 'Tipo Accesorio',width: 120,  },
  { field: 'serie_bateria', valueGetter: ({ value }) => value==="" ? " ----- " : value===null ? " ----- " : value=value, headerClassName: "super", headerName: 'Serie Batería',width: 230 },
  { field: 'serie_cargador', valueGetter: ({ value }) => value==="" ? " ----- " : value===null ? " ----- " : value=value, headerClassName: "super", headerName: 'Serie Cargador',width: 230 },
  { field: 'serie_gps', valueGetter: ({ value }) => value==="" ? " ----- " : value===null ? " ----- " : value=value, headerClassName: "super", headerName: 'Serie GPS',width: 230 },
  { field: 'nombreMarcas',headerClassName: "super", headerName: 'Marca', width: 230 },
  { field: 'nombreModelos',headerClassName: "super", headerName: 'Modelo', width: 160 },
  { field: 'inventario_interno',headerClassName: "super", headerName: 'Inventario Interno', flex: 1, minWidth: 170 },
  { field: 'inventario_segpub',headerClassName: "super",headerName: 'Inv. Seg. Pub.',flex: 1, minWidth: 230 },
  { field: 'contrato_compra',headerClassName: "super",headerName: 'Contrato',flex: 1, minWidth: 230 },
  { field: 'observaciones',headerClassName: "super",headerName: 'Observaciones',flex: 1, minWidth: 170 },
  { field: 'fecha_recepcion',headerClassName: "super",headerName: 'Fecha de Recepcion',flex: 1, minWidth: 150 },
  { field: 'createdAt',headerClassName: "super",headerName: 'Fecha de creacion', flex: 1, minWidth: 150 },
  { field: 'updatedAt',headerClassName: "super",headerName: 'Fecha de actualizacion',flex: 1, minWidth: 150 },
  { field: 'estatus',type: 'boolean',headerClassName: "super",headerName: 'Estatus',flex: 1, minWidth: 90 },
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
        onClick={cambiar}
        color="warning"
      />,
      <IconButton
      color="inherit"
      size="small"
      aria-label="delete"
      >
        <Switch color='warning' checked={evento.row.estatus} name="estatus" onChange={(event)=>handleChange(event, evento.row.idaccesorios)} />
     </IconButton> 
  ], 
  }, 
]

  return (
    <>
    <h2 className='colorCat'>ACCESORIOS</h2>
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
        <FormAccesorios/>
        <Stack direction="row" spacing={1} marginBottom={2}>
                <Button onClick={newRow} color={'warning'} variant="outlined" startIcon={<AddCircleOutlineOutlined/>}>
                    Nuevo
                </Button>
            </Stack>
            <ThemeProvider theme={theme}>
      <StripedDataGrid
        onCellClick={onSelect}
        getRowHeight={() => 'auto'}
        getRowId={(row) => row.idaccesorios}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 !== 0 ? 'even' : 'odd'
        }
        autoHeight={true}
        rows={events}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        columnVisibilityModel={user.rol==3? {actions:false} : {actions:true}}
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