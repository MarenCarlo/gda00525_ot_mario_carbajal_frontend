import React from 'react'
//Redux
import { Provider } from 'react-redux'
import { store } from './store'
//Redux Persist
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

interface Props { children: React.ReactNode }

const persistor = persistStore(store);
const StatesProvider = ({ children }: Props) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}

export default StatesProvider
