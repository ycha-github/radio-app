import  { useEffect, useState,Suspense,lazy } from "react";
import { Grid, FormControlLabel, Box, Radio, FormControl, FormLabel, RadioGroup, Button, MenuItem, Checkbox, ListItemText, InputLabel, Select, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useModalHook } from "../../../hooks/useModalHook";
import {CrearPdf2 } from "./CrearPdf2";
import { useAsync } from 'react-use';
import { radioApi } from "../../../api";
import { useAsignacionesStore } from "../../../hooks/hooksUtilidades/useAsignacionesStore";
import { PrintOutlined, CachedOutlined } from "@mui/icons-material";
import { PDFDownloadLink } from "@react-pdf/renderer";
const RenderedPDFViewer =lazy(()=> import ("./pdfConfig/RenderedPDFViewer"));
import { CrearPdf3 } from "./pdfConfig/CrearPdf3";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 10.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export const Consultas= ()=> {

  const {OpenModal}=useModalHook();
  const [reporte, setReporte]= useState('');
  const [buscarCorporaciones, setBuscarCorporaciones] = useState([]);
  const [buscarUsuarios, setBuscarUsuarios] = useState([]);
  const [enviarCorporaciones, setEnviarCorporaciones] = useState([]);
  const [enviarUsuarios, setEnviarUsuarios] = useState([]);
  const [corporacionesArray, setCorporacionesArray] = useState([]);
  const [usuariosArray, setUsuariosArray] = useState([]);
  const [arregloCorp, setArregloCorp] = useState({});
  const [arregloUsu, setArregloUsu] = useState({});
  const [configReport, setConfigReport] = useState({});
  const [asignaciones, setAsignaciones] = useState({});
  const [value, setValue] = useState('');
  const [poderver, setPoderver] = useState(false);

  useEffect(() => {
    radioApi.get('/asig_usuarios/').
      then((response) => {
        setAsignaciones(response.data);
      });
    }, []);

  useEffect(() => {
    radioApi.get('/corporaciones/estatus/').
      then((response)=>{
        setBuscarCorporaciones(response.data);
      });
    }, []);

  useEffect(() => {
    radioApi.get('/usuarios/idnombre').
      then((response)=>{
        setBuscarUsuarios(response.data);
      });
    }, []);

  useEffect(() => {
    radioApi.get('/configreportes/estatus').
      then((response) => {
        setConfigReport(response.data);
      });
    }, []);
    useEffect(() => {
    let f=[]
    // const formarArrayCorp =()=>{
    for ( let i = 0; i < buscarCorporaciones.length; i++) {
      f.push(buscarCorporaciones[i]?.nombreCorporacion);
    // } 
    setArregloCorp(f);
  }
}, []);
console.log(arregloCorp)
  let u=[]
    const formarArrayUsu =()=>{
    for ( let i = 0; i < buscarUsuarios.length; i++) {
      u.push(buscarUsuarios[i]?.nombreUsuario);
    } 
    setArregloUsu(u);
  }
  
  const mostrarPdfReporteCorp = ( event) =>  { 
    // console.log('aaaaa');
    // setAbrirPdf(true);
    // setAbrirPdfReporte(true);
    setReporte('corpGral');
    
    // OpenModal();
    formarArrayCorp();
    // setPoderver(true)
  }

  const mostrarPdfReporteUsu = ( event) =>  {
    setReporte('usuGral');
    OpenModal();
    formarArrayUsu();
  }

  const mostrarPdfReporteTipo = ( event) =>  {
    setReporte('porTipo');
    OpenModal();
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

  const handleSelectChangeU = (event) => {

    const {
        target: { value },
    } = event;
    setUsuariosArray(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(', ') : value,
        );
        setEnviarUsuarios([`${value}`]);
        // console.log(value)
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const llenar = (event) => {

    // setPoderver(true)
    // OpenModal(true)
  };
  

  //promesa.then(setPoderver(true));
  // console.log(value);
  
  return (
    <>
      <h2 className='colorUti'>CONSULTAS</h2>
      <Grid container justifyContent="center" >
        <Box  height={700} width={1625} className="bordeCheck" >
          <Grid sx={{ pt:3, pl:5 }}>
            <FormControl sx={{ border: 'none', mb: 1, width: 600 }}>
              <InputLabel id="demo-multiple-checkbox-label" color={'secondary'} >Reporte corporaciones</InputLabel>
              <Select
                //disabled={isVer}
                labelId="demo-multiple-checkbox-label"
                sx={{heigth:500}}
                id="demo-multiple-checkbox"
                multiple
                defaultValue={""}
                //onClose={corporacionesArray !="" ? mostrarPdfReporteCorp:console.log("")}
                value={corporacionesArray}
                onChange={handleSelectChange}
                input={<OutlinedInput label="Reporte corporaciones" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                color={'secondary'}
              >
                  {
                    buscarCorporaciones.map((service) => { 
                      return <MenuItem key={service.idcorporaciones} value={service.nombreCorporacion} > 
                              <Checkbox  checked={ corporacionesArray.indexOf(service.nombreCorporacion) > - 1 } />
                              <ListItemText primary={service.nombreCorporacion} />
                             </MenuItem> 
                    })
                  }  
              </Select>
             </FormControl>
             <Button sx={{height:'56px'}}  onClick={mostrarPdfReporteCorp} color={'secondary'} variant="outlined" startIcon={<PrintOutlined/>}>
                Por Corporación
              </Button>
             <Button sx={{height:'56px'}}  onClick={()=>window.location.reload()} color={'secondary'} variant="outlined" startIcon={<CachedOutlined/>}>
                Limpiar
             </Button>
          </Grid>
          <Grid sx={{pt:2, pl:5, pb: 2}}>
            <FormControl sx={{ border: 'none', mb: 1, width: 400 }}>
              <InputLabel id="demo-multiple-checkbox-label" color={'secondary'} >Reporte usuarios</InputLabel>
              <Select
                //disabled={isVer}
                labelId="demo-multiple-checkbox-label"
                sx={{heigth:500}}
                id="demo-multiple-checkbox"
                multiple
                defaultValue={""}
                //onClose={corporacionesArray !="" ? mostrarPdfReporteCorp:console.log("")}
                value={usuariosArray}
                onChange={handleSelectChangeU}
                input={<OutlinedInput label="Reporte usuarios" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                color={'secondary'}
              >
                  {
                    buscarUsuarios.map((service) => { 
                      return <MenuItem key={service.idusuarios} value={service.nombreUsuario} > 
                              <Checkbox  checked={ usuariosArray.indexOf(service.nombreUsuario) > - 1 } />
                              <ListItemText primary={service.nombreUsuario} />
                             </MenuItem> 
                    })
                  }  
              </Select>
             </FormControl>
             <Button sx={{height:'56px'}}  onClick={mostrarPdfReporteUsu} color={'secondary'} variant="outlined" startIcon={<PrintOutlined/>}>
                Por Usuario
              </Button>
            </Grid>
          <Grid item  xs={3} sx={{ pl:5 }}>
            <FormControl sx={{color: 'rgb(78,54,122)'}} >
              <FormLabel id="demo-controlled-radio-buttons-group" sx={{color: 'rgb(78,54,122)',fontWeight: 'bold', fontSize:'16px' }}  >
                Tipos de radios
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel value="Movil" control={<Radio />} label="Móvil" />
                <FormControlLabel value="Fijo" control={<Radio />} label="Fijo" />
                <FormControlLabel value="Portatil" control={<Radio />} label="Portátil" />
              </RadioGroup>
            </FormControl>
           
              <Button sx={{height:'56px', ml: 5, mt: 6}}  onClick={mostrarPdfReporteTipo} color={'secondary'} variant="outlined" startIcon={<PrintOutlined/>}>
                Por Tipo
              </Button>
              </Grid>
              <Grid item  xs={6} sx={{ float: "rigth", position: "relative", right: -650, top: -220 }}>
              <Suspense fallback={<div>Cargando botón...</div>}>
                <RenderedPDFViewer  style={{ backgroundColor: 'grey', width: '950px', height: '560px' }} tipo={value} datos={asignaciones} formato={configReport} CorporacionesABuscar={ corporacionesArray.length !== 0 ? corporacionesArray : arregloCorp }  UsuariosABuscar={ usuariosArray.length !== 0 ? usuariosArray : arregloUsu } decide={reporte} />
                </Suspense>
              </Grid>
              {/* <CrearPdf2 tipo={value} datos={asignaciones} formato={configReport} CorporacionesABuscar={ corporacionesArray.length !== 0 ? corporacionesArray : arregloCorp }  UsuariosABuscar={ usuariosArray.length !== 0 ? usuariosArray : arregloUsu } decide={reporte} aun={"asd"} />      */}
              {/* {
                poderver == true ?
                <>
               </>
              :null
            } */}
            {/* <button
        onClick={async () => {
          const { blop } = await import('./pdfConfig/renderPDF');
          const blob = await blop();
          saveAs(blob, 'test.pdf');
        }}
      >
        Download
      </button> */}
         
          
              {/* {llenar().then(
      // setPoderver(true)
    )} */}
    {/* <RenderedPDFViewer/> */}
    
              {/* <CrearPdf3/> */}
              {/* <Suspense  fallback={ <CrearPdf3/>}> */}
                     
                {/* </Suspense> */}
                {/* {poderver == true ? <RenderedPDFViewer/> : null } */}
             
                
            
              {/* <div>
    <PDFDownloadLink document={<CrearPdf2  />} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? <Button color="error" >Loading document... </Button> : <Button color="error">Download now! </Button>
      }
    </PDFDownloadLink>
  </div> */}
 
         
     </Box>
      </Grid> 
    </>
  )
}
