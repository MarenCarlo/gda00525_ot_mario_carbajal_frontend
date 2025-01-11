import { Backdrop, Box, Divider, Fade, Modal, Typography } from '@mui/material';
import { AppButton, TextInput } from '../../atoms';
import { AddOrderDetailModalProps } from '../../../models/molecules/AddOrderDetailModal';

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


export const AddOrderDetailModal = ({
    open,
    productSelected,
    addOrderDetail,
    handleClose,
    handleChangeOrderDetail,
    isLoading,
    addOrderDetailForm,
    errorsAddOrderDetail
}: AddOrderDetailModalProps) => {
    return (
        <>
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
                            Agregando Cantidad de Producto:
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#FFFFFF', mb: 2 }}>
                            {productSelected.nombre}
                        </Typography>

                        <Box
                            component="form"
                            onSubmit={addOrderDetailForm}
                            autoComplete="off"
                            sx={{
                                display: 'contents',
                            }}  >
                            <Divider sx={{ bgcolor: '#444444' }} />
                            <TextInput
                                id="cantidad"
                                label="Cantidad a Ordenar"
                                name="cantidad"
                                value={addOrderDetail.cantidad}
                                onChange={handleChangeOrderDetail}
                                error={!!errorsAddOrderDetail.cantidad}
                                helperText={errorsAddOrderDetail.cantidad?.message}
                                sx={{
                                    width: '100%',
                                    marginTop: '25px',
                                    borderRadius: '30px',
                                }}
                                type="number"
                                numberType="int"
                            />
                            <Divider sx={{ bgcolor: '#444444', marginY: '25px', }} />
                            <AppButton
                                type='submit'
                                variant="contained"
                                color="primary"
                                sx={{ width: '100%' }}
                                isLoading={isLoading}
                            >
                                Agregar Producto a Orden
                            </AppButton>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}