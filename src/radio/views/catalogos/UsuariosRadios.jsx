import { DataGrid,  esES, GridActionsCellItem  } from '@mui/x-data-grid';
import { Box, Button, createTheme, IconButton, Stack, Switch, ThemeProvider } from '@mui/material';
import { AddCircleOutlineOutlined, Block, Close, Done, Edit, VisibilityOutlined } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { useUsuariosStore } from '../../../hooks/hooksCatalogo/useUsuariosStore';
import { useEffect, useState } from 'react';
import { FormUsuarios } from '../../components/formCat/FormUsuarios';
import { VerPdf } from '../utilidades/VerPdf';
import radioApi from '../../../api/radioApi';


const colorClose=()=>{
  return <Close color='error'/>
}
const colorDone=()=>{
  return <Done color='success'/>
}

export const UsuariosRadios= () => {
  const { events, setActiveEvent, startLoadingEvents, deleteEvent } = useUsuariosStore();
  const { OpenModal, mostrarActualizar } = useModalHook();
  const [state, setState] =useState([]);
  const [abrirPdf, setAbrirPdf]= useState(false);
  const [enviarIdImg, setEnviarIdImg]= useState({});
  const [idEnviado, setIdEnviado]= useState({});
  

  useEffect(() => {
    startLoadingEvents()
  }, [])
  
  

  const newRow =()=>{
    setActiveEvent({
      nombre:'',
      apellido_pat:'',
      apellido_mat:'',
      fk_puesto:'',
      cuip:'',
      clave_elector:'',
      imagen_ine:'',
      fk_documento_ine:null,
      imagen_cuip:'',
      fk_documento_cuip:null,
      titulo:'',
      estatus:'',
      createdAt:'',
      updatedAt:'',
    })
    OpenModal();
    setAbrirPdf(false);
  }

  const handleChange =async (event,r) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    //setState(event.target.checked);
    await deleteEvent(r);
  };

  const cambiar = ( ) =>  {
    setAbrirPdf(false)
    OpenModal();
    mostrarActualizar();
  }
  const verDocIne = (event ) =>  {
    setAbrirPdf(true);
    OpenModal();
    setIdEnviado("fk_documento_ine")
  }
  const verDocCUIP = (event ) =>  {
    setAbrirPdf(true);
    OpenModal();
    setIdEnviado("fk_documento_cuip")
  }

  const onSelect = ( event ) =>  {
    //console.log(event.row+`${enviarIdImg}`)
    //console.log(`event.row.enviarIdImg()`)
    setActiveEvent( event.row );
    setEnviarIdImg(event.row);
  }
 const theme = createTheme(
  esES,
);

const columns = [

  { field: 'idusuarios', headerClassName: "super", headerName: 'ID', flex: 1, minWidth: 90 },
  { field: 'nombre',headerClassName: "super", headerName: 'Nombre', flex: 1, minWidth: 130 },
  { field: 'apellido_pat',headerClassName: "super", headerName: 'Apellido Paterno', flex: 1, minWidth: 130 },
  { field: 'apellido_mat',headerClassName: "super", headerName: 'Apellido Materno', flex: 1, minWidth: 130 },
  { field: 'nombrePuesto',headerClassName: "super", headerName: 'Puesto', flex: 1, minWidth: 150 },
  { field: 'cuip',headerClassName: "super", headerName: 'Cuip', flex: 1, minWidth: 190 },
  { field: 'clave_elector',headerClassName: "super", headerName: 'Clave Elector', flex: 1, minWidth: 190 },
  //{ field: 'imagen_ine',headerClassName: "super", headerName: 'Imagen Ine', flex: 1, minWidth: 90 },
  //{ field: 'imagen_cuip',headerClassName: "super", headerName: 'Imagen Cuip', flex: 1, minWidth: 100 },
  { field: 'titulo',headerClassName: "super", headerName: 'Titulo', flex: 1, minWidth: 130 },
  { field: 'createdAt',headerClassName: "super",headerName: 'Fecha de creacion',flex: 1, minWidth: 130 },
  { field: 'updatedAt',headerClassName: "super",headerName: 'Fecha de actualizacion',flex: 1, minWidth: 130 },
  { field: 'estatus',type: 'boolean', headerClassName: "super", headerName: 'Estatus', flex: 1, minWidth: 90 },
  {
    field: 'CUIP',
    headerName:'Ver CUIP',
    type: 'actions',
    headerClassName: "super",
    flex: 1,
    minWidth: 90,
    getActions: (evento) => [
      <GridActionsCellItem
        icon={<VisibilityOutlined />}
        label="Ver CUIP"
        color='warning'
        onClick={verDocCUIP}
      />
  ], 
  },
  {
    field: 'INE',
    headerName:'Ver INE',
    type: 'actions',
    headerClassName: "super",
    flex: 1,
    minWidth: 90,
    getActions: (evento) => [
      <GridActionsCellItem
        icon={<VisibilityOutlined />}
        label="Ver INE"
        color='warning'
        onClick={verDocIne}
      />
  ], 
  },
  {
    field: 'actions',
    type: 'actions',
    headerClassName: "super",
    flex: 1,
    minWidth: 120,
    getActions: (evento) => [
      <GridActionsCellItem
        icon={<Edit />}
        label="Edit"
        color='warning'
        onClick={cambiar}
      />,
      
      <IconButton
      color="inherit"
      size="small"
      aria-label="delete"
      >
        <Switch color='warning' checked={evento.row.estatus} name="estatus" onChange={(event)=>handleChange(event, evento.row.idusuarios)} />
     </IconButton> 
  ], 
  },
];

  return (
    <>
     <h2 className='colorCat'>Usuarios</h2>
     <div style={{ height: 400, width: '100%' }}>
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
      
      {abrirPdf ===true?<VerPdf enviarIdImg={enviarIdImg} idEnviado={idEnviado}  />: ""}
      {abrirPdf=== false? <FormUsuarios/>:""}
        <Stack direction="row" spacing={1} marginBottom={2}>
                <Button onClick={newRow} color={'warning'} variant="outlined" startIcon={<AddCircleOutlineOutlined />}>
                    Nuevo
                </Button>
            </Stack>
            <ThemeProvider theme={theme}>
      <DataGrid
      onCellClick={onSelect}
      getRowId={(row) => row.idusuarios}
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
