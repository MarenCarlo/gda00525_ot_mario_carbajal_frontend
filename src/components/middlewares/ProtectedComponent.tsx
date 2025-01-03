import React from 'react'
import { IntProtectedComponent } from '../models/Middlewares';

export const ProtectedComponent = ({ children, isShowed }: IntProtectedComponent) => {
    if (!isShowed) {
        return <></>
    }
    return children;
}