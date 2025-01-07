import { Divider, Grid2 } from "@mui/material"
import { useDeleteOrderDetailMutation, useDeleteOrderMutation, useGetOwnOrdersQuery } from "../../../../redux/services/ordersService";
import { useEffect, useState } from "react";
import { ConfirmModal, OrderCards } from "../../molecules";
import { toast } from "react-toastify";
import { toastOptions } from "../../../utils/toastOptions";
import { TextInput } from "../../atoms";

interface MyOrdersOrgProps {
    status: number;
}

export const MyOrdersOrg = ({ status }: MyOrdersOrgProps) => {
    const [deleteOrder, { isLoading: isDeleteOrderLoading }] = useDeleteOrderMutation();
    const [deleteOrderDetail, { isLoading: isDeleteOrderDetailLoading }] = useDeleteOrderDetailMutation();
    const { data: ordersDataSV, isLoading: isOrdersLoading } = useGetOwnOrdersQuery(undefined);

    /**
     * Estados
     */
    const [isLoadingApp, setIsLoadingApp] = useState(false);
    const [openDeleteDetail, setOpenDeleteDetail] = useState(false);
    const [openDeleteOrder, setOpenDeleteOrder] = useState(false);
    const [ordersData, setOrdersData] = useState([]);
    const [idDetalleOrdenSelected, setIdDetalleOrdenSelected] = useState<number>(0);
    const [idOrdenSelected, setIdOrdenSelected] = useState<number>(0);
    const [filterData, setFilterData] = useState({
        filterData: ''
    });

    /**
     * Logica de Filtro de Datos.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterData({ filterData: e.target.value });
    };
    const filteredProducts = ordersData?.filter((order: any) => {
        const searchTerm = filterData.filterData;
        if (!searchTerm) return true;
        return (
            order.idOrden === Number(searchTerm)
        );
    });

    /**
     * Handler Detalle de Orden
     */
    const handleDeleteDetailOrder = (idDetalleOrden: number) => {
        setIdDetalleOrdenSelected(idDetalleOrden);
        setOpenDeleteDetail(true);
    }
    const handleDeleteOrder = (idOrden: number) => {
        setIdOrdenSelected(idOrden);
        setOpenDeleteOrder(true);
    }

    /**
     * Closers de Modal
     */
    const handleCloseOrderDetailDelete = () => {
        setIdDetalleOrdenSelected(0);
        setOpenDeleteDetail(false);
    };
    const handleCloseOrderDelete = () => {
        setIdOrdenSelected(0);
        setOpenDeleteOrder(false);
    };

    /**
     * Set Data de SV a Base de Datos
     */
    useEffect(() => {
        if (ordersDataSV) {
            console.log(ordersDataSV.data.ordenesDetalladas)
            setOrdersData(ordersDataSV.data.ordenesDetalladas);
        }
    }, [ordersDataSV]);

    /**
     * Funcion de Eliminacion de Detalle de Orden
     */
    const clickActionDeleteOrderDetailButton = async (idProducto: number) => {
        setIsLoadingApp(true);
        const orderDetailIdToDelete = {
            idDetalleOrden: idProducto
        }
        try {
            const response = await deleteOrderDetail(orderDetailIdToDelete).unwrap();
            if (response.error === false) {
                toast.success(response.message, toastOptions);
                setIdDetalleOrdenSelected(0);
            }
        } catch (error: any) {
            toast.error(error.data.message, toastOptions);
            console.error("Error: ", error.data.message);
        } finally {
            setOpenDeleteDetail(false);
            setIsLoadingApp(false);
        }
    }

    /**
     * Funcion de Eliminacion de Orden
     */
    const clickActionDeleteOrderButton = async (idProducto: number) => {
        setIsLoadingApp(true);
        const orderToDelete = {
            idOrden: idProducto,
            status_Orden: 1,
            isActive: false
        }
        try {
            const response = await deleteOrder(orderToDelete).unwrap();
            if (response.error === false) {
                toast.success(response.message, toastOptions);
                setIdOrdenSelected(0);
            }
        } catch (error: any) {
            toast.error(error.data.message, toastOptions);
            console.error("Error: ", error.data.message);
        } finally {
            setOpenDeleteOrder(false);
            setIsLoadingApp(false);
        }
    }
    return (
        <>
            <Grid2 container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 6, md: 12 }}>
                <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                    <TextInput
                        id="filterData"
                        label="Buscar Orden (Numero de Orden)"
                        type="number"
                        numberType="int"
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
            <Grid2 container spacing={{ xs: 2, md: 2 }} columns={{ xs: 12, sm: 12, md: 12 }} sx={{ marginBottom: "25px", justifyContent: 'center' }}>
                {
                    ordersData && ordersData.length > 0 &&
                        filteredProducts?.length > 0 ? (
                        filteredProducts
                            .filter((order: any) => order.status_Orden === status)
                            .map((order: any, index: number) => (
                                <Grid2
                                    key={index}
                                    size={{ xs: 12, sm: 12, md: 9 }}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <OrderCards
                                        order={order}
                                        handleDeleteDetailOrder={handleDeleteDetailOrder}
                                        handleDeleteOrder={handleDeleteOrder}
                                    />
                                </Grid2>
                            ))
                    ) : (
                        <p>No se encontraron órdenes</p> // Mensaje si no hay resultados
                    )
                }
            </Grid2>
            <ConfirmModal
                open={openDeleteDetail}
                idObject={Number(idDetalleOrdenSelected)}
                handleClose={handleCloseOrderDetailDelete}
                clickActionButton={clickActionDeleteOrderDetailButton}
                isLoading={isOrdersLoading || isLoadingApp || isDeleteOrderLoading}
                questionText="¿Estás seguro que quieres eliminar este elemento?"
                buttonText="Eliminar"
            />
            <ConfirmModal
                open={openDeleteOrder}
                idObject={Number(idOrdenSelected)}
                handleClose={handleCloseOrderDelete}
                clickActionButton={clickActionDeleteOrderButton}
                isLoading={isOrdersLoading || isLoadingApp || isDeleteOrderLoading}
                questionText="¿Estás seguro que quieres eliminar la orden?"
                buttonText="Eliminar"
            />
        </>
    )
}