import axios from "axios";
import { API_URL_BASE } from '../Constants';
import { formDataHeader } from "./auth-header";

const subirDocumentos = (formData) => {
    return axios.post(API_URL_BASE() + '/data/subir-documentos', formData, formDataHeader() )
};

const todas = (parametrosDeEntrada) => {
    return axios.post(API_URL_BASE() + '/data/listado', parametrosDeEntrada);
}


// eslint-disable-next-line 
export default {
    subirDocumentos,
    todas,
};
