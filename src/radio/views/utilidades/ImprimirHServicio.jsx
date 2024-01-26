import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { radioApi } from '../../../api';
import { Satis, Anexos, FirmasEntrega, FirmasRecepcion, ServiciosPdf, DatosEquipo, DatosUsuario } from './';


let options = { day: 'numeric', month: 'long', year: 'numeric' }
let styles ={}

let styles1 = StyleSheet.create({
    page: {
      // flexDirection: 'row',
      // margin: '50 50 50 50',
      // position: 'relative'
    },
    title: {
      fontSize: 8,
      textAlign: 'center',
      fontFamily: 'Times-Roman',
      margin: '0 0 0 0',
      textDecoration: 'none'
    },
    section: {
      margin: '3 50 0 50',
      border: '0px none none',
      padding: '2 0 2 0',
    },
    image: {
        top: 40,
        width:120,
        height:40,
        paddingRight: 35,
      },
      image2: {
        position:'absolute',
        float: 'right',
        right: 20,
        top: 42,
        // left: 250,
        width:35,
        height:30
      },
      table: {
        alignItems: 'flex-start',
        border: '0px none none',
        // border: '1px solid rgb(192, 192, 192)',
        width: 350,
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
        width: "20%",
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
        top: 24,
      },
      piePagina: {
        margin: '20 50 10 50'
      },
      tableSa: { 
        display: "table", 
        borderStyle: "solid", 
        fontFamily: 'Times-Bold',
      }, 
      tableRowSa: { 
        margin: "auto", 
        flexDirection: "row" 
      }, 
      tableColSa: { 
        width: "15%", 
        borderStyle: "solid", 
        border: '1px solid rgb(192, 192, 192)',
      }, 
      tableCellSa: { 
        margin: "auto", 
        marginTop: 5, 
        fontSize: 8,
      }
    });

    let styles2 = StyleSheet.create({
        page: {
          // flexDirection: 'row',
          // margin: '50 50 50 50',
          // position: 'relative'
        },
        title: {
          fontSize: 10,
          textAlign: 'center',
          fontFamily: 'Times-Roman',
          margin: '0 0 0 0',
          textDecoration: 'none'
        },
        section: {
          margin: '3 50 0 50',
          border: '0px none none',
          padding: '2 0 2 0',
        },
        image: {
            top: 40,
            width:120,
            height:40,
            paddingRight: 35,
          },
          image2: {
            position:'absolute',
            float: 'right',
            right: 20,
            top: 42,
            // left: 250,
            width:35,
            height:30
          },
          table: {
            alignItems: 'flex-start',
            border: '0px none none',
            // border: '1px solid rgb(192, 192, 192)',
            width: 350,
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
            width: "20%",
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
            top: 24,
          },
          piePagina: {
            margin: '20 50 10 50'
          },
          tableSa: { 
            display: "table", 
            borderStyle: "solid", 
            fontFamily: 'Times-Bold',
          }, 
          tableRowSa: { 
            margin: "auto", 
            flexDirection: "row" 
          }, 
          tableColSa: { 
            width: "15%", 
            borderStyle: "solid", 
            border: '1px solid rgb(192, 192, 192)',
          }, 
          tableCellSa: { 
            margin: "auto", 
            marginTop: 5, 
            fontSize: 10,
          }
        });




export const ImprimirHServicio = ({datos, formato}) => {
//  console.log( datos)
{ datos.fk_foto1 === null && datos.fk_foto2 === null ? 
    styles = styles2 :
    styles = styles1
}
 let anioActual = new Date(datos.createdAt).getFullYear();
  return (

    <Document>
        <Page size="letter" style={styles.page} >
            
            <View style={styles.section} >
                <Image style={styles.image} src={`http://172.16.21.222:8000/api/v0/documentos/users/${formato[0].fk_logo_ssypc}`} />
                <Text style={{ ...styles.title, fontFamily: 'Times-Bold' }} > CENTRO DE MANDO Y COMUNICACIONES C4 </Text> 
                <Text style={{ ...styles.title, fontFamily: 'Times-Bold' }} > DIRECCIÓN TÉCNICA </Text> 
                <Text style={{ ...styles.title, margin: '0 0 5 0' }} > DEPARTAMENTO DE RADIOCOMUNICACIONES </Text> 

                {/* <Image style={styles.image2} src={`http://172.16.21.222:8000/api/v0/documentos/users/${formato[0].fk_logo_c4}`} /> */}
                <Image style={styles.image2} src={`http://172.16.21.222:8000/api/v0/documentos/users/${formato[0].fk_logo_c4}`} />

                <Text  style={{ ...styles.title, textAlign: 'right', margin: '0 10 0 0', fontFamily: 'Times-Bold' }} > Folio: {datos.folio} </Text> 
                <Text style={styles.title} > REPORTE DE SERVICIO </Text> 

            </View>
            <View>
                <Text  style={{ ...styles.title, textAlign: 'right', margin: '0 50 5 0'}} > Villahermosa, Tab. A { new Date(datos.fecha_servicio.split('-').join('/')).toLocaleString('es-MX', options) } </Text> 
            </View>

            <DatosUsuario datos={datos} styles={styles} />
            <DatosEquipo datos={datos} styles={styles} />
            <ServiciosPdf datos={datos}  styles={styles} />
            <FirmasRecepcion datos={datos} styles={styles} />

            <FirmasEntrega datos={datos} styles={styles}/>

            {datos.fk_foto1 === null && datos.fk_foto2 === null ? "" : <Anexos datos={datos} /> }
                

            <Satis styles={styles} />
            
        </Page>
    </Document>
  )
}



