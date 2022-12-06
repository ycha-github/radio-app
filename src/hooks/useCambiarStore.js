import { useDispatch, useSelector } from "react-redux";
//import radioApi from "../../api/radioApi";
import { onShowError, clearErrorMessage } from "../../src/store/auth/cambiarSlice";
import radioApi from "../api/radioApi";
 
export const useCambiarStore= () => {
  const dispatch = useDispatch();
  const {errorMessage} = useSelector( state => state.cambiar );
  const { user } = useSelector( state => state.auth );
  
  
    const startCambiarPass = async (zonasEvent, id) => {
     try { 
       const { data } = await radioApi.put(`/users/cambiar/${id}`, zonasEvent);
      localStorage.clear();
      window.location.reload(true);
     } catch (error) {
      dispatch(onShowError(error.response.data?.message || '---'));
      setTimeout(()=>{
        dispatch(clearErrorMessage());
    },5);
     }
}
  
  return {
    // Propiedades
    errorMessage,
    // Metodos

    startCambiarPass,

  }
}