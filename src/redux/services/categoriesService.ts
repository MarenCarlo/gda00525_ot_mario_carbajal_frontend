import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeadersWithToken } from "./utils/serviceHeaders";

const serverURL = import.meta.env.VITE_BACKEND_URL;

export const categoriesService = createApi({
    reducerPath: 'categoriesService',
    baseQuery: fetchBaseQuery({
        baseUrl: serverURL,
        prepareHeaders: (headers) => {
            headers.set('accept', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Categories'],
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: '/categories/getCategories',
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
            providesTags: ['Categories'],
        }),
        addCategory: builder.mutation({
            query: (newCategory) => ({
                url: '/categories/addCategory',
                method: 'POST',
                body: newCategory,
                headers: prepareHeadersWithToken({
                    headers: new Headers(),
                    acceptType: 'application/json',
                    contentType: 'application/json',
                }),
            }),
            transformResponse: (response: any) => ({
                ...response,
            }),
            invalidatesTags: ['Categories'],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useAddCategoryMutation
} = categoriesService;