import { AddCircleOutlineOutlined } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import Modal from 'react-modal';
import { useModalHook } from '../../hooks/useModalHook';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('#root');

  export const ModalRadio = ({children, isOpen, onCloseModal}) => {
    
  return (
    <>

    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
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