import  {useState , useEffect} from "react";
import { DataGrid, esES, GridActionsCellItem } from '@mui/x-data-grid'; 
import { Box, IconButton,createTheme, Switch,ThemeProvider, Stack, Button, Hidden } from '@mui/material';
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
  export const Accesorios=()=> {
  const { events, setActiveEvent, startLoadingEvents,deleteEvent } = useAccesoriosStore();
  const {OpenModal, mostrarActualizar}=useModalHook();
  const [state, setState] =useState([]);

  useEffect(() => {
    startLoadingEvents()
  }, [])

  const newRow =()=>{
    setActiveEvent({
      accesorio:'',
      serie_bateria: '',
      serie_cargador: '',
      serie_gps: '',
      marcas_idMarcas:'',
      inventario_interno:'',
      inventario_segpub:'',
      contrato_compra:'',
      observaciones:'',
      fecha_recepcion:'',
      estatus:'',
      createdAt:'',
      updatedAt:'',
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
      primary: {main:'#1976d2'},
      },
    },
   esES,
  );




const columns =  [
  
  { field: 'idaccesorios', headerClassName: "super", headerName: 'ID',width: 50,  },
  { field: 'accesorio', headerClassName: "super", headerName: 'Tipo Accesorio',width: 120,  },
  { field: 'serie_bateria', valueGetter: ({ value }) => value==="" ? " ----- " : value===null ? " ----- " : value=value, headerClassName: "super", headerName: 'Serie Batería',flex: 1 , minWidth: 90 },
  { field: 'serie_cargador', valueGetter: ({ value }) => value==="" ? " ----- " : value===null ? " ----- " : value=value, headerClassName: "super", headerName: 'Serie Cargador',flex: 1 , minWidth: 90 },
  { field: 'serie_gps', valueGetter: ({ value }) => value==="" ? " ----- " : value===null ? " ----- " : value=value, headerClassName: "super", headerName: 'Serie GPS',flex: 1 , minWidth: 90 },
  { field: 'nombreMarcas',headerClassName: "super", headerName: 'Marca', flex: 1, minWidth: 90 },
  { field: 'nombreModelos',headerClassName: "super", headerName: 'Modelo', flex: 1, minWidth: 90 },
  { field: 'inventario_interno',headerClassName: "super", headerName: 'Inventario Interno', flex: 1, minWidth: 90 },
  { field: 'inventario_segpub',headerClassName: "super",headerName: 'Inv. Seg. Pub.',flex: 1, minWidth: 90 },
  { field: 'contrato_compra',headerClassName: "super",headerName: 'Contrato',flex: 1, minWidth: 90 },
  { field: 'observaciones',headerClassName: "super",headerName: 'Observaciones',flex: 1, minWidth: 90 },
  { field: 'fecha_recepcion',headerClassName: "super",headerName: 'Fecha de Recepcion',flex: 1, minWidth: 90 },
  { field: 'estatus',type: 'boolean',headerClassName: "super",headerName: 'Estatus',flex: 1, minWidth: 90 },
  { field: 'createdAt',headerClassName: "super",headerName: 'Fecha de creacion', flex: 1, minWidth: 120 },
  { field: 'updatedAt',headerClassName: "super",headerName: 'Fecha de actualizacion',flex: 1, minWidth: 120 },
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
      <DataGrid
        onCellClick={onSelect}
        getRowId={(row) => row.idaccesorios}
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