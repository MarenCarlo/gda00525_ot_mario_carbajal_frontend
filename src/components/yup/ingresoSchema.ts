import * as Yup from 'yup';

export const addStockSchema = Yup.object().shape({
    cantidad: Yup.string()
        .required('La cantidad es obligatoria.')
        .min(1, 'La cantidad debe ser al menos 1.'),

    precio_compra: Yup.string()
        .required('El precio de compra es obligatorio.')
        .min(0, 'La cantidad no puede ser negativa.'),

    precio_venta: Yup.string()
        .required('El precio de venta es obligatorio.')
        .min(0, 'La cantidad no puede ser negativa.')
});
