import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Squash as Hamburger } from 'hamburger-react'
import { NavBarProps } from '../../../models/molecules/NavBar';
import { Badge, Container, Divider, Drawer, IconButton, Typography } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link, useNavigate } from 'react-router';
import { clearUserData } from '../../../../redux/user/usersSlice';
import { RootState, store } from '../../../../redux/store';
import Cookies from 'js-cookie';
import { toastOptions } from '../../../utils/toastOptions';
import { toast } from 'react-toastify';
import { ProtectedComponent } from '../../../middlewares/ProtectedComponent';
import { useAppSelector } from '../../../../redux/hooks';
import { persistStore } from 'redux-persist';

const persistor = persistStore(store);

export const NavBar = ({ setSideBar, sideBar }: NavBarProps) => {
    const userData = useAppSelector((state: RootState) => state.userPersistentReducer.userData);

    /**
     * FILTRADO DE RUTAS DISPONIBLES SEGUN ROL
     */
    const availableMenuItems = [
        { label: 'Inicio', link: '/Home', role: [1, 2, 3] },
        { label: 'Registrar Usuario', link: '/Signup', role: [1] },
        { label: 'Acerca de', link: '/about', role: [1, 2, 3] },
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

    //Para cerrar el menu en los elementos clickeables
    const clickOnLink = () => {
        setSideBar(false);
    }
    return (
        <>
            {/**
             * NAVBAR MENU
             */}
            <Box sx={{ display: 'flex' }}>
                <AppBar position="fixed" component="nav" sx={{ bgcolor: '#000000' }}>
                    <Container maxWidth="md">
                        <Toolbar sx={{ borderBottom: 'solid 0.1px #FFFFFF' }}>
                            <Box color='#FFFFFF' sx={{ flexGrow: 1, fontWeight: '500', display: { xs: 'block', sm: 'block' } }}>
                                <ProtectedComponent isShowed={userData?.rol.idRol === 3}>
                                    <IconButton aria-label="shoping-cart" size="large" color="primary">
                                        <Link to={'/Home'} style={{ textDecoration: 'none' }}>
                                            <Badge
                                                badgeContent={4}
                                                color="info"
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right'
                                                }}
                                            >
                                                <ShoppingCartOutlinedIcon fontSize="inherit" sx={{ fill: '#FFFFFF' }} />
                                            </Badge>
                                        </Link>
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
                        background: 'linear-gradient(to right, #8E2DE2, #4A00E0)',
                        paddingY: '40px',
                        display: 'inline-block',
                        borderRadius: '0px',
                    }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: '#FFFFFF',
                            }}
                        >
                            {userData?.username}
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
                                            borderLeft: 'solid 7px #8E2DE2',
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
        </>
    )
}
