export interface AddOrderDetailModalProps {
    open: boolean;
    productSelected: { idProducto: number, nombre: string };
    addOrderDetail: addOrderDetailData;
    handleClose: () => void;
    handleChangeOrderDetail: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading: boolean;
    addOrderDetailForm: () => void;
    errorsAddOrderDetail: Record<string, any>;
}

export interface addOrderDetailData {
    producto_idProducto: string;
    cantidad: string;
}