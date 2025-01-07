import React, { useState } from 'react'
import { AddStockModal, InternalProductCard } from '../../molecules'
import { useAddStockProductMutation, useGetProductsInternalQuery } from '../../../../redux/services/productsService';
import { ProductInternalProps } from '../../../models/molecules/ProductsCards';
import { ThreeDots } from 'react-loader-spinner';
import { Divider, Grid2 } from '@mui/material';
import { TextInput } from '../../atoms';
import { SubmitHandler, useForm } from 'react-hook-form';
import { addStockSchema } from '../../../yup/ingresoSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { toastOptions } from '../../../utils/toastOptions';
import { addStockData } from '../../../models/molecules/AddStockModal';

export const HomeOrg = () => {
    const { data: productsDataSV, isLoading: isProductsLoading } = useGetProductsInternalQuery(undefined);
    const [addStockProduct, { isLoading: isAddUserLoading }] = useAddStockProductMutation(undefined);


    const [isLoadingApp, setIsLoadingApp] = useState(false);
    const [filterData, setFilterData] = useState({
        filterData: ''
    });
    const [open, setOpen] = useState(false);
    const [productSelected, setProductSelected] = useState({
        idProducto: 0,
        nombre: ""
    });
    const [addStock, setAddStock] = useState<addStockData>({
        cantidad: '',
        precio_compra: '',
        precio_venta: ''
    });

    const handleClose = () => {
        setOpen(false);
        setAddStock({
            cantidad: '',
            precio_compra: '',
            precio_venta: ''
        })
    };

    /**
     * React Hook Form de ADD INGRESO
     */
    const {
        handleSubmit: handleSubmitAddStock,
        formState: { errors: errorsAddStock },
        setValue: setValueAddStock,
        trigger: triggerAddStock
    } = useForm<{
        cantidad: string;
        precio_compra: string;
        precio_venta: string;
    }>({
        resolver: yupResolver(addStockSchema),
    });

    const filteredProducts = productsDataSV?.data?.filter((product: ProductInternalProps) => {
        const searchTerm = filterData.filterData.toLowerCase();
        return (
            product.codigo.toLowerCase().includes(searchTerm) ||
            product.nombre.toLowerCase().includes(searchTerm) ||
            product.categoria.toLowerCase().includes(searchTerm) ||
            product.marca.toLowerCase().includes(searchTerm)
        );
    });

    const openAddStock = (idProducto: number, nombre: string) => {
        setOpen(true);
        setProductSelected({
            idProducto,
            nombre
        });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterData({ filterData: e.target.value });
    };
    const handleAddStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name as keyof typeof addStock;
        setAddStock({ ...addStock, [e.target.name]: e.target.value });
        setValueAddStock(fieldName, e.target.value)
        triggerAddStock(fieldName)
    };

    const parseNumber = (value: string) => {
        const cleanedValue = value.replace(/,/g, '').trim();
        return Number(cleanedValue) || 0;
    };

    /**
     * Manejo de Submit form de ADD STOCK
     */
    const addStockForm: SubmitHandler<{
        cantidad: string;
        precio_compra: string;
        precio_venta: string;
    }> = async (data) => {
        try {
            setIsLoadingApp(true);
            handleClose();
            const newStockData = {
                cantidad: parseNumber(data.cantidad),
                precio_compra: parseNumber(data.precio_compra),
                precio_venta: parseNumber(data.precio_venta),
                producto_idProducto: productSelected.idProducto,
            };
            const response = await addStockProduct(newStockData).unwrap();
            if (response.error === false) {
                toast.success(response.message, toastOptions);
                setAddStock({
                    cantidad: '',
                    precio_compra: '',
                    precio_venta: ''
                })
                setValueAddStock("cantidad", '');
                setValueAddStock("precio_compra", '');
                setValueAddStock("precio_venta", '');
            }
        } catch (error: any) {
            toast.error(error.data.message, toastOptions);
            console.error("Error: ", error.data.message);
        } finally {
            setIsLoadingApp(false);
        }
    };

    return (
        <>
            <Grid2 container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 6, md: 12 }}>
                <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                    <TextInput
                        id="filterData"
                        label="Buscar Producto (SKU/Nombre/Categoria/Marca)"
                        type="text"
                        name="filterData"
                        value={filterData.filterData}
                        onChange={handleChange}
                        sx={{ width: '100%', marginY: '25px', border: 'solid 0.5px #222', borderRadius: '30px' }}
                    />
                </Grid2>
            </Grid2>
            <Grid2 size={{ xs: 12 }} sx={{ marginBottom: '30px' }}>
                <Divider sx={{ bgcolor: '#444444' }} />
            </Grid2>
            {isProductsLoading ? (
                <ThreeDots
                    visible={true}
                    height="25"
                    width="25"
                    color="#FFFFFF"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass="flex justify-center"
                />
            ) : (
                <>
                    {filteredProducts?.length > 0 ? (
                        filteredProducts.map((product: ProductInternalProps, index: number) => (
                            <div key={product.idProducto || index}>
                                <InternalProductCard
                                    product={product}
                                    openAddStock={openAddStock}
                                    isLoading={isLoadingApp || isAddUserLoading}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No se encontraron productos.</p>
                    )}
                </>
            )}
            <AddStockModal
                open={open}
                productSelected={productSelected}
                addStock={addStock}
                handleClose={handleClose}
                handleAddStockChange={handleAddStockChange}
                isLoading={isLoadingApp || isAddUserLoading}
                addStockForm={handleSubmitAddStock(addStockForm)}
                errorsAddStock={errorsAddStock}
            />
        </>
    )
}