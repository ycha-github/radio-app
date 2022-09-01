
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import { useModalHook } from '../../../hooks/useModalHook';
import { ModalRadio } from '../ModalRadio';

export const FormUser = () => {
 const [isOpen1,onCloseModal1,onOpenModal1]=useModalHook();

  return (
      <>
      <Stack direction="row" spacing={1} marginBottom={2}>
      <Button onClick={onOpenModal1} color={'info'} variant="outlined" startIcon={<AddCircleOutlineOutlined />}>
        Nuevo
      </Button>
      </Stack>
      <ModalRadio isOpen={isOpen1} onCloseModal={onCloseModal1}>
        <h1>AGREGAR </h1>
        <hr />
        <p>Aqui va un formulario para agregar un registro</p>
      </ModalRadio>
    </>
  )
}
