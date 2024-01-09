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

export const FirmasEntrega=({datos})=> {

    return (
        <View style={{...styles.section, border: '1px solid rgb(192, 192, 192)' }}> 
            <Text style={{...styles.title, margin: '0 0 6 0', fontFamily: 'Times-Bold'}} > Entrega de equipo </Text>
            <View style={{...styles.table, width: 500 }}> 
                <View style={styles.tableRow}> 
                    <View style={{...styles.tableCol, width: '40%' }}> 
                        <View style={styles.tableCell}>
                            <Text style={styles.title}>  

                            </Text>
                        </View>
                    </View>
                    <View style={{...styles.tableCol, width: '20%' }}> 
                        <View style={styles.tableCell}>
                            <Text style={styles.title}> 

                            </Text>
                        </View>
                    </View>
                    <View style={{...styles.tableCol, width: '40%' }}> 
                        <View style={styles.tableCell}>
                        {datos?.fecha_entrega == undefined ?"":(<Text style={{...styles.title, margin: '4 0 10 0'}}> 
                            Fecha y hora: { new Date(datos.fecha_entrega).toLocaleString() }
                            </Text>)}
                        </View>
                    </View>
                </View>

                <View style={styles.tableRow}> 
                    <View style={{...styles.tableCol, width: '40%' }}> 
                        <View style={styles.tableCell}>
                            <Text style={styles.title}>  
                                USUARIO
                            </Text>
                        </View>
                    </View>
                    <View style={{...styles.tableCol, width: '20%' }}> 
                        <View style={styles.tableCell}>
                            <Text style={styles.title}> 

                            </Text>
                        </View>
                    </View>
                    <View style={{...styles.tableCol, width: '40%' }}> 
                        <View style={styles.tableCell}>
                            <Text style={styles.title}> 
                                TÉCNICO
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.tableRow}> 
                    <View style={{...styles.tableCol, width: '40%' }}> 
                        <View style={styles.tableCell}>
                            <Text style={{...styles.title, textDecoration: 'underline'}}> 
                                {datos.usuario_entrega}
                            </Text>
                        </View>
                    </View>
                    <View style={{...styles.tableCol, width: '20%' }}> 
                        <View style={styles.tableCell}>
                            <Text style={{...styles.title, textDecoration: 'underline'}}> 

                            </Text>
                        </View>
                    </View>
                    <View style={{...styles.tableCol, width: '40%' }}> 
                        <View style={styles.tableCell}>
                            <Text style={{...styles.title, textDecoration: 'underline'}}>  
                                { datos.nombreTecEntrega }
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.tableRow}> 
                    <View style={{...styles.tableCol, width: '40%' }}> 
                        <View style={styles.tableCell}>
                            <Text style={styles.title}> 
                                NOMBRE Y FIRMA
                            </Text>
                        </View>
                    </View>
                    <View style={{...styles.tableCol, width: '20%' }}> 
                        <View style={styles.tableCell}>
                            <Text style={styles.title}> 

                            </Text>
                        </View>
                    </View>
                    <View style={{...styles.tableCol, width: '40%' }}> 
                        <View style={styles.tableCell}>
                            <Text style={styles.title}> 
                                NOMBRE Y FIRMA
                            </Text>
                        </View>
                    </View>
                </View>

            </View> 

        </View>   
    )

}