import { Text, View} from '@react-pdf/renderer';


export const FirmasEntrega=({datos, styles})=> {

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