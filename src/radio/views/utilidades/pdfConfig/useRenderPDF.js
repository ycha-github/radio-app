
import {  useEffect,  } from 'react';
import { useAsync } from 'react-use';

import { proxy, wrap } from 'comlink';

import Worker from './pdfworker?worker';

export const pdfWorker = wrap (new Worker());
// pdfWorker.onProgress(proxy((info) => console.log(info)));


export const useRenderPDF = ({tipo,formato,datosasig,corporaciones,UsuariosABuscar,decide} ) => {
  const {
    value: url,
    loading,
    error,
  } = useAsync(async () => {
    return pdfWorker.renderPDFInWorker({tipo,formato,datosasig,corporaciones,UsuariosABuscar,decide});
  }, [tipo,formato,datosasig.datos,corporaciones.CorporacionesABuscar,UsuariosABuscar,decide]);

  useEffect(() => (url ? () => URL.revokeObjectURL(url) : undefined), [url]);
  return { url, loading, error };
};