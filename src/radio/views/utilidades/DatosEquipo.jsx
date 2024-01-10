import { Text, View } from '@react-pdf/renderer';


export const DatosEquipo=({datos, styles})=> {

    return (
        <View style={{...styles.section, border: '1px solid rgb(192, 192, 192)' }}>

            <Text style={{...styles.title, margin: '0 0 2 0', fontFamily: 'Times-Bold'}} > Datos del equipo </Text> 

            <View style={{...styles.table, width: 200 }}> {/*   Tabla de datos del equipo   */}
                <View style={styles.tableRow}> 
                    <View style={{...styles.tableCol, width: '50%' }}> 
                        <View style={styles.tableCell}>
                                <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                    RFSI:
                                </Text> 
                        </View>
                    </View>
                    <View style={{...styles.tableCol, width: '50%' }}> 
                        <View style={styles.tableCell}>
                                <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                    {datos.rfsi}
                                </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.tableRow}> 
                    <View style={{...styles.tableCol, width: '50%' }}> 
                        <View style={styles.tableCell}>
                                <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                    Tipo: 
                                </Text> 
                        </View>
                    </View>
                    <View style={{...styles.tableCol, width: '50%' }}> 
                        <View style={styles.tableCell}>
                                <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                    {datos.tipo}
                                </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.tableRow}> 
                    <View style={{...styles.tableCol, width: '50%' }}> 
                        <View style={styles.tableCell}>
                                <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                    Serie: 
                                </Text>
                        </View>
                    </View>
                    <View style={{...styles.tableCol, width: '50%' }}> 
                        <View style={styles.tableCell}>
                            <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                {datos.serie}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.tableRow}> 
                    <View style={{...styles.tableCol, width: '50%' }}> 
                        <View style={styles.tableCell}>
                            <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                Inventario SSyPC: 
                            </Text>
                        </View>
                    </View>
                    <View style={{...styles.tableCol, width: '50%' }}> 
                        <View style={styles.tableCell}>
                            <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                {datos.inventario_segpub}
                            </Text>
                        </View>
                    </View>
                </View>

            </View> {/*    Cierre de Tabla de datos del equipo   */}

            { datos.tipo !== 'Fijo' ? 

                    <View style={{...styles.tableObjeto, right: 10 }}> {/*   (Tabla absoluta, flotante ) Tabla del equipo - series de accesorios   */}
                        <View style={{...styles.table, width: 280 }}> {/*    Tabla de datos del equipo - series de accesorios  */}

                            <View style={styles.tableRow}> 
                                <View style={{...styles.tableCol, width: '25%' }}> 
                                    <View style={styles.tableCell}>
                                        <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                            {/* Accesorio */}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{...styles.tableCol, width: '35%' }}> 
                                    <View style={styles.tableCell}>
                                        <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                            Serie
                                        </Text>
                                    </View>
                                </View>
                                <View style={{...styles.tableCol, width: '40%' }}> 
                                    <View style={styles.tableCell}>
                                        <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                            Inventario SSyPC
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            { datos.tipo === 'Movil' ? '' :  
                                <View>
                                    <View style={styles.tableRow}> 
                                        <View style={{...styles.tableCol, width: '25%' }}> 
                                            <View style={styles.tableCell}>
                                                <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                                    Bateria:
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{...styles.tableCol, width: '35%' }}> 
                                            <View style={styles.tableCell}>
                                                <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                                    {datos.serie_bateria}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{...styles.tableCol, width: '40%' }}> 
                                            <View style={styles.tableCell}>
                                                <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                                    {datos.inventario_sp_bateria}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <View style={{...styles.tableCol, width: '25%' }}> 
                                            <View style={styles.tableCell}>
                                                <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                                    Cargador:
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{...styles.tableCol, width: '35%' }}> 
                                            <View style={styles.tableCell}>
                                                <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                                    {datos.serie_cargador}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{...styles.tableCol, width: '40%' }}> 
                                            <View style={styles.tableCell}>
                                                <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                                    {datos.inventario_segpub_cargador}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View> 
                            }
                            { datos.tipo === 'Movil' ?  
                            <View style={styles.tableRow}>
                                <View style={{...styles.tableCol, width: '25%' }}> 
                                    <View style={styles.tableCell}>
                                        <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                            Gps:
                                        </Text>
                                    </View>
                                </View>
                                <View style={{...styles.tableCol, width: '35%' }}> 
                                    <View style={styles.tableCell}>
                                        <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                            {datos.serie_gps}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{...styles.tableCol, width: '40%' }}> 
                                    <View style={styles.tableCell}>
                                        <Text style={{ ...styles.title, textAlign: 'left' }}> 
                                            {datos.inventario_segpub_gps}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            : '' }

                        </View> {/*    Cierre de Tabla de datos del equipo - serie accesorios    */}
                    </View>  /*   ( Cierre de Tabla absoluta, flotante ) Tabla de datos del equipo    */

            : "" }

        </View>   
    )

}