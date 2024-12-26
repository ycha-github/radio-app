import { Box } from '@mui/material';
import Modal from 'react-modal';
import { useModalHook } from '../../hooks/useModalHook';
import { useHojaServicioStore } from '../../hooks/hooksUtilidades/useHojaServicioStore';

const customStyles = {
  content: {
    position: 'absolute',
    top: '0%',
    left: '0%',
    right: '0%',
    bottom: '0%',
    marginRight: '-50%',
    transform: 'translate(0%, 0%)',
    maxWidth: '670px',
    maxHeight: '500px',
  },
};
Modal.setAppElement('#root');

export const ModalRadio = ({ children }) => {
 const {limpiarActiveEvent}=useHojaServicioStore;

  const {isModalOpen, CloseModal,mostrarGuardar}= useModalHook();
  const cambiar3=()=>{
  CloseModal();
  limpiarActiveEvent()
  mostrarGuardar();
}
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={cambiar3}
        // style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        <Box sx={{customStyles}}>
        {children}
        </Box>
      </Modal>
    </>
  )
}