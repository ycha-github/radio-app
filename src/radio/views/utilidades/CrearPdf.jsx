import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { Modal } from '@mui/material';
import { ModalRadio } from '../../components/ModalRadio';
//import { useAsignacionesStore } from '../../../hooks/hooksUtilidades/useAsignacionesStore';
//import { useAsignacionesStore } from '../../../hooks/hooksUtilidades/useAsignacionesStore';


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
export const CrearPdf=({datos}) => {
//
//const [valor,setValor]= useState(JSON.parse(localStorage.getItem('datos')))
//
// const setLocalStorage = dato =>{
//  try{
//     setValor(datos)
//     localStorage.setItem('datos',JSON.stringify(datos) )
//   }catch (error){
//console.log(error)
//   } }
////
// console.log(datos);

// useEffect(() => {
//  setLocalStorage
//}, [setLocalStorage])
 // const cargarDatos= useMemo(()=>{
 //   return {datos};
 // }, [datos]);
//
 // const datosVisible= useMemo(()=>{
 //   return searchItems(datos, cargarDatos);
 // }, [datos, cargarDatos]);
  //const { activeEvent } = useAsignacionesStore();
//let dat = useRef(datos);

 return (
  <ModalRadio>
  <PDFViewer style={{width:"200%", height:"80vh"}}>
  <Document>
    <Page size="letter" style={styles.page}>
      <View style={styles.section}>
        <Text >Carta Responsiva</Text>
      </View>
      <View style={styles.section}>
        <Text>lshfslhf lksdfhljsh {' '+datos.nombre_completo}</Text>
      </View>
    </Page>
  </Document>
  </PDFViewer>
  </ModalRadio>
 );
 }