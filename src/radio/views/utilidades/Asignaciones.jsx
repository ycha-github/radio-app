
import { DataGrid, esES, GridActionsCellItem } from '@mui/x-data-grid'; 
import {useState , useEffect} from "react";
import { Box, IconButton,createTheme, Switch,ThemeProvider, Stack, Button } from '@mui/material';
import { AddCircleOutlineOutlined, Block, Close, Done, Edit, VisibilityOutlined } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { useAsignacionesStore } from '../../../hooks/hooksUtilidades/useAsignacionesStore';
import { FormAsignaciones } from '../../components/formUtilidades/FormAsignaciones';
import { FormAsignacionGeneral } from '../../components/formUtilidades/FormAsignacionGeneral';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CrearPdf } from '../../components/formUtilidades/CrearPdf';

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
 
 
  const [tableAccesorio, setTableAccesorio] = useState([])
  const navigate = useNavigate();
 
  useEffect(() => {
    startLoadingEvents()
  }, [])

  const newRow =()=>{
    setActiveEvent({
      usuarios_idusuarios:"",
       radios_idradios:"",
       rfsi:"",
       fk_accesorio_bateria:"",
       fk_accesorio_cargador:"",
       fk_accesorio_gps:"",
       funda:false,
       antena: false,
       bocina: false,
       c2h: false,
       cable_principal: false,
       caratula: false,
       micro: false,
       cofre: false,
       porta_caratula: false,
       cuello_cisne: false,
       fk_vehiculo:"",
       estatus:  "",
       createdAt: "",
       updatedAt: "",
    })
    OpenModal();
    //navigate('../asignaciones');
  }
  
   
    //useEffect(() => {
    //  axios.get(`http://localhost:8000/api/v0/accesorios/filtrado/`).
    //      then((response) => {
    //          setTableAccesorio(response.data);
    //      });
    //  }, []);

    //  console.log(tableAccesorio);
    //  let r='';

    //  const recibir = (id,tipoaccesorio) => {
    //      r={id,tipoaccesorio}

    //  console.log(r);
    //  }
  
    //  tableAccesorio.map((accesorio) => {
    //      return recibir(accesorio.idaccesorios, accesorio.accesorio);
    //  })

  const handleChange =async (event,r) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    //setState(event.target.checked);
    await deleteEvent(r);
  };

  const cambiar = ( ) =>  {
    //navigate('../asignaciones');
    OpenModal();
    mostrarActualizar();
  }
  const mostrarPdf = ( event) =>  {
    //navigate('../mostrar-pdf');
    return(<CrearPdf/>);
    
    //OpenModal();
    //mostrarActualizar();
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

  { field: 'idasignacion', headerClassName: "super", headerName: 'ID',width: 90,  },
  { field: 'nombre_completo', headerClassName: "super", headerName: 'Asignado a' ,width: 250,  },
  { field: 'clave_elector', headerClassName: "super", headerName: 'Clave Elector' ,width: 200,  },
  { field: 'serie_radio',headerClassName: "super", headerName: 'Radio Asignado',flex: 2 , minWidth: 90 },
  { field: 'rfsi',headerClassName: "super", headerName: 'RFSI',flex: 2 , minWidth: 90 },
  { field: 'estatus',type: 'boolean',headerClassName: "super",headerName: 'Estatus',flex: 2, minWidth: 90 },
  { field: 'createdAt',headerClassName: "super",headerName: 'Fecha de creacion', flex: 2, minWidth: 120 },
  { field: 'updatedAt',headerClassName: "super",headerName: 'Fecha de actualizacion',flex: 2, minWidth: 120 },
  {
    field: 'actions',
    type: 'actions',
    headerClassName: "super",
    flex: 2,
    minWidth: 160,
    getActions: (evento) => [
      <GridActionsCellItem
        icon={<Edit />}
        color="secondary"
        label="Delete"
        onClick={cambiar}
        
      />,
      <GridActionsCellItem
        icon={<VisibilityOutlined/>}
        color="secondary"
        label="Delete"
        onClick={mostrarPdf}
        
      />,
      <IconButton
      color="inherit"
      size="small"
      aria-label="delete"
      >
        <Switch color='secondary' checked={evento.row.estatus} name="estatus" onChange={(event)=>handleChange(event, evento.row.idasignacion)} />
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
      <FormAsignaciones   />
      {/* <FormAsignacionGeneral/> */}
        <Stack direction="row" spacing={1} marginBottom={2}>
                <Button onClick={newRow} color={'secondary'} variant="outlined" startIcon={<AddCircleOutlineOutlined/>}>
                    Nuevo
                </Button>
            </Stack>
            <ThemeProvider theme={theme}>
      <DataGrid
        onCellClick={onSelect}
        getRowId={(row) => row.idasignacion}
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