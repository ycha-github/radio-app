import { StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
      tableRowHead: { 
        // margin: "auto", 
        flexDirection: "row",
        backgroundColor: 'rgb(210, 210, 210)',
        borderStyle: "solid", 
        borderBottomWidth: 1, 
        borderTopWidth: 1,
        borderLeftWidth: 1, 
      }, 
      tableCol: { 
        width: "0%", 
        borderStyle: "solid", 
        borderRightWidth: 1,
      },
      tableCell: {
        margin: '0 2px',
      },
      tableText: { 
        // margin: 1, 
        marginTop: 5, 
        fontSize: 8,
        fontFamily: 'Helvetica-Bold',
        verticalAlign: 'super',
        textAlign: 'start',
      }, 
  
    });



export const TableRowHead=({listado, wIndex, wRfsi, wTipo=0, wModelo, wSerieR, wInvR, wSerieC=0, wInvC=0, wUser=0, wCorp=0, wPuesto}) => {

   return       <View fixed style={styles.tableRowHead} wrap={false}>
                  <View style={{...styles.tableCol, width: wIndex }} >
                    <View style={styles.tableCell} >
                      <Text style={styles.tableText} > No.</Text> 
                    </View> 
                  </View> 
                  <View style={{...styles.tableCol, width: wRfsi }} >
                    <View style={styles.tableCell} >
                      <Text style={styles.tableText} > RFSI </Text> 
                    </View> 
                  </View> 
                  {listado === 'TipoP' || listado === 'TipoM' || listado === 'TipoF' ? null :
                    <View style={{...styles.tableCol, width: wTipo }} >
                      <View style={styles.tableCell} >
                        <Text style={styles.tableText} > Tipo </Text> 
                      </View> 
                    </View> 
                  }
                  <View style={{...styles.tableCol, width: wModelo }} >
                    <View style={styles.tableCell} >
                      <Text style={styles.tableText} > Modelo </Text> 
                    </View> 
                  </View> 
                  <View style={{...styles.tableCol, width: wSerieR }} >
                    <View style={styles.tableCell} >
                      <Text style={styles.tableText} > serie </Text> 
                    </View> 
                  </View> 
                  <View style={{...styles.tableCol, width: wInvR }} >
                    <View style={styles.tableCell} >
                      <Text style={styles.tableText} > Inventario </Text> 
                    </View> 
                  </View> 
                  {listado==='User' || listado==='Corp' || listado==='TipoP' ?
                  <View style={{...styles.tableCol, width: wSerieC }} >
                    <View style={styles.tableCell} >
                      <Text style={styles.tableText} > serie cargador </Text> 
                    </View> 
                  </View> 
                  : null }
                {listado==='User' || listado==='Corp' || listado==='TipoP' ?
                  <View style={{...styles.tableCol, width: wInvC }} >
                    <View style={styles.tableCell} >
                      <Text style={styles.tableText} > Inventario </Text> 
                    </View> 
                  </View>
                  : null }
                  { listado  === "User" ? null :
                  <View style={{...styles.tableCol, width: wUser }} >
                    <View style={styles.tableCell} >
                      <Text style={styles.tableText} > Usuario </Text> 
                    </View> 
                  </View> 
                  }
                  { listado  === "Corp" ? null :
                  <View style={{...styles.tableCol, width: wCorp }} >
                    <View style={styles.tableCell} >
                      <Text style={styles.tableText} > Corporación </Text> 
                    </View> 
                  </View> 
                  }
                  <View style={{...styles.tableCol, width: wPuesto }} >
                    <View style={styles.tableCell} >
                      <Text style={styles.tableText} > Puesto </Text> 
                    </View> 
                  </View> 
                </View>

}