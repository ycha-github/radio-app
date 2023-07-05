
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { useEffect } from 'react';
const styles = StyleSheet.create({
    title: {
      fontSize: 12,
      textAlign: 'center',
      fontFamily: 'Times-Roman',
      margin: '0 0 0 0',
      textDecoration: 'none'
    },
    section: {
      margin: '10 0 10 0',
      border: '0px none none',
      padding: '0 0 0 0',
    },
    margen: {
      margin: '40 50 40 50',
      // border: '0px none none',
      // padding: '0 0 0 0',
    },
      table: {
        display: "table", 
        width: "auto", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderRightWidth: 0, 
        borderBottomWidth: 0 
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
        fontSize: 10,
        textAlign: 'left'
      }, 
      tableObjeto: {
        position: 'absolute',
        float: 'right',
        right: 10,
        top: 24,
      },
      piePagina: {
        margin: '20 50 10 50'
      }
    });

export const ImpReporteCorp = ({datos, CorporacionesABuscar}) => {
  // console.log(CorporacionesABuscar);
 // let CorporacionesABuscar = ["Policía Estatal Preventiva", "Centro de Mando y Comunicaciones", "Dirección del Sistema Estatal de Urgencias del Estado de Tabasco"]

  const tbAsigCorp = (index, rfsi, tipo, nombre_completo,nombreCorporacion) => 
             <View key={index} style={styles.tableRow} >
              <View style={{...styles.tableCol, width: "5%" }} >
                <Text style={styles.tableCell} >
                  {index}
                </Text> 
              </View> 
              <View style={{...styles.tableCol, width: "20%" }} >
                <Text style={styles.tableCell} >
                  { rfsi }
                </Text> 
              </View> 
              <View style={{...styles.tableCol, width: "10%" }} >
                <Text style={styles.tableCell} >
                  {tipo}
                </Text> 
              </View> 
              <View style={{...styles.tableCol, width: "30%" }} >
                <Text style={styles.tableCell} >
                  {nombre_completo}
                </Text> 
              </View> 
              <View style={{...styles.tableCol, width: "35%" }} >
                <Text style={styles.tableCell} >
                  {nombreCorporacion}
                </Text> 
              </View> 
            </View>


//-------------------------------------------------------

let e=[]
let n= []
const mostrar=()=>{
  for(let y=0;y<CorporacionesABuscar.length;y++){
   e= datos.filter(function(element,index,array){
 
   return(
    element.nombreCorporacion == CorporacionesABuscar[y] && element.estatus== true 
   )
})
n.push(e)
//encabezado(e,y);
// console.log(n);
}
return(
  CorporacionesABuscar.map((element,index,array)=>{
    return (
      <View key={index} style={styles.section} >
      <View style={styles.table} >
      
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
          <Text style={styles.tableCell} > Usuario </Text> 
        </View> 
        <View style={{...styles.tableCol, width: "35%" }} >
          <Text style={styles.tableCell} > Corporación </Text> 
        </View> 
      </View>
   {
    
    n[index].map((element,index,array)=>{
      return tbAsigCorp(index+1, array[index].rfsi, array[index].tipo, array[index].nombre_completo, array[index].nombreCorporacion )
     })
   }
</View>
</View>
)
  })
)
}

    
  // let y= ()=>{
  //   r.map((element,index)=>{
  //    return tbAsigCorp(index+1, element.rfsi, element.tipo, element.nombreCorporacion )
  //   })
  // }
  
// }

  return (

    <Document>
      <Page size="letter" /*orientation="landscape"*/ style={styles.body} >
        <View style={styles.margen} >
          {  
            mostrar()
          }
        </View>
      </Page>
    </Document>

  )
}
