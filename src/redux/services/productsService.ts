import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeadersWithToken } from "./utils/serviceHeaders";

const serverURL = import.meta.env.VITE_BACKEND_URL;

export const productsService = createApi({
    reducerPath: 'productsService',
    baseQuery: fetchBaseQuery({
        baseUrl: serverURL,
        prepareHeaders: (headers) => {
            headers.set('accept', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        getProductsPublic: builder.query({
            query: (id?: string) => ({
                url: id ? `/products/getProductsPublic/${id}` : '/products/getProductsPublic/',
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
            providesTags: ['Products'],
        }),
        getProductsInternal: builder.query({
            query: (id?: string) => ({
                url: id ? `/products/getProductsInternal/${id}` : '/products/getProductsInternal/',
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
            providesTags: ['Products'],
        }),
        addProducts: builder.mutation({
            query: (formData: FormData) => ({
                url: '/products/addProduct',
                method: 'POST',
                body: formData,
                headers: prepareHeadersWithToken({
                    headers: new Headers(),
                    acceptType: 'application/json',
                }),
            }),
            transformResponse: (response: any) => {
                return {
                    ...response,
                };
            },
            invalidatesTags: ['Products']
        }),
        editProduct: builder.mutation({
            query: (formData: FormData) => ({
                url: '/products/modifyProduct',
                method: 'PUT',
                body: formData,
                headers: prepareHeadersWithToken({
                    headers: new Headers(),
                    acceptType: 'application/json',
                }),
            }),
            transformResponse: (response: any) => ({
                ...response,
            }),
            invalidatesTags: ['Products'],
        }),
        addStockProduct: builder.mutation({
            query: (stockProductData) => ({
                url: '/products/addStockEntry',
                method: 'POST',
                body: stockProductData,
                headers: prepareHeadersWithToken({
                    headers: new Headers(),
                    acceptType: 'application/json',
                    contentType: 'application/json',
                }),
            }),
            transformResponse: (response: any) => ({
                ...response,
            }),
            invalidatesTags: ['Products'],
        }),
    }),
});

export const {
    useGetProductsPublicQuery,
    useLazyGetProductsPublicQuery,
    useGetProductsInternalQuery,
    useAddProductsMutation,
    useEditProductMutation,
    useAddStockProductMutation
} = productsService;