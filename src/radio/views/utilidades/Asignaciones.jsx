import {useState , useEffect} from "react";
import { DataGrid, gridClasses, esES, GridActionsCellItem, GridPagination, GridToolbarExport, GridToolbarQuickFilter } from '@mui/x-data-grid'; 
import { Box, IconButton,createTheme, Switch,ThemeProvider, Stack, Button, styled, FormControl, InputLabel, Select, OutlinedInput, MenuItem, Checkbox, ListItemText } from '@mui/material';
import { AddCircleOutlineOutlined, Close, Done, Edit, PrintOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { useAsignacionesStore } from '../../../hooks/hooksUtilidades/useAsignacionesStore';
import { FormAsignaciones } from '../../components/formUtilidades/FormAsignaciones';
import { useNavigate } from 'react-router-dom';
import { CrearPdf } from './CrearPdf';
import radioApi from "../../../api/radioApi";
import Swal from "sweetalert2";

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
 const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

  export const Asignaciones=()=> {
  const { events, setActiveEvent, startLoadingEvents,deleteEvent, corporacionesFiltrado, startLoadingCorporacion,user } = useAsignacionesStore();
  const {OpenModal, mostrarActualizar,disableForm}=useModalHook();
  const [state, setState] =useState([]);
 const [abrirPdf, setAbrirPdf]= useState(false);
 const [abrirPdfReporte, setAbrirPdfReporte]= useState(false);
 const [onclick1, setOnclick1]= useState(false);
 const [imprimir, setImprimir]= useState({});
 const [buscarCorporaciones, setBuscarCorporaciones] = useState([])
 const [enviarCorporaciones, setEnviarCorporaciones] = useState([])
 const [corporacionesArray, setCorporacionesArray] = useState([])
//  const [arregloCorp, setArregloCorp] = useState([])
 
  const [configReport, setConfigReport] = useState({})

  useEffect(() => {
    startLoadingEvents();
    startLoadingCorporacion();
  }, [])

  const newRow =()=>{
    setActiveEvent({
      usuarios_idusuarios:"",
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
       fecha_asignacion:null,
       estatus:  1,
       createdAt: "",
       updatedAt: "",
    })
    OpenModal();
    setOnclick1(true);
    setAbrirPdf(false);
    setAbrirPdfReporte(false);
    //navigate('../asignaciones');
  }
  
  //let image = axios.get(`http://localhost:8000/api/v0/documentos/1:13`, {responseType: 'arraybuffer'});
  useEffect(() => {
    radioApi.get('/corporaciones/estatus/').
  then((response)=>{
    setBuscarCorporaciones(response.data);
  });
 }, []);

//  console.log(buscarCorporaciones[1]?.nombreCorporacion)

    useEffect(() => {
    radioApi.get(`/configreportes/estatus`).
          then((response) => {
            setConfigReport(response.data);
          });
      }, []);

    

  const handleChange =async (event,r) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    //setState(event.target.checked);
    await deleteEvent(r);
  };

  const cambiar = ( ) =>  {
    setAbrirPdf(false);
    setAbrirPdfReporte(false);
    setOnclick1(true);
    OpenModal();
    mostrarActualizar();
  }
  
  const handleSelectChange = (event) => {

    const {
        target: { value },
    } = event;
    setCorporacionesArray(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(', ') : value,
        );
        setEnviarCorporaciones([`${value}`]);
      // console.log(value)
      };
      // console.log(corporacionesArray)
  
  const ver = () =>  {
    setAbrirPdf(false);
    setAbrirPdfReporte(false);
    disableForm();
    OpenModal();
    mostrarActualizar();
  }
//   let f =[]
// const formarArrayCorp =()=>{
// let s=[]
//   for ( let i = 0; i < buscarCorporaciones.length; i++) {
//     // console.log(buscarCorporaciones[i].nombreCorporacion);
//     f.push(buscarCorporaciones[i]?.nombreCorporacion)
//      s=f
//     } 
//     setArregloCorp(s)
// }
// //console.log(f);
// console.log(arregloCorp);

  const mostrarPdf = ( event) =>  {
    setAbrirPdf(true);
    setAbrirPdfReporte(false);
    OpenModal();
    //navigate('../mostrar-pdf');
    //setAbrirPdf(true);
    //return (imprimir)
  }

  const mostrarPdfReporteCorp = ( event) =>  {
    setAbrirPdf(true);
    setAbrirPdfReporte(true);
    OpenModal();
    // formarArrayCorp();
    //navigate('../mostrar-pdf');
    //setAbrirPdf(true);
    //return (imprimir)
  }
  const onSelect = ( event ) =>  {
     console.log(event.row)
    setActiveEvent( event.row );
    setImprimir(event.row)
    
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

  { field: 'idasignacion', headerClassName: "super", headerName: 'ID',width: 60, },
  { field: 'nombre_completo', headerClassName: "super", headerName: 'Asignado a' ,width: 250,  },
  { field: 'rfsi',headerClassName: "super", headerName: 'RFSI' , width: 150 },
  { field: 'nombrePuesto', headerClassName: "super", headerName: 'Puesto' ,width: 350,  },
  { field: 'nombreCorporacion', headerClassName: "super", headerName: 'Corporacion',width: 450,  },
  { field: 'inventario_interno',headerClassName: "super", headerName: 'Inventario Interno Radio', width: 220 },
  { field: 'serie_radio',headerClassName: "super", headerName: 'Serie Radio', width: 220 },
  { field: 'inventarioSpCargador',headerClassName: "super", headerName: 'Inventario Interno Cargador',width: 220 },
  { field: 'serie_cargador',headerClassName: "super", headerName: 'Serie Cargador',width: 220 },
  { field: 'tipo',headerClassName: "super", headerName: 'Tipo Radio',flex: 2 , minWidth: 90 },
  { field: 'unidad',headerClassName: "super",headerName: 'Unidad', width: 90 },
  { field: 'estatus',type: 'boolean',headerClassName: "super",headerName: 'Estatus',flex: 2, minWidth: 90 },
  // { field: 'updatedAt',headerClassName: "super",headerName: 'Fecha de actualizacion',flex: 2, minWidth: 120 },
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
      {abrirPdf ===true && abrirPdfReporte===false ?<CrearPdf datos={imprimir} isCartaFijo={true} isReporte={false} formato={configReport} />: ""}
      {abrirPdf ===true && abrirPdfReporte===true ?<CrearPdf datos={events} isCartaFijo={false} isReporte={true} CorporacionesABuscar={corporacionesArray} formato={configReport} />: ""}
      {abrirPdf ===false ? <FormAsignaciones datoClick={onclick1} />:""}
      {/* <FormAsignacionGeneral/> */}
      {/* {let printData = document.getElementById("datagrid1").innerHTML} */}
        <Stack direction="row" spacing={1} marginBottom={2}>
          <Button onClick={newRow} color={'secondary'} variant="outlined" startIcon={<AddCircleOutlineOutlined/>}>
            Nuevo
          </Button>
          {/* <Button onClick={mostrarPdfReporteCorp} color={'secondary'} variant="outlined" startIcon={<PrintOutlined/>}>
            Reporte por Corporación
          </Button>
          <FormControl sx={{ border: 'none', mb: 1, width: 600 }}>
          <InputLabel id="demo-multiple-checkbox-label" color={'secondary'} >Reporte corporaciones</InputLabel> */}
           {/* <Select
             //disabled={isVer}
             labelId="demo-multiple-checkbox-label"
             sx={{heigth:500}}
             id="demo-multiple-checkbox"
             multiple
             //onClose={corporacionesArray !="" ? mostrarPdfReporteCorp:console.log("")}
             value={corporacionesArray}
             onChange={handleSelectChange}
             input={<OutlinedInput label="Reporte corporaciones" />}
             renderValue={(selected) => selected.join(', ')}
             MenuProps={MenuProps}
             color={'secondary'}
           >
              {
                buscarCorporaciones.map((service) =>
                  { 
                    return <MenuItem key={service.idcorporaciones} value={service.nombreCorporacion} > 
                            <Checkbox  checked={ corporacionesArray.indexOf(service.nombreCorporacion) > - 1 } />
                            <ListItemText primary={service.nombreCorporacion} />
                          </MenuItem> 
                  }
                )
              }  
           </Select> */}
           {/* </FormControl> */}
        </Stack>
           
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
        rows={events}
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
       
   
      </Box>
      </div>
        </div>
    </div>
    </>
  );
}