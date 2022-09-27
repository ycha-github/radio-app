import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onModalActualizar, onCloseModal, onOpenModal } from "../store";

 export const useModalHook= (initialvalue=true) => {
    
const dispatch= useDispatch();
    const { 
      isModalOpen
    }= useSelector(state=> state.ui );
    
    const { 
      isActualizar 
    } = useSelector(state=> state.ui);
    
    const OpenModal = ()=>{
      dispatch (onOpenModal());
    }

    const CloseModal  = () => {
      dispatch (onCloseModal());
    }

    const IsUpdate = () => {
      dispatch (onModalActualizar());
    }


    return{
      /*******Propiedades*******/
      isModalOpen,
      isActualizar,
      /*******Métodos*******/
      CloseModal,OpenModal,IsUpdate
    }
 }