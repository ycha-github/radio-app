
import {  useEffect,  } from 'react';
import { useAsync } from 'react-use';

import { proxy, wrap } from 'comlink';

import Worker from './pdfworker?worker';

export const pdfWorker = wrap (new Worker());


export const useRenderPDF = () => {
  const {
    value: url,
    loading,
    error,
  } = useAsync(async () => {
    return pdfWorker.renderPDFInWorker();
  }, []);

  useEffect(() => (url ? () => URL.revokeObjectURL(url) : undefined), [url]);
  return { url, loading, error };
};