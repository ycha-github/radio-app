import { Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useModalHook } from '../../../hooks/useModalHook';
import { ModalRadio } from '../ModalRadio';

export const FormUpdateUser = () => {
  const [isOpen2,onCloseModal2,onOpenModal2]=useModalHook();

  return (
      <>
       <IconButton
        onClick={onOpenModal2}
        color="inherit"
        size="small"
        aria-label="edit">
        <Edit fontSize="small"/>
      </IconButton>
      <ModalRadio isOpen={isOpen2} onCloseModal={onCloseModal2}>
        <h1>ACTUALIZAR </h1>
        <hr/>
        <p>aqui va el formulario para modificar un registro</p>
      </ModalRadio>
    </>
  )
}