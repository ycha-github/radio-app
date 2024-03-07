import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { MapTabAsignaciones, TableRowHead } from './';

const styles = StyleSheet.create({
    title: {
        fontSize: 8,
        textAlign: 'center',
        fontFamily: 'Helvetica-Bold',
        margin: '0 0 0 0',
        textDecoration: 'none'
    },
    section: {
        margin: '0 0 0 0',
        border: '0px none none',
        padding: '10px 0 0 0',
    },
    table: {
        display: "table", 
        width: "auto", 
        borderStyle: "solid", 
        // borderTopWidth: 1, 
        // borderLeftWidth: 1,
      }, 
    });

export const MostrarTipo=({tipo, datos})=>{
    let listado='';
    let e=[];
    let n=[];
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
               {/* <Text style={{...styles.title, textAlign: 'left', fontSize: 10}} >{`Listado de radios ${tipo}`}</Text> */}
            
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
      )
  }