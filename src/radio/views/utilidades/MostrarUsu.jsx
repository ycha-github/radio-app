import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { TableRowHead } from './TableRowHead';
import { MapTabAsignaciones } from './MapTabAsignaciones';


const styles = StyleSheet.create({
    title: {
        fontSize: 10,
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
      }, 
      tableRow: { 
        flexDirection: "row",
      },
      tableCol: { 
        width: "100%", 
      },
      tableCell: {
        padding: '10px 0 0 0',
      },
    });

export const MostrarUsu=({UsuariosABuscar, datos})=>{
    let listado  = "User";
    let e=[];
    let n=[];
    let wIndex   = "3%";
    let wRfsi    = "9%";
    let wTipo    = "6%";
    let wModelo  = "6%";
    let wSerieR  = "16%";
    let wInvR    = "7%";
    let wSerieC  = "16%"; 
    let wInvC    = "7%";
    let wUser    = "0%";
    let wCorp    = "15%";
    let wPuesto  = "15%";

  for(let y=0;y<UsuariosABuscar.length;y++){
    
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
            <View key={index} style={styles.section} >
            <Text style={{...styles.title, textAlign: 'left'}} >{element}</Text>
          <View style={styles.table}>

          <TableRowHead  listado={listado} wIndex={wIndex} wRfsi={wRfsi} wTipo={wTipo} wModelo={wModelo} wSerieR={wSerieR} wInvR={wInvR} wSerieC={wSerieC} 
                        wInvC={wInvC} wUser={wUser} wCorp={wCorp} wPuesto={wPuesto} />
       {
        n[index].map((element,index,array)=>{
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