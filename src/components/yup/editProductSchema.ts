import * as Yup from "yup";

export const editProductSchema = Yup.object().shape({
    codigo:
        Yup.string()
            .required("El código es obligatorio")
            .matches(/^[0-9]+$/, "El código solo puede contener números")
            .max(24, "El código no puede tener más de 24 caracteres"),
    nombre:
        Yup.string()
            .required("El nombre es obligatorio")
            .min(3, "El nombre debe tener al menos 3 caracteres")
            .max(128, "El nombre no puede tener más de 128 caracteres"),
    descripcion:
        Yup.string()
            .required("La descripción es obligatoria")
            .max(500, "La descripción no puede tener más de 500 caracteres"),
    categoria_idCategoria:
        Yup.number()
            .required("La categoría es obligatoria")
            .integer("La categoría debe ser un número entero")
            .min(0, "Debe seleccionar una categoría válida"),
    marca_idMarca:
        Yup.number()
            .required("La marca es obligatoria")
            .integer("La marca debe ser un número entero")
            .min(0, "Debe seleccionar una marca válida"),
    isActive:
        Yup.boolean()
            .oneOf([true, false], "El valor debe ser verdadero o falso")
            .optional(),
});