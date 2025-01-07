import { FormControl, InputLabel, Select, MenuItem, Grid2, FormHelperText, SelectChangeEvent } from '@mui/material'
import { ProtectedComponent } from '../../../middlewares/ProtectedComponent'
import { AppButton } from '../AppButton'
import { ThreeDots } from 'react-loader-spinner'

type SelectInputButtonProps = {
    options: { value: string | number; label: string }[];
    id: string;
    name: string;
    label: string;
    error?: boolean;
    helperText?: string;
    value: string | number;
    onChange?: any;
    clickAddButton?: () => void;
    isLoading?: boolean;
    sx?: object;
};

export const SelectInputButton = ({
    options,
    id,
    name,
    label,
    error = false,
    helperText,
    value,
    onChange,
    clickAddButton,
    isLoading = false,
    sx
}: SelectInputButtonProps) => {
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
            disabled={isLoading}
            error={error}
            sx={sx}
        >
            <Grid2 container columns={{ xs: 12, sm: 12, md: 12 }} alignItems="center">
                <Grid2
                    size={{ xs: 10, sm: 10, md: 10 }}
                >
                    <InputLabel sx={{ marginTop: '7px' }} id={`${name}-label`}>{label}</InputLabel>
                </Grid2>
                <Grid2
                    size={{ xs: 10, sm: 10, md: 10 }}
                >
                    <Select
                        labelId={`${name}-label`}
                        id={id}
                        name={name}
                        value={value}
                        onChange={onChange}
                        label={label}
                        fullWidth
                        sx={{
                            border: 'solid #111111 1px',
                            borderRadius: '30px 0px 0px 30px',
                            width: '100%'
                        }}
                        slotProps={{
                            input: {
                                sx: {
                                    border: 'none',
                                },
                            }
                        }}
                    >
                        {options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid2>
                {
                    clickAddButton &&
                    <Grid2
                        size={{ xs: 2, sm: 2, md: 2 }}
                    >
                        <AppButton
                            variant="contained"
                            color="primary"
                            type="button"
                            isLoading={isLoading}
                            clickButtonAction={() => clickAddButton()}
                            sx={{ height: '56px', borderRadius: '0px 30px 30px 0px', width: '100%' }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" viewBox="0 0 24 24">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                            </svg>
                        </AppButton>
                    </Grid2>
                }
            </Grid2>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    )
}