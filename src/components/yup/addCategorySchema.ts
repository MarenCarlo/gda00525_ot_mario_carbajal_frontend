import * as Yup from "yup";

export const addCategorySchema = Yup.object().shape({
    nombre:
        Yup.string()
            .required("El nombre es obligatorio")
            .min(3, "El nombre debe tener al menos 3 caracteres")
            .max(128, "El nombre no puede tener más de 128 caracteres"),
    descripcion:
        Yup.string()
            .required("La descripción es obligatoria")
            .max(500, "La descripción no puede tener más de 500 caracteres"),
});