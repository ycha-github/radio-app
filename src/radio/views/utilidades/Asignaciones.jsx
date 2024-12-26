import * as React from 'react';
import {useState , useEffect} from "react";
import PropTypes from 'prop-types';
import { DataGrid, gridClasses, esES, GridActionsCellItem, GridPagination, GridToolbarExport, GridToolbarQuickFilter } from '@mui/x-data-grid'; 
import { Box, IconButton,createTheme, Switch,ThemeProvider, Stack, Tabs, Tab, Typography, Button, styled } from '@mui/material';
import { AddCircleOutlineOutlined, Close, Done, EarbudsBattery, Edit, HighlightOff, PrintOutlined, RecordVoiceOver, VisibilityOutlined } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { useAsignacionesStore } from '../../../hooks/hooksUtilidades/useAsignacionesStore';
import { FormAsignaciones } from '../../components/formUtilidades/FormAsignaciones';
import { useNavigate } from 'react-router-dom';
import { CrearPdf } from './CrearPdf';
import radioApi from "../../../api/radioApi";
import Swal from 'sweetalert2';
import { useArmarRadioStore } from '../../../hooks/hooksUtilidades/useArmarRadioStore';
import { FormArmarRadio } from '../../components/formUtilidades/FormArmarRadio';
import { useCambiarStore } from '../../../hooks/useCambiarStore';

const colorClose = () => {
  return <Close color='error' />
}
const colorDone = () => {
  return <Done color='success' />
}

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
  }
}));

