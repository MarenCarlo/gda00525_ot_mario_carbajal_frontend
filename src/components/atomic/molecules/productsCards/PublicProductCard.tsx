import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box, Chip, Paper, } from "@mui/material";
import { formatCurrencyValue } from "../../../utils/formatCurrencyValue";
import { PublicProductCardProps } from "../../../models/molecules/PublicProductCard";
import { AppButton } from "../../atoms";

const serverURL = import.meta.env.VITE_BACKEND_URL_STATIC_FILES;

export const PublicProductCard: React.FC<PublicProductCardProps> = ({ product, handleOpenAddOrderDetailModal }) => {
    const {
        idProducto,
        codigo,
        nombre,
        descripcion,
        imagen,
        categoria,
        marca,
        precio,
    } = product;
    return (
        <Card
            sx={{
                maxWidth: 500,
                width: { xs: "100%", md: "80%" },
                margin: "16px",
                justifyContent: "center",
                transition: 'all 0.5s',
                boxShadow: "#000000 0px 0px 35px 0px inset",
                border: "solid 0.5px #222222",
                bgcolor: "#101010BB",
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "#0A6BA144 0px 0px 20px 0px",
                    transition: 'all 0.5s'
                },
                display: "flex",
                flexDirection: "column",
                minHeight: 500,
            }}
        >
            <Box sx={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    image={`${serverURL}${imagen}` || `${serverURL}/images/products/default.jpg`}
                    alt="Product Image"
                    sx={{ height: 300, borderRadius: '30px', objectFit: "cover" }}
                    onError={(e) => {
                        `${serverURL}/images/products/default.jpg`;
                    }}
                />
                <Typography
                    variant="body1"
                    color="primary"
                    sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        backgroundColor: "#2196F3",
                        padding: "8px 16px",
                        borderRadius: 30,
                        boxShadow: '#000000 0px 0px 5px 0px inset',
                    }}
                >
                    {formatCurrencyValue(precio)}
                </Typography>
                <Typography
                    variant="body1"
                    color="primary"
                    sx={{
                        position: "absolute",
                        bottom: 16,
                        left: 16,
                        backgroundColor: "#1D2021",
                        padding: "8px 16px",
                        borderRadius: 30,
                        fontSize: "8pt",
                        boxShadow: '#000000 0px 0px 5px 0px inset',
                    }}
                >
                    SKU: {codigo}
                </Typography>
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: { xs: 'center', md: 'flex-start' },
                            flexDirection: 'column',
                        }}
                    >
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
                            {nombre}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: { xs: 2, md: 5 },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: { xs: 'center', md: 'flex-start' },
                            flexDirection: 'column',
                        }}
                    >
                        <Typography variant="body2" color="#AAAAAA" sx={{ fontWeight: 'bold' }}>
                            {descripcion}
                        </Typography>
                    </Box>
                </Box>
                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'column' },
                        bgcolor: '#DDDDDD',
                        borderRadius: 1,
                        boxShadow: '#000000 0px 0px 5px 0px inset',
                        background: 'linear-gradient(to right, #555 0%, #111 100%)',
                        border: 'solid 1px #555',
                        justifyContent: 'space-between',
                        height: '100%',
                        paddingY: '5px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginX: '10px'
                        }}
                    >
                        <Box
                            sx={{
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                            }}
                        >
                            <Chip label={marca} variant="filled" size="small" color='success' sx={{ color: '#FFFFFF', boxShadow: '#000000 0px 0px 5px 0px ', }} />
                        </Box>
                        <Box
                            sx={{
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                            }}
                        >
                            <Chip label={categoria} variant="filled" size="small" color='info' sx={{ boxShadow: '#000000 0px 0px 5px 0px ', }} />
                        </Box>
                    </Box>
                </Paper>



                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >

                </Typography>
                <AppButton
                    variant="contained"
                    color="primary"
                    sx={{
                        borderRadius: '30px',
                        textTransform: "none",
                        width: '100%',
                        boxShadow: '#000000 0px 0px 15px 0px '
                    }}
                    clickButtonAction={() => handleOpenAddOrderDetailModal(idProducto, nombre)}
                >
                    Agregar a Orden
                </AppButton>
            </CardContent>
        </Card>
    );
};