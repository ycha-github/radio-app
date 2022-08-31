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

  export const ModalRadio = ({children}) => {
    const {isOpen,onCloseModal, onOpenModal}=useModalHook();
  return (
    <>
   <Stack direction="row" spacing={1} marginBottom={2}>
      <Button onClick={onOpenModal} color={'info'} variant="outlined" startIcon={<AddCircleOutlineOutlined />}>
        Nuevo
      </Button>
    </Stack>
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