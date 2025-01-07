import React from 'react'
import { HomeOrg } from '../../organisms'
import { Box } from '@mui/material'

export const HomeTemplate = () => {
    return (
        <>
            <Box sx={{
                marginY: "30px",
            }}>
                <HomeOrg />
            </Box>
        </>
    )
}