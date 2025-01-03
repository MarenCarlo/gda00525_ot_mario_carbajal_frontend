import React, { useState } from 'react'
import { LoginForm } from '../../molecules'
import { useAuthUserMutation } from '../../../../redux/services/usersService';
import { useAppDispatch } from '../../../../redux/hooks';
import { setUserData } from '../../../../redux/user/usersSlice';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { toastOptions } from '../../../utils/toastOptions';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../../yup/loginSchema';


export const LogInOrg = () => {
    /**
     * States
     */
    const [userData, setUserDataState] = useState({
        username: '',
        passphrase: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Redux
     */
    const [authUser, { isLoading: isAuthLoading }] = useAuthUserMutation();
    const dispatch = useAppDispatch();

    /**
     * Mutacion de datos
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserDataState({ ...userData, [e.target.name]: e.target.value });
        if (e.target.name === 'username') {
            setValue('username', e.target.value)
            trigger('username')
        } else {
            setValue('passphrase', e.target.value);
            trigger('passphrase')
        }
    };

    /**
    * React Hook Form
    */
    const { handleSubmit, formState: { errors }, setValue, trigger } = useForm<{ username: string; passphrase: string }>({
        resolver: yupResolver(loginSchema),
    });

    /**
     * Manejo de Submit form
     */
    const loginForm: SubmitHandler<{ username: string; passphrase: string }> = async (data) => {
        console.log(data)
        try {
            setIsLoading(true);
            const response = await authUser(data).unwrap();
            if (response.error === false) {
                toast.success(response.message, toastOptions);
                Cookies.set('auth-token', response.data.authToken);
                dispatch(setUserData({ ...response.data.userData, isLogged: response.isLogged }));
            }
        } catch (error: any) {
            toast.error(error.data.message, toastOptions);
            console.error("Error: ", error.data.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <LoginForm
                isLoading={isLoading || isAuthLoading}
                setIsLoading={setIsLoading}
                userData={userData}
                setUserData={setUserDataState}
                handleChange={handleChange}
                errors={errors}
                loginForm={handleSubmit(loginForm)}
            />
        </>
    )
}