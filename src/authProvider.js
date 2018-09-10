import {AUTH_LOGIN,AUTH_LOGOUT,AUTH_ERROR,AUTH_CHECK} from 'react-admin';

export default (type,params) =>{
  // llamado cuando el usuario intenta iniciar sesión

  if(type===AUTH_LOGIN){
    const {username} = params;
    localStorage.setItem('username',username);
    // acepta todas las combinaciones de nombre de usuario / contraseña

    return Promise.resolve();
  }
  // llamado cuando el usuario hace clic en el botón de cerrar sesión

  if (type===AUTH_LOGOUT) {
    localStorage.removeItem('username');
    return Promise.resolve();
  }

  // llamado cuando la API devuelve un error
  if (type===AUTH_ERROR) {
    const{status}=params;
    if (status===401 || status ===403) {
      localStorage.removeItem('username');
      return Promise.reject();
    }
    return Promise.resolve();
  }
  // llamado cuando el usuario navega a una nueva ubicación
  if (type===AUTH_CHECK) {
    return localStorage.getItem('username')
    ? Promise.resolve()
    : Promise.reject();
  }
  return Promise.reject('Unknown method');
}
