export interface AddBrandModalProps {
    open: any;
    addBrand: addBrandData;
    handleClose: () => void;
    handleAddBrandChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading: boolean;
    addBrandForm: () => void;
    errorAddBrandInputs: Record<string, any>;
}

export interface addBrandData {
    nombre: string;
    descripcion: string;
}