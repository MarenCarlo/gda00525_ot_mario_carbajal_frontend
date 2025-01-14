import { Bounce, ToastOptions } from "react-toastify";

export const toastOptions: ToastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    style: { background: '#101010' },
    transition: Bounce,
};