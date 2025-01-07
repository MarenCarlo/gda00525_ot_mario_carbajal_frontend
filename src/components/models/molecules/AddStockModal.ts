export interface AddStockModalProps {
    open: boolean;
    productSelected: { idProducto: number; nombre: string };
    addStock: addStockData;
    handleClose: () => void;
    handleAddStockChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading: boolean;
    addStockForm: () => void;
    errorsAddStock: Record<string, any>;
}

export interface addStockData {
    cantidad: string;
    precio_compra: string;
    precio_venta: string;
}