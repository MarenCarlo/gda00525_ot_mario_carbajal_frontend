export interface AddCategoryModalProps {
    open: any;
    addCategory: addCategoryData;
    handleClose: () => void;
    handleAddCategoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading: boolean;
    addCategoryForm: () => void;
    errorAddCategoryInputs: Record<string, any>;
}

export interface addCategoryData {
    nombre: string;
    descripcion: string;
}