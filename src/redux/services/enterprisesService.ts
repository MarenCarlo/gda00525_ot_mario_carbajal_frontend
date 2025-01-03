import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeadersWithToken } from "./utils/serviceHeaders";

const serverURL = import.meta.env.VITE_BACKEND_URL;

export const enterprisesService = createApi({
    reducerPath: 'enterprisesService',
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
    tagTypes: ['Enterprises'],
    endpoints: (builder) => ({
        getEnterprises: builder.query({
            query: () => ({
                url: '/enterprises/getEnterprises/',
                method: 'GET',
            }),
            transformResponse: (response: any) => {
                return {
                    ...response,
                };
            },
            providesTags: ['Enterprises']
        }),
        addEnterprise: builder.mutation({
            query: (enterpriseData) => ({
                url: '/enterprises/addEnterprise',
                method: 'POST',
                body: enterpriseData,
            }),
            transformResponse: (response: any) => {
                return {
                    ...response,
                };
            },
            invalidatesTags: ['Enterprises']
        }),
    }),
});

export const { useGetEnterprisesQuery, useAddEnterpriseMutation } = enterprisesService;