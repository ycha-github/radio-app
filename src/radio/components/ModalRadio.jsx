import { AddCircleOutlineOutlined } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import Modal from 'react-modal';
import { useModalHook } from '../../hooks/useModalHook';

const customStyles = {
  content: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-25%, -50%)',
  },
};
Modal.setAppElement('#root');

export const ModalRadio = ({ children, isOpen, onCloseModal }, props) => {
  const {isModalOpen, CloseModal}= useModalHook();

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={CloseModal}
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