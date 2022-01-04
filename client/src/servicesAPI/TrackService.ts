import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react"
import {ITrack, ITrackRes} from "../models/ITrack"


export const trackAPI = createApi({
    reducerPath: 'trackAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api/'}),
    tagTypes: ['Track'],
    endpoints: (build) => ({
        fetchAllTrack: build.query<ITrack[], string|null>({
            query: () => ({
                url: `/track`,
            }),
            providesTags: result => ['Track']
        }),
        createTrack: build.mutation<ITrackRes, FormData>({
            query: (track) => ({
                url: `/track`,
                method: 'POST',
                body: track
            }),
            invalidatesTags: ['Track']
        }),
        deleteTrack: build.mutation<number, number>({
            query: (id) => ({
                url: `/track/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Track']
        }),
    })
})