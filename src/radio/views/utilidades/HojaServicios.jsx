import  {useState , useEffect} from "react";
// import { useNavigate } from 'react-router-dom';
import { DataGrid, esES, GridActionsCellItem, GridToolbar, GridToolbarQuickFilter } from '@mui/x-data-grid'; 
import { Box, IconButton,createTheme, Switch,ThemeProvider, Stack, Button, TextField } from '@mui/material';
import { AddCircleOutlineOutlined, Article, ArticleOutlined, Close, Done, Edit, PrintOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { useHojaServicioStore } from '../../../hooks/hooksUtilidades/useHojaServicioStore';
import { FormHojaServicio } from '../../components/formUtilidades/FormHojaServicio';
import dayjs from "dayjs";
import { CrearPdf } from './CrearPdf';
import radioApi from "../../../api/radioApi";
import Swal from "sweetalert2";
import { FormHojaServicioRfsi } from "../../components/formUtilidades/FormHojaServicioRfsi";
import { useCambiarStore } from "../../../hooks/useCambiarStore";
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
  const { events, setActiveEvent, startLoadingEvents,deleteEvent,user,activeEvent, startSavingEvent } = useHojaServicioStore();
  const { /*mostrarGuardar*/ OpenModal, mostrarActualizar, disableForm }=useModalHook();
  const { errorMessage }=useCambiarStore();
  const [state, setState] =useState([]);
  const [abrirPdf, setAbrirPdf]= useState(false);
  const [isTargeta, setIsTargeta]= useState(false);
  const [nuevoPorRfsi, setNuevoPorRfsi]= useState(false);
  const [imprimir, setImprimir]= useState({});
  const [configReport, setConfigReport]= useState({});
  const [folioNew, setFolioNew]= useState({});

  const [hServicio, setHServicio] = useState({})

  

  useEffect(() => {
    startLoadingEvents()
  }, [])

  let anio;
  let newFolio;
  let folio 
  let primeraFecha = `${events[0]?.['createdAt']}`;
  //  let primerFolio = `${events[0]?.['folio']}`;
   let primerFolio ;
  // const newRow =()=>{ 
  //   startLoadingEvents();
  //    radioApi.get(`/hojasservicios`).
  //          then((response) => {
  //            setFolioNew(response.data)
  //           //  console.log(response.data);
  //           return response.data
  //          });
  //     primeraFecha == "undefined" ? anio = new Date().getFullYear: anio = new Date(events[0]['createdAt']).getFullYear() ;
  //     // primerFolio== "undefined"? folio = 1 : folio= events[0]['folio'];
  //     primerFolio== "undefined"? folio = 1 : folio= folioNew[0].folio;
  //     anio !== anioActual ? newFolio=1 : newFolio = folio+1   
  //     // console.log(newFolio)
  //     // console.log(anio)
  //     // console.log(anioActual)
  //   setActiveEvent({
  //     fecha_servicio: fecha,
  //     fk_idasignacion_ur: '',
  //     servicios: null,
  //     descripcion: '',
  //     entrego_equipo: false,
  //     fecha_entrega: null,
  //     fk_supervisortec: '',
  //     usuario_servicio: '',
  //     usuario_entrega: '',
  //     fk_tecnico_entrega: null,
  //     estatus: 1,
  //     folio: newFolio,
  //     foto1:"",
  //     foto2:"",
  //   })
  //   setNuevoPorRfsi(false)
  //   // startSavingEvent(datoNuevo)
  //   OpenModal();
  //   setAbrirPdf(false);
  // }
  
  // const newRow2 =()=>{ 
  //   startLoadingEvents();
  //    radioApi.get(`/hojasservicios`).
  //          then((response) => {
  //            setFolioNew(response.data)
  //           //  console.log(response.data);
  //           return response.data
  //          });
  //     primeraFecha == "undefined" ? anio = new Date().getFullYear: anio = new Date(events[0]['createdAt']).getFullYear() ;
  //     // primerFolio== "undefined"? folio = 1 : folio= events[0]['folio'];
  //     primerFolio== "undefined"? folio = 1 : folio= folioNew[0].folio;
  //     anio !== anioActual ? newFolio=1 : newFolio = folio+1   
  //     // console.log(newFolio)
  //     // console.log(anio)
  //     // console.log(anioActual)
  //   setActiveEvent({
  //     fecha_servicio: fecha,
  //     fk_idasignacion_ur: '',
  //     servicios: null,
  //     descripcion: '',
  //     entrego_equipo: false,
  //     fecha_entrega: null,
  //     fk_supervisortec: '',
  //     usuario_servicio: '',
  //     usuario_entrega: '',
  //     fk_tecnico_entrega: null,
  //     estatus: 1,
  //     folio: newFolio,
  //     foto1:"",
  //     foto2:"",
  //   })
    
  //   // startSavingEvent(datoNuevo)
  //   setNuevoPorRfsi(true)
  //   OpenModal();
  //   setAbrirPdf(false);
  // }
useEffect(() => {
    radioApi.get(`/hojasservicios`).
          then((response) => {
            setFolioNew(response.data);
          });
      }, []);

  useEffect(() => {
    radioApi.get(`/configreportes/estatus`).
          then((response) => {
            setConfigReport(response.data);
          });
      }, []);
 
      useEffect(() => {
         if (errorMessage !== undefined){
        //   Swal.fire('Ya existe un registro con este folio', errorMessage, 'Intente Nuevamente'confirmButtonText: '<a >Confirmar</a>');
        Swal.fire({
          icon:'question',
          text:'Intente Nuevamente ',
          title: 'Ya existe un registro con este folio',
          });
        }
      }, [errorMessage])
         
  //    // console.log(configReport.length);
  //     useEffect(() => {
  //       if (configReport.length > 1){
  //         Swal.fire({
  //           icon:'question',
  //           text:'Favor de elegir el correcto ',
  //           title: 'Hay mas de una configuracion de reportes con estatus activo',
  //           confirmButtonText: '<a href=`config-reportes`>Solucionar</a>',});
  //       }
  //     }, [configReport])

  const handleChange =async (event,r) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    //setState(event.target.checked);
    await deleteEvent(r);
  };

  const cambiar = ( ) =>  {
    setNuevoPorRfsi(true)
    OpenModal();
    setAbrirPdf(false)
    mostrarActualizar();
  }

  const ver = () =>  {
    disableForm();
    setNuevoPorRfsi(true)
    setAbrirPdf(false)
    OpenModal();
    mostrarActualizar();
  }
  

  const mostrarPdf = ( event) =>  {
    setNuevoPorRfsi(false)
    setAbrirPdf(true);
    setIsTargeta(false);
    OpenModal();
}
  const Targeta = ( event) =>  {
    setNuevoPorRfsi(false)
    setAbrirPdf(true);
    setIsTargeta(true);
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
  { field: 'serie',headerClassName: "super", headerName: 'Serie Radio', flex: 1, minWidth: 220 },
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
    minWidth: 230,
    getActions: (evento) => [
      <GridActionsCellItem
        color='secondary'
        icon={<Edit />}
        label="Delete"
        onClick={ cambiar }
      />,
      <GridActionsCellItem
        color='secondary'
        icon={<ArticleOutlined />}
        label="Delete"
        onClick={ Targeta }
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

const mostrarAlert =()=>{
  const promesa= new Promise((resolve,reject)=>{
    setTimeout(()=>{
      radioApi.get(`/hojasservicios`).
           then((response) => {
             setFolioNew(response.data)
            //  console.log(response.data);
            return response.data
           });
           primeraFecha == "undefined" ? anio = new Date().getFullYear: anio = new Date(events[0]['createdAt']).getFullYear() ;
  // primerFolio== "undefined"? folio = 1 : folio= events[0]['folio'];
  primerFolio== "undefined"? folio = 1 : folio= folioNew[0].folio;
  anio !== anioActual ? newFolio=1 : newFolio = folio+1
      resolve();
    },1000)
  });
promesa.then(()=>{
  radioApi.get(`/hojasservicios`).
           then((response) => {
             setFolioNew(response.data)
            //  console.log(response.data);
            return response.data
           });
    
  Swal.fire({
    title: `Crear nueva hoja de servicio con folio ${newFolio}/${anio} ?`,
    // text: "You won't be able to revert this!",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar"
  }).then((result) => {
    if (result.isConfirmed) {
      startSavingEvent({
        fecha_servicio: fecha,
      fk_idasignacion_ur: null,
      servicios: null,
      descripcion: null,
      entrego_equipo: false,
      fecha_entrega: null,
      fk_supervisortec: null,
      usuario_servicio: null,
      usuario_entrega: null,
      fk_tecnico_entrega: null,
      estatus: 1,
      folio: newFolio,
      fk_foto1:null,
      foto1:null,
      fk_foto2:null,
      foto2:null,
      })
      Swal.fire({
        title: "Create!",
        text: "La hoja de servicio ha sido creada.",
        icon: "success",
        showConfirmButton: false,
      });
    }
  });

})
}

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
      { abrirPdf ===true & nuevoPorRfsi === false?<CrearPdf datoHoja={hServicio} isCartaFijo={false} target={isTargeta} formato={configReport} />: "" }
      {/* { abrirPdf ===false & nuevoPorRfsi === false ? <FormHojaServicio />:nuevoPorRfsi === true?<FormHojaServicioRfsi/>:"" } */}
      { abrirPdf ===false & nuevoPorRfsi === true ? <FormHojaServicioRfsi/>:nuevoPorRfsi === true?<FormHojaServicio />:"" }
        {/* <FormHojaServicio/> */}
        <Stack direction="row" spacing={1} marginBottom={2}>
                {/* <Button onClick={newRow} color={'secondary'} variant="outlined" startIcon={<AddCircleOutlineOutlined/>}>
                    Nuevo
                </Button> */}
                {/* <Button onClick={newRow2} color={'secondary'} variant="outlined" startIcon={<AddCircleOutlineOutlined/>}>
                    Nuevo por RFSI
                </Button> */}
                <Button onClick={mostrarAlert} color={'secondary'} variant="outlined" startIcon={<AddCircleOutlineOutlined/>}>
                    Nuevo por RFSI
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