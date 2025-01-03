import { Button } from '@mui/material'
import { ThreeDots } from 'react-loader-spinner'
import { AppButtonProps } from '../../../models/atoms/AppButton'

export const AppButton = ({
    variant = 'contained',
    type,
    size = 'medium',
    color = 'success',
    children,
    isLoading = false,
    clickButtonAction,
    sx = {}
}: AppButtonProps) => {
    return (
        <>
            <Button
                variant={variant}
                color={color}
                size={size}
                type={type}
                disabled={isLoading}
                onClick={clickButtonAction}
                sx={sx}
            >
                {isLoading ? (
                    <div className='flex items-center justify-center'>
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
                ) : (
                    children
                )}
            </Button>
        </>
    )
}