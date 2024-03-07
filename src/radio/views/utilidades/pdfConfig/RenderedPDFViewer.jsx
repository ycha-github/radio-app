import { useDeferredValue } from 'react';
import { useRenderPDF } from './useRenderPDF';
import { ModalRadio } from '../../../components/ModalRadio';
import { Suspense } from 'react';
import { CrearPdf3 } from './CrearPdf3';

export const RenderedPDFViewer = ({
  style,
  className,
  innerRef,
  showToolbar = false,
  ...props
}) => {
  const text = useDeferredValue();
  const { url, loading, error } = useRenderPDF();

  const src = url ? `${url}#toolbar=${showToolbar ? 1 : 0}` : null;
  if (loading)
    return (
       
        
      // @ts-ignore
      <div className={className} style={style}>
        Loading...
      </div>
      
    );

  if (error) {
    console.log({ error });
    return (
      // @ts-ignore
      <div className={className} style={style}>
        {JSON.stringify(error)}
      </div>
    );
  }

  return (
   
//    <ModalRadio>
    <iframe
      // @ts-ignore
      src={src}
      ref={innerRef}
      // @ts-ignore
      style={style}
      className={className}
      {...props}
    />
    //  </ModalRadio>
  );
};
