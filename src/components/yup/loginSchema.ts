import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
    username: Yup.string()
        .required("El usuario/email es obligatorio"),
    passphrase: Yup.string()
        .required("La contraseña es obligatoria"),
});