import { Document, Image, PDFViewer, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { Box } from '@mui/material';
import { ModalRadio } from '../../components/ModalRadio';
import { MostrarCorp, MostrarTipo, MostrarUsu } from './';

const styles = StyleSheet.create({
  title: {
    fontSize: 8,
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
    margin: '0 0 5 0',
    textDecoration: 'none'
  },
  image: {
    margin: '40 0 10 0',
    width:170,
    height:60,
    padding: '0 0 0 0',
  },
  body: {
    padding: '0 0 80 0',
  },
  margen: {
    margin: '0 50 0 50',
    // border: '0px none none',
    // padding: '0 0 0 0',
  },
    // piePagina: {
    //   // margin: '20 50 10 50',
    //   position: 'absolute',
    //   fontSize: 7,
    //   textAlign: 'left',
    //   fontFamily: 'Helvetica-Bold',
    //   bottom: 40,
    //   left: 50,
    //   right: 50,
    //   marginTop:10,
    // },

  });

export const CrearPdf2=({tipo, datos, formato, CorporacionesABuscar, UsuariosABuscar, decide}, customStyles) => {
  let nombreListado = "";
  decide == "corpGral" ? 
  nombreListado = "por corporación" : 
  decide == "usuGral" ? 
  nombreListado = "por usuarios" : 
  (decide == "porTipo" && tipo == 'Movil') ? 
  nombreListado = 'Móvil' : 
  (decide == "porTipo" && tipo == 'Fijo') ? 
  nombreListado = 'Fijo' : 
  (decide == "porTipo" && tipo == 'Portatil') ? 
  nombreListado = 'Portátil' : 
  null

 return (
  <ModalRadio  sx={{pl:'100px'}} >
    <Box sx={{...customStyles, maxWidth: '1100px', maxHeight: '1100px', top: '2%', left: '20%' }}>
      <PDFViewer style={{width:"55vw", height:"75vh"}}>
        <Document>
          <Page orientation="landscape" size="letter" style={styles.body} wrap>
            <View style={styles.margen} >
              <Image  src={`http://172.16.21.222:8000/api/v0/documentos/users/${formato[0]?.fk_logo_ssypc}`} style={styles.image} fixed />
              <Text style={{...styles.title, textAlign: 'left', fontSize: 12}} fixed >{`Listado de radios ${nombreListado}`}</Text>
                {  
                  decide == "corpGral" ?
                  <MostrarCorp CorporacionesABuscar={CorporacionesABuscar} datos={datos} />  :
                  decide == "usuGral" ?
                  <MostrarUsu UsuariosABuscar={UsuariosABuscar} datos={datos}/> :
                  decide == "porTipo" ?
                  <MostrarTipo tipo={tipo} datos={datos} />  :
                  null
                }
            </View>
            
          </Page>
        </Document>
      </PDFViewer>
    </Box>
  </ModalRadio>
 )
 }