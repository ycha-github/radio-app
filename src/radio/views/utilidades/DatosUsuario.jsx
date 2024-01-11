import { Text, View} from '@react-pdf/renderer';


export const DatosUsuario=({datos, styles, comprobante})=> {

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
                { comprobante===true ?
                    <View style={{...styles.table, width: 80 }}> 

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
                    </View> :
                    <View style={{...styles.table, width: 150 }}> 
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
                    </View> 
                }
            </View>    
            ) }

        </View>   
    )

}