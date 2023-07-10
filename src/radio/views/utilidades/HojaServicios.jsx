import  {useState , useEffect} from "react";
// import { useNavigate } from 'react-router-dom';
import { DataGrid, esES, GridActionsCellItem, GridToolbar, GridToolbarQuickFilter } from '@mui/x-data-grid'; 
import { Box, IconButton,createTheme, Switch,ThemeProvider, Stack, Button, TextField } from '@mui/material';
import { AddCircleOutlineOutlined, Close, Done, Edit, PrintOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { useHojaServicioStore } from '../../../hooks/hooksUtilidades/useHojaServicioStore';
import { FormHojaServicio } from '../../components/formUtilidades/FormHojaServicio';
import dayjs from "dayjs";
import { CrearPdf } from './CrearPdf';
import radioApi from "../../../api/radioApi";
// import { render } from "react-dom";


let anioActual = new Date().getFullYear();
let hoy = new Date();
let fecha = hoy.getFullYear()+"-" + (hoy.getMonth() + 1) +"-" + hoy.getDate();

const colorClose=()=>{
  return <Close color='error'/>
}
const colorDone=()=>{
  return <Done color='success'/>
}
  export const HojaServicios=()=> {
  const { events, setActiveEvent, startLoadingEvents,deleteEvent } = useHojaServicioStore();
  const { /*mostrarGuardar*/ OpenModal, mostrarActualizar, disableForm }=useModalHook();
  const [state, setState] =useState([]);
  const [abrirPdf, setAbrirPdf]= useState(false);
  const [imprimir, setImprimir]= useState({});
  const [configReport, setConfigReport]= useState({});
  const [folioNew, setFolioNew]= useState(0);

  const [hServicio, setHServicio] = useState({})

    
  useEffect(() => {
    startLoadingEvents()
  }, [])

  let anio;
  let newFolio;

  const newRow =()=>{ 
    // const promesa= new Promise((resolve,reject)=>{
    //   setTimeout(()=>{
    //     resolve();
    //   },2000)
    // });
    
    
    // promesa.then(()=>{

      anio = new Date(events[0]['createdAt']).getFullYear();
      let folio = events[0]['folio'];
      anio !== anioActual ? newFolio=1 : newFolio = folio+1   
      console.log(newFolio)
      console.log(anio)
      console.log(anioActual)

    setActiveEvent({
      fecha_servicio: fecha,
      fk_idasignacion_ur: '',
      servicios: null,
      descripcion: '',
      entrego_equipo: false,
      fecha_entrega: null,
      fk_supervisortec: '',
      usuario_servicio: '',
      usuario_entrega: '',
      fk_tecnico_entrega: null,
      estatus: 1,
      folio: newFolio,
    })
  // })
    
 


    OpenModal();
    setAbrirPdf(false);

  }
  

  useEffect(() => {
    radioApi.get(`/configreportes/estatus`).
          then((response) => {
            setConfigReport(response.data);
          });
      }, []);

     // console.log(configReport.length);
      useEffect(() => {
        if (configReport.length > 1){
          Swal.fire({
            icon:'question',
            text:'Favor de elegir el correcto ',
            title: 'Hay mas de una configuracion de reportes con estatus activo',
            confirmButtonText: '<a " href="http://localhost:5173/radio/config-reportes">Solucionar</a>',});
        }
      }, [configReport])

  const handleChange =async (event,r) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    //setState(event.target.checked);
    await deleteEvent(r);
  };

  const cambiar = ( ) =>  {
    OpenModal();
    setAbrirPdf(false)
    mostrarActualizar();
    // navigate('../hoja-serviciof');
  }

  const ver = () =>  {
    disableForm();
    OpenModal();
    mostrarActualizar();
  }
  

  const mostrarPdf = ( event) =>  {
    setAbrirPdf(true);
    OpenModal();
}

  const onSelect = ( event ) =>  {
    console.log(event.row)
    setActiveEvent( event.row );
    setImprimir(event.row);
    setHServicio(event.row );
  }


  const theme = createTheme(
    {
      palette: {
      primary: {main:'#1976d2'},
      },
    },
   esES,
  );
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


const columns = [
  
  { field: 'idhojaservicios', headerClassName: "super", headerName: 'ID',width: 40 },
  { field: 'folio', valueGetter: (params) => { return `${params.row.folio+'/'}${new Date(params.row.createdAt).getFullYear()}`}, headerClassName: "super", headerName: 'Folio',width: 100 },
  { field: 'fecha_servicio',headerClassName: "super",headerName: 'Fecha creación', flex: 1, minWidth: 60 },
  { field: 'nombre_completo', headerClassName: "super", headerName: 'Usuario Asignado', flex: 1, minWidth: 230 },
  { field: 'serie',headerClassName: "super", headerName: 'Serie Radio', flex: 1, minWidth: 60 },
  { field: 'nombreSupervisorTec',headerClassName: "super",headerName: 'Supervisor Técnico', flex: 1, minWidth: 230 },
  { field: 'usuario_servicio',headerClassName: "super",headerName: 'Usuario Servicio',  width: 230 },
  { field: 'fecha_entrega', type: "dateTime",valueGetter:({value})=>value && new Date(value), headerClassName: "super",headerName: 'Fecha Entrega',flex: 1, minWidth: 110 },
  // { field: 'usuario_entrega',headerClassName: "super",headerName: 'Usuario Entrega', width: 230 },
  // { field: 'nombreTecEntrega',headerClassName: "super",headerName: 'Técnico Entrega', flex: 1, minWidth: 230 },
  { field: 'estatus',type: 'boolean',headerClassName: "super",headerName: 'Estatus', width: 75 },
  // { field: 'createdAt',headerClassName: "super",headerName: 'Fecha de creacion', flex: 1, minWidth: 120 },
  // { field: 'updatedAt',headerClassName: "super",headerName: 'Fecha de actualizacion',flex: 1, minWidth: 120 },
  {
    field: 'actions',
    type: 'actions',
    headerClassName: "super",
    flex: 1,
    minWidth: 190,
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
      <GridActionsCellItem 
        color='secondary'
        icon={<PrintOutlined />}
        label="Print"
        onClick={mostrarPdf}
      />,
      <IconButton
        size="small"
        aria-label="Estatus"
      >
        <Switch color='secondary' checked={evento.row.estatus} name="estatus" onChange={(event)=>handleChange(event, evento.row.idhojaservicios)} />
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
      { abrirPdf ===true?<CrearPdf datoHoja={hServicio} isCartaFijo={false} formato={configReport} />: "" }
      { abrirPdf ===false? <FormHojaServicio />:"" }
        {/* <FormHojaServicio/> */}
        <Stack direction="row" spacing={1} marginBottom={2}>
                <Button onClick={newRow} color={'secondary'} variant="outlined" startIcon={<AddCircleOutlineOutlined/>}>
                    Nuevo
                </Button>
            </Stack>
            <ThemeProvider theme={theme}>
      <DataGrid
      disableColumnFilter
      disableColumnSelector
      disableDensitySelector
        onCellClick={onSelect}
        getRowId={(row) => row.idhojaservicios}
        autoHeight={true}
        rows={events}
        columns={columns}
        pageSize={11}
        rowsPerPageOptions={[11]}
        components={{
           Toolbar: QuickSearchToolbar ,
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