import React, { useEffect, useState } from 'react'
import { SignupForm } from '../../molecules'
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toastOptions } from '../../../utils/toastOptions';
import { toast } from 'react-toastify';
import { useGetRolesQuery } from '../../../../redux/services/rolesService';
import { useAddEnterpriseMutation, useGetEnterprisesQuery } from '../../../../redux/services/enterprisesService';
import { enterpriseSchema } from '../../../yup/enterpriseSchema';
import { useAddUserMutation } from '../../../../redux/services/usersService';
import { signupSchema } from '../../../yup/signupSchema';
import * as Yup from 'yup';

/**
 * BUTTON ACTIONS
 */
const RoutesElements = [
    { label: 'Seleccionar', value: 1 },
    { label: 'Agregar Empresa', value: 2 }
];

export const SignUpOrg = () => {
    /**
     * Redux Services
     */
    const { data: rolesDataSV, isLoading: isRolesDataSVLoading } = useGetRolesQuery(undefined);
    const { data: enterprisesDataSV, isLoading: isEnterprisesLoading, refetch } = useGetEnterprisesQuery(undefined);
    const [addEnterprise, { isLoading: isAddEnterpriseLoading }] = useAddEnterpriseMutation(undefined);
    const [addUser, { isLoading: isAddUserLoading }] = useAddUserMutation(undefined);


    /**
     * States
     */
    const [currentTab, setCurrentTab] = useState(1);
    const [enterpriseSelected, setEnterpriseSelected] = useState(0);
    const [roleSelected, setRoleSelected] = useState<string | number>('');
    const [newUserData, setNewUserData] = useState({
        empresa_idEmpresa: 0,
        rol_idRol: 0,
        nombre_completo: '',
        username: '',
        email: '',
        telefono: '',
        direccion: '',
        fecha_nacimiento: '',
        passphrase: '',
        repeat_passphrase: '',
    });
    const [newEnterpriseData, setNewEnterpriseData] = useState({
        nit: '',
        telefono: '',
        email: '',
        razon_social: '',
        nombre_comercial: '',
    });
    const [isLoadingApp, setIsLoadingApp] = useState(false);
    const [rolesData, setRolesData] = useState({})
    const [enterprisesData, setEnterprisesData] = useState({});

    /**
     * SETEO DE DATA DE SELECTS roles
     */
    useEffect(() => {
        if (rolesDataSV?.data) {
            const rolesOptions = rolesDataSV.data.map((role: any) => ({
                value: role.idRol,
                label: role.nombre
            }));
            setRolesData(rolesOptions);
        }
    }, [rolesDataSV]);
    /**
     * SETEO DE DATA DE SELECTS enterprises
     */
    useEffect(() => {
        if (enterprisesDataSV?.data) {
            const enterprisesOptions = enterprisesDataSV.data.map((enterprise: any) => ({
                value: enterprise.idEmpresa,
                label: `${enterprise.razon_social} - (nit: ${enterprise.nit})`
            }));
            setEnterprisesData(enterprisesOptions);
        }
    }, [enterprisesDataSV]);

    useEffect(() => {
        setEnterpriseSelected(1);
        setNewUserData({ ...newUserData, empresa_idEmpresa: 1 });
    }, []);

    /**
     * Mutacion de datos de NUEVO USUARIO
     */
    type UserFieldsWithoutEmpresaAndRole = Exclude<keyof typeof newUserData, "empresa_idEmpresa" | "rol_idRol">;
    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name as UserFieldsWithoutEmpresaAndRole;
        setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
        setValueUser(fieldName, e.target.value)
        triggerUser(fieldName)
    };

    /**
     * Mutacion de datos de NUEVA EMPRESA
     */
    const handleEnterpriseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name as keyof typeof newEnterpriseData;
        setNewEnterpriseData({ ...newEnterpriseData, [e.target.name]: e.target.value });
        setValueEnterprise(fieldName, e.target.value)
        triggerEnterprise(fieldName)
    };


    /**
     * React Hook Form de NUEVA EMPRESA
     */
    const {
        handleSubmit: handleSubmitEnterprise,
        formState: { errors: errorsEnterprise },
        setValue: setValueEnterprise,
        trigger: triggerEnterprise } = useForm<{
            nit: string;
            telefono: string;
            email: string;
            razon_social: string;
            nombre_comercial: string;
        }>({
            resolver: yupResolver(enterpriseSchema),
        });
    /**
     * React Hook Form de NUEVO USUARIO
     */
    const { control, handleSubmit: handleSubmitUser, formState: { errors: errorsUser }, setValue: setValueUser, trigger: triggerUser } = useForm<{
        nombre_completo: string;
        username: string;
        email: string;
        telefono: string;
        direccion: string;
        fecha_nacimiento: Date;
        passphrase: string;
        repeat_passphrase: string;
    }>({
        resolver: yupResolver(signupSchema),
    });
    /**
     * Manejo de Submit form de NUEVO USUARIO
     */
    const signupUserForm: SubmitHandler<{
        nombre_completo: string;
        username: string;
        email: string;
        telefono: string;
        direccion: string;
        fecha_nacimiento: Date;
        passphrase: string;
        repeat_passphrase: string;
    }> = async (data) => {
        try {
            setIsLoadingApp(true);
            const dataWithUserDetails = {
                ...data,
                empresa_idEmpresa: newUserData.empresa_idEmpresa,
                rol_idRol: newUserData.rol_idRol,
            };
            const response = await addUser(dataWithUserDetails).unwrap();
            if (response.error === false) {
                toast.success(response.message, toastOptions);
                setNewUserData({
                    empresa_idEmpresa: 1,
                    rol_idRol: 0,
                    nombre_completo: '',
                    username: '',
                    email: '',
                    telefono: '',
                    direccion: '',
                    fecha_nacimiento: '',
                    passphrase: '',
                    repeat_passphrase: ''
                })
                setValueUser("nombre_completo", "");
                setValueUser("username", "");
                setValueUser("email", "");
                setValueUser("telefono", "");
                setValueUser("direccion", "");
                setValueUser("fecha_nacimiento", new Date());
                setValueUser("passphrase", "");
                setValueUser("repeat_passphrase", "");
            }
        } catch (error: any) {
            toast.error(error.data.message, toastOptions);
            console.error("Error: ", error.data.message);
        } finally {
            setIsLoadingApp(false);
        }
    };
    /**
     * Manejo de Submit form de NUEVA EMPRESA
     */
    const newEnterpriseForm: SubmitHandler<{
        nit: string;
        telefono: string;
        email: string;
        razon_social: string;
        nombre_comercial: string;
    }> = async (data) => {
        try {
            setIsLoadingApp(true);
            const response = await addEnterprise(data).unwrap();
            if (response.error === false) {
                toast.success(response.message, toastOptions);
                setCurrentTab(1);
                setRoleSelected(3);
                setNewUserData(prevData => ({
                    ...prevData,
                    empresa_idEmpresa: response.data.nuevoID,
                    rol_idRol: 3
                }));
                setNewEnterpriseData({
                    nit: '',
                    telefono: '',
                    email: '',
                    razon_social: '',
                    nombre_comercial: '',
                });
                setValueEnterprise("nit", '');
                setValueEnterprise("telefono", '');
                setValueEnterprise("email", '');
                setValueEnterprise("razon_social", '');
                setValueEnterprise("nombre_comercial", '');
            }
        } catch (error: any) {
            toast.error(error.data.message, toastOptions);
            console.error("Error: ", error.data.message);
        } finally {
            setIsLoadingApp(false);
        }
    };
    return (
        <>
            <SignupForm
                isLoading={isLoadingApp || isRolesDataSVLoading || isEnterprisesLoading || isAddEnterpriseLoading || isAddUserLoading}
                newUserData={newUserData}
                setNewUserData={setNewUserData}
                newEnterpriseData={newEnterpriseData}
                handleUserChange={handleUserChange}
                handleEnterpriseChange={handleEnterpriseChange}
                errorsUser={errorsUser}
                errorsEnterprise={errorsEnterprise}
                signupUserForm={handleSubmitUser(signupUserForm)}
                newEnterpriseForm={handleSubmitEnterprise(newEnterpriseForm)}
                roles={rolesData}
                enterprises={enterprisesData}
                RoutesElements={RoutesElements}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                enterpriseSelected={enterpriseSelected}
                roleSelected={roleSelected}
                control={control}
            />
        </>
    )
}