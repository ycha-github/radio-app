import { Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { ModalRadio } from '../ModalRadio';

export const FormUpdateUser = () => {
  

  return (
      <>
       <IconButton
       
        color="inherit"
        size="small"
        aria-label="edit">
        <Edit fontSize="small"/>
      </IconButton>
      <ModalRadio >
        <h1>ACTUALIZAR </h1>
        <hr/>
        <p>aqui va el formulario para modificar  registro</p>
      </ModalRadio>
    </>
  )
}