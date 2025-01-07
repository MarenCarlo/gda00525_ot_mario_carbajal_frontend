import { useEffect, useState } from 'react';
import { useGetProductsPublicQuery } from '../../../../redux/services/productsService';
import { PublicProductCard } from '../../molecules/productsCards/PublicProductCard'
import { Divider, Grid2 } from '@mui/material'
import { TextInput } from '../../atoms';
import { ThreeDots } from 'react-loader-spinner';
import { PublicProductData } from '../../../models/molecules/PublicProductCard';
import { AddOrderDetailModal } from '../../molecules';
import { addOrderDetailData } from '../../../models/molecules/AddOrderDetailModal';
import { toast } from 'react-toastify';
import { toastOptions } from '../../../utils/toastOptions';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addOrderDetailSchema } from '../../../yup/addOrderDetailSchema';
import { useAppDispatch } from '../../../../redux/hooks';
import { agregarDetalle } from '../../../../redux/orderDetails/orderDetailsSlice';

export const StoreOrg = () => {
    const dispatch = useAppDispatch();

    /**
     * Redux Services
     */
    const { data: productsDataSV, isLoading: isProductsLoading } = useGetProductsPublicQuery(undefined);

    /**
     * Estados
     */
    const [isLoadingApp, setIsLoadingApp] = useState(false);
    const [open, setOpen] = useState(false);
    const [productsData, setProductsData] = useState([]);
    const [filterData, setFilterData] = useState({
        filterData: ''
    });
    const [productSelected, setProductSelected] = useState({
        idProducto: 0,
        nombre: ''
    });
    const [orderDetail, setOrderDetail] = useState<addOrderDetailData>({
        producto_idProducto: '',
        cantidad: '',
    });

    /**
     * Seteo de data de Productos
     */
    useEffect(() => {
        if (productsDataSV?.data) {
            setProductsData(productsDataSV.data);
        }
    }, [productsDataSV]);

    /**
     * Closer y Opener de Modal
     */
    const handleCloseAddOrderDetailModal = () => {
        setOpen(false);
        setOrderDetail({
            producto_idProducto: '',
            cantidad: ''
        })
    };
    const handleOpenAddOrderDetailModal = (idProducto: number, nombre: string) => {
        setOpen(true);
        setProductSelected({
            idProducto: idProducto,
            nombre: nombre
        });
    }

    /**
     * Data Filtrada por Buscador
     */
    const filteredProducts = productsData.filter((product: any) => {
        const searchTerm = filterData.filterData.toLowerCase();
        return (
            product.codigo.toLowerCase().includes(searchTerm) ||
            product.nombre.toLowerCase().includes(searchTerm) ||
            product.categoria.toLowerCase().includes(searchTerm) ||
            product.marca.toLowerCase().includes(searchTerm)
        );
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterData({ filterData: e.target.value });
    };

    /**
     * Handle Change De Data De Modal.
     */
    type ProductWithoutIsActive = Exclude<keyof typeof orderDetail, "producto_idProducto">;
    const handleChangeOrderDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name as ProductWithoutIsActive;
        setOrderDetail({ ...orderDetail, [e.target.name]: e.target.value });
        setValueAddOrderDetail(fieldName, e.target.value)
        triggerAddOrderDetail(fieldName)
    };

    /**
     * Parseo de Numeros de Inputs
     */
    const parseNumber = (value: string) => {
        const cleanedValue = value.replace(/,/g, '').trim();
        return Number(cleanedValue) || 0;
    };

    /**
         * React Hook Form de ADD INGRESO
         */
    const {
        handleSubmit: handleSubmitAddOrderDetail,
        formState: { errors: errorsAddOrderDetail },
        setValue: setValueAddOrderDetail,
        trigger: triggerAddOrderDetail
    } = useForm<{
        cantidad: string;
    }>({
        resolver: yupResolver(addOrderDetailSchema),
    });

    /**
     * Manejo de Submit form de ADD ORDER DETAIL
     */
    const addOrderDetailForm: SubmitHandler<{
        cantidad: string;
    }> = async (data) => {
        try {
            setIsLoadingApp(true);
            handleCloseAddOrderDetailModal();
            const newOrderDetailData = {
                producto_idProducto: productSelected.idProducto,
                cantidad: parseNumber(data.cantidad),
            };
            dispatch(
                agregarDetalle({
                    producto_idProducto: newOrderDetailData.producto_idProducto,
                    cantidad: newOrderDetailData.cantidad
                }));
            //const response = await addO(newStockData).unwrap();
            //
            setOrderDetail({
                producto_idProducto: '',
                cantidad: '',
            })
            toast.success(`Producto Agregado a la Orden`, toastOptions);
            setValueAddOrderDetail("cantidad", '');
        } catch (error: any) {
            toast.error(error.data.message, toastOptions);
            console.error("Error: ", error.data.message);
        } finally {
            setIsLoadingApp(false);
        }
    };
    return (
        <>
            <Grid2 container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 6, md: 12 }} sx={{ marginY: '20px' }}>
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
                    <Grid2 container spacing={{ xs: 2, md: 2 }} columns={{ xs: 12, sm: 12, md: 12 }} sx={{ marginBottom: "25px" }}>
                        {filteredProducts?.length > 0 ? (
                            filteredProducts.map((product: PublicProductData, index: number) => (
                                <Grid2
                                    key={index}
                                    size={{ xs: 12, sm: 12, md: 6 }}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginBottom: "15px",
                                    }}
                                >
                                    <PublicProductCard
                                        product={product}
                                        handleOpenAddOrderDetailModal={handleOpenAddOrderDetailModal}
                                    />
                                </Grid2>
                            ))
                        ) : (
                            <p>No se encontraron productos.</p>
                        )}
                    </Grid2>
                </>
            )}
            <AddOrderDetailModal
                open={open}
                productSelected={productSelected}
                addOrderDetail={orderDetail}
                handleClose={handleCloseAddOrderDetailModal}
                handleChangeOrderDetail={handleChangeOrderDetail}
                isLoading={isLoadingApp}
                addOrderDetailForm={handleSubmitAddOrderDetail(addOrderDetailForm)}
                errorsAddOrderDetail={errorsAddOrderDetail}
            />
        </>
    )
}