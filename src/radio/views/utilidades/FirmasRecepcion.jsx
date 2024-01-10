import { Text, View } from '@react-pdf/renderer';


export const FirmasRecepcion=({datos, styles})=> {

    return (
        
        <View style={{...styles.section, border: '1px solid rgb(192, 192, 192)' }}> 
            <Text style={{...styles.title, margin: '0 0 2 0', fontFamily: 'Times-Bold'}} > Recepción del equipo </Text>
            <View style={{...styles.table, width: 500 }}> 
                <View style={styles.tableRow}> 
                    <View style={{...styles.tableCol, width: '40%' }}> 
                        <View style={styles.tableCell}>
                            <Text style={styles.title}>  
                                SUPERVISOR TÉCNICO
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
                                USUARIO
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.tableRow}> 
                    <View style={{...styles.tableCol, width: '40%' }}> 
                        <View style={styles.tableCell}>
                            <Text style={{...styles.title, textDecoration: 'underline'}}> 
                                { datos.nombreSupervisorTec }
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
                                {datos.usuario_servicio}
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