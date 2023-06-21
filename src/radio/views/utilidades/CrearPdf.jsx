import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PDFViewer} from '@react-pdf/renderer';
import { Box } from '@mui/material';
import { ModalRadio } from '../../components/ModalRadio';
import { CartaFijo } from './CartaFijo';
import { ImprimirHServicio } from './ImprimirHServicio';
//import { useAsignacionesStore } from '../../../hooks/hooksUtilidades/useAsignacionesStore';
//import { useAsignacionesStore } from '../../../hooks/hooksUtilidades/useAsignacionesStore';


// Create Document Component
export const CrearPdf=({datos, datoHoja, formato,isCartaFijo},customStyles) => {

 return (
  <ModalRadio  >
    <Box sx={{...customStyles, maxWidth: '1100px', maxHeight: '1100px' }}>
  <PDFViewer style={{width:"55vw", height:"75vh"}}>
  
  {
    isCartaFijo===true ?
    (<CartaFijo datos={datos} formato={formato} />) :
    (<ImprimirHServicio datos={datoHoja} formato={formato} />) 
  }
  </PDFViewer>
  </Box>
  </ModalRadio>
 );
 }