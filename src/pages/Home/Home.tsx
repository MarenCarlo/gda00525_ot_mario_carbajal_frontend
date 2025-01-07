import { useEffect } from 'react'
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { HomeTemplate, OrderPendienteTemplate, StoreTemplate } from '../../components/atomic/templates';

export const Home = () => {
    const userData = useAppSelector((state: RootState) => state.userPersistentReducer.userData);
    useEffect(() => {
        console.log(userData);
    }, [userData]);
    if (userData.rol.idRol === 1) {
        return <HomeTemplate />;
    }
    if (userData.rol.idRol === 2) {
        return <OrderPendienteTemplate />;
    }
    if (userData.rol.idRol === 3) {
        return <StoreTemplate />;
    }
}