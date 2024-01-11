import { Text, View } from '@react-pdf/renderer';


export const ServiciosPdf=({datos, styles, comprobante})=> {

    return (
        <View style={{...styles.section, border: '1px solid rgb(192, 192, 192)' }}> 
            <Text style={{...styles.title, margin: '0 0 2 0', fontFamily: 'Times-Bold'}} > Servicios (Intervención del equipo) </Text>
            
            { comprobante===true ?
            <View style={{...styles.table, width: 200 }}> 
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
            </View>:
            
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
        }
        </View>   
    )
}