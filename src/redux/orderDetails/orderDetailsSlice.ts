import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Detalle {
    cantidad: number;
    producto_idProducto: number;
}
interface DetallesState {
    detalles: Detalle[];
}

const initialState: DetallesState = {
    detalles: [],
};

const orderDetailsSlice = createSlice({
    name: 'orderDetailsSlice',
    initialState,
    reducers: {
        agregarDetalle: (state, action: PayloadAction<Detalle>) => {
            state.detalles.push(action.payload);
        },
        actualizarDetalle: (
            state,
            action: PayloadAction<{ producto_idProducto: number; cantidad: number }>
        ) => {
            const { producto_idProducto, cantidad } = action.payload;
            const detalle = state.detalles.find(
                (item) => item.producto_idProducto === producto_idProducto
            );
            if (detalle) {
                detalle.cantidad = cantidad;
            }
        },
        eliminarDetalle: (state, action: PayloadAction<number>) => {
            const producto_idProducto = action.payload;
            state.detalles = state.detalles.filter(
                (item) => item.producto_idProducto !== producto_idProducto
            );
        },
        limpiarDetalles: (state) => {
            state.detalles = [];
        },
    },
});

export const {
    agregarDetalle,
    actualizarDetalle,
    eliminarDetalle,
    limpiarDetalles,
} = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;