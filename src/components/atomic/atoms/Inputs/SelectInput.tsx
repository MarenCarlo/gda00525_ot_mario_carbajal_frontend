import React from 'react'
import { SelectFormProps } from '../../../models/atoms/Inputs';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { ThreeDots } from 'react-loader-spinner';

export const SelectInput = ({
    id,
    label,
    name,
    options,
    value,
    onChange,
    disabled = false,
    error = false,
    helperText = '',
    sx = {}
}: SelectFormProps) => {
    if (!Array.isArray(options)) {
        return <div className='flex items-center justify-center'>
            <ThreeDots
                visible={true}
                height="25"
                width="25"
                color="#FFFFFF"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass="flex justify-center"
            />
        </div>
    }
    return (
        <FormControl
            fullWidth
            disabled={disabled}
            error={error}
            sx={sx}
        >
            <InputLabel id={`${id}-label`}>{label}</InputLabel>
            <Select
                labelId={`${id}-label`}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                label={label}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    )
}