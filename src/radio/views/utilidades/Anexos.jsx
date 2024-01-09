import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';

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
      imganexo: {
      width:230,
      height:300,
      margin: '0 0 5 5',
    },
      imganexo2: {
      width:230,
      height:300,
      position:'absolute',
      float: 'right',
      right: 5,
      top: 18,
    }
});

export const Anexos = ({datos, formato}) => {
    return(
        <View style={{...styles.section, border: '1px solid rgb(192, 192, 192)' }}> 
            <Text style={{...styles.title, margin: '0 0 6 0', fontFamily: 'Times-Bold'}} > ANEXOS </Text>
            <Image style={styles.imganexo} src={`http://172.16.21.222:8000/api/v0/documentos/users/${datos.fk_foto1}`} />
            <Image style={styles.imganexo2} src={`http://172.16.21.222:8000/api/v0/documentos/users/${datos.fk_foto2}`} />
        </View>
   )
}
