
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { DatosAsignacion } from './DatosAsignacion';

// Create styles
const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      textAlign: 'center',
      fontFamily: 'Times-Bold',
      margin: '50 0 10 0'
    },
    section: {
      margin: '10 55 10 52',
      justifyContent: 'spaceBetween',
    },
    otrosAcc: {
      margin: '5 60 5 60',
    },
    section2: {
      //textAlign: 'justify',
      // insetInline:"5%",
      textAlign: 'left',
      margin: '0 50 0 50'
    },
    seccionVeh: {
      float: 'left',
      position: 'absolute',
      top: 175,
      left: 150,
      margin: '0 100 0 50',
    },
    image: {
      left: 50,
      width:140,
      height:50
    },
    image2: {
      position:'absolute',
      right: 50,
      top: 85,
      width:60,
      height:50
    },
    text: {
      fontSize: 10,
      textAlign: 'justify',
      fontFamily: 'Times-Bold',
      textIndent: '-3px'
    },
    text3: {
      fontSize: 10,
      textAlign: 'left',
      fontFamily: 'Times-Roman'
    },
    text4: {
      fontSize: 10,
      textAlign: 'center',
      fontFamily: 'Times-Roman'
    },
    text5: {
      fontSize: 7,
      textAlign: 'left',
      fontFamily: 'Times-Roman'
    },
    textResp: {
      fontSize: 11,
      textAlign: 'center',
      fontFamily: 'Times-Bold',
      margin: '10 0 10 0'
    },
    textArt1: {
      fontSize: 10,
      textAlign: 'justify',
      fontFamily: 'Times-Roman',
      margin: '0 0 5 0',
      textIndent: '-2px'
    },
    textArt3: {
      fontSize: 10,
      textAlign: 'justify',
      fontFamily: 'Times-Bold',
      float: 'left',
      position: 'absolute',
      left: '55.8%',
      top: '24.1%'
    },
    textArt6: {
      fontSize: 10,
      textAlign: 'justify',
      fontFamily: 'Times-Bold',
      float: 'left',
      position: 'absolute',
      left: '67.2%',
      top: '55.2%'
    },
    textFecha: {
      fontSize: 10,
      textAlign: 'right',
      fontFamily: 'Times-Roman',
      margin: '10 50 35 0'
    },
    table: {
      alignItems: 'flex-start',
      borderStyle: "none", 
      margin: '0 55 0 55',
      fontSize: 10,
      width: 500,
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
      width: "16.7%" ,
      alignSelf: 'flex-start',
    },
    tableColVehEsp: { 
      width: "18%" ,
      alignSelf: 'flex-start',
    },
    tableCell: { 
      borderWidth: 0,
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: "auto",
      alignSelf: "stretch",
    }, 
    table2: {
      paddingLeft:'60px',
      // alignContent: 'center',
      borderStyle: "none", 
      width: "780px", 
      margin: '15 0 15 0'
    }, 
    tableRow2: { 
      // margin: "auto", 
      flexDirection: "row",
      width: "780px",
      textAlign: 'center'
    }, 
    tableRow2Especial: { 
      margin: "30 0 0 28",
      display: "flex",
      flexDirection: "row",
      width: "800",
      alignItems: "center"
    }, 
    tableCol2: { 
      width: "22%"
      
      },
    tableCell2: { 
      // margin: "auto auto", 
      fontSize: 13 
    }, 
    piePagina: {
      margin: '20 50 10 50'
    }
  });

