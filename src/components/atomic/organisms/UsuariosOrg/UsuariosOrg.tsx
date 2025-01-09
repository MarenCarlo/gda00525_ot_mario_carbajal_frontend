import { useEffect, useState } from 'react'
import { UsersCard } from '../../molecules/UsersCard/UsersCard'
import { Divider, Grid2 } from '@mui/material'
import { useEditStateUserMutation, useGetUsersQuery } from '../../../../redux/services/usersService';
import { TextInput } from '../../atoms';
import { toast } from 'react-toastify';
import { toastOptions } from '../../../utils/toastOptions';

export const UsuariosOrg = () => {
    /**
     * Redux Services
     */
    const { data: usersDataSV, isLoading: isUsersDataLoading, refetch } = useGetUsersQuery(undefined);
    const [editStateUser, { isLoading: isEditStateUserLoading }] = useEditStateUserMutation(undefined);

    /**
     * States
     */
    const [usersData, setUsersData] = useState([]);
    const [filterData, setFilterData] = useState({
        filterData: ''
    });

    /**
     * Logica de Filtro de Datos.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterData({ filterData: e.target.value });
    };
    const filteredUsers = usersData?.filter((user: any) => {
        const searchTerm = filterData.filterData;
        if (!searchTerm) return true;
        return (
            user.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.nombre_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.telefono.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.rol_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.isActive.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    /**
     * Seteo de Data del SV.
     */
    useEffect(() => {
        if (usersDataSV?.data) {
            setUsersData(usersDataSV.data);
        }
    }, [usersDataSV]);
    useEffect(() => {
        console.log(usersData)
    }, [usersData]);

    /**
     * Cambiar Estado de Activo de Usuario
     */
    const handleActiveChange = async (idUsuario: number, newStateUsuario: string) => {
        let newStateValue = newStateUsuario === "Activo" ? false : true;
        const newStateUserData = {
            idUsuario: idUsuario,
            newStateValue: newStateValue
        }
        try {
            const response = await editStateUser(newStateUserData).unwrap();
            if (response.error === false) {
                toast.success(`${response.message}`, toastOptions);
            }
        } catch (error: any) {
            toast.error(error.data.message, toastOptions);
            console.error("Error: ", error.data.message);
        }
    }

    return (
        <>
            <Grid2 container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 6, md: 12 }}>
                <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                    <TextInput
                        id="filterData"
                        label="Buscar Usuario (Empresa/Username/Nombre Completo/Rol/Telefono/Email/Estado)"
                        type="text"
                        name="filterData"
                        value={filterData.filterData}
                        onChange={handleChange}
                        sx={{ width: '100%', marginY: '25px', border: 'solid 0.5px #222', borderRadius: '30px' }}
                    />
                </Grid2>
            </Grid2>
            <Grid2 size={{ xs: 12 }} sx={{ marginBottom: '30px' }}>
                <Divider sx={{ bgcolor: '#444444' }} />
            </Grid2>
            <Grid2 container spacing={{ xs: 2, md: 2 }} columns={{ xs: 12, sm: 12, md: 12 }} sx={{ marginBottom: "25px", justifyContent: 'center' }}>
                {
                    usersData && usersData.length > 0 &&
                    filteredUsers.map((user: any, index: number) => (
                        <Grid2
                            key={index}
                            size={{ xs: 12, sm: 12, md: 9 }}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <UsersCard
                                user={user}
                                handleActiveChange={handleActiveChange}
                            />
                        </Grid2>
                    ))
                }
            </Grid2>
        </>
    )
}