import React from 'react'
import { createRoot } from 'react-dom/client'
//APP ts
import App from './App'
//Redux States Provider
import StatesProvider from './redux/StatesProvider';
//Router
import { BrowserRouter } from 'react-router';
//MUI
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
//React Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyles } from '@mui/material';
import './main.css';

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <StatesProvider>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <ToastContainer />
                    <GlobalStyles
                        styles={{
                            body: { backgroundColor: "#000000" },
                        }}
                    />
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </StatesProvider>
    </React.StrictMode>,
)
