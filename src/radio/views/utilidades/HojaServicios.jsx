import  {useState , useEffect} from "react";
// import { useNavigate } from 'react-router-dom';
import { DataGrid, esES, GridActionsCellItem } from '@mui/x-data-grid'; 
import { Box, IconButton,createTheme, Switch,ThemeProvider, Stack, Button, TextField } from '@mui/material';
import { AddCircleOutlineOutlined, Close, Done, Edit, VisibilityOutlined } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { useHojaServicioStore } from '../../../hooks/hooksUtilidades/useHojaServicioStore';
import { FormHojaServicio } from '../../components/formUtilidades/FormHojaServicio';
// import { render } from "react-dom";


const colorClose=()=>{
  return <Close color='error'/>
}
const colorDone=()=>{
  return <Done color='success'/>
}
  export const HojaServicios=()=> {
  const { events, setActiveEvent, startLoadingEvents,deleteEvent } = useHojaServicioStore();
  const { /*mostrarGuardar*/ OpenModal, mostrarActualizar, /*disableForm*/ }=useModalHook();
  const [state, setState] =useState([]);

  // const navigate = useNavigate();

  useEffect(() => {
    startLoadingEvents()
  }, [])

  const newRow =()=>{
    setActiveEvent({
        fecha_servicio:'',
        usuarios_idusuarios:"",
        fk_usuario:'',
        nombre_completo: '',
        rfsi: '',
        tipo: '',
        // fk_idservicios:'',
        fk_idradios:'',
        // fk_accesorios:'',
        // descripcion:'',
        // entrego_equipo:'',
        // fecha_entrega:'',
        // fk_supervisortec:'',
        // usuario_servicio:'',
        // usuario_entrega:'',
        // fk_tecnico_entrega:'',
        // estatus:'',
        // createdAt: '',
        // updatedAt: '',
    })
    OpenModal();
    // mostrarGuardar();
    // navigate('../hoja-serviciof');
  }

  const handleChange =async (event,r) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    //setState(event.target.checked);
    await deleteEvent(r);
  };

  const cambiar = ( ) =>  {
    OpenModal();
    mostrarActualizar();
    // navigate('../hoja-serviciof');
  }

  const ver = () =>  {
    // disableForm();
    OpenModal();
    mostrarActualizar();
    // navigate('../hoja-serviciof');
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
  
  { field: 'idhojaservicios', headerClassName: "super", headerName: 'ID',width: 40,  },
  { field: 'fecha_servicio',headerClassName: "super",headerName: 'Fecha creación', flex: 1, minWidth: 60 },
  { field: 'nombre_completo', headerClassName: "super", headerName: 'Usuario', flex: 1, minWidth: 230 },
  { field: 'serie',headerClassName: "super", headerName: 'Radio', flex: 1, minWidth: 90 },
  { field: 'fecha_entrega',headerClassName: "super",headerName: 'Fecha Entrega',flex: 1, minWidth: 110 },
  { field: 'nombreSupervisorTec',headerClassName: "super",headerName: 'Supervisor Técnico', flex: 1, minWidth: 230 },
  // { field: 'usuario_servicio',headerClassName: "super",headerName: 'Usuario Servicio',  width: 230 },
  // { field: 'usuario_entrega',headerClassName: "super",headerName: 'Usuario Entrega', width: 230 },
  { field: 'nombreTecEntrega',headerClassName: "super",headerName: 'Técnico Entrega', flex: 1, minWidth: 230 },
  { field: 'estatus',type: 'boolean',headerClassName: "super",headerName: 'Estatus', width: 75 },
  // { field: 'createdAt',headerClassName: "super",headerName: 'Fecha de creacion', flex: 1, minWidth: 120 },
  // { field: 'updatedAt',headerClassName: "super",headerName: 'Fecha de actualizacion',flex: 1, minWidth: 120 },
  {
    field: 'actions',
    type: 'actions',
    headerClassName: "super",
    flex: 1,
    minWidth: 150,
    getActions: (evento) => [
      <GridActionsCellItem
        color='secondary'
        icon={<Edit />}
        label="Delete"
        onClick={ cambiar }
      />,
      <GridActionsCellItem 
        color='secondary'
        icon={<VisibilityOutlined />}
        label="View"
        onClick={ver}
      />,
      <IconButton
        size="small"
        aria-label="Estatus"
      >
        <Switch color='secondary' checked={evento.row.estatus} name="estatus" onChange={(event)=>handleChange(event, evento.row.idaccesorios)} />
     </IconButton> 
    ], 
  }, 
]

  return (
    <>
    <h2 className='colorUti'>HOJA DE SERVICIO</h2>
    <div style={{ height: 400 , width: '100%' }}>
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
        <FormHojaServicio/>
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