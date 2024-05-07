import { expose } from 'comlink';

import './workerShim';
let log = console.info;

const renderPDFInWorker = async (props) => {
  // console.log(props)
  try {
    const {blop} = await import ("./renderPDF")
    // const { renderPDF } = await import('./renderPDF');
    return URL.createObjectURL(await blop(props));
  } catch (error) {
    log(error);
    throw error;
  }
};




expose({ renderPDFInWorker: renderPDFInWorker,  });
// expose({ renderPDF  });

