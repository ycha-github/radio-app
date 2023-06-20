// import React from 'react'

// import PDFViewer from 'pdf-viewer-reactjs'
// import { ModalRadio } from '../../components/ModalRadio'
// import { Box } from '@mui/material'
// //import CustomNavigation from 'pdf-viewer-reactjs'

// export const VerPdf = (customStyles) => {
    
//     return (
        
//         <ModalRadio>
//             <Box sx={{...customStyles, maxWidth: '1100px', maxHeight: '700px' }}>
//         <PDFViewer
       
       
//             document={{
//                 css:"heigth:20",
//                 url: 'http://localhost:8000/api/v0/documentos/users/30.pdf',
//             }}
//             scale={.90}
//       scaleStep={0.5}
//       maxScale={5}
//       minScale={0.5}
            
//         />
//          </Box>
//         </ModalRadio>
//     )
// }
import React, { useState } from 'react';
import { Page, Text, View, Document, StyleSheet, Link, PDFViewer } from '@react-pdf/renderer';
import { ModalRadio } from '../../components/ModalRadio';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
export const VerPdf = ({enviarIdImg, idEnviado}) => {
  //const [idImagen ,setIdImagen]=useState([])
  console.log(idEnviado);
  //
  let idImagen;
 idEnviado === "fk_documento_ine" ?  idImagen=enviarIdImg.fk_documento_ine : idImagen=enviarIdImg.fk_documento_cuip;
  console.log(enviarIdImg);
  console.log(idImagen);
    return(
        <ModalRadio>
            <PDFViewer src={`http://localhost:8000/api/v0/documentos/users/${idImagen}.pdf`} style={{width:"55vw", height:"75vh"}}>
    <Document>
      <Page size="A4" style={styles.page}>
    
      </Page>
    </Document>
    </PDFViewer>
    </ModalRadio>
  )};