import { ProtectedElement } from './components/middlewares/ProtectedRoute'
import { Navigate, Outlet, Route, Routes } from 'react-router'
import { DefaultLayout } from './components/layouts/DefaultLayout'
import { RootState } from './redux/store';
import { useAppSelector } from './redux/hooks';
import { Home, Login, Signup } from './pages'

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
                 * 
                 * RUTAS PROTEGIDAS
                 * 
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
                 * Signup User
                 */}
                <Route path="/Signup" element={
                    <ProtectedElement redirectTo={"/"} isAllowed={userData && userData!.isLogged === true}>
                        <DefaultLayout>
                            <Signup />
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
