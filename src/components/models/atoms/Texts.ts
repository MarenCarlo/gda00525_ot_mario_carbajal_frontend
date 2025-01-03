import { SxProps, Theme } from '@mui/material/styles';

export interface TextProps {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button' | 'overline' | 'inherit';
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    color?: 'inherit' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error' | 'info' | 'success' | 'warning';
    gutterBottom?: boolean;
    noWrap?: boolean;
    variantMapping?: Partial<Record<string, string>>;
    fontWeight?: number | string;
    letterSpacing?: string;
    lineHeight?: string | number;
    sx?: SxProps<Theme>;
    children: React.ReactNode;
}
