
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
      margin: '40 50 40 50',
      border: '0px none none',
      padding: '8 0 8 0',
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
        fontSize: 10
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

  const tbAsigCorp = (index, rfsi, tipo, nombreCorporacion,CorporacionesABuscar) => 
             <View style={styles.tableRow} >
              <View style={styles.tableCol} >
                <Text style={styles.tableCell} >
                  {index}
                </Text> 
              </View> 
              <View style={styles.tableCol} >
                <Text style={styles.tableCell} >
                  { rfsi }
                </Text> 
              </View> 
              <View style={styles.tableCol} >
                <Text style={styles.tableCell} >
                  {tipo}
                </Text> 
              </View> 
              <View style={styles.tableCol} >
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
console.log(n);
}
return(
  CorporacionesABuscar.map((element,index,array)=>{
    return (
      <View  style={styles.section} >
      <View  style={styles.table} >
      
      <View style={styles.tableRow} >
        <View style={styles.tableCol} >
          <Text style={styles.tableCell} > No.</Text> 
        </View> 
        <View style={styles.tableCol} >
          <Text style={styles.tableCell} > RFSI </Text> 
        </View> 
        <View style={styles.tableCol} >
          <Text style={styles.tableCell} > Tipo </Text> 
        </View> 
        <View style={styles.tableCol} >
          <Text style={styles.tableCell} > Corporación </Text> 
        </View> 
      </View>
   {
    
    n[index].map((element,index,array)=>{
      return tbAsigCorp(index+1, array[index].rfsi, element.tipo, element.nombreCorporacion )
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

<Page size="letter" style={styles.body} >

          
      
              {  
              mostrar()
            
          }
           

        </Page>

    </Document>
  )
}