import { SxProps, Theme } from "@mui/material";

export interface AppButtonProps {
    variant?: 'text' | 'contained' | 'outlined';
    type?: 'button' | 'submit' | 'reset' | undefined;
    size?: 'small' | 'medium' | 'large';
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
    children: React.ReactNode;
    isLoading?: boolean;
    clickButtonAction?: () => void;
    sx?: SxProps<Theme>;
}