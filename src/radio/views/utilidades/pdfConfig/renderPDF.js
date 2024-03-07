import { createElement } from 'react';
// import { MostrarCorp } from '../MostrarCorp';

// import  type{ propss } from './PDF2';



// const { MostrarCorp }= await import ( '../MostrarCorp');
// const {  PDF2 } = await import('./PDF2');

export const blop= async ()=>{
  const { pdf } = await import('@react-pdf/renderer');
  const {CrearPdf2}  = await import('../CrearPdf2');
  pdf(createElement(CrearPdf2)).toBlob();
}
