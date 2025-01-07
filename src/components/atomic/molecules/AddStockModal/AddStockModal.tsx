import React from 'react';
import { Modal, Backdrop, Box, Fade, Typography, Divider } from '@mui/material';
import { AppButton, TextInput } from '../../atoms';
import { AddStockModalProps } from '../../../models/molecules/AddStockModal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxWidth: { xs: '300px', md: '600px' },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    color: '#FFFFFF',
    borderRadius: '30px',
    boxShadow: 24,
    p: 4,
};

export const AddStockModal: React.FC<AddStockModalProps> = ({
    open,
    productSelected,
    addStock,
    handleClose,
    handleAddStockChange,
    isLoading,
    addStockForm,
    errorsAddStock
}) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography variant="body2" color="#AAAAAA" sx={{ fontWeight: 'bold' }}>
                        Agregando Ingreso de Stock a:
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#FFFFFF', mb: 2 }}>
                        {productSelected.nombre}
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={addStockForm}
                        autoComplete="off"
                        sx={{
                            display: 'contents',
                        }}  >

                        <Divider sx={{ bgcolor: '#444444' }} />
                        <TextInput
                            id="cantidad"
                            label="Cantidad"
                            name="cantidad"
                            value={addStock.cantidad}
                            onChange={handleAddStockChange}
                            error={!!errorsAddStock.cantidad}
                            helperText={errorsAddStock.cantidad?.message}
                            sx={{
                                width: '100%',
                                marginTop: '25px',
                                borderRadius: '30px',
                            }}
                            type="number"
                            numberType="int"
                        />
                        <TextInput
                            id="precio_compra"
                            label="Precio Compra"
                            name="precio_compra"
                            value={addStock.precio_compra}
                            onChange={handleAddStockChange}
                            error={!!errorsAddStock.precio_compra}
                            helperText={errorsAddStock.precio_compra?.message}
                            sx={{
                                width: '100%',
                                borderRadius: '30px',
                            }}
                            type="number"
                            numberType="decimal"
                        />
                        <TextInput
                            id="precio_venta"
                            label="Precio Venta"
                            name="precio_venta"
                            value={addStock.precio_venta}
                            onChange={handleAddStockChange}
                            error={!!errorsAddStock.precio_venta}
                            helperText={errorsAddStock.precio_venta?.message}
                            sx={{
                                width: '100%',
                                borderRadius: '30px',
                            }}
                            type="number"
                            numberType="decimal"
                        />

                        <Divider sx={{ bgcolor: '#444444', marginY: '25px', }} />
                        <AppButton
                            type='submit'
                            variant="contained"
                            color="primary"
                            sx={{ width: '100%' }}
                            isLoading={isLoading}
                        >
                            Agregar Stock
                        </AppButton>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};