import { InputText } from '../../../models/atoms/Inputs';
import { TextField } from "@mui/material";
export const TextInput = ({
    id,
    label,
    type,
    name,
    value,
    disabled = false,
    required = false,
    onChange,
    sx = {},
    register,
    error = false,
    helperText,
    variant = "outlined"
}: InputText) => {
    return (
        <TextField
            id={id}
            variant={variant}
            name={name}
            label={label}
            type={type}
            disabled={disabled}
            required={required}
            onChange={onChange}
            value={value}
            error={error}
            helperText={helperText}
            {...register}
            sx={sx}
            slotProps={type === 'tel' ? {
                input: {
                    inputProps: {
                        pattern: '[0-9]{8}',
                        maxLength: 8
                    },
                },
            } : {}}
        />
    );
};