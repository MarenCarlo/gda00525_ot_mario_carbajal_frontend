import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        background: {
            paper: '#000000',
        },
        primary: {
            main: '#FFFFFF',
            light: '#a8f0a0',
            dark: '#FFFFFF',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#210a5b',
            light: '#563498',
            dark: '#140639',
            contrastText: '#ffffff',
        },
        error: {
            main: '#d32f2f',
            light: '#ef5350',
            dark: '#b71c1c',
        },
        warning: {
            main: '#ff9800',
            light: '#ffc947',
            dark: '#f57c00',
        },
        info: {
            main: '#2196f3',
            light: '#64b5f6',
            dark: '#1976d2',
        },
        success: {
            main: '#4caf50',
            light: '#81c784',
            dark: '#388e3c',
        },
        text: {
            primary: '#333333',
            secondary: '#666666',
            disabled: '#9e9e9e',
        },
    },
    shape: {
        borderRadius: 50,
    },
    spacing: 8,
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 400,
        },
        button: {
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    color: '#000000',
                    marginBottom: '8px',
                    marginTop: '8px',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    marginBottom: '8px',
                    marginTop: '8px',
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    border: 'solid 0.5px #111111',
                    borderRadius: '25px',
                    color: '#DDDDDD',
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    color: '#DDDDDD'
                },
            },
        },
    },
    transitions: {
        duration: {
            shortest: 200,
            shorter: 300,
            short: 600,
            standard: 200,
            complex: 375,
            enteringScreen: 400,
            leavingScreen: 250,
        },
    },
    breakpoints: {
        values: {
            xs: 0,    // Extra pequeño (teléfonos)
            sm: 600,  // Pequeño (tabletas en modo retrato)
            md: 960,  // Mediano (tabletas en modo paisaje)
            lg: 1280, // Grande (laptops y desktops)
            xl: 1920, // Extra grande (pantallas muy grandes)
        },
    },
});