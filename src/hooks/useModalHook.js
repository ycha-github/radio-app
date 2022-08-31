import { useState } from "react";

 export const useModalHook= () => {
    const [isOpen, setIsOpen] =useState(false);
    
    const onCloseModal  = () => {
      setIsOpen(false);
    };

    const onOpenModal = ()=>{
      setIsOpen(true);
    }
  return{
      isOpen,
      onCloseModal,
      onOpenModal,
  }
 }