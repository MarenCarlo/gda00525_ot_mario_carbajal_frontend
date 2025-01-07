import React from 'react';
import { Modal, Backdrop, Box, Fade, Typography, Divider } from '@mui/material';
import { AppButton } from '../../atoms';
import { ConfirmModalProps } from '../../../models/molecules/ConfirmModal';

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

export const ConfirmModal = ({
    open,
    idObject,
    handleClose,
    clickActionButton,
    questionText,
    buttonText,
    isLoading
}: ConfirmModalProps) => {
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
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#FFFFFF', mb: 2 }}>
                            {questionText}
                        </Typography>
                        <Divider sx={{ bgcolor: '#444444', marginY: '25px', }} />
                        <AppButton
                            type='submit'
                            variant="contained"
                            color="primary"
                            sx={{ width: '100%' }}
                            isLoading={isLoading}
                            clickButtonAction={() => clickActionButton(idObject)}
                        >
                            {buttonText}
                        </AppButton>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}