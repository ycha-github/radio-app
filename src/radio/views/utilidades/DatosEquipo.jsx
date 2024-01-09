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

export const DatosEquipo=({datos})=> {

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