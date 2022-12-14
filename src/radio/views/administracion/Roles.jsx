import { DataGrid, esES, GridActionsCellItem } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { Box, Button, IconButton,Stack, Switch } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AddCircleOutlineOutlined, Block, Edit} from '@mui/icons-material';
import { useModalHook } from '../../../hooks/useModalHook';
import { useRolStore } from '../../../hooks/hooksAdministracion/useRolStore';
import { FormRoles } from '../../components/formAdmin/FormRoles';
 

export const Roles = () => {
  const { events, setActiveEvent, startLoadingEvents, deleteEvent } = useRolStore();
  const { OpenModal, mostrarActualizar } = useModalHook();
  const [state, setState] =useState([]);

  useEffect(() => {
    startLoadingEvents()
  }, [])

  const newRow =()=>{
    setActiveEvent({
      rol:'',
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
    {
      palette: {
      primary: { main: '#1976d2' },
      },
    },
    esES,
  );

  const columns = [

    { field: 'idrol', headerClassName: "super", headerName: 'ID', flex: 1, minWidth: 90 },
    { field: 'rol', headerClassName: "super", headerName: 'Rol', flex: 1, minWidth: 90 },
    { field: 'estatus', headerClassName: "super", headerName: 'Estado', flex: 1, minWidth: 90 },
    { field: 'createdAt',headerClassName: "super",headerName: 'Fecha de creacion',flex: 1, minWidth: 90 },
    { field: 'updatedAt',headerClassName: "super",headerName: 'Fecha de actualizacion',flex: 1, minWidth: 90 },
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
          <Switch color='info' checked={evento.row.estatus} name="estatus" onChange={(event)=>handleChange(event, evento.row.idrol)} />
       </IconButton> 
       
    ], 
    }, 
  ];

  return (
    <>
      <h2 className='colorAdmin'>Roles</h2>
      <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
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
              <FormRoles/>
              <Stack direction="row" spacing={1} marginBottom={2}>
                <Button onClick={newRow} color={'info'} variant="outlined" startIcon={<AddCircleOutlineOutlined />}>
                    Nuevo
                </Button>
            </Stack>
              <ThemeProvider theme={theme}>
                <DataGrid
                onCellClick={onSelect}
                  getRowId={(row) => row.idrol}
                  autoHeight={true}
                  rows={events}
                  columns={columns}
                  pageSize={12}
                  rowsPerPageOptions={[12]}
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