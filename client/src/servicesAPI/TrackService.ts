import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react"
import {ITrack, ITrackReq, ITrackRes} from "../models/ITrack"


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
        createTrack: build.mutation<ITrackRes, ITrackReq>({
            query: (track) => ({
                url: `/track`,
                method: 'POST',
                body: track
            }),
            invalidatesTags: ['Track']
        }),
    })
})