import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeadersWithToken } from "./utils/serviceHeaders";

const serverURL = import.meta.env.VITE_BACKEND_URL;

export const ordersService = createApi({
    reducerPath: 'ordersService',
    baseQuery: fetchBaseQuery({
        baseUrl: serverURL,
        prepareHeaders: (headers) => {
            headers.set('accept', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => ({
                url: '/orders/getOrders',
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
            providesTags: ['Orders'],
        }),
        getOwnOrders: builder.query({
            query: (id?: string) => ({
                url: id ? `/orders/getOwnOrders/${id}` : '/orders/getOwnOrders/',
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
            providesTags: ['Orders'],
        }),
        addOrder: builder.mutation({
            query: (newOrder) => ({
                url: '/orders/addOrder',
                method: 'POST',
                body: newOrder,
                headers: prepareHeadersWithToken({
                    headers: new Headers(),
                    acceptType: 'application/json',
                    contentType: 'application/json',
                }),
            }),
            transformResponse: (response: any) => ({
                ...response,
            }),
            invalidatesTags: ['Orders'],
        }),
        deleteOrderDetail: builder.mutation({
            query: (orderIdToDelete) => ({
                url: `/orders/deleteOrderDetail`,
                method: 'DELETE',
                body: orderIdToDelete,
                headers: prepareHeadersWithToken({
                    headers: new Headers(),
                    acceptType: 'application/json',
                    contentType: 'application/json',
                }),
            }),
            transformResponse: (response: any) => ({
                ...response,
            }),
            invalidatesTags: ['Orders'],
        }),
        deleteOrder: builder.mutation({
            query: (orderToDelete) => ({
                url: `/orders/modifyOrder`,
                method: 'PUT',
                body: orderToDelete,
                headers: prepareHeadersWithToken({
                    headers: new Headers(),
                    acceptType: 'application/json',
                    contentType: 'application/json',
                }),
            }),
            transformResponse: (response: any) => ({
                ...response,
            }),
            invalidatesTags: ['Orders'],
        }),
    }),
});

export const {
    useGetOrdersQuery,
    useAddOrderMutation,
    useGetOwnOrdersQuery,
    useDeleteOrderDetailMutation,
    useDeleteOrderMutation
} = ordersService;