import axios from "axios";
import jwt_decode from "jwt-decode";

import { setUserSession, removeUserSession } from '../Services/sesion-storage.service';
import { API_URL_BASE } from '../Constants';
import { authHeader } from "./auth-header";


const register = (email, password) => {
    return axios.post(API_URL_BASE() + "/auth/register", {
        email,
        password,
    });
};

const login = async (email, password) => {
    await axios
            .post(API_URL_BASE() + '/auth/login', {
                email,
                password,
            })
            .then((response) => {
                if (response.data.token) {
                    console.log('Login correcto');
                    let decoded = jwt_decode(response.data.token);
                    setUserSession(response.data.token, response.data.user, decoded.roles);
                }
            });
};

const refreshSession = async () => {
    const headers = authHeader();
    
    await axios
        .get(API_URL_BASE() + '/auth/refresh', { headers: headers })
        .then(responseRefresh => {
            var decoded = jwt_decode(responseRefresh.data.token);
            setUserSession(responseRefresh.data.token, responseRefresh.data.user, decoded.roles);
            // setAuthLoading(false)
        }).catch(ErrorRefresh => {
            // console.log(ErrorRefresh)

            // removeUserSession()

            // setAuthLoading(false)
            if ( ErrorRefresh.response ) {

                logout();

                if (ErrorRefresh.response.status === 401) {
                    // console.log([ErrorRefresh.response.data.error])
                }
                else if (ErrorRefresh.response.status === 422) {
                    let errores = [];
                    // console.log(error.response.data.error)
                    for (const prop in ErrorRefresh.response.data.error) {
                        if (ErrorRefresh.response.data.error.hasOwnProperty(prop)) {
                            // console.log(`${ErrorRefresh.response.data.error[prop]}`)
                            errores.push(ErrorRefresh.response.data.error[prop]);
                        }
                    }
                    console.log(errores)
                }
                else if (ErrorRefresh.response.status === 500) {
                    console.log('(desde app.js)Error 500 -> ' + ErrorRefresh.response.data.error);
                    console.log(['Error con el servidor, revisa tu conexión...']);
                }
                else {
                    console.log(["Something went wrong. Please try again later."]);
                }
            }
            else {
                console.log('NO HAY CONEXIÓN CON EL BACKEND');
            }
        });
};

const logout = async () => {
    const headers = authHeader();
    removeUserSession();
    await axios
        .get(API_URL_BASE() + '/auth/logout', { headers: headers })
        .then(() => {
            removeUserSession()
            console.log('token deshabilitado en backend')
        })
        .catch(() => {
            console.log('No se pudo desloguear en el backend');
            // console.log(logoutError)
        });
};

const getCurrentUser = () => {
    return JSON.parse(sessionStorage.getItem("user"));
};

const hasRole = (user, roles_permitidos) => {
    let tiene_permiso = false;
    
    if (user) {
        user.roles_usuario.map((rol) => {
            if (roles_permitidos.includes(rol.rol)) {
                tiene_permiso = true;
            }
            return tiene_permiso;
        });
    }

    return tiene_permiso;
}

// eslint-disable-next-line 
export default {
    register,
    login,
    refreshSession,
    logout,
    getCurrentUser,
    hasRole
};
