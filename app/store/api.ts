import { Comment, ICalendarDate, IPagination } from '@/interfaces/main.interface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        getActivities: builder.query({
            query: (data: IPagination) => {
                let url = `activities?page=${data.page || 1}&search=${data.search || ''}`;
                if (data.userId) {
                    url += `&userId=${data.userId}`;
                }
                return {
                    url,
                    method: 'GET',
                };
            },
        }),
        getActivityById: builder.query({
            query: (id: string) => `activities/${id}`,
        }),
        createActivity: builder.mutation({
            query: (body) => ({
                url: `activities`,
                method: 'POST',
                body,
            }),
        }),
        updateActivity: builder.mutation({
            query: (body) => ({
                url: `activities`,
                method: 'PUT',
                body,
            }),
        }),
        deleteActivity: builder.mutation({
            query: (id) => ({
                url: `activities`,
                method: 'DELETE',
                body: { id },
            }),
        }),
        seedData: builder.mutation({
            query: () => ({
                url: `activities/seed`,
                method: 'POST',
            }),
        }),
        getActivityByDate: builder.query({
            query: (date: ICalendarDate) => ({
                url: `calendar/${date.year}/${date.month}/${date.day}`,
                method: 'GET',
            })
        }),
        getAllActivities: builder.query({
            query: () => 'activities/all',
        }),
        createComment: builder.mutation({
            query: (body: Comment) => ({
                url: `comments`,
                method: 'POST',
                body,
            }),
        }),
        deleteComment: builder.mutation({
            query: (id: string) => ({
                url: `comments`,
                method: 'DELETE',
                body: { id },
            }),
        }),

    }),
})

export const {
    useGetActivitiesQuery, useGetActivityByIdQuery, useCreateActivityMutation,
    useUpdateActivityMutation, useDeleteActivityMutation, useSeedDataMutation,
    useGetActivityByDateQuery, useGetAllActivitiesQuery, useCreateCommentMutation,
    useDeleteCommentMutation
} = apiSlice