
import { DataGrid, esES, GridActionsCellItem } from '@mui/x-data-grid'; 
import {useState , useEffect} from "react";
import { Box, IconButton,createTheme, Switch,ThemeProvider, Stack, Button } from '@mui/material';
import { AddCircleOutlineOutlined, Block, Close, Done, Edit } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { useAsignacionesStore } from '../../../hooks/hooksUtilidades/useAsignacionesStore';
import { FormAsignaciones } from '../../components/formUtilidades/FormAsignaciones';
import { FormAsignacionGeneral } from '../../components/formUtilidades/FormAsignacionGeneral';


const colorClose=()=>{
  return <Close color='error'/>
}
const colorDone=()=>{ 
  return <Done color='success'/>
}
  export const Asignaciones=()=> {
  const { events, setActiveEvent, startLoadingEvents,deleteEvent } = useAsignacionesStore();
  const {OpenModal, mostrarActualizar}=useModalHook();
  const [state, setState] =useState([]);
 
  useEffect(() => {
    startLoadingEvents()
  }, [])

  const newRow =()=>{
    setActiveEvent({
      usuarios_idusuarios:'',
      radios_idradios:'',
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

  { field: 'asignacion_usuario_radiocol', headerClassName: "super", headerName: 'ID',width: 90,  },
  { field: 'nombre', headerClassName: "super", headerName: 'Asignado a',flex: 1 ,minwidth: 90,  },
  { field: 'clave_elector', headerClassName: "super", headerName: 'Clave Elector',flex: 1 ,minwidth: 90,  },
  { field: 'serie',headerClassName: "super", headerName: 'Radio Asignado',flex: 1 , minWidth: 90 },
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
        color="secondary"
        label="Delete"
        onClick={cambiar}
      />,
      <IconButton
      color="inherit"
      size="small"
      aria-label="delete"
      >
        <Switch color='secondary' checked={evento.row.estatus} name="estatus" onChange={(event)=>handleChange(event, evento.row.asignacion_usuario_radiocol)} />
     </IconButton> 
  ], 
  }, 
]

  return (
    <>
    <h2 className='colorUti'>ASIGNACIONES</h2>
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
        <FormAsignacionGeneral/>
        <Stack direction="row" spacing={1} marginBottom={2}>
                <Button onClick={newRow} color={'secondary'} variant="outlined" startIcon={<AddCircleOutlineOutlined/>}>
                    Nuevo
                </Button>
            </Stack>
            <ThemeProvider theme={theme}>
      <DataGrid
        onCellClick={onSelect}
        getRowId={(row) => row.asignacion_usuario_radiocol}
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