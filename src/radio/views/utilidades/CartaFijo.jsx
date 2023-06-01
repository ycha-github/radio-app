
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';



// Create styles
const styles = StyleSheet.create({
    page: {
      // flexDirection: 'row',
      //backgroundColor: '#E4E4E4'
      // margin: '50 50 50 50',
      // position: 'relative'
    },
    title: {
      fontSize: 20,
      textAlign: 'center',
      fontFamily: 'Times-Bold',
      margin: '50 0 10 0'
    },
    section: {
      margin: '10 50 10 50'
    },
    section2: {
      justifyContent: 'space-between',
    //   margin: '10 50 10 50',
      margin: '0 50 0 50'
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
      fontFamily: 'Times-Bold'
    },
    text2: {
        fontSize: 10,
        textAlign: 'left',
        fontFamily: 'Times-Bold'
    },
    text3: {
      fontSize: 10,
      textAlign: 'left',
      fontFamily: 'Times-Roman'
    },
    textResp: {
      fontSize: 11,
      textAlign: 'center',
      fontFamily: 'Times-Bold',
      margin: '40 0 10 0'
    },
    textArt1: {
      fontSize: 10,
      textAlign: 'justify',
      fontFamily: 'Times-Roman',
      margin: '0 0 4 0'
    },
    textArt3: {
        fontSize: 10,
        textAlign: 'justify',
        fontFamily: 'Times-Bold',
        float: 'left',
        position: 'absolute',
        left: '55.8%',
        top: '32.5%'
    },
    textArt6: {
        fontSize: 10,
        textAlign: 'justify',
        fontFamily: 'Times-Bold',
        float: 'left',
        position: 'absolute',
        left: '68%',
        top: '60%'
    },
    textFecha: {
      fontSize: 10,
      textAlign: 'right',
      fontFamily: 'Times-Roman',
      margin: '10 50 0 0'
    },
    table: {
      display: "flex", 
      width: "400px", 
      borderStyle: "none", 
      margin: '0 100 0 100'
    }, 
    tableRow: { 
      margin: "auto", 
      flexDirection: "row",
      width: "800px"  
    }, 
    tableCol: { 
      width: "25%"   
    }, 
    tableCell: { 
      margin: "auto", 
      fontSize: 13 
    }
  });

  


export const CartaFijo = ({datos, formato}) => {

    let fecha = new Date(datos.fecha_asignacion);
    let options = { day: 'numeric', month: 'long', year: 'numeric' }
    let fechaAsignacion = fecha.toLocaleString('es-MX', options);

  return (
    <Document>
    <Page size="letter" style={styles.page}>
      <View >
        <Text style={styles.title} >Carta Responsiva</Text>
        <Image style={styles.image} src={"http://localhost:8000/api/v0/documentos/users/27"} />
        <Image style={styles.image2} src={"http://localhost:8000/api/v0/documentos/users/26"} />
      </View>
      <View style={styles.section}>
        <Text style={styles.text}> {formato[0].encabezado_carta}</Text>
      </View>

    <View style={styles.table}>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
              <View style={styles.tableCell}>
                <Text style={styles.text2 }> 
                  Tipo de radio: 
                </Text>
              </View>
          </View>
          <View style={styles.tableCol}> 
              <View style={styles.tableCell}> 
                <Text style={styles.text3}>
                  {datos.tipo}
                </Text>
              </View>
          </View>
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
              <View style={styles.tableCell}>
                <Text style={styles.text2}> 
                  Número de Serie: 
                </Text>
              </View>
          </View>
          <View style={styles.tableCol}> 
              <View style={styles.tableCell}> 
                <Text style={styles.text3}>
                  {datos.serie}
                </Text>
              </View>
          </View>
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
              <View style={styles.tableCell}>
                <Text style={styles.text2}> 
                Número de RFSI: 
                </Text>
              </View>
          </View>
          <View style={styles.tableCol}> 
              <View style={styles.tableCell}> 
                <Text style={styles.text3}>
                  {datos.rfsi}
                </Text>
              </View>
          </View>
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
              <View style={styles.tableCell}>
                <Text style={styles.text2}> 
                Número de Inventario: 
                </Text>
              </View>
          </View>
          <View style={styles.tableCol}> 
              <View style={styles.tableCell}> 
                <Text style={styles.text3}>
                  {datos.tipo}
                </Text>
              </View>
          </View>
        </View>

      </View>
{/* Aqui termina la tabla */}
        <View style={styles.section2}>
            <Text style={styles.textResp} > RESPONSABILIDADES DEL RESGUARDANTE: </Text>
            <Text style={styles.textArt1} > {formato[0].articulo1} </Text>
            <Text style={styles.textArt1} > {formato[0].articulo2} </Text>
            <Text style={styles.textArt3} > {formato[0].articulo3} </Text>
            <Text style={styles.textArt1} > {formato[0].articulo4} </Text>
            <Text style={styles.textArt1} > {formato[0].articulo5} </Text>
            <Text style={styles.textArt6} > {formato[0].articulo6} </Text>
            <Text style={styles.textArt1} > {formato[0].articulo7} </Text>
        </View>

        <Text style={styles.textFecha} > Villahermosa, Tabasco a {fechaAsignacion} </Text>

         {/* <View style={styles.section2}>
        </View> */}


    </Page>
  </Document>
  )
}
