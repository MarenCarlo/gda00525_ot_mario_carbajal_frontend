import { Navigate, Outlet } from 'react-router';
import { IntProtectedElement } from '../models/Middlewares';

export const ProtectedElement = ({ children, redirectTo, isAllowed }: IntProtectedElement) => {
    if (!isAllowed) {
        return <Navigate to={redirectTo} />
    }
    return children ? children : <Outlet />
}
