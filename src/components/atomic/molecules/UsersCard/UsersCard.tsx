import React from 'react';
import { Box, Button, Card, CardContent, CardMedia, Typography, Paper, Chip, CardHeader, IconButton, Grid2, FormControlLabel, Switch } from '@mui/material';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import { formatCurrencyValue } from '../../../utils/formatCurrencyValue';
import { AppButton } from '../../atoms';
import { useNavigate } from 'react-router';

const serverURL = import.meta.env.VITE_BACKEND_URL_STATIC_FILES;

export const UsersCard = ({ user, handleActiveChange }: any) => {
    const {
        idUsuario,
        username,
        email,
        direccion,
        empresa,
        rol_nombre,
        nombre_completo,
        telefono,
        isActive
    } = user
    return (
        <>
            <Card
                sx={{
                    flexDirection: { xs: 'column', sm: 'row' },
                    width: '100%',
                    flexWrap: 'wrap',
                    bgcolor: '#101010BB',
                    boxShadow: '#000000 0px 0px 25px 0px inset',
                    border: 'solid 0.5px #222222',
                    marginY: 2,
                    height: 'auto',
                }}
            >
                <CardContent sx={{ flex: 1, marginX: '25px' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            justifyContent: { xs: 'center', md: 'space-between' },
                            alignItems: { xs: 'center', md: 'center' },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: { xs: 'center', md: 'flex-start' },
                                flexDirection: 'column',
                                alignItems: { xs: 'center', md: 'flex-start' },
                                mb: { xs: 2, md: 0 },
                            }}
                        >
                            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
                                {username}
                            </Typography>
                            <Typography variant="body2" color="#AAAAAA" sx={{ fontWeight: 'bold', mb: 2 }}>
                                {rol_nombre}
                            </Typography>
                            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
                                {nombre_completo}
                            </Typography>
                            <Typography variant="body2" color="#AAAAAA" sx={{ fontWeight: 'bold', mb: 2 }}>
                                {email.toLowerCase()}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: { xs: 'center', md: 'flex-end' },
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                {
                                    isActive === "Activo" ?
                                        <Chip
                                            icon={<AssignmentTurnedInOutlinedIcon />}
                                            label="usuario activo"
                                            variant="outlined"
                                            color="success"
                                            sx={{ paddingX: '20px' }}
                                        />

                                        :
                                        <Chip
                                            icon={<DoDisturbOnOutlinedIcon />}
                                            label={"usuario desactivado"}
                                            variant="outlined"
                                            color="error"
                                            sx={{ paddingX: '20px' }}
                                        />
                                }

                            </Box>
                        </Box>
                    </Box>
                    <Paper
                        sx={{
                            p: 2,
                            my: 2,
                            display: 'flex',
                            flexDirection: { xs: 'column' },
                            bgcolor: '#DDDDDD',
                            borderRadius: 1,
                            boxShadow: '#000000 0px 0px 45px 0px',
                            background: 'linear-gradient(to right, #FFFFFF, #999999)',
                        }}
                    >
                        <Box
                            sx={{
                                mb: 1,
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                empresa
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold' }}>
                                {empresa}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                mb: 1,
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                Direccion de Entregas
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold' }}>
                                {direccion}
                            </Typography>
                        </Box>
                    </Paper>
                    <Box sx={{ display: 'flex' }}>
                        <Grid2 size={{ xs: 12, sm: 12, md: 12 }} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '15px',
                        }}>
                            <Box
                                sx={{
                                    bgcolor: '#0F0F0F',
                                    borderRadius: "30px",
                                    alignContent: "center",
                                    paddingX: "50px",
                                }}
                            >
                                <FormControlLabel
                                    sx={{
                                        color: "#FFFFFF",
                                        width: "150px"
                                    }}
                                    control={
                                        <Switch
                                            name="isActive"
                                            id="isActive"
                                            color="info"
                                            checked={isActive === "Activo"}
                                            onChange={() => handleActiveChange(idUsuario, isActive)}
                                        />
                                    }
                                    label={isActive === "Activo" ? "Usuario Activo" : "Usuario Desactivado"}
                                    labelPlacement="bottom"
                                />
                            </Box>
                        </Grid2>
                    </Box>

                </CardContent>
            </Card>
        </>
    )
}