const NuevoFooter=()=>{
  return <>
    <Box sx={{pl: '35%', alignContent:'center', background:'rgb(214, 204, 230)'}}>
      <GridToolbarExport 
        csvOptions={{
          fileName: 'Asignaciones',
          // delimiter: ';',
          utf8WithBom: true,
         }} 
        color='secondary'  
        sx={{ textAlign: 'center', position: 'relative',width: 200, float: 'left', pt:2}} 
      />
      <GridPagination sx={{ textAlign: 'center', position: 'relative', width: 300,  }} />
      </Box>
  </>
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

  export const Asignaciones=()=> {
    
    const [value, setValue] = useState(0);
    
    const handleChange2 = (event, newValue) => {
      setValue(newValue);
    };
    
  const { events, setActiveEvent, startLoadingEvents, deleteEvent, startLoadingCorporacion, user } = useAsignacionesStore();
  const { eventsarmar, setActiveEventarmar,startLoadingEventsarmar,deleteEventarmar } = useArmarRadioStore();
  const {OpenModal, mostrarActualizar,disableForm}=useModalHook();
  const { errorMessage }=useCambiarStore();
  const [state, setState] =useState([]);
  const [contenidoModal, setContenidoModal] =useState("");
  const [abrirArmarRadio, setAbrirArmarRadio]= useState(false);
  const [onclick1, setOnclick1]= useState(false);
  const [imprimir, setImprimir]= useState({});
  const [corporacionesArray, setCorporacionesArray] = useState([])
  const [configReport, setConfigReport] = useState({})

  useEffect(() => {
    startLoadingEvents();
    startLoadingCorporacion();
    startLoadingEventsarmar();
  }, [])
  
  useEffect(() => {
    if (errorMessage !== undefined){
      Swal.fire('Error crear Armar Radio', errorMessage, 'error');
    }
  }, [errorMessage])

  const newRow =()=>{
    setActiveEvent({
      usuarios_idusuarios:null,
      fk_armar:null,
      observaciones:null,
      // rfsi:"",
      //  radios_idradios:"",
      //  fk_accesorio_bateria: null,
      //  fk_accesorio_cargador: null,
      //  fk_accesorio_gps: null,
      //  funda:false,
      //  antena: false,
      //  bocina: false,
      //  c2h: false,
      //  cable_principal: false,
      //  caratula: false,
      //  micro: false,
      //  cofre: false,
      //  porta_caratula: false,
      //  cuello_cisne: false,
      //  fk_vehiculo: null,
       fecha_asignacion:null,
       estatus:  1,
       createdAt: "",
       updatedAt: "",
    })
    OpenModal();
    setOnclick1(true);
    // setAbrirPdf(false);
    // setAbrirPdfReporte(false);
    setContenidoModal("FormAsignaciones");
    // setAbrirArmarRadio(false)
    //navigate('../asignaciones');
  }
  const newRowarmar =()=>{
    setActiveEventarmar({
       radios_idradios:"",
       rfsi:"",
       fk_accesorio_bateria: null,
       fk_accesorio_cargador: null,
       fk_accesorio_gps: null,
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
       fk_vehiculo: null,
      //  fecha_asignacion:null,
       estatusArmar:  1,
       createdAt: "",
       updatedAt: "",
    })
    OpenModal();
    // setAbrirArmarRadio(true)
    setOnclick1(true);
    // setAbrirPdf(false);
    // setAbrirPdfReporte(false);
    setContenidoModal("FormArmarRadio")
    //navigate('../asignaciones');
  }
  
  //let image = axios.get(`http://localhost:8000/api/v0/documentos/1:13`, {responseType: 'arraybuffer'});

    useEffect(() => {
    radioApi.get(`/configreportes/estatus`).
          then((response) => {
            setConfigReport(response.data);
          });
      }, []);

    let eventosActivos=[];
    let eventosBajas=[];
    const filtrarEventos = ( status ) =>  {
      status== true ?
      eventosActivos = events.filter(function(element){
          return(
            element.estatus == true
          )
        })  
        :
        eventosBajas=events.filter(function(element){
          return(
            element.estatus == status
          )
        })
    }

    // console.log("activos:", eventosActivos)
    // console.log("bajas", eventosBajas)

  const handleChange =async (event,r) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    //setState(event.target.checked);
    await deleteEvent(r);
    console.log(r)
  };
  const handleChangearmar =async (event,r) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    //setState(event.target.checked);
    await deleteEventarmar(r);
  };

  const cambiar = ( ) =>  {
    // setAbrirArmarRadio(false)
    // setAbrirPdf(false);
    // setAbrirPdfReporte(false);
    setContenidoModal("FormAsignaciones")
    setOnclick1(true);
    OpenModal();
    mostrarActualizar();
  }
  const cambiarArmar = ( ) =>  {
  //   setAbrirArmarRadio(true)
  //   setAbrirPdf(false);
  //   setAbrirPdfReporte(false);
  //   setOnclick1(true);
  //   OpenModal();
  //   mostrarActualizar();
  setContenidoModal("FormArmarRadio");
    setOnclick1(true);
    OpenModal();
    mostrarActualizar();
  }
  
  const ver = () =>  {
    // setAbrirArmarRadio(false)
    // setAbrirPdf(false);
    // setAbrirPdfReporte(false);
    setContenidoModal("FormAsignaciones");
    disableForm();
    OpenModal();
    mostrarActualizar();
  }

  const mostrarPdf = ( event) =>  {
    // setAbrirArmarRadio(false)
    // setAbrirPdf(true);
    // setAbrirPdfReporte(false);
    setContenidoModal("Pdf")
    OpenModal();
    //navigate('../mostrar-pdf');
    //setAbrirPdf(true);
    // return (imprimir)
  }

  const onSelect = ( event ) =>  {
     console.log(event.row)
     setAbrirArmarRadio(event.row)
    setActiveEvent( event.row );
    setImprimir(event.row)
  }

  const onSelectarmar = ( event ) =>  {
     console.log(event.row)
      setActiveEventarmar(event.row)   
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
//console.log(imprimir);
  const theme = createTheme(
    {
      palette: {
      primary: {main:'#1976d2'},
      },
    },
   esES,
  );

const columns =  [
  
  

  { field: 'idasignacion', headerClassName: "super", headerName: 'ID',width: 100, },
  { field: 'tipo',headerClassName: "super", headerName: 'Tipo Radio', width: 90 },
  { field: 'rfsi',headerClassName: "super", headerName: 'RFSI' , width: 110 },
  { field: 'modeloRadio',headerClassName: "super", headerName: 'Modelo' , width: 100 },
  { field: 'serie_radio',headerClassName: "super", headerName: 'Serie Radio', width: 220 },
  { field: 'inventario_interno',headerClassName: "super", headerName: 'Inv. Int. Radio', width: 150, },
  { field: 'nombre_completo', headerClassName: "super", headerName: 'Asignado a' ,width: 250,  },
  { field: 'nombrePuesto', headerClassName: "super", headerName: 'Puesto' ,width: 230,  },
  { field: 'serie_cargador',headerClassName: "super", headerName: 'Serie Cargador',width: 220 },
  { field: 'inventarioSpCargador',headerClassName: "super", headerName: 'Inv. Cargador',width: 150 },
  { field: 'unidad',headerClassName: "super",headerName: 'Unidad', width: 100 },
  { field: 'nombreCorporacion', headerClassName: "super", headerName: 'Corporacion',width: 275,  },
  { field: 'nombreRecursoCompra', headerClassName: "super", headerName: 'Recurso Compra',width: 275,  },
  { field: 'nombrePropietario', headerClassName: "super", headerName: 'Propietario',width: 275,  },
  { field: 'ubicacion', headerClassName: "super", headerName: 'Ubicación',width: 120,  },
  { field: 'situacion', headerClassName: "super", headerName: 'Situación',width: 120,  },
  { field: 'observaciones', headerClassName: "super", headerName: 'Observaciones',width: 375,  },
  { field: 'estatus',type: 'boolean',headerClassName: "super",headerName: 'Estatus',flex: 2, minWidth: 70 },
  {
    field: 'actions',
    type: 'actions',
    headerClassName: "super",
    flex: 2,
    minWidth: 180,
    getActions: (evento) => [
      <GridActionsCellItem
        icon={<Edit />}
        color="secondary"
        label="Delete"
        onClick={cambiar}
      />,
      <GridActionsCellItem 
      color='secondary'
      icon={<VisibilityOutlined />}
      label="View"
      onClick={ver}
    />,
      <GridActionsCellItem
        icon={<PrintOutlined/>}
        color="secondary"
        label="Print"
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
const columnsarmar =  [

  { field: 'idarmar', headerClassName: "super", headerName: 'ID',width: 60, },
  { field: 'tipo',headerClassName: "super", headerName: 'Tipo Radio', width: 90 },
  { field: 'rfsi',headerClassName: "super", headerName: 'RFSI' , width: 110 },
  { field: 'modeloRadio',headerClassName: "super", headerName: 'Modelo' , width: 100 },
  { field: 'serie_radio',headerClassName: "super", headerName: 'Serie Radio', width: 220 },
  { field: 'inventario_interno',headerClassName: "super", headerName: 'Inv. Int. Radio', width: 100, },
  // { field: 'nombre_completo', headerClassName: "super", headerName: 'Asignado a' ,width: 250,  },
  // { field: 'nombrePuesto', headerClassName: "super", headerName: 'Puesto' ,width: 430,  },
  { field: 'serie_cargador',headerClassName: "super", headerName: 'Serie Cargador',width: 220 },
  { field: 'inventarioSpCargador',headerClassName: "super", headerName: 'Inv. Cargador',width: 100 },
  { field: 'unidad',headerClassName: "super",headerName: 'Unidad', width: 90 },
  // { field: 'nombreCorporacion', headerClassName: "super", headerName: 'Corporacion',width: 475,  },
  { field: 'estatusArmar',type: 'boolean',headerClassName: "super",headerName: 'Estatus',flex: 2, minWidth: 70 },
  {
    field: 'actions',
    type: 'actions',
    headerClassName: "super",
    flex: 2,
    minWidth: 180,
    getActions: (evento) => [
      <GridActionsCellItem
        icon={<Edit />}
        color="secondary"
        label="Delete"
        onClick={cambiarArmar}
      />,
      
      <IconButton
      color="inherit"
      size="small"
      aria-label="delete"
      >
        <Switch color='secondary' checked={evento.row.estatusArmar} name="estatus" onChange={(event)=>handleChangearmar(event, evento.row.idarmar)} />
     </IconButton> 
  ], 
  }, 
]

  return (
    <div style={{ height: 'flex', width: '100%', flexGrow: 1 }}>
      <h2 className='colorUti' >ASIGNACIONES</h2>
      <Box
       sx={{
        height:750,
        width: "100%",
        "& .super":{
          backgroundColor: "rgba(207,199,219)",
        }
      }}> 

        { 
          contenidoModal == "FormAsignaciones" ?
          <FormAsignaciones datoClick={onclick1}/> :
          contenidoModal == "FormArmarRadio" ?
          <FormArmarRadio datoClick={onclick1}/> :
          contenidoModal == "Pdf" ?
          <CrearPdf datos={imprimir} isCartaFijo={true} formato={configReport} /> :
          null
        }


        <Box sx={{ width: '100%' }}>

          <Box sx={{ borderBottom:1, borderColor: 'divider', mt:-4, mb:0.1 , pb:-1 }}>
            <Tabs value={value} onChange={handleChange2} aria-label="basic tabs example" >
              <Tab label="Asignar usuarios -> RFSI"  icon={<RecordVoiceOver />} iconPosition='start' {...a11yProps(0)} onClick={filtrarEventos(true)} />
              <Tab label="Asignar accesorios -> radios" icon={<EarbudsBattery />} iconPosition='start' {...a11yProps(1)}  />
              <Tab label="Asignaciones inactivas" sx={{ml:60}} icon={<HighlightOff />} iconPosition='start' {...a11yProps(2)} onClick={filtrarEventos(false)} />
            </Tabs>
          </Box>

          <CustomTabPanel value={value} index={0} >
              <Stack direction="row" spacing={1} marginBottom={0.5} marginTop={-2.5}>
                <Button onClick={newRow} color={'secondary'} variant="outlined" startIcon={<AddCircleOutlineOutlined/>}>
                  Nuevo
                </Button>
              </Stack>
            <ThemeProvider theme={theme} >       
              <StripedDataGrid 
                class="tabla"
                id="imprimible"
                onCellClick={onSelect}
                initialState={{
                  sorting: {
                    sortModel: [{ field: 'idasignacion', sort: 'desc' }],
                  },
                }}
                
                getRowHeight={() => 'auto'}
                getRowId={(row) => row.idasignacion}
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 !== 0 ? 'even' : 'odd'
                }
                autoHeight={true}
                rows={eventosActivos}
                columns={columns}
                pageSize={10}
                columnVisibilityModel={user.rol==3? {actions:false} : {actions:true}}
                rowsPerPageOptions={[10]}
                components={{
                  Toolbar: QuickSearchToolbar ,
                  BooleanCellFalseIcon:colorClose,
                  BooleanCellTrueIcon:colorDone,
                  Footer: NuevoFooter
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
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1} sx={{ width: '100%' }} >
              <Stack direction="row" spacing={1} marginBottom={0.5} marginTop={-2.5}>
                <Button onClick={newRowarmar} color={'secondary'} variant="outlined" startIcon={<AddCircleOutlineOutlined/>}>
                  Nuevo
                </Button>
              </Stack>
            <ThemeProvider theme={theme}>       
              <StripedDataGrid
                class="tabla"
                id="imprimible"
                onCellClick={onSelectarmar}
                initialState={{
                  sorting: {
                    sortModel: [{ field: 'idarmar', sort: 'desc' }],
                  },
                }}
                getRowId={(row) => row.idarmar}
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 !== 0 ? 'even' : 'odd'
                }
                autoHeight={true}
                rows={eventsarmar}
                columns={columnsarmar}
                pageSize={10}
                columnVisibilityModel={user.rol==3? {actions:false} : {actions:true}}
                rowsPerPageOptions={[10]}
                components={{
                  Toolbar: QuickSearchToolbar ,
                  BooleanCellFalseIcon:colorClose,
                  BooleanCellTrueIcon:colorDone,
                  Footer: NuevoFooter
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
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2} sx={{ width: '100%' }}> 
            <ThemeProvider theme={theme}>       
              <StripedDataGrid
                class="tabla"
                id="imprimible"
                onCellClick={onSelect}
                initialState={{
                  sorting: {
                    sortModel: [{ field: 'idasignacion', sort: 'desc' }],
                  },
                }}
                getRowId={(row) => row.idasignacion}
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 !== 0 ? 'even' : 'odd'
                }
                autoHeight={true}
                rows={eventosBajas}
                columns={columns}
                pageSize={10}
                columnVisibilityModel={user.rol==3? {actions:false} : {actions:true}}
                rowsPerPageOptions={[10]}
                components={{
                  Toolbar: QuickSearchToolbar ,
                  BooleanCellFalseIcon:colorClose,
                  BooleanCellTrueIcon:colorDone,
                  Footer: NuevoFooter
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
          </CustomTabPanel>
          

        </Box>

      </Box>
    </div>

    
  );
}