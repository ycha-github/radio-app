import { DataGrid, esES, GridActionsCellItem } from '@mui/x-data-grid';
import  {useState , useEffect} from "react";
import { Box, IconButton,createTheme, Switch,ThemeProvider, Stack, Button } from '@mui/material';
import { AddCircleOutlineOutlined, Block, Close, Done, Edit } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { useServiciosStore } from '../../../hooks/hooksCatalogo/useServiciosStore';
import { FormServicio } from '../../components/formCat/FormServicio';

const colorClose=()=>{
  return <Close color='error'/>
}
const colorDone=()=>{
  return <Done color='success'/>
}

export const Servicios = () => {

  const { events, setActiveEvent, startLoadingEvents, deleteEvent } = useServiciosStore();
  const { OpenModal, mostrarActualizar } = useModalHook();
  const [state, setState] =useState([]);

  useEffect(() => {
    startLoadingEvents()
  }, [])

  const newRow =()=>{
    setActiveEvent({
      
      nombreServicios:'',
      descripcion:'',
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
  esES,
);


const columns = [
  { field: 'idservicios', headerClassName: "super", headerName: 'ID', Width: 90 },
  { field: 'nombreServicios', headerClassName: "super", headerName: 'Nombre', flex:1, minWidth: 90 },
  { field: 'descripcion', headerClassName: "super", headerName: 'Descripción', flex:1, minWidth: 90 },
  { field: 'estatus', type: 'boolean', headerClassName: "super", headerName: 'Estado', flex:1, minWidth: 90 },
  {
    field: 'actions',
    type: 'actions',
    headerClassName: "super",
    flex: 1,
    minWidth: 120,
    getActions: (evento) => [
      <GridActionsCellItem
        icon={<Edit />}
        label="Delete"
        onClick={cambiar}
      />,
      
      <IconButton
      color="inherit"
      size="small"
      aria-label="delete"
      >
        <Switch color='warning' checked={evento.row.estatus} name="estatus" onChange={(event)=>handleChange(event, evento.row.idservicios)} />
     </IconButton> 
  ], 
  },
];

  return (
    <>
     <h2 className='colorCat'>SERVICIOS</h2>
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
        <FormServicio/>
        <Stack direction="row" spacing={1} marginBottom={2}>
                <Button onClick={newRow} color={'warning'} variant="outlined" startIcon={<AddCircleOutlineOutlined />}>
                    Nuevo
                </Button>
            </Stack>
            <ThemeProvider theme={theme}>
      <DataGrid
      onCellClick={onSelect}
      getRowId={(row) => row.idservicios}
      autoHeight={true}
        rows={events}
        columns={columns}
        pageSize={12}
        rowsPerPageOptions={[12]}
        components={{
          BooleanCellFalseIcon:colorClose,
          BooleanCellTrueIcon:colorDone
        }}
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
