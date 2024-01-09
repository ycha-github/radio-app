import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    tableSa: { 
        display: "table", 
        borderStyle: "solid", 
        fontFamily: 'Times-Bold',
      }, 
      tableRowSa: { 
        margin: "auto", 
        flexDirection: "row" 
      }, 
      tableColSa: { 
        width: "15%", 
        borderStyle: "solid", 
        border: '1px solid rgb(192, 192, 192)',
      }, 
      tableCellSa: { 
        margin: "auto", 
        marginTop: 5, 
        fontSize: 8,
      }
});


export const Satis=()=> {

    return(
        <View style={styles.tableSa}>
            <View style={styles.tableRowSa}> 
              <View style={{...styles.tableColSa, width: "75%", borderWidth: 0,}}> 
                <Text style={styles.tableCellSa}>
                  Califica nuestro servicio marcando con una X
                </Text> 
              </View>
            </View>
            <View style={styles.tableRowSa}> 
              <View style={styles.tableColSa}> 
                <Text style={styles.tableCellSa}>Muy insatisfecho</Text> 
                <Text style={styles.tableCellSa}>1</Text> 
              </View> 
              <View style={styles.tableColSa}>
                <Text style={styles.tableCellSa}>Insatisfecho</Text> 
                <Text style={styles.tableCellSa}>2</Text> 
              </View> 
              <View style={styles.tableColSa}> 
                <Text style={styles.tableCellSa}>Neutral</Text> 
                <Text style={styles.tableCellSa}>3</Text> 
              </View> 
              <View style={styles.tableColSa}> 
                <Text style={styles.tableCellSa}>Satisfecho</Text> 
                <Text style={styles.tableCellSa}>4</Text> 
              </View>
              <View style={styles.tableColSa}> 
                <Text style={styles.tableCellSa}>Muy satisfecho</Text> 
                <Text style={styles.tableCellSa}>5</Text> 
              </View> 
            </View>
            <View style={styles.tableRowSa}> 
              <View style={styles.tableColSa}> 
                <Text style={styles.tableCellSa}> </Text> 
              </View> 
              <View style={styles.tableColSa}> 
                <Text style={styles.tableCellSa}> </Text> 
              </View> 
              <View style={styles.tableColSa}>
                <Text style={styles.tableCellSa}> </Text> 
              </View>
              <View style={styles.tableColSa}> 
                <Text style={styles.tableCellSa}> </Text> 
              </View> 
              <View style={styles.tableColSa}> 
                <Text style={styles.tableCellSa}> </Text> 
              </View> 
            </View> 
        </View>
    )
}