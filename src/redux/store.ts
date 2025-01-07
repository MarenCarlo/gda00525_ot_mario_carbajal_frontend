import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

/**
 * Slice Reducers
 */
import counterSlice from './counter/counterSlice';
import usersSlice from './user/usersSlice';
import orderDetailsSlice from './orderDetails/orderDetailsSlice';

/**
 * Service Reducers
 */
import { usersService } from './services/usersService';
import { rolesService } from './services/rolesService';
import { enterprisesService } from './services/enterprisesService';
import { productsService } from './services/productsService';
import { categoriesService } from './services/categoriesService';
import { brandsService } from './services/brandsService';
import { ordersService } from './services/ordersService';

/**
 * Configuración de Redux Persist
 */
const persistConfig: PersistConfig<RootState> = {
    key: 'root',
    storage,
    whitelist: [
        'counterPersistentReducer',
        'userPersistentReducer',
        'orderDetailsPersistentReducer'
    ]
};

/**
 * Combine Reducers
 */
const rootReducer = combineReducers({
    counterPersistentReducer: counterSlice,
    userPersistentReducer: usersSlice,
    orderDetailsPersistentReducer: orderDetailsSlice,
    [usersService.reducerPath]: usersService.reducer,
    [rolesService.reducerPath]: rolesService.reducer,
    [enterprisesService.reducerPath]: enterprisesService.reducer,
    [productsService.reducerPath]: productsService.reducer,
    [categoriesService.reducerPath]: categoriesService.reducer,
    [brandsService.reducerPath]: brandsService.reducer,
    [ordersService.reducerPath]: ordersService.reducer
});

/**
 * Reducer Persistido
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Configuración del Store
 */
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            },
        }).concat(
            usersService.middleware
        ).concat(
            rolesService.middleware
        ).concat(
            enterprisesService.middleware
        ).concat(
            productsService.middleware
        ).concat(
            categoriesService.middleware
        ).concat(
            brandsService.middleware
        ).concat(
            ordersService.middleware
        )
});

/**
 * Tipos para el Store y el Dispatch
 */
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
