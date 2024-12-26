import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { radioApi } from '../../../api';
import { ServiciosPdf, DatosEquipo, DatosUsuario } from '.';


let options = { day: 'numeric', month: 'long', year: 'numeric' }

let styles = StyleSheet.create({
    page: {
      // flexDirection: 'row',
      // margin: '50 50 50 50',
      // position: 'relative'
    },
    title: {
      fontSize: 7,
      textAlign: 'center',
      fontFamily: 'Times-Roman',
      margin: '0 0 0 0',
      textDecoration: 'none'
    },
    section: {
      margin: '15 15 0 15',
      border: '0px none none',
      padding: '2 2 2 0',
    },
      table: {
        alignItems: 'flex-start',
        border: '0px none none',
        // border: '1px solid rgb(192, 192, 192)',
        width: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignContent: "stretch",
        flexWrap: "nowrap",
      }, 
      tableRow: { 
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignContent: "stretch",
        flexWrap: "nowrap",
        alignItems: "stretch",
      }, 
      tableCol: { 
        width: "12%",
        alignSelf: 'flex-start',
      },
      tableCell: { 
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: "auto",
        alignSelf: "stretch",
        margin: '0 0 0 5',
      }, 
      tableObjeto: {
        position: 'absolute',
        float: 'right',
        right: 10,
        top: 12,
      },
      piePagina: {
        margin: '20 50 10 50'
      }
    });

export const DocumentoTarjeta = ({datos, formato}) => {
//  console.log( datos)

 let anioActual = new Date(datos.createdAt).getFullYear();
  return (

    <Document>
        <Page size="A6" style={styles.page} >
            
            <View style={styles.section} >
               
                <Text style={{ ...styles.title, fontFamily: 'Times-Bold' }} > CENTRO DE COMUNICACIONES, CÓMPUTO, CONTROL Y COMANDO (C-4) </Text> 
                <Text style={{ ...styles.title, fontFamily: 'Times-Bold' }} > DIRECCIÓN TÉCNICA </Text> 
                <Text style={{ ...styles.title, margin: '0 0 5 0' }} > DEPARTAMENTO DE RADIOCOMUNICACIONES </Text> 
                <Text  style={{ ...styles.title, textAlign: 'right', margin: '0 0 0 0', fontFamily: 'Times-Bold' }} > Folio: {datos.folio} </Text> 
                <Text style={{ ...styles.title, margin: '0 0 10 0' }} > COMPROBANTE DE SERVICIO </Text> 

            </View>
            <View>
                <Text  style={{ ...styles.title, textAlign: 'right', margin: '0 30 5 0'}} > Villahermosa, Tab. A { new Date(datos.fecha_servicio.split('-').join('/')).toLocaleString('es-MX', options) } </Text> 
            </View>

            <DatosUsuario datos={datos} styles={styles} comprobante={true} />
            <DatosEquipo datos={datos} styles={styles} comprobante={true} />
            <ServiciosPdf datos={datos}  styles={styles} comprobante={true} />
            
        </Page>
    </Document>
  )
}




