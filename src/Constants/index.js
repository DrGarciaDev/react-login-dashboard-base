export const API_URL_BASE = () => {
    let api_url_base = 'http://localhost/api-laravel-jwt/public/api';

    if (window.location.origin === 'http://localhost:3000') {
        api_url_base = "http://localhost/api-laravel-jwt/public/api";
    }

    return api_url_base;
}

export const URL_API_IMAGENES = () => {
    let url_api_imagenes = 'http://localhost/api-laravel-jwt/public/archivos';

    if (window.location.origin === 'http://localhost:3000') {
        url_api_imagenes = "http://localhost/api-laravel-jwt/public/archivos";
    }

    return url_api_imagenes;
}