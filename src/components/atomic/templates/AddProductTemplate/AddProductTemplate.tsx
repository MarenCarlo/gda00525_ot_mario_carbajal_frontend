import React from 'react'
import { AddProductOrg } from '../../organisms'
import { Box, Divider, Typography } from '@mui/material'

export const AddProductTemplate = () => {
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
                    Agregar Producto
                </Typography>
                <Divider sx={{ bgcolor: '#444444', marginBottom: '25px' }} />
                <AddProductOrg />
            </Box>
        </>
    )
}