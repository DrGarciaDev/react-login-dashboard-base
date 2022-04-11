import { getToken } from './sesion-storage.service'

export const authHeader = () => {
    const token = getToken();
    // console.log(token)
    if (!token) {
        console.log('No hay token de sesion')
        return {};
    } else if (token) {
        return { Authorization: 'Bearer ' + token };
    }
}

export const formDataHeader = () => {
    return { headers: { 'Content-Type': 'multipart/form-data' } }
}

export const basicAuthHeader = () => {
    return { 
        headers: { 
            Authorization: 'Basic ' + window.btoa('usuario:contrasenia'),
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers': "append,delete,entries,foreach,get,has,keys,set,values,Authorization, X-Requested-With",
        } 
    }
}