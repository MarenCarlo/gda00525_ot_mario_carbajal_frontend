import { SelectChangeEvent, SxProps, TextFieldVariants, Theme } from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputText {
    id: string;
    label: string;
    type: string;
    name: string;
    value?: string | number;
    disabled?: boolean;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    sx?: SxProps<Theme>;
    register?: UseFormRegisterReturn;
    error?: boolean;
    helperText?: string;
    variant?: TextFieldVariants;
}

export interface SelectFormProps {
    id: string;
    name: string;
    label: string;
    options: { value: string | number; label: string }[];
    value: string | number;
    onChange: (event: SelectChangeEvent<string | number>) => void;
    register?: UseFormRegisterReturn;
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
    sx?: SxProps<Theme>;
}