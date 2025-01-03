import { LogInOrg } from '../../organisms'
import { Card, CardHeader, Container, Grid2 } from '@mui/material'

export const LoginTemplate = () => {

    return (
        <>
            <Container maxWidth="xs" sx={{ marginTop: '20vh' }}>
                <Grid2 container spacing={2}>
                    <Grid2 size={12}>
                        <Card sx={{ padding: 2, boxShadow: 5 }}>
                            <CardHeader
                                title="Mi Tiendita Online"
                                titleTypographyProps={{ variant: 'h5', align: 'center', fontWeight: 'bold', color: '#999999' }}
                            />
                            <LogInOrg />
                        </Card>
                    </Grid2>
                </Grid2>
            </Container>
        </>
    )
}