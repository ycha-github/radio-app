import { StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    tableRow: { 
      // margin: "auto", 
      flexDirection: "row",
      alignContent: 'center',
      borderBottomWidth: 1, 
      borderLeftWidth: 1,
    //   wordBreadk: 'break-word',
    //   height: 'auto',
    }, 
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

  });

export const MapTabAsignaciones = ({listado, wIndex, wRfsi, wTipo=0, wModelo, wSerieR, wInvR, wSerieC=0, wInvC=0, wUser=0, wCorp=0, wPuesto, index, rfsi, tipo=0,  modeloRadio, serie_radio, inventario_interno, serie_cargador=0, inventarioSpCargador=0, nombre_completo=0, nombreCorporacion=0, nombrePuesto}) => 
        {
            return <View key={index} style={styles.tableRow} wrap={false}>
                <View style={{...styles.tableCol, width: wIndex }} >
                   <View style={styles.tableCell} >
                     <Text style={styles.tableText} >
                       {index}
                     </Text> 
                   </View>
                </View> 
                <View style={{...styles.tableCol, width: wRfsi }}>
                   <View style={styles.tableCell} >
                     <Text style={styles.tableText} >
                       {rfsi}
                     </Text>
                   </View> 
                </View> 
                {listado === 'TipoP' || listado === 'TipoM' || listado === 'TipoF' ? null :
                 <View style={{...styles.tableCol, width: wTipo }}>
                   <View style={styles.tableCell} >
                     <Text style={styles.tableText} >
                       {tipo}
                     </Text>
                   </View> 
                </View> 
                }
                <View style={{...styles.tableCol, width: wModelo }}>
                   <View style={styles.tableCell} >
                     <Text style={styles.tableText} >
                       {modeloRadio}
                     </Text> 
                   </View> 
                </View> 
                 <View style={{...styles.tableCol, width: wSerieR, }}> 
                   <View style={styles.tableCell} >
                     <Text style={styles.tableText} >
                       {serie_radio}
                     </Text> 
                   </View> 
                </View> 
                <View style={{...styles.tableCol, width: wInvR }}>
                   <View style={styles.tableCell} >
                     <Text style={styles.tableText} >
                       {inventario_interno}
                     </Text> 
                   </View> 
                </View> 
                {listado==='User' || listado==='Corp' || listado==='TipoP' ?
                <View style={{...styles.tableCol, width: wSerieC }}>
                   <View style={styles.tableCell} >
                     <Text style={styles.tableText} >
                       {serie_cargador}
                     </Text> 
                   </View> 
                </View> 
                 : null } 
                 {listado==='User' || listado==='Corp' || listado==='TipoP' ?
                <View style={{...styles.tableCol, width: wInvC }}>
                   <View style={styles.tableCell} >
                     <Text style={styles.tableText} >
                       {inventarioSpCargador}
                     </Text> 
                   </View> 
                </View> 
                 : null } 
                 { listado  === "User" ? null :
                <View style={{...styles.tableCol, width: wUser }}>
                   <View style={styles.tableCell} >
                     <Text style={styles.tableText} >
                       {nombre_completo}
                     </Text> 
                   </View> 
                </View> 
                }
                { listado  === "Corp" ? null :
                <View style={{...styles.tableCol, width: wCorp }} >
                   <View style={styles.tableCell} >
                     <Text style={styles.tableText} >
                       {nombreCorporacion}
                     </Text> 
                   </View> 
                </View> 
                }
                <View style={{...styles.tableCol, width: wPuesto }} >
                   <View style={styles.tableCell} >
                     <Text style={styles.tableText} >
                       {nombrePuesto}
                     </Text> 
                   </View> 
                </View>  
            </View>
        }