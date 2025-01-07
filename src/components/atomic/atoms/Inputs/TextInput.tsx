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
    variant = "outlined",
    numberType = 'int'
}: InputText) => {
    const isNumber = type === "number";

    // Función para agregar comas cada 3 dígitos y permitir un punto decimal con 2 digitos
    const formatNumber = (value: string) => {
        let [integerPart] = value.split('.');
        integerPart = integerPart.replace(/[^0-9]/g, '');
        let formattedInteger = integerPart;
        formattedInteger = '';
        while (integerPart.length > 3) {
            formattedInteger = ',' + integerPart.slice(-3) + formattedInteger;
            integerPart = integerPart.slice(0, -3);
        }
        formattedInteger = integerPart + formattedInteger;
        return formattedInteger;
    };

    return (
        <TextField
            id={id}
            variant={variant}
            name={name}
            label={label}
            type={isNumber ? "text" : type}
            disabled={disabled}
            required={required}
            onChange={onChange}
            value={value}
            error={error}
            helperText={helperText}
            {...register}
            sx={sx}
            slotProps={{
                ...(type === 'tel' && {
                    input: {
                        inputProps: {
                            pattern: '[0-9]{8}',
                            maxLength: 8,
                        },
                    },
                }),
                ...(isNumber && {
                    input: {
                        inputProps: {
                            inputMode: 'decimal',
                            onInput: (e: React.FormEvent<HTMLInputElement>) => {
                                const target = e.target as HTMLInputElement;
                                let value = target.value;
                                if (!value.includes('.')) {
                                    target.value = formatNumber(value);
                                } else {
                                    if (numberType === 'int') {
                                        const [integerPart] = value.split('.');
                                        target.value = formatNumber(integerPart);
                                    } else if (numberType === 'decimal') {
                                        const [integerPart, decimalPart] = value.split('.');
                                        target.value = formatNumber(integerPart) + '.' + (decimalPart || '').slice(0, 2);
                                    }
                                }
                            }
                        }
                    },
                }),
            }}
        />
    );
};