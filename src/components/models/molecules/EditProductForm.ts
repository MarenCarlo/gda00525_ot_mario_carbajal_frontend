export interface EditProductFormProps {
    productData: ProductData;
    productDataDB?: any;
    brandsData: Array<{ value: number; label: string }>;
    categoriesData: Array<{ value: number; label: string }>;
    isLoadingApp: boolean;
    errors: any;
    handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmitEditProduct: () => void;
    clickAddButton1?: () => void;
    clickAddButton2?: () => void;
    isButtonDisabled: boolean;
    isAddingProduct?: boolean
}

interface ProductData {
    codigo: string;
    nombre: string;
    descripcion: string;
    categoria_idCategoria: number | string;
    marca_idMarca: number | string;
    isActive?: boolean;
}