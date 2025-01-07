import { useEffect } from 'react'
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { HomeTemplate, MyOrdersTemplate } from '../../components/atomic/templates';

export const Orders = () => {
    const userData = useAppSelector((state: RootState) => state.userPersistentReducer.userData);
    useEffect(() => {
        console.log(userData);
    }, [userData]);
    if (userData.rol.idRol === 2) {
        return <HomeTemplate />;
    }
    if (userData.rol.idRol === 3) {
        return <MyOrdersTemplate />;
    }
}