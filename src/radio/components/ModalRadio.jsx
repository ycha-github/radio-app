import Modal from 'react-modal';
const customStyles = {
    content: {
      top: '50%',
      left: '60%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('#root');

export const ModalRadio = () => {

  const onCloseModal=()=>{
    console.log('cerrando modal');
  }
  return (
    <Modal
      isOpen={true}
      onRequestClose={onCloseModal}
      style={customStyles}
      >
        <h1>dgdghhdfghjdfjgjjklhgkñjlñklñeteuoifoasoigoisdjgosdgijihdibiasidjidfhiajsdff</h1>
    </Modal>
  )
}