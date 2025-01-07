export interface ConfirmModalProps {
    open: boolean;
    questionText: string;
    buttonText: string;
    idObject: number;
    handleClose: () => void;
    clickActionButton: (id: number) => void;
    isLoading: boolean;
}