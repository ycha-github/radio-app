import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Document, Image, PDFViewer, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { Box } from '@mui/material';
import { ModalRadio } from '../../components/ModalRadio';

const styles = StyleSheet.create({
  title: {
    fontSize: 10,
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
    margin: '0 0 0 0',
    textDecoration: 'none'
  },
  image: {
    margin: '40 0 10 0',
    width:170,
    height:60,
    padding: '0 0 0 0',
  },
  body: {
    padding: '0 0 80 0',
  },
  section: {
    margin: '5 0 5 0',
    border: '0px none none',
    padding: '0 0 0 0',
  
  },
  margen: {
    margin: '0 50 40 50',
    // border: '0px none none',
    // padding: '0 0 0 0',
  },
    table: {
      display: "table", 
      width: "auto", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderRightWidth: 0, 
      borderBottomWidth: 0 ,
    }, 
    tableRow: { 
      margin: "auto", 
      flexDirection: "row",
    }, 
    tableRowHead: { 
      margin: "auto", 
      flexDirection: "row",
      backgroundColor: 'rgb(210, 210, 210)'
    }, 
    tableCol: { 
      width: "25%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0,
      // border: '1px solid rgb(192, 192, 192)',
    },
    tableCell: { 
      margin: "auto", 
      marginTop: 5, 
      fontSize: 9,
    }, 

    piePagina: {
      // margin: '20 50 10 50',
      position: 'absolute',
      fontSize: 7,
      textAlign: 'left',
      fontFamily: 'Helvetica-Bold',
      bottom: 40,
      left: 50,
      right: 50,
      marginTop:10,
    }
  });

