import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
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

export const ImpReporteCorp = ({datos, lengthCorporaciones}) => {

  // let corp=[];

  //     for (let i=0; i<=lengthCorporaciones; i++){
  //     corp[i] =  datos.filter(ev => ev.idcorporaciones == i )
  //     console.log(corp[i])
  //   }
  let corp=[];
  for (let i=0; i<=lengthCorporaciones; i++){
    // let cor = "asigcor"+i;
    corp[i]=datos.filter(ev => ev.idcorporaciones == i )
    // console.log(cor)
    
  }

//  console.log(corp)
let corpora=datos.filter(ev => ev.idcorporaciones == 1 )






  const tbAsigCorp = (index, rfsi, tipo, nombreCorporacion) => 
    // console.log(nombreCorporacion)
        
            <View style={styles.tableRow} >
              <View style={styles.tableCol} >
                <Text style={styles.tableCell} >
                  {index}
                </Text> 
              </View> 
              <View style={styles.tableCol} >
                <Text style={styles.tableCell} >
                  {rfsi}
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



let buscar = ["Policía Estatal Preventiva", "Centro de Mando y Comunicaciones"]
let filtrado=[]
let mapdato=[]

for(let i=0; i<lengthCorporaciones; i++){
  if(buscar[i] === datos.idcorporaciones ){
    
    mapdato = datos.map( (element, index, array) => {
      // console.log(element);
       let d= array.filter(ev=>ev.idcorporaciones == buscar[i])
      // console.log(buscar[i])
      return tbAsigCorp(index+1, element.rfsi, element.tipo, element.nombreCorporacion );
    })
  }
} 

buscar.map(function (element, index, array) {
  let cor = element
    
     filtrado = datos.map( function ( element, index ) {
      // console.log(element.nombreCorporacion)
      if(element.nombreCorporacion == cor){
        // return element
        let ss = [element];
        // ss.map( (element, index) => {
        //   console.log(element)

          
        // }
        // )
        return tbAsigCorp(index+1, element.rfsi, element.tipo, element.nombreCorporacion )
      }
      
      
    })
})

// datos.sort();
// console.log(datos);




  return (

    <Document>
        <Page size="letter" style={styles.body} >

          
            <View style={styles.section} >
              <View style={styles.table} >
                
                <View style={styles.tableRow} >
                  <View style={styles.tableCol} >
                    <Text style={styles.tableCell} > No. </Text> 
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
                  // filtrado
          

                  // datos.map( (element, index) => {
                  //     // console.log(element);
                  //     return tbAsigCorp(index+1, element.rfsi, element.tipo, element.nombreCorporacion );
                  //   })

                }

              </View>
            </View>

        </Page>
    </Document>
  )
}