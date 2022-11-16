import Modal from 'react-modal';
import { useModalHook } from '../../hooks/useModalHook';

const customStyles = {
  content: {
    position: 'absolute',
    top: '45%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-25%, -50%)',

  },
};
Modal.setAppElement('#root');

export const ModalRadio = ({ children }) => {
  const {isModalOpen, CloseModal,mostrarGuardar}= useModalHook();
  const cambiar3=()=>{
  CloseModal();
  mostrarGuardar();
}
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={cambiar3}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        {children}
      </Modal>
    </>
  )
}