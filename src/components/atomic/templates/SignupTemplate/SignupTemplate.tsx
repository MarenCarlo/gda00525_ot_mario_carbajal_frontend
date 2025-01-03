import { Box, Typography } from '@mui/material'
import { SignUpOrg } from '../../organisms'

export const SignupTemplate = () => {
    return (
        <>
            <Box sx={{
                marginY: "50px",
            }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: '#EEEEEE',
                        marginBottom: "45px"
                    }}
                >
                    Registrar Usuario
                </Typography>
                <SignUpOrg />
            </Box>
        </>
    )
}