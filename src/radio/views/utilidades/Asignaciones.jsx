import {useState , useEffect} from "react";
import { DataGrid, esES, GridActionsCellItem, GridPagination, GridRow, GridToolbarExport } from '@mui/x-data-grid'; 
import { Box, IconButton,createTheme, Switch,ThemeProvider, Stack, Button, Toolbar, paginationClasses } from '@mui/material';
import { AddCircleOutlineOutlined, Block, Close, Done, Edit, Javascript, PrintOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { useAsignacionesStore } from '../../../hooks/hooksUtilidades/useAsignacionesStore';
import { FormAsignaciones } from '../../components/formUtilidades/FormAsignaciones';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CrearPdf } from './CrearPdf';
import radioApi from "../../../api/radioApi";
import Swal from "sweetalert2";

const colorClose=()=>{
  return <Close color='error'/>
}
const colorDone=()=>{ 
  return <Done color='success'/>
}
const NuevoFooter=()=>{ 
  return <>
    <Box sx={{pl: '35%', alignContent:'center', background:'rgb(214, 204, 230)'}}>
      <GridToolbarExport color='secondary'  sx={{ textAlign: 'center', position: 'relative',width: 200, float: 'left', pt:2}} />
      <GridPagination sx={{ textAlign: 'center', position: 'relative', width: 300,  }} />
      </Box>
  </>
}
 
  export const Asignaciones=()=> {
  const { events, setActiveEvent, startLoadingEvents,deleteEvent } = useAsignacionesStore();
  const {OpenModal, mostrarActualizar}=useModalHook();
  const [state, setState] =useState([]);
 const [abrirPdf, setAbrirPdf]= useState(false);
 const [imprimir, setImprimir]= useState({});

  const [configReport, setConfigReport] = useState({})
  const navigate = useNavigate();
 
  useEffect(() => {
    startLoadingEvents()
  }, [])

  const newRow =()=>{
    setActiveEvent({
      usuarios_idusuarios:"",
       radios_idradios:"",
       rfsi:"",
       fk_accesorio_bateria:null,
       fk_accesorio_cargador:null,
       fk_accesorio_gps:null,
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
       fk_vehiculo:null,
       fecha_asignacion:"",
       estatus:  "",
       createdAt: "",
       updatedAt: "",
    })
    OpenModal();
    setAbrirPdf(false);
    //navigate('../asignaciones');
  }
  
  //let image = axios.get(`http://localhost:8000/api/v0/documentos/1:13`, {responseType: 'arraybuffer'});
  
    useEffect(() => {
    radioApi.get(`/configreportes/estatus`).
          then((response) => {
            setConfigReport(response.data);
          });
      }, []);

      useEffect(() => {
        if (configReport.length > 1){
          Swal.fire({
            icon:'question',
            text:'Favor de elegir el correcto ',
            title: 'Hay mas de una configuracion de reportes con estatus activo',
            confirmButtonText: '<a " href="http://localhost:5173/radio/config-reportes">Solucionar</a>',});
        }
      }, [configReport])

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
    setAbrirPdf(false)
    OpenModal();
    mostrarActualizar();
  }
  
  //  
  //  abrirPdf===true?
  //  <CrearPdf/>:
  //  "cargando"
//
  //  //OpenModal();
  //  //mostrarActualizar();
  //}
//let imprimir={};
  //let imprimir;
  //if (abrirPdf===true){
  //  imprimir= <CrearPdf/>;
  //  //imprimir= "si funciona"
  //  //console.log(imprimir)
  //} else{
  //  imprimir= "dfsdf"
  //  console.log(imprimir)
  //}

  const mostrarPdf = ( event) =>  {
    setAbrirPdf(true);
    OpenModal();
    //navigate('../mostrar-pdf');
    //setAbrirPdf(true);
    //return (imprimir)
}
  const onSelect = ( event ) =>  {
    console.log(event.row)
    setActiveEvent( event.row );
    setImprimir(event.row)
    
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

  { field: 'idasignacion', headerClassName: "super", headerName: 'ID',width: 90,  },
  { field: 'nombre_completo', headerClassName: "super", headerName: 'Asignado a' ,width: 250,  },
  { field: 'clave_elector', headerClassName: "super", headerName: 'Clave Elector' ,width: 200,  },
  { field: 'serie_radio',headerClassName: "super", headerName: 'Radio Asignado',flex: 2 , minWidth: 90 },
  { field: 'rfsi',headerClassName: "super", headerName: 'RFSI',flex: 2 , minWidth: 90 },
  { field: 'createdAt',headerClassName: "super",headerName: 'Fecha de creacion', flex: 2, minWidth: 120 },
  { field: 'updatedAt',headerClassName: "super",headerName: 'Fecha de actualizacion',flex: 2, minWidth: 120 },
  { field: 'estatus',type: 'boolean',headerClassName: "super",headerName: 'Estatus',flex: 2, minWidth: 90 },
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
        icon={<PrintOutlined/>}
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
// function imprimirElemento(elemento) {
//   var ventana = window.open('', 'PRINT', 'height=400,width=600');
//   ventana.document.write('<style>.tabla{width:100%;border-collapse:collapse;margin:16px 0 16px 0;}.tabla th{border:1px solid #ddd;padding:4px;background-color:#d4eefd;text-align:left;font-size:15px;}.tabla td{border:1px solid #ddd;text-align:left;padding:6px;}</style>');
//   ventana.document.write('<html><head><title>' + document.title + '</title>');
//   ventana.document.write('<link rel="stylesheet" href="style.css">');
//   ventana.document.write('</head><body >');
//   ventana.document.write(document.querySelector("#imprimible").innerHTML);
//   ventana.document.write('</body></html>');
//   ventana.document.close();
//   ventana.focus();
//   ventana.onload = function () {

//     ventana.print();
//     ventana.close();
//   }
//   return true;
// }

//document.querySelector("#btnImprimirDiv").addEventListener("click", function () {
//  var div = document.querySelector("#imprimible");
//  imprimirElemento(div);
//});

  return (
    <>
    <h2 className='colorUti'>ASIGNACIONES</h2>
    <div style={{ height: 400, width: '100%' }}>
    <div style={{ height: 'flex', width: '100%' }}>
    <div  style={{ flexGrow: 1 }}>
      <Box
       sx={{
        height:750,
        width: "100%",
        "& .super":{
          backgroundColor: "rgba(207,199,219)",
        }

      }}> 
      {/* <Visibility color='warning'/> <Edit color='warning'/> <Block color='warning'/>  */}
      {abrirPdf ===true?<CrearPdf datos={imprimir} formato={configReport} />: ""}
      {abrirPdf=== false?<FormAsignaciones   />:""}
      {/* <FormAsignacionGeneral/> */}
      {/* {let printData = document.getElementById("datagrid1").innerHTML} */}
        <Stack direction="row" spacing={1} marginBottom={2}>
                <Button onClick={newRow} color={'secondary'} variant="outlined" startIcon={<AddCircleOutlineOutlined/>}>
                    Nuevo
                </Button>
            </Stack>
           
            <ThemeProvider theme={theme}>

                    
      <DataGrid
        class="tabla"
        id="imprimible"
        onCellClick={onSelect}
        getRowId={(row) => row.idasignacion}
        autoHeight={true}
        rows={events}
        columns={columns}
        pageSize={11}
        rowsPerPageOptions={[11]}
        components={{
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
       
   
      </Box>
      </div>
        </div>
    </div>
    </>
  );
}