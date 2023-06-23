import { useEffect} from "react";
import { styled } from '@mui/material/styles';
import { DataGrid, gridClasses, esES, GridToolbar, GridToolbarQuickFilter } from '@mui/x-data-grid'; 
import { Box, createTheme, ThemeProvider } from '@mui/material';
import { useAsignacionesStore } from '../../../hooks/hooksUtilidades/useAsignacionesStore';


const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: theme.palette.grey[200],
    }
  }));
 
  export const ConsultaPo=()=> {
  const { events, startLoadingEvents } = useAsignacionesStore();
 
  useEffect(() => {
    startLoadingEvents()
  }, [])

  const theme = createTheme(
   esES,
  );



const columns =  [

    { field: 'rfsi',headerClassName: "super", headerName: 'RFSI',flex: 2 , minWidth: 90 },
    { field: 'tipo',headerClassName: "super",headerName: 'Tipo', flex: 2, minWidth: 120 },
    { field: 'nombreCorporacion', headerClassName: "super",headerName: 'Corporación',flex: 2, minWidth: 90 },
    { field: 'nombre_completo', headerClassName: "super", headerName: 'Asignado a' ,width: 250,  },
    { field: 'nombrePuestoUsuario',headerClassName: "super",headerName: 'Puesto',flex: 2, minWidth: 120 },
    { field: 'placa',headerClassName: "super",headerName: 'Placas',flex: 2, minWidth: 120 },
]

function QuickSearchToolbar(){
    return (
        <Box sx={{ p: 0.5, pb: 0,}}>
            <GridToolbarQuickFilter />
        </Box>
    )
}

  return (
    <>
    <h2 className='colorConsulta'>Consultas</h2>
    <div style={{ height: 400, width: '100%' }}>
    <div style={{ height: 'flex', width: '100%' }}>
    <div  style={{ flexGrow: 1 }}>
      <Box
       sx={{
        height:750,
        width: "100%",
        "& .super":{
          backgroundColor: "rgba(59,60,64,0.42)",
          color: 'white',
          fontSize: 17,
        }

      }}> 

    <ThemeProvider theme={theme}>
                    
      <StripedDataGrid
        className="tab"
        id="imprimible"
        getRowId={(row) => row.idasignacion}
        getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 !== 0 ? 'even' : 'odd'
        }
        autoHeight={true}
        rows={events}
        columns={columns}
        pageSize={11}
        rowsPerPageOptions={[11]}
        slots={{ toolbar: GridToolbar }}
        components={{
          Toolbar: QuickSearchToolbar,
        }}
        sx={{
          boxShadow:6,
          border:5,
          borderColor:'rgba(59,60,64,0.42)',
          '& .MuiDataGrid-cell:hover':{
          color:'rgba(59,60,64,0.42)',
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