export const CartaFijo = ({datos, formato}) => {
     //let x=  datos.fecha_asignacion.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
     let info ;
     datos.fecha_asignacion === null? info= "":
     info = datos.fecha_asignacion.split('-').join('/');
    let fecha = new Date(info);
    let options = { day: 'numeric', month: 'long', year: 'numeric' }
    let fechaAsignacion = new Date().toLocaleString('es-MX', options); 

  return (
    <Document>
    <Page size="letter" style={styles.page}>
      <View >
        <Text style={styles.title} >Carta Responsiva</Text>
        <Image style={styles.image2} src={`http://172.16.21.222:8000/api/v0/documentos/users/${formato[0].fk_logo_c4}`} />
        <Image style={styles.image} src={`http://172.16.21.222:8000/api/v0/documentos/users/${formato[0].fk_logo_ssypc}`} />
      </View>
      <View style={styles.section}>
        <Text style={styles.text}> {formato[0].encabezado_carta}</Text>
      </View>

      <DatosAsignacion styles={styles} datos={datos}  />

{/* Sección de artículos de las responsabilidades de los resguardantes */}
        <View style={styles.section2}>
            <Text style={[styles.textResp, styles.textResp]} > RESPONSABILIDADES DEL RESGUARDANTE: </Text>
            <Text style={[styles.textArt1]} > {formato[0].articulo1} </Text>
            <Text style={[styles.textArt1]} > {formato[0].articulo2} </Text>
            <Text style={[styles.textArt3]} > {formato[0].articulo3} </Text>
            <Text style={[styles.textArt1]} > {formato[0].articulo4} </Text>
            <Text style={[styles.textArt1]} > {formato[0].articulo5} </Text>
            <Text style={[styles.textArt6]} > {formato[0].articulo6} </Text>
            <Text style={[styles.textArt1]} > {formato[0].articulo7} </Text>
        </View>

        <Text style={styles.textFecha} > Villahermosa, Tabasco a {fechaAsignacion} </Text>

         {/* Tabla de las firmas */}

        <View style={styles.table2}>

          <View style={styles.tableRow2}> 
            <View style={styles.tableCol2}> 
              <View style={styles.tableCell2}>
                <Text style={styles.text4 }> 
                 Recibí de conformidad 
                </Text>
              </View>
            </View>
            <View style={styles.tableCol2}> 
              <View style={styles.tableCell2}>
                <Text style={styles.text4 }> 
                 Revisó 
                </Text>
              </View>
            </View>
            <View style={styles.tableCol2}> 
              <View style={styles.tableCell2}>
                <Text style={styles.text4 }> 
                 Entregué de conformidad 
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.tableRow2Especial}> 
            <View style={styles.tableCol2}> 
              <View style={styles.tableCell2}>
                <Text style={{...styles.text, textAlign: 'left'}}> 
                  ________________________
                </Text>
              </View>
            </View>
            <View style={styles.tableCol2}> 
              <View style={styles.tableCell2}>
                <Text style={{...styles.text, textAlign: 'left'}}> 
                  ________________________
                </Text>
              </View>
            </View>
            <View style={styles.tableCol2}> 
              <View style={styles.tableCell2}>
                <Text style={{...styles.text, textAlign: 'left'}}> 
                  ________________________
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.tableRow2}> 
            <View style={styles.tableCol2}> 
              <View style={styles.tableCell2}>
                <Text style={styles.text4 }> 
                {`${datos.titulo} ${datos.nombre_completo}`}
                </Text>
              </View>
            </View>
            <View style={styles.tableCol2}> 
              <View style={styles.tableCell2}>
                <Text style={styles.text4 }> 
                {`${formato[0].titulorev} ${formato[0].nombre_revisor}`}
                </Text>
              </View>
            </View>
            <View style={styles.tableCol2}> 
              <View style={styles.tableCell2}>
                <Text style={styles.text4 }> 
                {`${formato[0].titulores} ${formato[0].nombre_responsable}`}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.tableRow2}> 
            <View style={styles.tableCol2}> 
              <View style={styles.tableCell2}>
                <Text style={styles.text4 }> 
                {datos.nombrePuesto}
                </Text>
              </View>
            </View>
            <View style={styles.tableCol2}> 
              <View style={styles.tableCell2}>
                <Text style={styles.text4 }> 
                {formato[0].nombrePuestoRevisor}
                </Text>
              </View>
            </View>
            <View style={styles.tableCol2}> 
              <View style={styles.tableCell2}>
                <Text style={styles.text4 }> 
                {formato[0].nombrePuestoRes}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.tableRow2}> 
            <View style={styles.tableCol2}> 
              <View style={styles.tableCell2}>
                <Text style={styles.text4 }> 
                {datos.nombreCorporacion}
                </Text>
              </View>
            </View>
            <View style={styles.tableCol2}> 
              <View style={styles.tableCell2}>
                <Text style={styles.text4}> 
                {formato[0].corporacionRevisor}
                </Text>
              </View>
            </View>
            <View style={styles.tableCol2}> 
              <View style={styles.tableCell2}>
                <Text style={styles.text4}> 
                {formato[0].corporacionResponsable}
                </Text>
              </View>
            </View>
          </View>

        </View>
        {/*  Fin de la tabla de firmas */}

        <View style={styles.piePagina}>
            <Text style={styles.text5 }> 
              {formato[0].ccp_carta}
            </Text>
        </View>       

    </Page>
  </Document>
  )
}
