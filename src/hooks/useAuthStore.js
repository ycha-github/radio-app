import { useDispatch, useSelector } from "react-redux"
import { radioApi } from "../api";
import { onChecking, onLogin,onLogout,clearErrorMessage } from "../store/auth/authSlice";

export const useAuthStore = () => {

    const {status, user, errorMessage}= useSelector(state=> state.auth);
    const dispatch = useDispatch();

    const startLogin = async({username, password})=>{
        dispatch(onChecking());
        try {
            const {data} = await radioApi.post('/users/validar', {username,password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({username: data.existeUsuario.username, idusers: data.existeUsuario.idusers, rol:data.existeUsuario.roles_idrol}));
        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
    }
    const checkAuthToken = async()=>{
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( onLogout() );

        try{
            const {data} = await radioApi.post('users/revalidar');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ username: data.username, idusers: data.idusers, rol: data.rol}));
        }catch (error) { 
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = ()=>{
        localStorage.clear();
        dispatch(onLogout());
    }

  return {
      // propiedades
      status,
      user,
      errorMessage,
      // metodos
      startLogin,
      checkAuthToken,
      startLogout,
  }
}