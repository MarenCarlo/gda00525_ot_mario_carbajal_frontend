import { TextProps } from '../../../models/atoms/Texts';
import { Typography } from '@mui/material';

export const Text = ({
    variant = 'body1',
    align = 'inherit',
    color = 'inherit',
    gutterBottom = false,
    noWrap = false,
    variantMapping,
    fontWeight,
    letterSpacing,
    lineHeight,
    sx,
    children,
}: TextProps) => {
    return (
        <Typography
            variant={variant}
            align={align}
            color={color}
            gutterBottom={gutterBottom}
            noWrap={noWrap}
            variantMapping={variantMapping}
            sx={{
                fontWeight,
                letterSpacing,
                lineHeight,
                ...sx,
            }}
        >
            {children}
        </Typography>
    );
};