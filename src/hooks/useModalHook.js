import { useDispatch, useSelector } from "react-redux";
import { onActualizar, onCloseModal, onGuardar, onOpenModal } from "../store";

 export const useModalHook= (initialvalue=true) => {
  
  const dispatch= useDispatch();
      const { isModalOpen, isActualizar }= useSelector(state=> state.ui );
  
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

    return{
      // Propiedades
      isModalOpen,isActualizar,
      // metodos
      CloseModal,OpenModal,mostrarGuardar,mostrarActualizar,
    }
  }
