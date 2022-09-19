import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onCloseModal, onOpenModal } from "../store";

 export const useModalHook= (initialvalue=true) => {
    
const dispatch= useDispatch();
    const { 
      isModalOpen
    }= useSelector(state=> state.ui );
    
    const OpenModal = ()=>{
      dispatch (onOpenModal());
    }
    const CloseModal  = () => {
      dispatch (onCloseModal());
    };

  return{
    // Propiedades
    isModalOpen,
    // metodos
    CloseModal,OpenModal}
 }