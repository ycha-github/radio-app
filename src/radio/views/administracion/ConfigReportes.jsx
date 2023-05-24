import { useEffect, useState } from 'react';
import { DataGrid,  esES, GridActionsCellItem  } from '@mui/x-data-grid';
import { Box, Button, createTheme, IconButton, Stack, Switch, ThemeProvider } from '@mui/material';
import { AddCircleOutlineOutlined, Block, Close, Done, Edit, VisibilityOutlined } from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { useConfigReportesStore } from '../../../hooks/hooksAdministracion/useConfigReportesStore';
import { FormConfigReportes } from '../../components/formAdmin/formConfigReportes';

const colorClose=()=>{
  return <Close color='error'/>
}
const colorDone=()=>{
  return <Done color='success'/>
}

export const ConfigReportes= () => {
  const { events, setActiveEvent, startLoadingEvents, deleteEvent } = useConfigReportesStore();
  const { OpenModal, mostrarActualizar, disableForm } = useModalHook();
  const [state, setState] =useState([]);

  useEffect(() => {
    startLoadingEvents()
  }, [])
  
  const newRow =()=>{
    setActiveEvent({
      encabezado_carta:'',
      articulo1:'',
      articulo2:'',
      articulo3:'',
      articulo4:'',
      articulo5:'',
      articulo6:'',
      articulo7:'',
      logoc4:'',
      logo_ssypc:'',
      fk_revisor:'',
      fk_responsable_entrega:'',
      ccp_carta:'',
      fecha_inicial:'',
      fecha_final:'',
      estatus:'',
      createdAt: '',
      updatedAt: '',
    })
    OpenModal();
  }

  const handleChange =async (event,r) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    // setState(event.target.checked);
    
    await deleteEvent(r);
  };

  const cambiar = ( ) =>  {
    OpenModal();
    mostrarActualizar();
  }

  const ver = () =>  {
    disableForm();
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
  { field: 'encabezado_carta',headerClassName: "super", headerName: 'Encabezado carta', flex: 1, minWidth: 90 },
  { field: 'articulo1',headerClassName: "super", headerName: 'Articulo parte 1', flex: 1, minWidth: 90 },
  { field: 'articulo2',headerClassName: "super", headerName: 'Articulo parte2', flex: 1, minWidth: 90 },
  { field: 'articulo3',headerClassName: "super", headerName: 'Articulo parte 3', flex: 1, minWidth: 90 },
  { field: 'articulo4',headerClassName: "super", headerName: 'Articulo parte 4', flex: 1, minWidth: 90 },
  { field: 'articulo5',headerClassName: "super", headerName: 'Articulo parte5', flex: 1, minWidth: 90 },
  { field: 'articulo6',headerClassName: "super", headerName: 'Articulo parte 6', flex: 1, minWidth: 90 },
  { field: 'articulo7',headerClassName: "super", headerName: 'Articulo parte 7', flex: 1, minWidth: 90 },
  { field: 'logoc4',headerClassName: "super", headerName: 'Logo C4', flex: 1, minWidth: 90 },
  { field: 'logo_ssypc',headerClassName: "super", headerName: 'Logo SSYPC', flex: 1, minWidth: 90 },
  { field: 'nombre_revisor',headerClassName: "super", headerName: 'Revisor', flex: 1, minWidth: 90 },
  { field: 'nombre_responsable',headerClassName: "super", headerName: 'Entrega', flex: 1, minWidth: 90 },
  { field: 'ccp_carta',headerClassName: "super", headerName: 'Ccp de carta', flex: 1, minWidth: 90 },
  { field: 'fecha_inicial',headerClassName: "super", headerName: 'Fecha Inicial', flex: 1, minWidth: 90 },
  { field: 'fecha_final',headerClassName: "super", headerName: 'Fecha Final', flex: 1, minWidth: 90 },
  { field: 'estatus', type: 'boolean', headerClassName: "super", headerName: 'Estatus', flex: 1, minWidth: 90 },
  {
    field: 'actions',
    type: 'actions',
    headerClassName: "super",
    flex: 1,
    minWidth: 130,
    getActions: (evento) => [
      <GridActionsCellItem
      color='info'
        icon={<Edit />}
        label="Delete"
        onClick={cambiar}
      />,
      <GridActionsCellItem 
      color='info'
        icon={<VisibilityOutlined />}
        label="View"
        onClick={ver}
      />,
      <IconButton
        size="small"
        aria-label="Estatus"
      >
        <Switch color='info' checked={evento.row.estatus} name="estatus" onChange={(event) => handleChange(event, evento.row.idconfigReportes)} />
     </IconButton> 
  ], 
  },
];



  return (
    <>
     <h2 className='colorAdmin'>CONFIGURACIÓN CARTAS DE ASIGNACIÓN</h2>
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
        <FormConfigReportes />
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
