import {useState , useEffect} from "react";
import { DataGrid, gridClasses, esES, GridActionsCellItem, GridPagination, GridToolbarExport, GridToolbarQuickFilter } from '@mui/x-data-grid'; 
import { Box, IconButton,createTheme, Switch,ThemeProvider, Stack, Button, styled } from '@mui/material';
import { AddCircleOutlineOutlined, Close, Done, Edit, PrintOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { useAsignacionesStore } from '../../../hooks/hooksUtilidades/useAsignacionesStore';
import { FormAsignaciones } from '../../components/formUtilidades/FormAsignaciones';
import { useNavigate } from 'react-router-dom';
import { CrearPdf } from './CrearPdf';
import radioApi from "../../../api/radioApi";

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
  const { events, setActiveEvent, startLoadingEvents, deleteEvent, startLoadingCorporacion, user } = useAsignacionesStore();
  const {OpenModal, mostrarActualizar,disableForm}=useModalHook();
  const [state, setState] =useState([]);
  const [abrirPdf, setAbrirPdf]= useState(false);
  const [abrirPdfReporte, setAbrirPdfReporte]= useState(false);
  const [onclick1, setOnclick1]= useState(false);
  const [imprimir, setImprimir]= useState({});
  const [corporacionesArray, setCorporacionesArray] = useState([])
  const [configReport, setConfigReport] = useState({})

  useEffect(() => {
    startLoadingEvents();
    startLoadingCorporacion();
  }, [])
// console.log(startLoadingEvents);
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
  
  const ver = () =>  {
    setAbrirPdf(false);
    setAbrirPdfReporte(false);
    disableForm();
    OpenModal();
    mostrarActualizar();
  }

  const mostrarPdf = ( event) =>  {
    setAbrirPdf(true);
    setAbrirPdfReporte(false);
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
  { field: 'tipo',headerClassName: "super", headerName: 'Tipo Radio', width: 90 },
  { field: 'rfsi',headerClassName: "super", headerName: 'RFSI' , width: 110 },
  { field: 'modeloRadio',headerClassName: "super", headerName: 'Modelo' , width: 100 },
  { field: 'serie_radio',headerClassName: "super", headerName: 'Serie Radio', width: 220 },
  { field: 'inventario_interno',headerClassName: "super", headerName: 'Inv. Int. Radio', width: 100, },
  { field: 'nombre_completo', headerClassName: "super", headerName: 'Asignado a' ,width: 250,  },
  { field: 'nombrePuesto', headerClassName: "super", headerName: 'Puesto' ,width: 430,  },
  { field: 'serie_cargador',headerClassName: "super", headerName: 'Serie Cargador',width: 220 },
  { field: 'inventarioSpCargador',headerClassName: "super", headerName: 'Inv. Cargador',width: 100 },
  { field: 'unidad',headerClassName: "super",headerName: 'Unidad', width: 90 },
  { field: 'nombreCorporacion', headerClassName: "super", headerName: 'Corporacion',width: 475,  },
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
        {/* <Visibility color='warning'/> <Edit color='warning'/> <Block color='warning'/>  */}
        {abrirPdf ===true && abrirPdfReporte===false ?<CrearPdf datos={imprimir} isCartaFijo={true} isReporte={false} formato={configReport} />: null}
        {abrirPdf ===true && abrirPdfReporte===true ?<CrearPdf datos={events} isCartaFijo={false} isReporte={true} CorporacionesABuscar={corporacionesArray} formato={configReport} />: null}
        {abrirPdf ===false ? <FormAsignaciones datoClick={onclick1} />:null}
        {/* <FormAsignacionGeneral/> */}
        {/* {let printData = document.getElementById("datagrid1").innerHTML} */}
        <Stack direction="row" spacing={1} marginBottom={2}>
          <Button onClick={newRow} color={'secondary'} variant="outlined" startIcon={<AddCircleOutlineOutlined/>}>
            Nuevo
          </Button>
        </Stack>
        <ThemeProvider theme={theme}>       
          <StripedDataGrid
            class="tabla"
            id="imprimible"
            onCellClick={onSelect}
            initialState={{
              sorting: {
                sortModel: [{ field: 'idasignacion', sort: 'desc' }],
              }      
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
  );
}