import { expose } from 'comlink';

import './workerShim';
let log = console.info;

const renderPDFInWorker = async () => {
  try {
    const {blop} = await import ("../CrearPdf2")
    const { renderPDF } = await import('./renderPDF');
    return URL.createObjectURL(await blop());
  } catch (error) {
    log(error);
    throw error;
  }
};




expose({ renderPDFInWorker: renderPDFInWorker,  });
// expose({ renderPDF  });

