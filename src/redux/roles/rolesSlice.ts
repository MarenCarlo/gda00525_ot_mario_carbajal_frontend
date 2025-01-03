import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RoleData {
    idRol: number;
    nombre: string;
    descripcion: string;
}

interface RoleState {
    roleData: RoleData[];
}

const initialState: RoleState = {
    roleData: [
        {
            idRol: 0,
            nombre: "",
            descripcion: ""
        },
    ]
};

const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        setRolesData: (state, action: PayloadAction<RoleData[]>) => {
            state.roleData = action.payload;
        },
        clearRolesData: (state) => {
            state.roleData = [
                {
                    idRol: 0,
                    nombre: "",
                    descripcion: ""
                },
            ];
        },
    },
});

export const { setRolesData, clearRolesData } = rolesSlice.actions;

export default rolesSlice.reducer;