import React from 'react';
import { PDFViewer} from '@react-pdf/renderer';
import { Box } from '@mui/material';
import { ModalRadio } from '../../components/ModalRadio';
import { CartaFijo, DocumentoTarjeta, ImprimirHServicio } from './';


// Create Document Component
export const CrearPdf=({datos, datoHoja, formato,isCartaFijo,target},customStyles) => {

 return (
  <ModalRadio  >
    <Box sx={{...customStyles, maxWidth: '1100px', maxHeight: '1100px' }}>
  <PDFViewer style={{width:"55vw", height:"75vh"}}>
  
  {
    isCartaFijo===true ?
    (<CartaFijo datos={datos} formato={formato} />) :
    target ===true ?
    (<DocumentoTarjeta datos={datoHoja} formato={formato}/>):
    (<ImprimirHServicio datos={datoHoja} formato={formato} />) 
  }
  </PDFViewer>
  </Box>
  </ModalRadio>
 );
 }