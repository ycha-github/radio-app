import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
        title: {
        fontSize: 8,
        textAlign: 'center',
        fontFamily: 'Times-Roman',
        margin: '0 0 0 0',
        textDecoration: 'none'
    },
        section: {
        margin: '3 50 0 50',
        border: '0px none none',
        padding: '2 0 2 0',
    },
        table: {
        alignItems: 'flex-start',
        border: '0px none none',
        // border: '1px solid rgb(192, 192, 192)',
        width: 350,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignContent: "stretch",
        flexWrap: "nowrap",
      }, 
        tableRow: { 
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignContent: "stretch",
        flexWrap: "nowrap",
        alignItems: "stretch",
      }, 
        tableCol: { 
        width: "20%",
        alignSelf: 'flex-start',
      },
        tableCell: { 
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: "auto",
        alignSelf: "stretch",
        margin: '0 0 0 5',
      }, 
    });

export const ServiciosPdf=({datos})=> {

    return (
        <View style={{...styles.section, border: '1px solid rgb(192, 192, 192)' }}> 
            <Text style={{...styles.title, margin: '0 0 2 0', fontFamily: 'Times-Bold'}} > Servicios (Intervención del equipo) </Text>
            <View style={{...styles.table, width: 500 }}> 
                <View style={styles.tableRow}> 
                    <View style={{...styles.tableCol, width: '100%' }}> 
                        <View style={styles.tableCell}>
                            <Text style={{ ...styles.title, textAlign: 'justify', margin: '4 0 4 0' }}> 
                                {datos.servicios }
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.tableRow}> 
                    <View style={{...styles.tableCol, width: '100%' }}> 
                        <View style={styles.tableCell}>
                            <Text style={{ ...styles.title, textAlign: 'center', margin: '4 0 4 0' }}> 
                                Descripción 
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.tableRow}> 
                    <View style={{...styles.tableCol, width: '100%' }}> 
                        <View style={styles.tableCell}>
                            <Text style={{ ...styles.title, textAlign: 'justify' }}> 
                                {datos.descripcion}
                            </Text>
                        </View>
                    </View>
                </View>
            </View> 
        </View>   
    )
}