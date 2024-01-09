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
      tableObjeto: {
        position: 'absolute',
        float: 'right',
        right: 10,
        top: 24,
      },
    });

export const DatosUsuario=({datos})=> {

    return (
        <View style={{...styles.section, border: '1px solid rgb(192, 192, 192)' }}> 
            <Text style={{...styles.title, margin: '0 0 2 0', fontFamily: 'Times-Bold'}} > Datos de usuario </Text>
            <View style={styles.table}> {/*   Tabla de datos de usuario    */}
                <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <View style={styles.tableCell}>
                            <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                Nombre:
                            </Text>
                        </View>
                    </View>
                    <View style={{...styles.tableCol, width: '80%' }}> 
                        <View style={styles.tableCell}>
                            <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                {datos.nombre + ' ' + datos.apellido_pat + ' ' + datos.apellido_mat}
                            </Text>
                        </View>
                    </View>
                </View>
        
                <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <View style={styles.tableCell}>
                            <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                Corporación: 
                            </Text>
                        </View>
                    </View>
                    <View style={{...styles.tableCol, width: '80%' }}> 
                        <View style={styles.tableCell}>
                            <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                {datos.nombreCorporacion}
                            </Text>
                        </View>
                    </View>
                </View>
        
                <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <View style={styles.tableCell}>
                            <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                Cargo: 
                            </Text>
                        </View>
                    </View>
                    <View style={{...styles.tableCol, width: '80%' }}> 
                        <View style={styles.tableCell}>
                            <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                {datos.nombrePuesto}
                            </Text>
                        </View>
                    </View>
                </View>
        
            </View> {/*    Cierre de Tabla de datos de usuario    */}
        
            { datos.tipo !== 'Movil' ? '' : (
            
            <View style={styles.tableObjeto}> {/*   (Tabla absoluta, flotante ) Tabla de datos de usuario - unidad- zona/región    */}
                <View style={{...styles.table, width: 150 }}> {/*    Tabla de datos de usuario - unidad- zona/región    */}
            
                    {/* <View style={styles.tableRow}> 
                        <View style={{...styles.tableCol, width: '50%' }}> 
                            <View style={styles.tableCell}>
                                <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                    Zona/Región:
                                </Text>
                            </View>
                        </View>
                        <View style={{...styles.tableCol, width: '50%' }}> 
                            <View style={styles.tableCell}>
                                <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                    {datos.nombreZonasRegiones}
                                </Text>
                            </View>
                        </View>
                    </View> */}
    
                    <View style={styles.tableRow}>
                        <View style={{...styles.tableCol, width: '50%' }}> 
                            <View style={styles.tableCell}>
                                <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                    Unidad:
                                </Text>
                            </View>
                        </View>
                        <View style={{...styles.tableCol, width: '50%' }}> 
                            <View style={styles.tableCell}>
                                <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                    {datos.unidad}
                                </Text>
                            </View>
                        </View>
                    </View>
                
                </View> {/*    Cierre de Tabla de datos de usuario - unidad- zona/región    */}
            </View>     /*   ( Cierre de Tabla absoluta, flotante ) Tabla de datos de usuario - unidad- zona/región    */
            ) }
    
        </View>   
    )

}