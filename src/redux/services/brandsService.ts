import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeadersWithToken } from "./utils/serviceHeaders";

const serverURL = import.meta.env.VITE_BACKEND_URL;

export const brandsService = createApi({
    reducerPath: 'brandsService',
    baseQuery: fetchBaseQuery({
        baseUrl: serverURL,
        prepareHeaders: (headers) => {
            headers.set('accept', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Brands'],
    endpoints: (builder) => ({
        getBrands: builder.query({
            query: () => ({
                url: '/brands/getBrands',
                method: 'GET',
                headers: prepareHeadersWithToken({
                    headers: new Headers(),
                    acceptType: 'application/json',
                    contentType: 'application/json',
                }),
            }),
            transformResponse: (response: any) => ({
                ...response,
            }),
            providesTags: ['Brands'],
        }),
        addBrand: builder.mutation({
            query: (newBrand) => ({
                url: '/brands/addBrand',
                method: 'POST',
                body: newBrand,
                headers: prepareHeadersWithToken({
                    headers: new Headers(),
                    acceptType: 'application/json',
                    contentType: 'application/json',
                }),
            }),
            transformResponse: (response: any) => ({
                ...response,
            }),
            invalidatesTags: ['Brands'],
        }),
    }),
});

export const {
    useGetBrandsQuery,
    useAddBrandMutation
} = brandsService;