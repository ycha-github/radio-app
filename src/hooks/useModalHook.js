import { useState } from "react";

 export const useModalHook= (initialvalue=false) => {
    const [isOpen, setIsOpen] =useState(initialvalue);
    
    const onCloseModal  = () => {
      setIsOpen(false);
    };

    const onOpenModal = ()=>{
      setIsOpen(true);
    }

  return[isOpen,onCloseModal,onOpenModal]
 }