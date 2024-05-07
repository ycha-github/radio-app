import { createElement } from 'react';
// import { MostrarCorp } from '../MostrarCorp';

// import  type{ propss } from './PDF2';
// const { MostrarCorp }= await import ( '../MostrarCorp');

export const blop= async(props)=>{
  const { pdf } = await import('@react-pdf/renderer');
  // const {  PDF2 } = await import('./PDF2');
  const {CrearPdf2}  = await import('../CrearPdf2');
  return pdf(createElement(CrearPdf2,props)).toBlob();
}
