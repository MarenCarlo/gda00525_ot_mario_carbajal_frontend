import * as Yup from 'yup';

export const addOrderDetailSchema = Yup.object().shape({

    cantidad: Yup.string()
        .required('La cantidad es obligatoria.')
        .min(1, 'La cantidad debe ser al menos 1.'),
});
