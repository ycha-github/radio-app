import { useDeferredValue } from 'react';
import { useRenderPDF } from './useRenderPDF';

export default function RenderedPDFViewer ({
  style,
  className,
  innerRef,
  tipo,
  formato,
  datos,
  CorporacionesABuscar,
  UsuariosABuscar,
  decide,
  showToolbar = true,
  ...props
}) {
  const datosasig = useDeferredValue({datos});
  const corporaciones = useDeferredValue({CorporacionesABuscar});
  // console.log(decide)
  const { url, loading, error } = useRenderPDF({tipo,formato,datosasig,corporaciones,UsuariosABuscar,decide});
// console.log(loading)
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

    <iframe
      // @ts-ignore
      src={src}
      ref={innerRef}
      // @ts-ignore
      style={style}
      className={className}
      {...props}
      
    />
  );
};
