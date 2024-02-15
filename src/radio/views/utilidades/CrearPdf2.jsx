import { Document, Image, PDFViewer, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { Box } from '@mui/material';
import { ModalRadio } from '../../components/ModalRadio';
import { TableRowHead } from './TableRowHead';
import { MapTabAsignaciones } from './MapTabAsignaciones';

const styles = StyleSheet.create({
  title: {
    fontSize: 8,
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
    margin: '0 0 0 0',
    border: '0px none none',
    padding: '10px 0 0 0',
  
  },
  margen: {
    margin: '0 50 0 50',
    // border: '0px none none',
    // padding: '0 0 0 0',
  },
    table: {
      display: "table", 
      width: "auto", 
      borderStyle: "solid", 
      // borderTopWidth: 1, 
      // borderLeftWidth: 1,
    }, 
    tableRow: { 
      // margin: "auto", 
      flexDirection: "row",
      alignContent: 'center',
      borderBottomWidth: 1, 
      borderLeftWidth: 1,
    }, 
    // tableRowHead: { 
    //   margin: "auto", 
    //   flexDirection: "row",
    //   backgroundColor: 'rgb(210, 210, 210)'
    // }, 
    tableCol: { 
      width: "0%", 
      borderStyle: "solid", 
      borderRightWidth: 1,
      // textAlign: 'start',
      // border: '1px solid rgb(192, 192, 192)',
    },
    tableCell: {
      margin: '0 2px',
    },
    tableText: { 
      margin: 1, 
      marginTop: 5, 
      fontSize: 8,
      verticalAlign: 'super',
      textAlign: 'start',
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
    },

  });

    let listado  = "";
    let wIndex   = 0;
    let wRfsi    = 0;
    let wTipo    = 0;
    let wModelo  = 0;
    let wSerieR  = 0;
    let wInvR    = 0;
    let wSerieC  = 0;
    let wInvC    = 0;
    let wUser    = 0;
    let wCorp    = 0;
    let wPuesto  = 0;

// Create Document Component
export const CrearPdf2=({tipo, datos, formato, CorporacionesABuscar, UsuariosABuscar, decide}, customStyles) => {

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


  const mostrarCorp=()=>{
      listado  = "Corp",
      wIndex   = "3%",
      wRfsi    = "9%",
      wTipo    = "6%",
      wModelo  = "6%",
      wSerieR  = "16%",
      wInvR    = "7%",
      wSerieC  = "16%", 
      wInvC    = "7%",
      wUser    = "15%",
      wCorp    = "0%",
      wPuesto  = "15%"


    for(let y=0;y<CorporacionesABuscar.length;y++){
      
      // e= [...e,datos.filter(function(element,index,array){
      e= datos.filter(function(element,index,array){
        return(
          element.nombreCorporacion == CorporacionesABuscar[y] && element.estatus== true
          )
        })
        n.push(e)
      }
      
      for(let o=0; o<CorporacionesABuscar.length; o++){
          n[o].sort( function (a,b){
            if(a.tipo > b.tipo){
              return 1;
            }
            if(a.tipo < b.tipo){
              return -1;
            }
            return 0;
          });
      }

      
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
            <TableRowHead  listado={listado} wIndex={wIndex} wRfsi={wRfsi} wTipo={wTipo} wModelo={wModelo} wSerieR={wSerieR} wInvR={wInvR} wSerieC={wSerieC} 
                          wInvC={wInvC} wUser={wUser} wCorp={wCorp} wPuesto={wPuesto} />
            
            
         {
          n[index].map((element,index,array)=>{
          //  return tbAsigCorp(index+1, array[index].rfsi, array[index].tipo, array[index].modeloRadio, array[index].serie_radio, array[index].inventario_interno,
          //   array[index].serie_cargador, array[index].inventarioSpCargador, array[index].nombre_completo, array[index].nombrePuesto)
          return <MapTabAsignaciones listado={listado} wIndex={wIndex} wRfsi={wRfsi} wTipo={wTipo} wModelo={wModelo} wSerieR={wSerieR} wInvR={wInvR} wSerieC={wSerieC} 
                                      wInvC={wInvC} wUser={wUser} wCorp={wCorp} wPuesto={wPuesto} index={index+1} rfsi={array[index].rfsi} tipo={array[index].tipo} 
                                      modeloRadio={array[index].modeloRadio} serie_radio={array[index].serie_radio} inventario_interno={array[index].inventario_interno} 
                                      serie_cargador={array[index].serie_cargador} inventarioSpCargador={array[index].inventarioSpCargador} nombre_completo={array[index].nombre_completo} 
                                      nombreCorporacion={array[index].nombreCorporacion} nombrePuesto={array[index].nombrePuesto} />
              })
            }
          </View>
          </View>
          : null
          )
        })
      )
  }

  





  const mostrarUsu=()=>{

      listado  = "User",
      wIndex   = "3%",
      wRfsi    = "9%",
      wTipo    = "6%",
      wModelo  = "6%",
      wSerieR  = "16%",
      wInvR    = "7%",
      wSerieC  = "16%", 
      wInvC    = "7%",
      wUser    = "0%",
      wCorp    = "15%",
      wPuesto  = "15%"

    for(let y=0;y<UsuariosABuscar.length;y++){
      
      // e= [...e,datos.filter(function(element,index,array){
      e= datos.filter(function(element,index,array){
        return(
          element.nombre_completo == UsuariosABuscar[y] && element.estatus== true
          )
        })
        n.push(e)
      }
      
      for(let o=0; o<UsuariosABuscar.length; o++){
          n[o].sort( function (a,b){
            if(a.tipo > b.tipo){
              return 1;
            }
            if(a.tipo < b.tipo){
              return -1;
            }
            return 0;
          });
      }

      return(

        UsuariosABuscar.map((element,index,array)=>{
          return (
            n[index].length !== 0 ?
            <View key={index} style={styles.section} wrap>
              <Text style={{...styles.title, textAlign: 'left'}} >{element}</Text>
            <View style={styles.table}   >

            <TableRowHead  listado={listado} wIndex={wIndex} wRfsi={wRfsi} wTipo={wTipo} wModelo={wModelo} wSerieR={wSerieR} wInvR={wInvR} wSerieC={wSerieC} 
                          wInvC={wInvC} wUser={wUser} wCorp={wCorp} wPuesto={wPuesto} />
         {
          n[index].map((element,index,array)=>{
          //  return tbAsigCorp(index+1, array[index].rfsi, array[index].tipo, array[index].modeloRadio, array[index].serie_radio, array[index].inventario_interno, 
          //   array[index].serie_cargador, array[index].inventarioSpCargador, array[index].nombreCorporacion, array[index].nombrePuesto)
          return <MapTabAsignaciones listado={listado} wIndex={wIndex} wRfsi={wRfsi} wTipo={wTipo} wModelo={wModelo} wSerieR={wSerieR} wInvR={wInvR} wSerieC={wSerieC} 
                                               wInvC={wInvC} wUser={wUser} wCorp={wCorp} wPuesto={wPuesto} index={index+1} rfsi={array[index].rfsi} tipo={array[index].tipo} 
                                               modeloRadio={array[index].modeloRadio} serie_radio={array[index].serie_radio} inventario_interno={array[index].inventario_interno} 
                                               serie_cargador={array[index].serie_cargador} inventarioSpCargador={array[index].inventarioSpCargador} nombre_completo={array[index].nombre_completo} 
                                               nombreCorporacion={array[index].nombreCorporacion} nombrePuesto={array[index].nombrePuesto} />
           })
         }
      </View>
      </View>
      : console.log('')
      )
      })
      )
  }


  const mostrarTipo=()=>{
    tipo == 'Portatil' ? listado='TipoP': tipo == 'Movil' ? listado='TipoM': listado='TipoF'
    {listado == 'TipoP' ?
    (
      wIndex   = "3%",
      wRfsi    = "7%",
      wTipo    = "0%",
      wModelo  = "6%",
      wSerieR  = "15%",
      wInvR    = "7%",
      wSerieC  = "15%", 
      wInvC    = "7%",
      wUser    = "13%",
      wCorp    = "14%",
      wPuesto  = "13%"
    ) :
    (
      wIndex   = "3%",
      wRfsi    = "8%",
      wTipo    = "0%",
      wModelo  = "8%",
      wSerieR  = "16%",
      wInvR    = "8%",
      wSerieC  = "0%", 
      wInvC    = "0%",
      wUser    = "16%",
      wCorp    = "21%",
      wPuesto  = "20%"
    )}
    
    for(let y=0;y<datos.length;y++){
      
      e= datos.filter(function(element,index,array){
        return(
          element.tipo == tipo
          )
        }) 
        n.push(e)
      }

      // console.log(n)
      
      for(let o=0; o<e.length; o++){
          n[o].sort( function (a,b){
            if(a.nombre_completo > b.nombre_completo){
              return 1;
            }
            if(a.nombre_completo < b.nombre_completo){
              return -1;
            }
            return 0;
          });
        }

        // console.log(n[0].nombre_completo)

      return(

            <View style={styles.section}>
               <Text style={{...styles.title, textAlign: 'left', fontSize: 10}} >{`Listado de Radios ${tipo}`}</Text>
            
              <View style={styles.table} >

              <TableRowHead  listado={listado} wIndex={wIndex} wRfsi={wRfsi} wTipo={wTipo} wModelo={wModelo} wSerieR={wSerieR} wInvR={wInvR} wSerieC={wSerieC} 
                              wInvC={wInvC} wUser={wUser} wCorp={wCorp} wPuesto={wPuesto} />
                
                {
                  n[0].map((element,index,array)=>{
                    return <MapTabAsignaciones listado={listado} wIndex={wIndex} wRfsi={wRfsi} wTipo={wTipo} wModelo={wModelo} wSerieR={wSerieR} wInvR={wInvR} wSerieC={wSerieC} 
                                               wInvC={wInvC} wUser={wUser} wCorp={wCorp} wPuesto={wPuesto} index={index+1} rfsi={array[index].rfsi} tipo={array[index].tipo} 
                                               modeloRadio={array[index].modeloRadio} serie_radio={array[index].serie_radio} inventario_interno={array[index].inventario_interno} 
                                               serie_cargador={array[index].serie_cargador} inventarioSpCargador={array[index].inventarioSpCargador} nombre_completo={array[index].nombre_completo} 
                                               nombreCorporacion={array[index].nombreCorporacion} nombrePuesto={array[index].nombrePuesto} />
                  }) 
                }

              </View>
            </View> 
      // : console.log('')
      // )
      // })
      )
  }

/* Los portatil tienen cargador   */
  

 return (
  <ModalRadio  sx={{pl:'100px'}} >
    <Box sx={{...customStyles, maxWidth: '1100px', maxHeight: '1100px', top: '2%', left: '20%' }}>
      <PDFViewer style={{width:"55vw", height:"75vh"}}>
        <Document>
          <Page orientation="landscape" size="letter" style={styles.body} wrap>
            <View style={styles.margen} >
              <Image  src={`http://172.16.21.222:8000/api/v0/documentos/users/${formato[0]?.fk_logo_ssypc}`} style={styles.image} fixed />
                {  
                  decide == "corpGral" ?
                  mostrarCorp()  :
                  decide == "usuGral" ?
                  mostrarUsu() :
                  decide == "porTipo" ?
                  mostrarTipo()  :
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