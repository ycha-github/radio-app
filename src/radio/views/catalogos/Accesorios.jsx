import { DataGrid, esES } from '@mui/x-data-grid';
import  {useState , useEffect} from "react";
import { Box, IconButton,createTheme, Switch,ThemeProvider, Stack, Button } from '@mui/material';
//import { FormAccesorios } from '../../components/formCat/FormAccesorios';
import { AddCircleOutlineOutlined, Block, Edit } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { useAccesoriosStore } from '../../../hooks/hooksCatalogo/useAccesoriosStore';
import { FormAccesorios } from '../../components/formCat/FormAccesorios';


const columns = [

  { field: 'idaccesorios', headerClassName: "super", headerName: 'ID',width: 90,  },
  { field: 'num_serie',headerClassName: "super", headerName: 'Numero de serie', flex: 1, minWidth: 90 },
  { field: 'marcas_idMarcas',headerClassName: "super", headerName: 'Marca', flex: 1, minWidth: 90 },
  { field: 'inventario_interno',headerClassName: "super", headerName: 'Inventario Interno', flex: 1, minWidth: 90 },
  { field: 'inventario_segpub',headerClassName: "super",headerName: 'Inv. Seg. Pub.',flex: 1, minWidth: 90 },
  { field: 'contrato_compra',headerClassName: "super",headerName: 'Contrato',flex: 1, minWidth: 90 },
  { field: 'observaciones',headerClassName: "super",headerName: 'Observaciones',flex: 1, minWidth: 90 },
  { field: 'fecha_recepcion',headerClassName: "super",headerName: 'Fecha de Recepcion',flex: 1, minWidth: 90 },
  { field: 'fk_sue',headerClassName: "super",headerName: 'SUE',flex: 1, minWidth: 90 },
  { field: 'estatus',headerClassName: "super",headerName: 'Estatus',flex: 1, minWidth: 90 },
  { field: 'createdAt',headerClassName: "super",headerName: 'Fecha de creacion',flex: 1, minWidth: 90 },
  { field: 'updatedAt',headerClassName: "super",headerName: 'Fecha de actualizacion',flex: 1, minWidth: 90 },
  {
    field: 'actions',
    headerName: 'Actions',
    renderCell: RowMenuCell,
    sortable: false,
    width: 140,
    headerClassName: "super",
    headerAlign: 'center',
    filterable: false,
    align: 'center',
    disableColumnMenu: true,
    disableReorder: true,
  },
];
function RowMenuCell( event) {
  const { deleteEvent}= useAccesoriosStore();
  const {OpenModal, mostrarActualizar}=useModalHook();

  const [state, setState] =useState(
    event.row
  );
  
  const handleChange =async (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    console.log(state);
    await deleteEvent(state);
  };

  const cambiar = ( ) =>  {
    OpenModal();
    mostrarActualizar();
  }
  return (
    <div>
      <IconButton
        onClick={ cambiar }
        color="inherit"
        size="small"
        aria-label="edit">
        <Edit fontSize="small"/>
      </IconButton>
      <IconButton
      onClick={deleteEvent}
        color="inherit"
        size="small"
        aria-label="delete">
        <Block fontSize="small"/>
      </IconButton>
      <IconButton
        color="inherit"
        size="small"
        aria-label="delete">
       <Switch color='warning' name="estatus" checked={state.estatus}  onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
      </IconButton>
    </div>
  );
}

export const Accesorios=()=> { 
  const { events, setActiveEvent, startLoadingEvents } = useAccesoriosStore();
  
  const { OpenModal } = useModalHook();
  const newRow =()=>{
    setActiveEvent({
num_serie:'',
marcas_idMarcas:'',
inventario_interno:'',
inventario_segpub:'',
contrato_compra:'',
observaciones:'',
fecha_recepcion:'',
fk_sue:'',
estatus:'',
createdAt:'',
updatedAt:'',
    })
    OpenModal();
  }
  const onSelect = ( event ) =>  {
    console.log(event.row)
    setActiveEvent( event.row );
  }
 const theme = createTheme(
  {
    palette: {
    primary: { main: '#1976d2' },
    },
  },
  esES,
);

useEffect(() => {
  startLoadingEvents()
}, [])
  return (
    <>
     <h2 className='colorCat'>ACCESORIOS</h2>
    <div style={{ height: '100%', width: '100%' }}>
    <div style={{ height: 'flex', width: '100%' }}>
    <div style={{ flexGrow: 1 }}>
      <Box
       sx={{
        height:750,
        width: "100%",
        "& .super":{
          backgroundColor: "rgba(228, 125, 35, 1)",
        }

      }}> 
      {/* <Visibility color='warning'/> <Edit color='warning'/> <Block color='warning'/>  */}
        <FormAccesorios/>
        <Stack direction="row" spacing={1} marginBottom={2}>
                <Button onClick={newRow} color={'warning'} variant="outlined" startIcon={<AddCircleOutlineOutlined />}>
                    Nuevo
                </Button>
            </Stack>
            <ThemeProvider theme={theme}>
      <DataGrid
      onCellClick={onSelect}
      getRowId={(row) => row.idaccesorios}
      autoHeight={true}
        rows={events}
        columns={columns}
        pageSize={12}
        rowsPerPageOptions={[12]}
        sx={{
          boxShadow:5,
          border:4,
          borderColor:'rgba(228, 125, 35, 1)',
          '& .MuiDataGrid-cell:hover':{
          color:'rgba(228, 125, 35, 1)',
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
