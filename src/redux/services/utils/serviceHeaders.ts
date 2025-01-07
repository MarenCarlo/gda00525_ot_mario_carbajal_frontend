import Cookies from 'js-cookie';

interface HeaderProps {
    headers: Headers;
    acceptType?: string;
    contentType?: string;
}

export const prepareHeadersWithToken = ({ headers, acceptType, contentType }: HeaderProps) => {
    const authToken = Cookies.get('auth-token');
    console.log(authToken)
    if (authToken) {
        headers.set('auth-token', `${authToken}`);
    }
    if (acceptType) {
        headers.set('accept', acceptType);
    }
    if (contentType) {
        headers.set('content-type', contentType);
    }
    return headers;
};