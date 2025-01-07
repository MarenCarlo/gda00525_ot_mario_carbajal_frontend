import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Squash as Hamburger } from 'hamburger-react'
import { NavBarProps } from '../../../models/molecules/NavBar';
import { Avatar, Badge, Container, Divider, Drawer, Grid2, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link, useNavigate } from 'react-router';
import { clearUserData } from '../../../../redux/user/usersSlice';
import { RootState, store } from '../../../../redux/store';
import Cookies from 'js-cookie';
import { toastOptions } from '../../../utils/toastOptions';
import { toast } from 'react-toastify';
import { ProtectedComponent } from '../../../middlewares/ProtectedComponent';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { persistStore } from 'redux-persist';
import { useEffect, useState } from 'react';
import { useLazyGetProductsPublicQuery } from '../../../../redux/services/productsService';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { eliminarDetalle, limpiarDetalles } from '../../../../redux/orderDetails/orderDetailsSlice';
import { AppButton } from '../../atoms';
import { useAddOrderMutation } from '../../../../redux/services/ordersService';
import { formatCurrencyValue } from '../../../utils/formatCurrencyValue';

const persistor = persistStore(store);
const serverURL = import.meta.env.VITE_BACKEND_URL_STATIC_FILES;

export const NavBar = () => {
    /**
     * Redux
     */
    const dispatch = useAppDispatch();
    const [fetchProduct] = useLazyGetProductsPublicQuery();
    const [addOrder, { isLoading: isLoadingAddOrder }] = useAddOrderMutation(undefined);

    /**
     * States
     */
    const userData = useAppSelector((state: RootState) => state.userPersistentReducer.userData);
    const orderDetailsData = useAppSelector((state: RootState) => state.orderDetailsPersistentReducer);
    const [isEraseAllInfo, setIsEraseAllInfo] = useState<boolean>(false);
    const [isLoadingApp, setIsLoadingApp] = useState<boolean>(false);
    const [sideBar, setSideBar] = useState<boolean>(false);
    const [cartBar, setCartBar] = useState<boolean>(false);
    const [productoIds, setProductoIds] = useState<string[]>([]);
    const [productosCartData, setProductosCartData] = useState<any[]>([]);
    const [totalOrdenActual, setTotalOrdenActual] = useState();

    /**
     * EXTRACCION DE IDS DE DETALLES EN EL OBJETO DE REDUX PERSIST
     */
    useEffect(() => {
        if (orderDetailsData?.detalles?.length > 0) {
            const uniqueIds = [
                ...new Set(orderDetailsData.detalles.map((detalle: any) => detalle.producto_idProducto.toString())),
            ];
            setProductoIds(uniqueIds);
        }
    }, [orderDetailsData]);

    /**
     * CONSTRUCCION DEL OBJETO DE PEDIDOS EN LA ÓRDEN Y OBTENCION DE DATA DE LOS PRODUCTOS
     * DEL ARRAY DE LOS IDS DE DETALLES
     */
    useEffect(() => {
        const fetchProductos = async () => {
            if (productoIds.length === 0) return;
            if (isEraseAllInfo !== true) {
                try {
                    setIsLoadingApp(true);
                    const productos = await Promise.all(
                        productoIds.map(async (id) => {
                            const { data } = await fetchProduct(id).unwrap();
                            return data;
                        })
                    );
                    const productoCantidadMap = orderDetailsData.detalles.reduce((acc: any, detalle: any) => {
                        const productoId = detalle.producto_idProducto.toString();
                        acc[productoId] = (acc[productoId] || 0) + detalle.cantidad;
                        return acc;
                    }, {});
                    const productosConCantidad = productos.map((productoArray: any[]) => {
                        const producto = productoArray[0];
                        const id = producto.idProducto?.toString();
                        return {
                            ...producto,
                            cantidad: productoCantidadMap[id] || 0,
                        };
                    });
                    setIsLoadingApp(false);
                    setProductosCartData(productosConCantidad);
                } catch (err) {
                    console.error("Error al obtener productos:", err);
                }
            }
        };
        fetchProductos();
    }, [productoIds, fetchProduct, orderDetailsData]);

    /**
     * OBTENER TOTAL DE LA ORDEN
     */
    useEffect(() => {
        if (productosCartData.length > 0) {
            const total = productosCartData.reduce((acc, producto) => {
                return acc + (producto.cantidad * producto.precio);
            }, 0);
            setTotalOrdenActual(total);
        }
    }, [productosCartData]);

    /**
     * FILTRADO DE RUTAS DISPONIBLES SEGUN ROL
     */
    const availableMenuItems = [
        { label: 'Inicio', link: '/Home', role: [1] },
        { label: 'Registrar Usuario', link: '/Signup', role: [1] },
        { label: 'Agregar Producto', link: '/AgregarProducto', role: [1] },
        { label: 'Ordenes Pendientes', link: '/Home', role: [2] },
        { label: 'Tienda', link: '/Home', role: [3] },
        { label: 'Ordenes En Proceso', link: '/Orders', role: [3] },
        { label: 'Ordenes Pasadas', link: '/Historial', role: [3] },
    ];
    const filterMenuItemsByRole = (userRole: number, menuItems: { label: string; link: string; role: number[] }[]) => {
        return menuItems.filter(item => item.role?.includes(userRole));
    };
    const accessibleMenuItems = filterMenuItemsByRole(userData?.rol.idRol, availableMenuItems);

    /**
     * LOGOUT FUNCION
     */
    const history = useNavigate();
    const handleLogOut = async () => {
        toast.success('Sesión Finalizada', toastOptions);
        await Cookies.remove('auth-token');
        await store.dispatch(clearUserData());
        await persistor.purge();
        history("/", { replace: true });
    }

    // Para Abrir la barra de Carrito
    const clickOnCartButton = () => {
        setCartBar(true);
    }

    //Para cerrar el menu en los elementos clickeables
    const clickOnLink = () => {
        setSideBar(false);
        setCartBar(false);
    }

    // Función para manejar el click en eliminar
    const handleEliminar = (producto_idProducto: number) => {
        setProductosCartData(prevCartData => {
            const updatedCartData = prevCartData.filter((producto) => producto.idProducto !== producto_idProducto);
            return updatedCartData;
        });
        setProductoIds(prevProductoIds => {
            const updatedProductoIds = prevProductoIds.filter((productoId) => productoId !== producto_idProducto.toString());
            return updatedProductoIds;
        });
        dispatch(eliminarDetalle(producto_idProducto));
    };


    /**
     * Función que envia la data al Backend
     */
    const handleCreateAddOrder = async () => {
        setIsLoadingApp(true);
        setIsEraseAllInfo(true);
        const orderDataWithDetails = {
            usuarioCliente_idUsuario: userData.idUsuario,
            detalles: orderDetailsData.detalles
        }
        try {
            const response = await addOrder(orderDataWithDetails).unwrap();
            console.log('response', response)
            if (response.error === false) {
                await productosCartData.forEach((producto) => {
                    handleEliminar(producto.idProducto);
                });
                clickOnLink();
                toast.success(`${response.message}: ${formatCurrencyValue(response.data.totalOrden)}`, toastOptions);
                console.log('despues: ', productosCartData);
            }
        } catch (error: any) {
            toast.error(error.data.message, toastOptions);
            console.error("Error: ", error.data.message);
        } finally {
            setIsLoadingApp(false);
            setIsEraseAllInfo(false);
        }
    }

    return (
        <>
            {/**
             * NAVBAR MENU
             */}
            <Box sx={{ display: 'flex' }}>
                <AppBar position="fixed" component="nav" sx={{ bgcolor: '#000000' }}>
                    <Container maxWidth="md">
                        <Toolbar sx={{ borderBottom: 'solid 0.1px #444444' }}>
                            <Box color='#FFFFFF' sx={{ flexGrow: 1, fontWeight: '500', display: { xs: 'block', sm: 'block' } }}>
                                <ProtectedComponent isShowed={userData?.rol.idRol === 3}>
                                    <IconButton aria-label="shoping-cart" size="large" color="primary" onClick={clickOnCartButton}>
                                        <Badge
                                            badgeContent={productosCartData.length}
                                            color="info"
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                        >
                                            <ShoppingCartOutlinedIcon fontSize="inherit" sx={{ fill: '#FFFFFF' }} />
                                        </Badge>
                                    </IconButton>
                                </ProtectedComponent>
                                <ProtectedComponent isShowed={userData?.rol.idRol !== 3}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            color: '#FFFFFF',
                                        }}
                                    >
                                        {userData?.empresa.nombre_comercial}
                                    </Typography>
                                </ProtectedComponent>
                            </Box>
                            <Box sx={{ display: { xs: 'block', sm: 'block' } }}>
                                <ProtectedComponent isShowed={userData?.rol.idRol === 3}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            color: '#FFFFFF',
                                        }}
                                    >
                                        Mi Tiendita Online
                                    </Typography>
                                </ProtectedComponent>

                            </Box>
                            <Box sx={{ display: { xs: 'block', sm: 'block' } }}>
                                <Hamburger color='#FFFFFF' toggled={sideBar} hideOutline={false} onToggle={toggled => {
                                    if (toggled) {
                                        setSideBar(true)
                                    } else {
                                        setSideBar(false)
                                    }
                                }} />
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>

            {/**
             * SIDEBAR MENU
             */}
            <Drawer
                anchor="left"
                open={sideBar}
                onClose={() => setSideBar(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 300,
                        bgcolor: '#000000',
                    },
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'left',
                    }}>
                    <Box sx={{
                        background: 'linear-gradient(to right, #FFFFFF, #FFFFFF)',
                        paddingY: '40px',
                        display: 'inline-block',
                        borderRadius: '0px',
                    }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: '#000000',
                            }}
                        >
                            {userData?.username}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: '#888',
                            }}
                        >
                            {userData?.rol.idRol === 3 ? userData?.empresa.nombre_comercial : userData?.rol.nombre}
                        </Typography>
                    </Box>

                    <Divider sx={{ bgcolor: '#FFFFFF' }} />
                    {
                        accessibleMenuItems.map((item, index) => (
                            <Link key={index} to={item.link} onClick={() => { clickOnLink() }} style={{ textDecoration: 'none' }}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: '#FFFFFF',
                                        paddingY: '10px',
                                        paddingLeft: '20px',
                                        transition: 'all 0.2s',
                                        textDecoration: 'none',
                                        '&:hover': {
                                            color: '#000000',
                                            bgcolor: '#FFFFFF',
                                            cursor: 'pointer',
                                            borderLeft: 'solid 7px #2094EF',
                                            transition: 'all 0.2s',
                                        },
                                    }}>
                                    {item.label}
                                </Typography>
                            </Link>
                        ))
                    }
                    <Divider sx={{ bgcolor: '#FFFFFF' }} />
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#FFFFFF',
                            paddingY: '10px',
                            paddingLeft: '20px',
                            transition: 'all 0.2s',
                            '&:hover': {
                                color: '#000000',
                                bgcolor: '#FFFFFF',
                                cursor: 'pointer',
                                borderLeft: 'solid 7px #E74032',
                                transition: 'all 0.2s',
                            },
                        }}
                        onClick={() => { handleLogOut() }}>
                        Cerrar Sesión
                    </Typography>
                </Box>
            </Drawer>

            {/**
             * CART BAR MENU
             */}
            <Drawer
                anchor="right"
                open={cartBar}
                onClose={() => setCartBar(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: { xs: 300, sm: 400, md: 500 },
                        bgcolor: '#000000',
                    },
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'left',
                    }}>
                    <Box sx={{
                        background: 'linear-gradient(to right, #FFFFFF, #FFFFFF)',
                        paddingY: '20px',
                        display: 'inline-block',
                        borderRadius: '0px',
                    }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: '#000000',
                            }}
                        >
                            Orden Actual
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: '#888',
                            }}
                        >
                            {userData?.empresa.nombre_comercial}
                        </Typography>
                    </Box>

                    <Divider sx={{ bgcolor: '#FFFFFF' }} />
                    <List sx={{
                        width: '100%',
                        overflowY: 'auto',
                        "::-webkit-scrollbar": {
                            width: "5px", // Ancho de la barra
                        },
                        "::-webkit-scrollbar-button": {
                            background: "#000 !important", // Fondo del track
                        },
                        "::-webkit-scrollbar-thumb": {
                            background: "#222 !important", // Color del thumb
                            borderRadius: "30px", // Redondeo
                        },
                        "::-webkit-scrollbar-thumb:hover": {
                            background: "#000 !important", // Color al pasar el mouse
                        },
                        height: '80vh',
                    }}>
                        {
                            productosCartData && productosCartData.length > 0 ?
                                productosCartData.map((item, index) => (
                                    <ListItem key={index} sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderTop: 'solid 0.5px #121212',
                                        paddingY: '10px',
                                        '&:hover': {
                                            bgcolor: '#121212',
                                            transition: 'all 0.2s',
                                        },
                                        '&:last-child': {
                                            marginBottom: { xs: '75px', md: '0px' },
                                        }
                                    }}>
                                        <ListItemAvatar>
                                            <Avatar
                                                src={`${serverURL}${item.imagen}`}
                                                onError={() => {
                                                    `${serverURL}/images/products/default.jpg`;
                                                }}
                                            />
                                        </ListItemAvatar>
                                        <Box sx={{ flexGrow: 3 }}>
                                            <ListItemText
                                                sx={{ color: '#FFFFFF' }}
                                                primary={`SKU: ${item.codigo} - ${item.nombre}`}
                                            />
                                            <Grid2 container columns={{ xs: 12, sm: 12, md: 12 }}>
                                                <Grid2 size={{ xs: 6, sm: 4, md: 4 }}>
                                                    <ListItemText
                                                        sx={{ color: '#AAAAAA' }}
                                                        primary={"Cantidad"}
                                                        secondary={
                                                            <>
                                                                <Typography
                                                                    component="span"
                                                                    variant="body2"
                                                                    sx={{ color: '#FFF', }}
                                                                >
                                                                    {item.cantidad}
                                                                </Typography>
                                                            </>
                                                        }
                                                    />
                                                </Grid2>
                                                <Grid2 size={{ xs: 6, sm: 4, md: 4 }}>
                                                    <ListItemText
                                                        sx={{ color: '#AAAAAA' }}
                                                        primary={"Precio"}
                                                        secondary={
                                                            <>
                                                                <Typography
                                                                    component="span"
                                                                    variant="body2"
                                                                    sx={{ color: '#FFF' }}
                                                                >
                                                                    {formatCurrencyValue(item.precio)}
                                                                </Typography>
                                                            </>
                                                        }
                                                    />
                                                </Grid2>
                                                <Grid2 size={{ xs: 6, sm: 4, md: 4 }}>
                                                    <ListItemText
                                                        sx={{ color: '#AAAAAA' }}
                                                        primary={"Subtotal"}
                                                        secondary={
                                                            <>
                                                                <Typography
                                                                    component="span"
                                                                    variant="body2"
                                                                    sx={{ color: '#FFF' }}
                                                                >
                                                                    {formatCurrencyValue(item.precio * item.cantidad)}
                                                                </Typography>
                                                            </>
                                                        }
                                                    />
                                                </Grid2>
                                            </Grid2>
                                        </Box>
                                        <ListItemButton
                                            sx={{ display: 'flex', justifyContent: 'flex-end' }}
                                            onClick={() => handleEliminar(item.idProducto)}
                                        >
                                            <DeleteOutlineOutlinedIcon
                                                sx={{ fill: '#E84133', fontSize: 30 }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                ))
                                :
                                <>
                                    <ListItemText
                                        sx={{ color: '#FFFFFF', textAlign: 'center' }}
                                        primary={'Sin Productos Por Ordenar'}
                                    />
                                </>
                        }
                    </List>
                    <Divider sx={{ bgcolor: '#FFFFFF' }} />
                    {
                        productosCartData && productosCartData.length > 0 &&
                        <>
                            <Box sx={{ position: 'absolute', bottom: 0, width: 'calc(100%)', bgcolor: '#000000' }}>
                                <Divider sx={{ bgcolor: '#FFFFFF', marginY: '10px', marginX: '20px' }} />
                                <Grid2 container columns={{ xs: 12, sm: 12, md: 12 }} sx={{ marginTop: '20px' }}>
                                    <Grid2 size={{ xs: 12, sm: 12, md: 12 }} sx={{ textAlign: 'center' }}>
                                        <ListItemText
                                            sx={{ color: '#AAAAAA' }}
                                            primary={"Total De Orden"}
                                            secondary={
                                                <>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        sx={{ color: '#FFF' }}
                                                    >
                                                        {formatCurrencyValue(totalOrdenActual!)}
                                                    </Typography>
                                                </>
                                            }
                                        />
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, sm: 12, md: 12 }} sx={{ textAlign: 'center' }}>
                                        <AppButton
                                            variant="contained"
                                            color="primary"
                                            sx={{ width: '80%' }}
                                            isLoading={isLoadingAddOrder || isLoadingApp}
                                            clickButtonAction={() => handleCreateAddOrder()}
                                        >
                                            Crear Orden
                                        </AppButton>
                                    </Grid2>
                                </Grid2>

                            </Box>
                        </>
                    }
                </Box>
            </Drawer>
        </>
    )
}
