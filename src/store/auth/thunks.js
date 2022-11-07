import { onChecking } from "./";

export const checkingAuthentication = ( email, password ) => {
    return async ( dispatch ) => {
        dispatch( onChecking() );
    }
}