import React from 'react';
import { Modal, Backdrop, Box, Fade, Typography, Divider } from '@mui/material';
import { AppButton, TextInput } from '../../atoms';
import { AddCategoryModalProps } from '../../../models/molecules/AddCategoryModal';

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

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
    open,
    addCategory,
    handleClose,
    handleAddCategoryChange,
    isLoading,
    addCategoryForm,
    errorAddCategoryInputs
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
                    <Typography variant="body2" color="#AAAAAA" sx={{ fontWeight: 'bold', marginBottom: '15px' }}>
                        Agregando Categoría
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={addCategoryForm}
                        autoComplete="off"
                        sx={{
                            display: 'contents',
                        }}  >

                        <Divider sx={{ bgcolor: '#444444' }} />
                        <TextInput
                            id="nombre"
                            label="Nombre Categoría"
                            name="nombre"
                            value={addCategory.nombre}
                            onChange={handleAddCategoryChange}
                            error={!!errorAddCategoryInputs.nombre}
                            helperText={errorAddCategoryInputs.nombre?.message}
                            sx={{
                                width: '100%',
                                marginTop: '25px',
                                borderRadius: '30px',
                            }}
                            type="text"
                        />
                        <TextInput
                            id="descripcion"
                            label="Descripcion"
                            name="descripcion"
                            value={addCategory.descripcion}
                            onChange={handleAddCategoryChange}
                            error={!!errorAddCategoryInputs.descripcion}
                            helperText={errorAddCategoryInputs.descripcion?.message}
                            sx={{
                                width: '100%',
                                borderRadius: '30px',
                            }}
                            type="text"
                        />
                        <Divider sx={{ bgcolor: '#444444', marginY: '25px', }} />
                        <AppButton
                            type='submit'
                            variant="contained"
                            color="primary"
                            sx={{ width: '100%' }}
                            isLoading={isLoading}
                        >
                            Agregar Categoría
                        </AppButton>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};