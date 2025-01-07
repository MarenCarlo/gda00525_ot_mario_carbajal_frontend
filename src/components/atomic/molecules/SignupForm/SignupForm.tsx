import React, { useEffect, useState } from 'react'
import { Box, Divider, FormHelperText, Grid2, Typography } from '@mui/material'
import { AppButton, SelectInput, TextInput } from '../../atoms'
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import './style.css'
import { formatToMSSQLDate } from '../../../utils/formatToMSSQLDate';
import { Navigation } from '../Navigation';
import DatePicker from '../../atoms/Inputs/DatePicker';
import { SignupFormProps } from '../../../models/molecules/SignupForm';


export const SignupForm = ({
    isLoading, newUserData, setNewUserData, newEnterpriseData, handleUserChange,
    handleEnterpriseChange, errorsUser, errorsEnterprise, signupUserForm,
    newEnterpriseForm, roles, enterprises, RoutesElements,
    currentTab, setCurrentTab, roleSelected, control
}: SignupFormProps) => {
    const [selected, setSelected] = useState<Date | undefined>(undefined);
    const [formattedDate, setFormattedDate] = useState<string | undefined>(undefined);

    const handleTabChange = (newTab: number) => {
        setCurrentTab(newTab);
    };

    const handleSelect = (date: Date | undefined) => {
        if (date !== undefined) {
            let formatDate = formatToMSSQLDate(date);
            setSelected(date);
            setFormattedDate(formatDate);
        }
    };

    useEffect(() => {
        if (selected !== undefined) {
            setNewUserData({ ...newUserData, fecha_nacimiento: formattedDate ?? '' });
        }
    }, [selected]);
    return (
        <>
            <Grid2 container spacing={{ xs: 2, md: 2 }} columns={{ xs: 12, sm: 12, md: 12 }} sx={{ marginY: '25px' }}>
                <Grid2 size={{ xs: 12 }}>
                    <Divider sx={{ bgcolor: '#444444' }} />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 12, md: 12 }} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 'light',
                            fontSize: '12pt',
                            textAlign: 'center',
                            color: '#666666',
                        }}
                    >
                        Empresa de Usuario
                    </Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 12, md: 12 }} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Navigation
                        currentTab={currentTab}
                        RoutesElements={RoutesElements}
                        onTabChange={handleTabChange}
                    />
                </Grid2>

                {
                    currentTab === 2 ?
                        <>
                            <Box
                                component="form"
                                onSubmit={newEnterpriseForm}
                                autoComplete="off"
                                sx={{
                                    display: 'contents',
                                }}
                            >
                                <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
                                    <TextInput
                                        id="nit"
                                        label="NIT empresa"
                                        type="text"
                                        name="nit"
                                        value={newEnterpriseData.nit}
                                        onChange={handleEnterpriseChange}
                                        sx={{ width: '100%' }}
                                        disabled={isLoading}
                                        error={!!errorsEnterprise.nit}
                                        helperText={errorsEnterprise.nit?.message}
                                    />
                                </Grid2>
                                <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
                                    <TextInput
                                        id="telefono"
                                        label="Teléfono"
                                        type="tel"
                                        name="telefono"
                                        value={newEnterpriseData.telefono}
                                        onChange={handleEnterpriseChange}
                                        sx={{ width: '100%' }}
                                        disabled={isLoading}
                                        error={!!errorsEnterprise.telefono}
                                        helperText={errorsEnterprise.telefono?.message}
                                    />
                                </Grid2>
                                <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
                                    <TextInput
                                        id="email"
                                        label="Email"
                                        type="email"
                                        name="email"
                                        value={newEnterpriseData.email}
                                        onChange={handleEnterpriseChange}
                                        sx={{ width: '100%' }}
                                        disabled={isLoading}
                                        error={!!errorsEnterprise.email}
                                        helperText={errorsEnterprise.email?.message}
                                    />
                                </Grid2>
                                <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                                    <TextInput
                                        id="razon_social"
                                        label="Razón Social"
                                        type="text"
                                        name="razon_social"
                                        value={newEnterpriseData.razon_social}
                                        onChange={handleEnterpriseChange}
                                        sx={{ width: '100%' }}
                                        disabled={isLoading}
                                        error={!!errorsEnterprise.razon_social}
                                        helperText={errorsEnterprise.razon_social?.message}
                                    />
                                </Grid2>
                                <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                                    <TextInput
                                        id="nombre_comercial"
                                        label="Nombre Comercial"
                                        type="text"
                                        name="nombre_comercial"
                                        value={newEnterpriseData.nombre_comercial}
                                        onChange={handleEnterpriseChange}
                                        sx={{ width: '100%' }}
                                        disabled={isLoading}
                                        error={!!errorsEnterprise.nombre_comercial}
                                        helperText={errorsEnterprise.nombre_comercial?.message}
                                    />
                                </Grid2>
                                <Grid2 size={{ xs: 12, sm: 12, md: 12 }} sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <AppButton
                                        variant='outlined'
                                        type="submit"
                                        size="small"
                                        color='info'
                                        sx={{ maxWidth: '500px', width: '100%', paddingY: '12px', color: '#2196f3' }}
                                        isLoading={isLoading}
                                    >
                                        Agregar Empresa
                                    </AppButton>
                                </Grid2>
                            </Box>
                        </> : <></>
                }
            </Grid2>
            <Box
                component="form"
                onSubmit={signupUserForm}
                autoComplete="off"
                sx={{
                    display: 'contents',
                }}  >
                <Grid2 container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 6, md: 12 }}>
                    {
                        currentTab === 1 &&
                        <>

                            <Grid2 size={{ xs: 12, sm: 12, md: 12 }} sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: '15px'
                            }}>
                                <SelectInput
                                    id={'empresa_idEmpresa'}
                                    label={'Seleccione Empresa de Usuario'}
                                    name={'empresa_idEmpresa'}
                                    value={newUserData.empresa_idEmpresa}
                                    options={enterprises}
                                    onChange={handleUserChange}
                                    disabled={isLoading}
                                    error={!!errorsUser.empresa_idEmpresa}
                                    helperText={errorsUser.empresa_idEmpresa?.message}
                                    sx={{ maxWidth: '500px' }}
                                />
                            </Grid2>
                        </>
                    }
                    <Grid2 size={{ xs: 12 }}>
                        <Divider sx={{ bgcolor: '#444444' }} />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 12, md: 12 }} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <SelectInput
                            id={'rol_idRol'}
                            label={'Seleccione el Rol Deseado'}
                            name={'rol_idRol'}
                            value={newUserData.rol_idRol || roleSelected}
                            options={roles}
                            onChange={handleUserChange}
                            disabled={isLoading}
                            error={!!errorsUser.rol_idRol}
                            helperText={errorsUser.rol_idRol?.message}
                            sx={{ maxWidth: '500px' }}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                        <TextInput
                            id="nombre_completo"
                            label="Nombre Completo"
                            type="text"
                            name="nombre_completo"
                            value={newUserData.nombre_completo}
                            onChange={handleUserChange}
                            error={!!errorsUser.nombre_completo}
                            helperText={errorsUser.nombre_completo?.message}
                            sx={{ width: '100%' }}
                            disabled={isLoading}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                        <TextInput
                            id="username"
                            label="Usuario"
                            type="text"
                            name="username"
                            value={newUserData.username}
                            onChange={handleUserChange}
                            error={!!errorsUser.username}
                            helperText={errorsUser.username?.message}
                            sx={{ width: '100%' }}
                            disabled={isLoading}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                        <TextInput
                            id="email"
                            label="Email"
                            type="email"
                            name="email"
                            value={newUserData.email}
                            onChange={handleUserChange}
                            error={!!errorsUser.email}
                            helperText={errorsUser.email?.message}
                            sx={{ width: '100%' }}
                            disabled={isLoading}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                        <TextInput
                            id="telefono"
                            label="telefono"
                            type="tel"
                            name="telefono"
                            value={newUserData.telefono}
                            onChange={handleUserChange}
                            error={!!errorsUser.telefono}
                            helperText={errorsUser.telefono?.message}
                            sx={{ width: '100%' }}
                            disabled={isLoading}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                        <TextInput
                            id="direccion"
                            label="direccion"
                            type="text"
                            name="direccion"
                            value={newUserData.direccion}
                            onChange={handleUserChange}
                            error={!!errorsUser.direccion}
                            helperText={errorsUser.direccion?.message}
                            sx={{ width: '100%' }}
                            disabled={isLoading}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12 }}>
                        <Divider sx={{ bgcolor: '#444444' }} />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 12, md: 12 }} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'light',
                                fontSize: '12pt',
                                textAlign: 'center',
                                color: '#666666',
                            }}
                        >
                            Fecha de Nacimiento
                        </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 12, md: 12 }} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <DatePicker
                            name="fecha_nacimiento"
                            control={control}
                            value={selected || new Date(newUserData.fecha_nacimiento || Date.now())}
                            onChange={handleSelect}
                            helperText={errorsUser.fecha_nacimiento?.message}
                            error={!!errorsUser.fecha_nacimiento}
                            disabled={isLoading}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12 }}>
                        <Divider sx={{ bgcolor: '#444444' }} />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                        <TextInput
                            id="passphrase"
                            label="Contraseña"
                            type="password"
                            name="passphrase"
                            value={newUserData.passphrase}
                            onChange={handleUserChange}
                            error={!!errorsUser.passphrase}
                            helperText={errorsUser.passphrase?.message}
                            sx={{ width: '100%' }}
                            disabled={isLoading}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                        <TextInput
                            id="repeat_passphrase"
                            label="Repetir Contraseña"
                            type="password"
                            name="repeat_passphrase"
                            value={newUserData.repeat_passphrase}
                            onChange={handleUserChange}
                            error={!!errorsUser.repeat_passphrase}
                            helperText={errorsUser.repeat_passphrase?.message}
                            sx={{ width: '100%' }}
                            disabled={isLoading}
                        />
                    </Grid2>

                    <Grid2 size={{ xs: 12, sm: 12, md: 12 }} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <AppButton
                            type="submit"
                            size="large"
                            color='primary'
                            sx={{ maxWidth: '500px', width: '100%', paddingY: '12px' }}
                            isLoading={isLoading}
                            clickButtonAction={() => console.log(newUserData)}
                        >
                            Agregar Usuario
                        </AppButton>
                    </Grid2>
                </Grid2>
            </Box>
        </>
    )
}