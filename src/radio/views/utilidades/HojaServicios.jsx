import { DataGrid, esES, GridActionsCellItem } from '@mui/x-data-grid'; 
import  {useState , useEffect} from "react";
import { Box, IconButton,createTheme, Switch,ThemeProvider, Stack, Button } from '@mui/material';

import { AddCircleOutlineOutlined, Block, Close, Done, Edit } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { useHojaServicioStore } from '../../../hooks/hooksUtilidades/useHojaServicioStore';


const colorClose=()=>{
  return <Close color='error'/>
}
const colorDone=()=>{
  return <Done color='success'/>
}
  export const HojaServicios=()=> {
  const { events, setActiveEvent, startLoadingEvents,deleteEvent } = useHojaServicioStore();
  const {OpenModal, mostrarActualizar}=useModalHook();
  const [state, setState] =useState([]);

  useEffect(() => {
    startLoadingEvents()
  }, [])

  const newRow =()=>{
    setActiveEvent({
      fecha_servicio:'',
      fk_usuario:'',
      fk_idservicios:'',
      fk_idradios:'',
      fk_idaccesorios:'',
      descripcion:'',
      entrego_equipo:'',
      fecha_entrega:'',
      fk_supervisortec:'',
      usuario_servicio:'',
      usuario_entrega:'',
      fk_tecnico_entrega:'',
      estatus:'',
      createdAt:'',
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
  
  { field: 'idhojaservicios', headerClassName: "super", headerName: 'ID',width: 90,  },
  { field: 'fecha_servicio',headerClassName: "super",headerName: 'Fecha de creacion', flex: 1, minWidth: 120 },
  { field: 'fk_usuario', headerClassName: "super", headerName: 'Accesorio',minwidth: 90,  },
  { field: 'fk_idservicios',headerClassName: "super", headerName: 'Numero de serie',flex: 1 , minWidth: 90 },
  { field: 'fk_idradios',headerClassName: "super", headerName: 'Marca', flex: 1, minWidth: 90 },
  { field: 'fk_idaccesorios',headerClassName: "super", headerName: 'Inventario Interno', flex: 1, minWidth: 90 },
  { field: 'descripcion',headerClassName: "super",headerName: 'Inv. Seg. Pub.',flex: 1, minWidth: 90 },
  { field: 'entrego_equipo',type: 'boolean',headerClassName: "super",headerName: 'Contrato',flex: 1, minWidth: 90 },
  { field: 'fecha_entrega',headerClassName: "super",headerName: 'Observaciones',flex: 1, minWidth: 90 },
  { field: 'fk_supervisortec',headerClassName: "super",headerName: 'Fecha de Recepcion',flex: 1, minWidth: 90 },
  { field: 'usuario_servicio',headerClassName: "super",headerName: 'SUE',flex: 1, minWidth: 90 },
  { field: 'usuario_entrega',headerClassName: "super",headerName: 'SUE',flex: 1, minWidth: 90 },
  { field: 'fk_tecnico_entrega',headerClassName: "super",headerName: 'SUE',flex: 1, minWidth: 90 },
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
        label="Delete"
        onClick={cambiar}
      />,
      <IconButton
      color="inherit"
      size="small"
      aria-label="delete"
      >
        <Switch color='secondary' checked={evento.row.estatus} name="estatus" onChange={(event)=>handleChange(event, evento.row.idaccesorios)} />
     </IconButton> 
  ], 
  }, 
]

  return (
    <>
    <h2 className='colorUti'>HOJA DE SERVICIO</h2>
    <div style={{ height: 400, width: '100%' }}>
    <div style={{ height: 'flex', width: '100%' }}>
    <div style={{ flexGrow: 1 }}>
      <Box
       sx={{
        height:750,
        width: "100%",
        "& .super":{
          backgroundColor: "rgba(207,199,219)",
        }

      }}> 
      {/* <Visibility color='warning'/> <Edit color='warning'/> <Block color='warning'/>  */}
       {/* <FormAccesorios/> */}
        <Stack direction="row" spacing={1} marginBottom={2}>
                <Button onClick={newRow} color={'secondary'} variant="outlined" startIcon={<AddCircleOutlineOutlined/>}>
                    Nuevo
                </Button>
            </Stack>
            <ThemeProvider theme={theme}>
      <DataGrid
        onCellClick={onSelect}
        getRowId={(row) => row.idhojaservicios}
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
          borderColor:'rgba(78,54,122)',
          '& .MuiDataGrid-cell:hover':{
          color:'rgba(78,54,122)',
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