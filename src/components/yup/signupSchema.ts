import * as Yup from 'yup';

export const signupSchema = Yup.object().shape({
    nombre_completo:
        Yup.string()
            .required('El nombre completo es obligatorio.'),
    username:
        Yup.string()
            .required('El usuario es obligatorio.')
            .min(4, 'El usuario debe tener al menos 4 caracteres.')
            .max(32, 'El usuario no puede tener más de 32 caracteres.')
            .matches(/^\S*$/, 'El usuario no debe contener espacios.'),
    email:
        Yup.string()
            .required('El email es obligatorio.')
            .email('El email no es válido.'),
    telefono:
        Yup.string()
            .required('El teléfono es obligatorio.')
            .matches(/^\d{8}$/, 'El teléfono debe tener 8 dígitos.'),
    direccion:
        Yup.string()
            .required('La dirección es obligatoria.'),
    fecha_nacimiento:
        Yup.date()
            .required('La fecha de nacimiento es obligatoria.')
            .test('not-future', 'La fecha de nacimiento no puede ser en el futuro.', value => {
                if (!value) return false;
                const today = new Date();
                const birthDate = new Date(value);
                return birthDate <= today;
            })
            .test('age', 'Debes ser mayor de 18 años', value => {
                if (!value) return false;
                const today = new Date();
                const birthDate = new Date(value);
                const age = today.getFullYear() - birthDate.getFullYear();
                const month = today.getMonth() - birthDate.getMonth();
                if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
                    return age > 18;
                }
                return age >= 18;
            }),
    passphrase:
        Yup.string()
            .required('La contraseña es obligatoria.')
            .min(8, 'La contraseña debe tener al menos 8 caracteres.'),
    repeat_passphrase:
        Yup.string()
            .required('Repetir la contraseña es obligatorio.')
            .oneOf([Yup.ref('passphrase')], 'Las contraseñas no coinciden.')
});