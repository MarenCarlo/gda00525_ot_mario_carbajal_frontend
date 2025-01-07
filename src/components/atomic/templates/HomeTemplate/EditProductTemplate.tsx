import { Box, Divider, Typography } from '@mui/material'
import { EditOrg } from '../../organisms'

export const EditProductTemplate = () => {
    return (
        <>
            <Box sx={{
                marginY: "50px",
            }}>
                <Divider sx={{ bgcolor: '#444444', marginBottom: '25px' }} />
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: '#EEEEEE',
                        marginBottom: "45px"
                    }}
                >
                    Producto a Editar
                </Typography>
                <EditOrg />
            </Box>
        </>
    )
}