import * as Yup from "yup";

export const enterpriseSchema = Yup.object().shape({
    nit:
        Yup.string()
            .required("El Nit es obligatorio"),
    telefono:
        Yup.string()
            .min(8, "El teléfono debe tener 8 numeros")
            .required("El teléfono es obligatorio"),
    email:
        Yup.string()
            .required("El Email es obligatorio"),
    razon_social:
        Yup.string()
            .required("La Razón Social es obligatoria"),
    nombre_comercial:
        Yup.string()
            .required("El Nombre Comercial es obligatorio")
});