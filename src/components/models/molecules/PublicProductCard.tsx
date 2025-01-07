export interface PublicProductCardProps {
    product: PublicProductData;
    handleOpenAddOrderDetailModal?: any;
}

export interface PublicProductData {
    idProducto: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    categoria: string;
    marca: string;
    imagen: string;
    precio: number;
}