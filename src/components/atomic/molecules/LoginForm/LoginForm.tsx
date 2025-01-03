import { AppButton, TextInput } from '../../atoms'
import { LogInOrgProps } from '../../../models/molecules/LoginForm';
import { CardContent } from '@mui/material';

export const LoginForm = ({
    isLoading,
    userData,
    handleChange,
    loginForm,
    errors
}: LogInOrgProps) => {

    return (
        <>
            <CardContent>
                <form autoComplete="off" onSubmit={loginForm}>
                    <TextInput
                        id="username"
                        label="Usuario / Email"
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={userData.username}
                        disabled={isLoading}
                        sx={{ maxWidth: '500px', width: '100%' }}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                    <TextInput
                        id="passphrase"
                        label="Contraseña"
                        type="password"
                        name="passphrase"
                        onChange={handleChange}
                        value={userData.passphrase}
                        disabled={isLoading}
                        sx={{ maxWidth: '500px', width: '100%', marginBottom: '45px' }}
                        error={!!errors.passphrase}
                        helperText={errors.passphrase?.message}
                    />
                    <AppButton
                        type="submit"
                        size="large"
                        isLoading={isLoading}
                        color='primary'
                        sx={{ maxWidth: '500px', width: '100%', paddingY: '12px' }}
                    >
                        Iniciar Sesión
                    </AppButton>
                </form>
            </CardContent>
        </>
    )
}