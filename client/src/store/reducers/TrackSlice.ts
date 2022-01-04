import {createSlice} from "@reduxjs/toolkit"
import {ITrack} from "../../models/ITrack"
import {trackAPI} from "../../servicesAPI/TrackService"


interface TrackState {
    track: ITrack[]
    isLoading: boolean
    error: string
}


const initialState: TrackState = {
    track: [],
    isLoading: false,
    error: ''
}


export const trackSlice = createSlice({
    name:'track',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            trackAPI.endpoints.fetchAllTrack.matchFulfilled,
            (state, { payload }) => {
                state.isLoading = false
                state.error = ''
                state.track = payload
            }
        )
    },
})


export default trackSlice.reducer