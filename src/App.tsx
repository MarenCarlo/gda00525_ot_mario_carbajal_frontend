import { ProtectedElement } from './components/middlewares/ProtectedRoute'
import { Navigate, Outlet, Route, Routes } from 'react-router'
import { DefaultLayout } from './components/layouts/DefaultLayout'
import { RootState } from './redux/store';
import { useAppSelector } from './redux/hooks';
import { AddProduct, Home, Login, Orders, Signup } from './pages'
import { EditProduct } from './pages/Home/EditProduct';

function App() {
    const userData = useAppSelector((state: RootState) => state.userPersistentReducer.userData);

    // useEffect(() => {
    //     console.log(userData)
    // }, [userData]);

    return (
        <>
            <Routes>
                {/**
                 * 
                 * RUTA PUBLICA
                 * 
                 * LogIn
                 */}
                <Route path="/" element={
                    <ProtectedElement redirectTo={"/Home"} isAllowed={userData!.isLogged === false}>
                        <Login />
                    </ProtectedElement>
                } />
                {/**
                 * RUTAS PROTEGIDAS
                 */}
                {/**
                 * Home / Inicio
                 */}
                <Route path="/Home" element={
                    <ProtectedElement redirectTo={"/"} isAllowed={userData && userData!.isLogged === true}>
                        <DefaultLayout>
                            <Home />
                        </DefaultLayout>
                    </ProtectedElement>
                } />
                {/**
                 * Home / Inicio
                 */}
                <Route path="/Orders" element={
                    <ProtectedElement redirectTo={"/"} isAllowed={userData && userData!.isLogged === true}>
                        <DefaultLayout>
                            <Orders />
                        </DefaultLayout>
                    </ProtectedElement>
                } />
                {/**
                 * RUTAS ACCESIBLES PARA ADMINISTRADOR
                 */}
                {/**
                 * Signup User
                 */}
                <Route path="/Signup" element={
                    <ProtectedElement redirectTo={"/"} isAllowed={userData && userData!.isLogged === true && userData!.rol.idRol === 1}>
                        <DefaultLayout>
                            <Signup />
                        </DefaultLayout>
                    </ProtectedElement>
                } />
                {/**
                 * Editar Producto
                 */}
                <Route path="/EditarProducto/:idProducto" element={
                    <ProtectedElement redirectTo={"/"} isAllowed={userData && userData!.isLogged === true && userData!.rol.idRol === 1}>
                        <DefaultLayout>
                            <EditProduct />
                        </DefaultLayout>
                    </ProtectedElement>
                } />
                {/**
                 * Agregar Producto
                 */}
                <Route path="/AgregarProducto" element={
                    <ProtectedElement redirectTo={"/"} isAllowed={userData && userData!.isLogged === true && userData!.rol.idRol === 1}>
                        <DefaultLayout>
                            <AddProduct />
                        </DefaultLayout>
                    </ProtectedElement>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Outlet />
        </>
    )
}

export default App