// Create Document Component
export const CrearPdf2=({tipo, corp, datos, formato, CorporacionesABuscar, decide}, customStyles) => {

  const tbAsigCorp = (index, rfsi, tipo, modeloRadio, serie_radio, inventario_interno, nombre_completo, nombrePuesto) => 
     <View key={index} style={styles.tableRow} >
     <View style={{...styles.tableCol, width: "3%" }} >
       <Text style={styles.tableCell} >
         {index}
       </Text> 
     </View> 
     <View style={{...styles.tableCol, width: "10%" }}>
       <Text style={styles.tableCell} >
         { rfsi }
       </Text> 
     </View> 
     <View style={{...styles.tableCol, width: "7%" }}>
       <Text style={styles.tableCell} >
         {tipo}
       </Text> 
     </View> 
     <View style={{...styles.tableCol, width: "8%" }}>
       <Text style={styles.tableCell} >
         {modeloRadio}
       </Text> 
     </View> 
     <View style={{...styles.tableCol, width: "20%" }}>
       <Text style={styles.tableCell} >
         {serie_radio}
       </Text> 
     </View> 
     <View style={{...styles.tableCol, width: "7%" }}>
       <Text style={styles.tableCell} >
         {inventario_interno}
       </Text> 
     </View> 
     <View style={{...styles.tableCol, width: "20%" }} >
       <Text style={styles.tableCell} >
         {nombre_completo}
       </Text> 
     </View> 
     <View style={{...styles.tableCol, width: "25%" }} >
       <Text style={styles.tableCell} >
         {nombrePuesto}
       </Text> 
     </View> 
    </View>

//-------------------------------------------------------

  let e=[];
  let n=[];

  // const asignaciones = () => {
  //   for (let y=0; y<(datos.length); y++) {
  //     e= datos.filter(function(element,index,array){
  //       return(
  //         element.tipo == tipo
  //         )
  //       })
  //       // console.log(datos[y])
  //       n.push(e)
  //     }
  // }


  const mostrar=()=>{

    for(let y=0;y<CorporacionesABuscar.length;y++){
      
      e= datos.filter(function(element,index,array){
        return(
          element.nombreCorporacion == CorporacionesABuscar[y] && element.estatus== true
          )
        })
        n.push(e)
      }
      // console.log(n)
    
      return(

        (<View style={styles.section} wrap>
        <Text style={{...styles.title, textAlign: 'left'}} >{tipo}</Text>
        </View> ),
        CorporacionesABuscar.map((element,index,array)=>{
          return (
            n[index].length !== 0 ?
            <View key={index} style={styles.section} wrap>
              <Text style={{...styles.title, textAlign: 'left'}} >{element}</Text>
            <View style={styles.table}   >
            
            <View style={styles.tableRowHead} >
              <View style={{...styles.tableCol, width: "3%" }} >
                <Text style={styles.tableCell} > No.</Text> 
              </View> 
              <View style={{...styles.tableCol, width: "10%" }} >
                <Text style={styles.tableCell} > RFSI </Text> 
              </View> 
              <View style={{...styles.tableCol, width: "7%" }} >
                <Text style={styles.tableCell} > Tipo </Text> 
              </View> 
              <View style={{...styles.tableCol, width: "8%" }} >
                <Text style={styles.tableCell} > Modelo </Text> 
              </View> 
              <View style={{...styles.tableCol, width: "20%" }} >
                <Text style={styles.tableCell} > serie </Text> 
              </View> 
              <View style={{...styles.tableCol, width: "7%" }} >
                <Text style={styles.tableCell} > Inventario </Text> 
              </View> 
              <View style={{...styles.tableCol, width: "20%" }} >
                <Text style={styles.tableCell} > Usuario </Text> 
              </View> 
              <View style={{...styles.tableCol, width: "25%" }} >
                <Text style={styles.tableCell} > Puesto </Text> 
              </View> 
            </View>
            
         {
          n[index].map((element,index,array)=>{
           return tbAsigCorp(index+1, array[index].rfsi, array[index].tipo, array[index].modeloRadio, array[index].serie_radio, array[index].inventario_interno,
            array[index].nombre_completo, array[index].nombrePuesto)
           })
         }
      </View>
      </View>
      : console.log('y')
      )
      })
      )

  }

  const mostrarTipo=()=>{

    // for(let y=0; y<corp.length; y++){
    //   e= corp.filter(function(element,index,array){
        
    //     return(
    //       element.tipo == corp[y]
    //       // element.nombreCorporacion == CorporacionesABuscar[y] && element.estatus== true 
    //       )
    //     })
    //     n.push(e);
    //     console.log(corp)
    // }

    // for (let y=0; y<(corp.length); y++) {
    //       e= datos.filter(function(element,index,array){
    //         return(
    //           element.tipo == tipo
    //           )
    //         })
    //         // console.log(datos[y])
    //         n.push(e);
    //         console.log(n)
    //       }

      // return(
      //   corp.map((element,index,array)=>{
          return (
            <View  style={styles.section} wrap>
              <Text style={{...styles.title, textAlign: 'left'}} >..</Text>
            <View style={styles.table}   >
            
            <View style={styles.tableRowHead} >
              <View style={{...styles.tableCol, width: "5%" }} >
                <Text style={styles.tableCell} > No.</Text> 
              </View> 
              <View style={{...styles.tableCol, width: "20%" }} >
                <Text style={styles.tableCell} > RFSI </Text> 
              </View> 
              <View style={{...styles.tableCol, width: "10%" }} >
                <Text style={styles.tableCell} > Tipo </Text> 
              </View> 
              <View style={{...styles.tableCol, width: "30%" }} >
                <Text style={styles.tableCell} > Nombre </Text> 
              </View> 
              <View style={{...styles.tableCol, width: "35%" }} >
                <Text style={styles.tableCell} > Puesto </Text> 
              </View> 
            </View>
         {/* {
          
          n[index].map((element,index,array)=>{
            return tbAsigCorp(index+1, array[index].rfsi, array[index].tipo, array[index].nombre_completo, array[index].nombrePuestoUsuario )
           })
         } */}
      </View>
      </View>
      )
      // })
      // )

  }
  

 return (
  <ModalRadio  sx={{pl:'100px'}} >
    <Box sx={{...customStyles, maxWidth: '1100px', maxHeight: '1100px', top: '2%', left: '20%' }}>
      <PDFViewer style={{width:"55vw", height:"75vh"}}>
        <Document>
          <Page orientation="landscape" size="letter" style={styles.body} >
            <View style={styles.margen} >
              <Image  src={`http://172.16.21.222:8000/api/v0/documentos/users/${formato[0]?.fk_logo_ssypc}`} style={styles.image} fixed />
                {  
                  decide == "corpGral" ?
                  mostrar()  :
                  decide == "tipoRad" ?
                  mostrarTipo ()    :
                  decide=""
                }
            </View>
            
          </Page>
        </Document>
      </PDFViewer>
    </Box>
  </ModalRadio>
 )
 }