// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr){
        return JSON.parse(userStr);
    }
    else {
        return null;
    }
}

// return the token from the session storage
export const getToken = () => {
    return sessionStorage.getItem('token') || null;
}

// return the token from the session storage
export const getPermisos = () => {
    return sessionStorage.getItem('permisos') || null;
}

// remove the token, user and permisos from the session storage
export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('permisos');
}

// set the token and user from the session storage
export const setUserSession = (token, user, permisos) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('permisos', JSON.stringify(permisos));
}
