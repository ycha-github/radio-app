import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  onCloseModal, onOpenModal, onGuardar, onActualizar } from "../store";

 export const useModalHook= (initialvalue=true) => {
    
const dispatch= useDispatch();
    const { 
      isModalOpen
    }= useSelector(state=> state.ui );

    const { 
      isActualizar
    }= useSelector(state=> state.ui );
    
    const OpenModal = ()=>{
      dispatch (onOpenModal());
    }

    const CloseModal  = () => {
      dispatch (onCloseModal());
    }

    const ModalGuardar  = () => {
      dispatch (onGuardar());
    }

    const ModalActualizar  = () => {
      dispatch (onActualizar());
    }

    return{
      /*******Propiedades*******/
      isModalOpen,isActualizar,
      /*******Métodos*******/
      CloseModal,OpenModal,ModalGuardar,ModalActualizar
    }
 }