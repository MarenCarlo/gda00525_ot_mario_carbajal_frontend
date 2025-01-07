import { Grid2 } from "@mui/material"
import { useAcceptOrderMutation, useDeleteOrderDetailMutation, useGetOrdersQuery } from "../../../../redux/services/ordersService";
import { useEffect, useState } from "react";
import { ConfirmModal, OrderCards } from "../../molecules";
import { toast } from "react-toastify";
import { toastOptions } from "../../../utils/toastOptions";
import { useAppSelector } from "../../../../redux/hooks";
import { RootState } from "../../../../redux/store";

export const OrderPendienteOrg = () => {
    const userData = useAppSelector((state: RootState) => state.userPersistentReducer.userData);

    const state = 1;
    const [acceptOrder, { isLoading: isAcceptOrderLoading }] = useAcceptOrderMutation();
    const [deleteOrderDetail, { isLoading: isDeleteOrderDetailLoading }] = useDeleteOrderDetailMutation();
    const { data: ordersDataSV, isLoading: isOrdersLoading } = useGetOrdersQuery(state.toString());

    /**
     * Estados
     */
    const [isLoadingApp, setIsLoadingApp] = useState(false);
    const [openAccept, setOpenAccept] = useState(false);
    const [openDeleteOrder, setOpenDeleteOrder] = useState(false);
    const [ordersData, setOrdersData] = useState([]);
    const [idDetalleOrdenSelected, setAcceptIdOrderSelected] = useState<number>(0);
    const [idOrdenSelected, setIdOrdenSelected] = useState<number>(0);

    /**
     * Handler Detalle de Orden
     */
    const handleAcceptOrder = (idOrden: number) => {
        setAcceptIdOrderSelected(idOrden);
        setOpenAccept(true);
    }
    const handleDeleteOrder = (idOrden: number) => {
        setIdOrdenSelected(idOrden);
        setOpenDeleteOrder(true);
    }

    /**
     * Closers de Modal
     */
    const handleCloseOrderDetailDelete = () => {
        setAcceptIdOrderSelected(0);
        setOpenAccept(false);
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
     * Funcion de Aceptar Orden
     */
    const clickActionAcceptOrderButton = async (idOrden: number) => {
        setIsLoadingApp(true);
        const orderDetailIdToDelete = {
            idOrden: idOrden,
            status_Orden: 2
        }
        try {
            const response = await acceptOrder(orderDetailIdToDelete).unwrap();
            if (response.error === false) {
                toast.success(response.message, toastOptions);
                setAcceptIdOrderSelected(0);
            }
        } catch (error: any) {
            toast.error(error.data.message, toastOptions);
            console.error("Error: ", error.data.message);
        } finally {
            setOpenAccept(false);
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
            isActive: false,
            usuarioVendedor_idUsuario: userData.idUsuario
        }
        try {
            const response = await acceptOrder(orderToDelete).unwrap();
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
            <Grid2 container spacing={{ xs: 2, md: 2 }} columns={{ xs: 12, sm: 12, md: 12 }} sx={{ marginBottom: "25px", justifyContent: 'center' }}>
                {
                    ordersData && ordersData.length > 0 &&
                    ordersData.map((product: any, index: number) => (
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
                                product={product}
                                handleDeleteDetailOrder={handleAcceptOrder}
                                handleDeleteOrder={handleDeleteOrder}
                                isSeller={true}
                            />
                        </Grid2>
                    ))
                }
            </Grid2>
            <ConfirmModal
                open={openAccept}
                idObject={Number(idDetalleOrdenSelected)}
                handleClose={handleCloseOrderDetailDelete}
                clickActionButton={clickActionAcceptOrderButton}
                isLoading={isOrdersLoading || isLoadingApp || isAcceptOrderLoading}
                questionText="¿Estás seguro que quieres aceptar esta Orden?"
                buttonText="Aceptar"
            />
        </>
    )
}