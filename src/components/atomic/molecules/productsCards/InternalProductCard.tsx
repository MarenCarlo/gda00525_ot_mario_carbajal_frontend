import React from 'react';
import { Box, Button, Card, CardContent, CardMedia, Typography, Paper, Chip, CardHeader, IconButton } from '@mui/material';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import { ProductInternalProps } from '../../../models/molecules/ProductsCards';
import { formatCurrencyValue } from '../../../utils/formatCurrencyValue';
import { AppButton } from '../../atoms';
import { useNavigate } from 'react-router';

const serverURL = import.meta.env.VITE_BACKEND_URL_STATIC_FILES;

interface InternalProductCardProps {
    product: ProductInternalProps;
    openAddStock?: any;
    isLoading: boolean;
    isButtons?: boolean;
}

export const InternalProductCard = ({ product, openAddStock, isLoading, isButtons = true }: InternalProductCardProps) => {
    const {
        idProducto,
        codigo,
        nombre,
        descripcion,
        imagen,
        categoria,
        marca,
        isActive,
        stock,
        precio_compra,
        precio_venta,
        inversion
    } = product;
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/EditarProducto/${idProducto}`, { replace: true });
    };

    return (
        <>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    width: '100%',
                    flexWrap: 'wrap',
                    bgcolor: '#101010BB',
                    boxShadow: '#000000 0px 0px 25px 0px inset',
                    border: 'solid 0.5px #222222',
                    height: 'auto',
                    marginBottom: '50px'
                }}
            >
                <Box
                    sx={{
                        width: { xs: '100%', sm: '33%' },
                        height: 'auto',
                        overflow: 'hidden',
                    }}
                >
                    <CardMedia
                        component="img"
                        sx={{
                            height: '100%',
                            objectFit: 'cover',
                        }}
                        image={`${serverURL}${imagen}` || `${serverURL}/images/products/default.jpg`}
                        alt="Product Image"
                        onError={(e) => {
                            `${serverURL}/images/products/default.jpg`;
                        }}
                    />
                </Box>

                <CardContent sx={{ flex: 1 }}>

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
                                {nombre}
                            </Typography>
                            <Typography variant="body2" color="#AAAAAA" sx={{ fontWeight: 'bold', mb: 2 }}>
                                {descripcion}
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
                                    isActive === 'Desactivado' ?
                                        <Chip
                                            icon={<DoDisturbOnOutlinedIcon />}
                                            label={"producto inactivo"}
                                            variant="outlined"
                                            color="error"
                                            sx={{ paddingX: '20px' }}
                                        />
                                        :
                                        <Chip
                                            icon={<AssignmentTurnedInOutlinedIcon />}
                                            label="producto activo"
                                            variant="outlined"
                                            color="success"
                                            sx={{ paddingX: '20px' }}
                                        />
                                }

                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: { xs: 'center', md: 'flex-start' },
                            alignItems: 'center',
                            marginBottom: { xs: '10px', md: '10px' },
                            marginTop: { xs: '10px', md: '0px' },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Chip label={`SKU: ${codigo}`} size='small' variant="outlined" color="primary" sx={{ paddingX: '20px' }} />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                            }}
                        >
                            <Chip label={marca} variant="outlined" color='success' />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                            }}
                        >
                            <Chip label={categoria} variant="outlined" color='info' />
                        </Box>
                    </Box>
                    <Paper
                        elevation={1}
                        sx={{
                            p: 2,
                            my: 2,
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' }, // Cambiar a columna en xs y fila en md
                            gap: { xs: 1, md: 2 }, // Ajustar espacio entre los elementos
                            bgcolor: '#DDDDDD',
                            borderRadius: 1,
                            boxShadow: '#000000 0px 0px 45px 0px',
                            background: 'linear-gradient(to right, #FFFFFF, #999999)',
                        }}
                    >
                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                marginX: '5px',
                            }}
                        >
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                Stock Total
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold' }}>
                                {stock}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                marginX: '5px',
                            }}
                        >
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                Precio Compra
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold' }}>
                                {formatCurrencyValue(precio_compra)}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                Precio Venta
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold' }}>
                                {formatCurrencyValue(precio_venta)}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                Inversión Total
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold' }}>
                                {formatCurrencyValue(inversion)}
                            </Typography>
                        </Box>
                    </Paper>
                    {
                        isButtons ?
                            <Box sx={{ display: 'flex', gap: 1.5 }}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    sx={{ color: '#FFFFFF' }}
                                    fullWidth
                                    onClick={handleNavigate}
                                >
                                    Editar Producto
                                </Button>
                                <AppButton
                                    variant="contained"
                                    color="primary"
                                    sx={{ width: '100%' }}
                                    isLoading={isLoading}
                                    clickButtonAction={() => openAddStock(idProducto, nombre)}
                                >
                                    Agregar Stock
                                </AppButton>
                            </Box>
                            :
                            <></>
                    }

                </CardContent>
            </Card>
        </>
    );
};