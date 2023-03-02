import { useDispatch, useSelector } from "react-redux";
import { onActualizar, onCloseModal, onGuardar, onOpenModal, onVer } from "../store";

 export const useModalHook= (initialvalue=true) => {
  
  const dispatch= useDispatch();
      const { isModalOpen, isActualizar, isVer  }= useSelector(state=> state.ui );
  
      const OpenModal = ()=>{
        dispatch (onOpenModal());
      }; 
      const CloseModal  = () => {
        dispatch (onCloseModal());
      };
      const mostrarGuardar  = () => {
        dispatch (onGuardar());
      };
      const mostrarActualizar  = () => {
        dispatch (onActualizar());
      };
      const disableForm  = () => {
        dispatch (onVer());
      };

    return{
      // Propiedades
      isModalOpen,isActualizar, isVer,
      // metodos
      CloseModal,OpenModal,mostrarGuardar,mostrarActualizar,disableForm
    }
  }
