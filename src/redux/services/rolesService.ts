import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeadersWithToken } from "./utils/serviceHeaders";

const serverURL = import.meta.env.VITE_BACKEND_URL;

export const rolesService = createApi({
    reducerPath: 'rolesService',
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
        getRoles: builder.query({
            query: () => ({
                url: '/roles/getRoles/',
                method: 'GET',
            }),
            transformResponse: (response: any) => {
                console.log(response);
                console.log(serverURL);
                return {
                    ...response,
                };
            },
        }),
    }),
});

export const { useGetRolesQuery } = rolesService;