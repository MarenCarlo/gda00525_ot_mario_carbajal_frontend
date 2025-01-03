import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeadersWithToken } from "./utils/serviceHeaders";

const serverURL = import.meta.env.VITE_BACKEND_URL;

export const usersService = createApi({
    reducerPath: 'usersService',
    baseQuery: fetchBaseQuery({
        baseUrl: serverURL,
        prepareHeaders: (headers) => {
            return prepareHeadersWithToken({
                headers,
                acceptType: 'application/json',
                contentType: 'application/json',
            });
        },
    }),
    endpoints: (builder) => ({
        authUser: builder.mutation({
            query: (userData) => ({
                url: '/LogIn',
                method: 'POST',
                body: userData
            }),
            transformResponse: (response: any, meta) => {
                const isLogged = meta?.response?.status === 202 && true;
                return {
                    ...response,
                    isLogged: isLogged,
                };
            },
        }),
        addUser: builder.mutation({
            query: (userData) => ({
                url: '/users/SignUp',
                method: 'POST',
                body: userData
            }),
            transformResponse: (response: any) => {
                return {
                    ...response
                };
            },
        }),
    }),
});

export const { useAuthUserMutation, useAddUserMutation } = usersService;