import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useAsignacionesStore } from '../../../hooks/hooksUtilidades/useAsignacionesStore';


// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
export const CrearPdf = () => {
  // const { activeEvent } = useAsignacionesStore();

 return (
  <Document>
    <Page size="letter" style={styles.page}>
      <View style={styles.section}>
        <Text >Carta Responsiva</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
 );
 }