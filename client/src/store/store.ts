import {combineReducers, configureStore} from "@reduxjs/toolkit"
import trackReducer from "./reducers/TrackSlice"
import playerReducer from "./reducers/PlayerReducer"
import {trackAPI} from "../servicesAPI/TrackService"


const rootReducer = combineReducers({
    trackReducer,
    playerReducer,
    [trackAPI.reducerPath]: trackAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(trackAPI.middleware,))
    })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']