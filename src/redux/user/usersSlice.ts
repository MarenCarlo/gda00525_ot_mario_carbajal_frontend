import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Rol {
    idRol: number;
    nombre: string;
}

interface Empresa {
    idEmpresa: number;
    nombre_comercial: string;
}

interface UserData {
    idUsuario: number;
    username: string;
    nombreUsuario: string;
    isActive: boolean;
    isLogged: boolean;
    rol: Rol;
    empresa: Empresa;
}

interface UserState {
    userData: UserData;
}

const initialState: UserState = {
    userData: {
        idUsuario: 0,
        username: '',
        nombreUsuario: '',
        isActive: false,
        isLogged: false,
        rol: {
            idRol: 0,
            nombre: ''
        },
        empresa: {
            idEmpresa: 0,
            nombre_comercial: ''
        }
    }
};

const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserData>) => {
            state.userData = action.payload;
        },
        clearUserData: (state) => {
            state.userData = {
                idUsuario: 0,
                username: '',
                nombreUsuario: '',
                isActive: false,
                isLogged: false,
                rol: {
                    idRol: 0,
                    nombre: ''
                },
                empresa: {
                    idEmpresa: 0,
                    nombre_comercial: ''
                }
            };
        },
    },
});

export const { setUserData, clearUserData } = usersSlice.actions;

export default usersSlice.reducer;