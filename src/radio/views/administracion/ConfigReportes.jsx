import { DataGrid,  esES, GridActionsCellItem  } from '@mui/x-data-grid';
import { Box, Button, createTheme, IconButton, Stack, Switch, ThemeProvider } from '@mui/material';
import { AddCircleOutlineOutlined, Block, Close, Done, Edit } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { useConfigReportesStore } from '../../../hooks/hooksAdministracion/useConfigReportesStore';
import { useEffect, useState } from 'react';
import { FormConfigReportes } from '../../components/formAdmin/formConfigReportes';

const colorClose=()=>{
  return <Close color='error'/>
}
const colorDone=()=>{
  return <Done color='success'/>
}

export const ConfigReportes= () => {
  const { events, setActiveEvent, startLoadingEvents, deleteEvent } = useConfigReportesStore();
  const { OpenModal, mostrarActualizar } = useModalHook();
  const [state, setState] =useState([]);

  useEffect(() => {
    startLoadingEvents()
  }, [])
  
  const newRow =()=>{
    setActiveEvent({
        encabezado_carta:'',
        encabezado2:'',
        encabezado_hservicio:'',
        logo1:'',
        logo2:'',
        articulo1:'',
        articulo2:'',
        articulo3:'',
        revisor:'',
        responsable_entrega:'',
        pie_carta:'',
        pie_hservicio:'',
        fecha_inicial:'',
        fecha_final:'',
        fecha_creacion:'',
        estatus:'',
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

  { field: 'idconfigReportes', headerClassName: "super", headerName: 'ID', flex: 1, minWidth: 40 },
  { field: 'encabezado_carta',headerClassName: "super", headerName: 'Encabezado carta1', flex: 1, minWidth: 90 },
  { field: 'encabezado2',headerClassName: "super", headerName: 'Encabezado carta2', flex: 1, minWidth: 90 },
  { field: 'encabezado_hservicio',headerClassName: "super", headerName: 'Encabezado HServicio', flex: 1, minWidth: 90 },
  { field: 'logo1',headerClassName: "super", headerName: 'Logo1', flex: 1, minWidth: 90 },
  { field: 'logo2',headerClassName: "super", headerName: 'Logo2', flex: 1, minWidth: 90 },
  { field: 'articulo1',headerClassName: "super", headerName: 'Artículo1', flex: 1, minWidth: 90 },
  { field: 'articulo2',headerClassName: "super", headerName: 'Artículo2', flex: 1, minWidth: 90 },
  { field: 'articulo3',headerClassName: "super", headerName: 'Artículo3', flex: 1, minWidth: 90 },
  { field: 'revisor',headerClassName: "super", headerName: 'Revisor', flex: 1, minWidth: 90 },
  { field: 'responsable_entrega',headerClassName: "super", headerName: 'Entrega', flex: 1, minWidth: 90 },
  { field: 'pie_carta',headerClassName: "super", headerName: 'Pie de carta', flex: 1, minWidth: 90 },
  { field: 'pie_hservicio',headerClassName: "super", headerName: 'Pie de HServicio', flex: 1, minWidth: 90 },
  { field: 'fecha_inicial',headerClassName: "super", headerName: 'Fecha Inicial', flex: 1, minWidth: 90 },
  { field: 'fecha_final',headerClassName: "super", headerName: 'Fecha Final', flex: 1, minWidth: 90 },
  { field: 'estatus', type: 'boolean', headerClassName: "super", headerName: 'Estatus', flex: 1, minWidth: 90 },
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
        <Switch color='info' checked={evento.row.estatus} name="estatus" onChange={(event)=>handleChange(event, evento.row.idconfigReportes)} />
     </IconButton> 
  ], 
  },
];



  return (
    <>
     <h2 className='colorAdmin'>CONFIGURACIÓN / H SERVICIOS</h2>
     <div style={{ height: 400, width: '100%' }}>
    <div style={{ height: 'flex', width: '100%' }}>
    <div style={{ flexGrow: 1 }}>
      <Box
       sx={{
        height: 750,
        width: "100%",
        "& .super": {
        backgroundColor: "rgba(15, 163, 248, 0.8)",
        }
      }}>
      {/* <Visibility color='warning'/> <Edit color='warning'/> <Block color='warning'/>  */}
        <FormConfigReportes/>
        <Stack direction="row" spacing={1} marginBottom={2}>
                <Button onClick={newRow} color={"info"} variant="outlined" startIcon={<AddCircleOutlineOutlined />}>
                    Nuevo
                </Button>
            </Stack>
            <ThemeProvider theme={theme}>
      <DataGrid
      onCellClick={onSelect}
      getRowId={(row) => row.idconfigReportes}
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
            boxShadow: 5,
            border: 4,
            borderColor: 'rgba(15, 163, 248, 0.8)',
            '& .MuiDataGrid-cell:hover': {
            color: 'rgba(15, 163, 248, 0.8)',
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
