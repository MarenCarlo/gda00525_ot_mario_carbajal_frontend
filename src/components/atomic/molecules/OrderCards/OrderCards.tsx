import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Chip, Paper, Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemButton, Grid2, IconButton, } from "@mui/material";
import { formatCurrencyValue } from "../../../utils/formatCurrencyValue";
import { AppButton } from "../../atoms";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useAppSelector } from "../../../../redux/hooks";
import { RootState } from "../../../../redux/store";

const serverURL = import.meta.env.VITE_BACKEND_URL_STATIC_FILES;
const dataOrder = {
    "detalles": [
        {
            "idDetalleOrden": 1,
            "cantidad": 5,
            "precio_venta": 3000,
            "codigo": "1000",
            "nombre": "Samsung Galaxy S24 ULTRA",
            "subtotal": 15000,
            "orden_idOrden": 1
        },
        {
            "idDetalleOrden": 2,
            "cantidad": 5,
            "precio_venta": 2000,
            "codigo": "1002",
            "nombre": "Xiaomi Remi 13 Pro",
            "subtotal": 10000,
            "orden_idOrden": 1
        }
    ]
}
export const OrderCards = ({ product, handleDeleteDetailOrder, handleDeleteOrder }: any) => {
    const userData = useAppSelector((state: RootState) => state.userPersistentReducer.userData);

    const {
        idOrden,
        fecha_creacion,
        total_orden,
        status_Orden,
        isActive,
        cliente,
        nit_cliente,
        direccion_cliente,
        vendedor,
        nit_venta,
        direccion_venta,
        detalles
    } = product;

    return (
        <>
            <Card
                sx={{
                    width: { xs: "100%", md: "100%" },
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
                <CardContent sx={{ flexGrow: 1 }}>
                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'column' },
                            bgcolor: '#DDDDDD00',
                            borderRadius: 1,
                            boxShadow: '#000000 0px 0px 5px 0px',
                            border: 'solid 1px #555',
                            background: 'linear-gradient(to right, #222 0%, #111 100%)',
                            justifyContent: 'space-between',
                            height: '100%',
                            paddingY: '5px',
                            marginBottom: '10px'
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
                                <Chip label={`Orden #${idOrden}`} variant="filled" color='info' sx={{ boxShadow: '#000000 0px 0px 5px 0px inset', }} />
                            </Box>
                            <Box
                                sx={{
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                }}
                            >
                                {
                                    isActive ?
                                        <Chip label={"Activa"} variant="filled" color='info' sx={{ boxShadow: '#000000 0px 0px 5px 0px inset', }} />
                                        :
                                        <Chip label={"Desactivada"} variant="filled" color='warning' sx={{ boxShadow: '#000000 0px 0px 5px 0px inset', bgcolor: '#E84133', color: '#FFFFFF' }} />
                                }
                            </Box>
                        </Box>
                    </Paper>

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
                                {userData?.empresa.nombre_comercial}
                            </Typography>
                        </Box>
                    </Box>
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
                            <Typography variant="body2" color="#AAAAAA" sx={{ fontWeight: 'bold' }}>
                                {cliente}
                            </Typography>
                        </Box>
                    </Box>
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
                            <Typography variant="body2" color="#AAAAAA" sx={{ fontWeight: 'bold' }}>
                                {nit_cliente}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: { xs: 2 },
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
                                {direccion_cliente}
                            </Typography>
                        </Box>
                    </Box>
                    <Divider sx={{ bgcolor: "#444444" }} />
                </CardContent>
                <CardContent>
                    <List sx={{
                        width: '100%',
                        overflowY: 'auto',
                        "::-webkit-scrollbar": {
                            width: "5px", // Ancho de la barra
                        },
                        "::-webkit-scrollbar-button": {
                            background: "#222 !important", // Fondo del track
                        },
                        "::-webkit-scrollbar-thumb": {
                            background: "#000 !important", // Color del thumb
                            borderRadius: "30px", // Redondeo
                        },
                        "::-webkit-scrollbar-thumb:hover": {
                            background: "#000 !important", // Color al pasar el mouse
                        },
                        height: '50vh',
                    }}>
                        {
                            detalles.map((item: any, index: number) => (
                                <ListItem
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderTop: 'solid 0.5px #121212',
                                        paddingY: '10px',
                                        '&:hover': {
                                            bgcolor: '#121212',
                                            transition: 'all 0.2s',
                                        },
                                        '&:last-child': {
                                            marginBottom: { xs: '50px', md: '0px' },
                                        }
                                    }}>
                                    <Grid2 container columns={{ xs: 12, sm: 12, md: 12 }}>
                                        <Box>
                                            <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                                                <ListItemAvatar>
                                                    <Avatar
                                                        src={`${serverURL}${item.imagen}`}
                                                        onError={() => {
                                                            `${serverURL}/images/products/default.jpg`;
                                                        }}
                                                    />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    sx={{ color: '#FFFFFF' }}
                                                    primary={`SKU: ${item.codigo} - ${item.nombre}`}
                                                />
                                            </Grid2>
                                            <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                                                <ListItemText
                                                    sx={{ color: '#AAAAAA' }}
                                                    primary={"Cantidad"}
                                                    secondary={
                                                        <>
                                                            <Typography
                                                                component="span"
                                                                variant="body2"
                                                                sx={{ color: '#FFF', }}
                                                            >
                                                                {item.cantidad}
                                                            </Typography>
                                                        </>
                                                    }
                                                />
                                            </Grid2>
                                            <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                                                <ListItemText
                                                    sx={{ color: '#AAAAAA' }}
                                                    primary={"Precio"}
                                                    secondary={
                                                        <>
                                                            <Typography
                                                                component="span"
                                                                variant="body2"
                                                                sx={{ color: '#FFF' }}
                                                            >
                                                                {formatCurrencyValue(item.precio_venta)}
                                                            </Typography>
                                                        </>
                                                    }
                                                />
                                            </Grid2>
                                            <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                                                <ListItemText
                                                    sx={{ color: '#AAAAAA' }}
                                                    primary={"Subtotal"}
                                                    secondary={
                                                        <>
                                                            <Typography
                                                                component="span"
                                                                variant="body2"
                                                                sx={{ color: '#FFF' }}
                                                            >
                                                                {formatCurrencyValue(item.precio_venta * item.cantidad)}
                                                            </Typography>
                                                        </>
                                                    }
                                                />
                                            </Grid2>
                                        </Box>
                                    </Grid2>
                                    {
                                        status_Orden === 1 &&
                                        <ListItemButton
                                            sx={{ display: 'flex', justifyContent: 'flex-end' }}
                                            onClick={() => handleDeleteDetailOrder(item.idDetalleOrden)}
                                        >
                                            <DeleteOutlineOutlinedIcon
                                                sx={{ fill: '#E84133', fontSize: 30 }}
                                            />
                                        </ListItemButton>
                                    }
                                </ListItem>
                            ))
                        }
                    </List>
                </CardContent>
                <CardContent>
                    <Divider sx={{ bgcolor: "#444444", marginBottom: '5px' }} />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {
                            status_Orden === 1 &&
                            <IconButton
                                color="primary"
                                sx={{
                                    backgroundColor: "#E84133",
                                    color: "#FFFFFF",
                                    borderRadius: "50px",
                                    marginY: "15px",
                                    padding: "10px",
                                    "&:hover": {
                                        backgroundColor: "#F74244",
                                    },
                                }}
                                onClick={() => handleDeleteOrder(idOrden)}
                            >
                                <DeleteOutlineOutlinedIcon sx={{ fill: '#FFFFFF', fontSize: 30 }} />
                            </IconButton>
                        }
                    </Box>
                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'column' },
                            bgcolor: '#DDDDDD00',
                            borderRadius: 1,
                            boxShadow: '#000000 0px 0px 5px 0px',
                            border: 'solid 1px #555',
                            background: 'linear-gradient(to right, #222 0%, #111 100%)',
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
                                {
                                    status_Orden === 0 &&
                                    <Chip label={"Cancelada"} variant="filled" color='warning' sx={{ bgcolor: '#E84133', color: '#FFFFFF', boxShadow: '#000000 0px 0px 5px 0px inset', }} />
                                }
                                {
                                    status_Orden === 1 &&
                                    <Chip label={"Pendiente"} variant="filled" color='warning' sx={{ color: '#FFFFFF', boxShadow: '#000000 0px 0px 5px 0px inset', }} />
                                }
                                {
                                    status_Orden === 2 &&
                                    <Chip label={"Completada"} variant="filled" color='success' sx={{ color: '#FFFFFF', boxShadow: '#000000 0px 0px 5px 0px inset', }} />
                                }
                            </Box>
                            <Box
                                sx={{
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                }}
                            >
                                <Chip label={formatCurrencyValue(total_orden)} variant="filled" color='success' sx={{
                                    borderRadius: 30,
                                    color: '#FFFFFF',
                                    fontSize: "10pt",
                                    boxShadow: '#000000 0px 0px 5px 0px inset',
                                }} />
                            </Box>
                        </Box>
                    </Paper>
                </CardContent>
                {
                    status_Orden === 2 &&
                    <>
                        <CardContent>
                            <Divider sx={{ bgcolor: "#444444", marginBottom: '5px' }} />
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
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
                                        Mi Tiendita Online
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
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
                                    <Typography variant="body2" color="#AAAAAA" sx={{ fontWeight: 'bold' }}>
                                        2410533-5
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
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
                                    <Typography variant="body2" color="#AAAAAA" sx={{ fontWeight: 'bold' }}>
                                        Guatemala, C.A
                                    </Typography>
                                </Box>

                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
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
                                    <Typography variant="body2" color="#AAAAAA" sx={{ fontWeight: 'bold' }}>
                                        {
                                            status_Orden === 2 &&
                                            `Confirmado Por: ${vendedor}`
                                        }
                                    </Typography>
                                </Box>
                            </Box>
                            <Divider sx={{ bgcolor: "#444444", marginBottom: '5px' }} />
                        </CardContent>
                    </>
                }


            </Card>
        </>
    )
}