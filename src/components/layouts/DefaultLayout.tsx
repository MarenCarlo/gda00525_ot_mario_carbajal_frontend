import { useState } from 'react';
import { NavBar } from '../atomic/molecules';
import { Container, Grid2 } from '@mui/material';

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <NavBar />
            <Grid2 sx={{ paddingTop: '50px' }}>
                <Grid2>
                    <Container maxWidth="md">
                        {children}
                    </Container>
                </Grid2>
            </Grid2>
        </>
    );
}