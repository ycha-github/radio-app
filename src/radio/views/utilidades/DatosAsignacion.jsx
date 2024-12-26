
import { Text, View } from '@react-pdf/renderer';


export const DatosAsignacion = ({styles, datos}) => {

    let funda = datos.funda;
    let antena = datos.antena; 
    let bocina = datos.bocina; 
    let c2h = datos.c2h; 
    let cablep = datos.cable_principal; 
    let caratula = datos.caratula; 
    let micro = datos.micro; 
    let cofre = datos.cofre; 
    let portac = datos.porta_caratula; 
    let cuelloc = datos.cuello_cisne; 
    let dt = datos.tipo;
    
    { funda === true ? funda = '- Funda ' : funda = '' } 
    { antena === true ? antena ='- Antena ' : antena ="" } 
    { bocina === true ? bocina ='- Bocina ' : bocina ="" }  
    { c2h === true ? c2h ='- C2H ' : c2h ="" }  
    { cablep === true ? cablep ='- Cable principal ' : cablep ="" }  
    { caratula === true ? caratula ='- Carátula ' : caratula ="" }   
    { micro === true ? micro ='- Micro ' : micro ="" }   
    { cofre === true ? cofre ='- Cofre ' : cofre ="" }   
    { portac === true ? portac ='- Porta carátula ' : portac ="" }   
    { cuelloc === true ? cuelloc ='- Cuello cisne' : cuelloc ="" }
    console.log(datos.marcaRadio)

  return (
    <>
    {/*  Tabla de datos del  radio asignado */}

    <View style={styles.table}>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <View style={styles.tableCell}>
              <Text style={{...styles.text, textAlign: 'left'}}> 
                Tipo de radio: 
              </Text>
            </View>
          </View>
          <View style={styles.tableCol}>
            <View style={styles.tableCell}> 
              <Text style={styles.text3}>
                {datos.tipo}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}>
            <View style={styles.tableCell}>
                <Text style={{...styles.text, textAlign: 'left'}}>  
                Marca / Modelo: 
              </Text>
            </View>
          </View>
          <View style={styles.tableCol}>
            <View style={styles.tableCell}>
              <Text style={styles.text3}> 
                {datos.marcaRadio + ' / ' + datos.modeloRadio}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}>
            <View style={styles.tableCell}>
                <Text style={{...styles.text, textAlign: 'left'}}>  
                    Serie: 
                </Text>
            </View>
          </View>
          <View style={styles.tableCol}>
            <View style={styles.tableCell}> 
              <Text style={styles.text3}>
                {datos.serie}
              </Text>
            </View>
          </View>
        </View>
 
        <View style={styles.tableRow}>
          <View style={styles.tableCol}> 
            <View style={styles.tableCell}>
                <Text style={{...styles.text, textAlign: 'left'}}>  
                    Inventario: 
                </Text>
            </View>
          </View>
          <View style={styles.tableCol}>
            <View style={styles.tableCell}> 
              <Text style={styles.text3}>
                {datos.inventario_interno}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}>
            <View style={styles.tableCell}>
              
              {
               
                datos.marcaRadio === "MOTOROLA"?
                <Text style={{...styles.text, textAlign: 'left'}}>  
                    ID:                
                </Text>
                :
                <Text style={{...styles.text, textAlign: 'left'}}>  
                    RFSI:                
                </Text>

              }
            </View>
          </View>
          <View style={styles.tableCol}>
            <View style={styles.tableCell}> 
              <Text style={styles.text3}>
                {datos.rfsi}
              </Text>
            </View>
          </View>
        </View>

      </View>

      {/* Tabla vehículo */}
      {datos.tipo === 'Movil' ?
        (<View style={styles.seccionVeh} >
            <View style={styles.table}>

                {datos.tipoVehiculo == null ?"":<View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                    <View style={styles.tableCell}>
                            <Text style={{...styles.text, textAlign: 'left'}}>  
                        Tipo de Vehículo: 
                        </Text>
                    </View>
                    </View>
                    <View style={styles.tableColVehEsp}>
                    <View style={styles.tableCell}> 
                        <Text style={styles.text3}>
                        {datos.tipoVehiculo}
                        </Text>
                    </View>
                    </View>
                </View>}

                {datos.marcaVehiculo==null? "" : <View style={styles.tableRow}> 
                    <View style={styles.tableCol}>
                    <View style={styles.tableCell}>
                        <Text style={{...styles.text, textAlign: 'left'}}>  
                        Marca / Línea: 
                        </Text>
                    </View>
                    </View>
                    <View style={styles.tableColVehEsp}>
                    <View style={styles.tableCell}>
                        <Text style={styles.text3}> 
                        {datos.marcaVehiculo + ' / ' + datos.modeloVehiculo}
                        </Text>
                    </View>
                    </View>
                </View>}

                {datos.anio == null ? "":<View style={styles.tableRow}> 
                    <View style={styles.tableCol}>
                    <View style={styles.tableCell}>
                        <Text style={{...styles.text, textAlign: 'left'}}>  
                        Modelo: 
                        </Text>
                    </View>
                    </View>
                    <View style={styles.tableColVehEsp}>
                    <View style={styles.tableCell}> 
                        <Text style={styles.text3}>
                        {datos.anio}
                        </Text>
                    </View>
                    </View>
                </View>}
        
                { datos.color== null? "":  <View style={styles.tableRow}>
                    <View style={styles.tableCol}> 
                    <View style={styles.tableCell}>
                        <Text style={{...styles.text, textAlign: 'left'}}>  
                        Color: 
                        </Text>
                    </View>
                    </View>
                    <View style={styles.tableColVehEsp}>
                    <View style={styles.tableCell}> 
                        <Text style={styles.text3}>
                        {datos.color}
                        </Text>
                    </View>
                    </View>
                </View>}

                {datos.unidad == null? "": <View style={styles.tableRow}> 
                    <View style={styles.tableCol}>
                    <View style={styles.tableCell}>
                        <Text style={{...styles.text, textAlign: 'left'}}>  
                        No.Económico: 
                        </Text>
                    </View>
                    </View>
                    <View style={styles.tableColVehEsp}>
                    <View style={styles.tableCell}> 
                        <Text style={styles.text3}>
                        {datos.unidad}
                        </Text>
                    </View>
                    </View>
                </View>}

            </View>
        </View>
    ) : "" }

    {/* Tabla de GPS */}
    { datos.tipo !== 'Fijo' ? 
    <View >  
    <Text style={{padding:5}}></Text>
          
    {datos.nombreGps === null ? "":
      <View style={styles.table} >

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}>               
            <View style={styles.tableCell}>
                <Text style={{...styles.text, textAlign: 'left'}}>  
                  Accesorio: 
                </Text>
            </View>
          </View>
          { datos.tipo === 'Movil' ? (
            <View style={styles.tableCol2}>
                <View style={styles.tableCell}> 
                <Text style={styles.text3}>
                    {datos.nombreGps}
                </Text>
                </View>
            </View>
          ) : ''}
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}>
            <View style={styles.tableCell}>
             <Text style={{...styles.text, textAlign: 'left'}}>  
                Marca / Modelo: 
              </Text>
            </View>
          </View>
          { datos.tipo === 'Movil' ? (
            <View style={{...styles.tableCol2, width: "17%"}}>
                <View style={styles.tableCell}>
                <Text style={styles.text3}> 
                    {datos.marcaGps + ' / ' + datos.modeloGps}
                </Text>
                </View>
            </View>
        ) : ''}
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}>
            <View style={styles.tableCell}>
                <Text style={{...styles.text, textAlign: 'left'}}>  
                    Serie: 
                </Text>
            </View>
          </View>
          { datos.tipo === 'Movil' ? (
            <View style={styles.tableCol2}>
                <View style={styles.tableCell}> 
                <Text style={styles.text3}>
                    {datos.serie_gps}
                </Text>
                </View>
            </View>
          ) : ''}
        </View>
 
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <View style={styles.tableCell}>
                <Text style={{...styles.text, textAlign: 'left'}}>  
                Inventario: 
              </Text>
            </View>
          </View>
          { datos.tipo === 'Movil' ? (
          <View style={styles.tableCol2}>
            <View style={styles.tableCell}> 
              <Text style={styles.text3}>
                {datos.inventarioSpGps}
              </Text>
            </View>
          </View>
          ) : ''}
        </View>

      </View> 
      }
    </View>
    : "" }

    {/* Tabla de cargador */}
    { datos.tipo !== 'Fijo' ? 
    <View >  
    <Text style={{padding:5}}></Text>
          
    {datos.nombreCargador === null ? "":
      <View style={styles.table} >

        <View style={styles.tableRow}> 
        {datos.nombreCargador === null ? "":
          <View style={styles.tableCol}>               
            <View style={styles.tableCell}>
                <Text style={{...styles.text, textAlign: 'left'}}>  
                  Accesorio: 
                </Text>
            </View>
          </View>}
          { datos.tipo === 'Movil' ? '' : (
            (datos.nombreCargador === null ? "":
          <View style={styles.tableCol2}>
            <View style={styles.tableCell}> 
              <Text style={styles.text3}>
                {datos.nombreCargador}
              </Text>
            </View>
          </View>
            )
          )}
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}>
            <View style={styles.tableCell}>
             <Text style={{...styles.text, textAlign: 'left'}}>  
                Marca / Modelo: 
              </Text>
            </View>
          </View>
          { datos.tipo === 'Movil' ? '' : (
          <View style={styles.tableCol2}>
            <View style={styles.tableCell}>
              <Text style={styles.text3}> 
                {datos.marcaCargador + ' / ' + datos.modeloCargador}
              </Text>
            </View>
          </View>
          )}
        </View>

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}>
            <View style={styles.tableCell}>
                <Text style={{...styles.text, textAlign: 'left'}}>  
                    Serie: 
                </Text>
            </View>
          </View>
          { datos.tipo === 'Movil' ? '' : (
          <View style={styles.tableCol2}>
            <View style={styles.tableCell}> 
              <Text style={styles.text3}>
                {datos.serie_cargador}
              </Text>
            </View>
          </View>
          )}
        </View>
 
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <View style={styles.tableCell}>
                <Text style={{...styles.text, textAlign: 'left'}}>  
                Inventario: 
              </Text>
            </View>
          </View>
          { datos.tipo === 'Movil' ? '' : (
          <View style={styles.tableCol2}>
            <View style={styles.tableCell}>
              <Text style={styles.text3}>
                {datos.inventarioSpCargador}
              </Text>
            </View>
          </View>
          )}
        </View>

      </View> 
      }
    </View>
    : "" }

      {/* Otros accesorios */}
      {funda==='' && antena === '' && bocina === '' && c2h === '' && cablep === '' && caratula === ''  && micro === '' && cofre === '' && portac === '' && cuelloc === '' ? 
        '' : (
            <View style={styles.otrosAcc }>
                <Text style={{...styles.text, textAlign: 'left'}} >Otros accesorios:</Text>
                <Text style={styles.text3 }> 
                {funda + antena + bocina + c2h + cablep + caratula + micro + cofre + portac + cuelloc}
                </Text>
            </View>
        )}
    </>
  )
}
